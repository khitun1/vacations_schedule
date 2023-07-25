<template>
  <sample-page :choice="'takeVacation'" v-if="token !== null">
    <h2 style="margin-top: 40px">Календарь отпусков</h2>
    <div style="display: flex">
      <v-date-picker is-range :rows="rows" :columns="columns" v-model="date"
                     @click="showWish"
                     :attributes="attrs"
                     :disabled-dates="dis"
                     class="calendar"
                      :min-date="minDate"/>
      <div class="infoBar">
        <h2 style="margin-top: -20px">Доступно отпускных дней: {{totalLeft}}</h2>
        <h2 style="margin-top: -20px">Доступно дней на начало года: {{left}}</h2>
      </div>
    </div>
    <div class="wishesInfo">
      <h2>Выбранные даты</h2>
      <div class="wishes">
        <div class="wishesDates"
             v-for="wish in wishes" :key="wish.id">
          <p>{{wish.start}} - {{wish.end}}</p>
          <p class="pay">Оплачиваемость</p>
          <label class="checkbox">
            <input type="checkbox" class="check_input" v-model="paid[wishes.indexOf(wish)]"/>
            <div class="check_div"/>
          </label>
          <my-button @click="del(wish.id)">Удалить</my-button>
        </div>
        <my-button v-if="wishes.length > 0"
                   style="padding: 5px 15px"
                   @click="sendAll">
          Отправить пакет
        </my-button>
      </div>
    </div>
    <div class="colours">
      <div class="colour">
        <div style="background: #9deab7"/>
        <p>Одобрено</p>
      </div>
      <div class="colour">
        <div style="background: #fde1b2"/>
        <p>Ожидание</p>
      </div>
      <div class="colour">
        <div style="background:#feb2b2"/>
        <p>Выбран лимит отдела</p>
      </div>
      <div class="colour">
        <div style="background: #e2e8f0"/>
        <p>Желаемые даты</p>
      </div>
    </div>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import {calendar} from "@/hooks/calendar";
import {computed, onMounted, ref} from "vue";
import moment from "moment";
import {useStore} from "vuex";
import {totalDays} from "@/components/Options";
import {dateUsualFormat} from "@/hooks/generalMoment/dateUsualFormat";
import {dateChartFormat} from "@/hooks/generalMoment/dateChartFormat";
import {dateReverseFormat} from "@/hooks/generalMoment/dateReverseFormat";
import {getLastStart} from "@/hooks/intersections/getLastStart";
import {amountDays} from "@/hooks/generalMoment/amountDays";
import {findIntersection} from "@/hooks/intersections/findIntersection";

export default {
  name: "TakeVacation",

  components:{
    SamplePage,
  },

  setup() {
    const store = useStore();
    store.dispatch('createSocket');
    store.dispatch('getDepartment');
    const percent = computed(() => store.state.my.currentUser.percent);
    const len = computed(() => store.state.my.len);
    const intersInUsersDep = computed(() => store.state.my.dates);
    const inters = ref([]);
    const currentUser = computed(() => store.state.my.currentUser);
    const token = localStorage.getItem('token');
    const doubleShowAlert = ref(0);

    const intersections = () => {
      let quarter = Math.floor(percent.value * len.value);
      if (quarter <= 1) {
        intersInUsersDep.value.forEach(p => {
          if (p.userId !== currentUser.value.id) {
            const vac = {
              start: p.start,
              end: p.end,
              status: 'inters',
            }
            inters.value.push(vac);
          }
        })
      }
      else {
        let lastStart;
        for (let i = 0; i < intersInUsersDep.value.length; i++) {
          for (let j = 0; j < i; j++){
            if(findIntersection(intersInUsersDep.value[i], intersInUsersDep.value[j])) {
              lastStart = getLastStart(intersInUsersDep.value[i].start, intersInUsersDep.value[j].start);
              draw(i, lastStart, quarter);
            }
          }
        }
      }
    }

    const draw = (i, lastStart, quarter) => {
      let start;
      let end;
      for(let j = 0; j < i; j++){
        start = amountDays(dateUsualFormat(intersInUsersDep.value[j].start));
        end = amountDays(dateUsualFormat(intersInUsersDep.value[j].end));
        if(lastStart <= end &&
            lastStart >= start)
        {
          let range = {};
          range.start = intersInUsersDep.value[i].start;
          const earlierEnd = amountDays(dateUsualFormat(intersInUsersDep.value[i].end));
          range.end = earlierEnd < end ? intersInUsersDep.value[i].end
              : intersInUsersDep.value[j].end;
          range.status = 'inters';
          inters.value.push(range);
        }
      }

      if (inters.value.length < quarter) {
        inters.value = [];
      }
    }

    onMounted(async () => {
      await store.dispatch('auth');
      await store.dispatch('getDates');
      await store.dispatch('getWishes');
      await store.dispatch('getVacations');
      intersections();
    });

    const { rows, columns, attrs, dis, minDate } = calendar(inters);
    const totalLeft = computed(() => store.getters.totalLeft);
    const left = computed(() => store.state.my.currentUser.left);
    const total = computed(() => store.state.my.total);

    const date = ref(null);
    const paid = ref([]);
    const last = computed(() => store.getters.last);
    const wishes = computed(() => store.state.my.wishes);
    const socket = computed(() => store.state.my.socket);

    const showWish = () => {
      if (doubleShowAlert.value === 1) {
        doubleShowAlert.value = 0;
        return;
      }
        if (date.value !== null) {
          if (!currentUser.value.allow) {
            alert('В этом календарном году вы уже спланировали отпуск!');
          }
          else {
            let wishesAmount = 0;
            wishes.value.forEach(p => {
              wishesAmount += totalDays(p.start, p.end);
            });
            const start =  dateChartFormat(date.value.start);
            const end = dateChartFormat(date.value.end);
            const createDate = moment();
            const nextYear = createDate.get('year') + 1;
            const startY = moment(nextYear+'-01-01');
            if (totalDays(dateReverseFormat(start), dateReverseFormat(end)) <
                store.state.admin.department.min) {
              alert('Выбрано меньше дней, чем минимум за один отпуск!');
            }
            else if (totalDays(dateReverseFormat(start), dateReverseFormat(end)) > left.value - wishesAmount +
                Math.floor(totalDays(dateReverseFormat(start), dateReverseFormat(startY)) * total.value / 365)
                && currentUser.value.rules)
            {
              alert('Выбрано больше дней, чем будет доступно на ' + dateReverseFormat(start));
            }
            else if (totalDays(dateReverseFormat(start), dateReverseFormat(end)) > totalLeft.value.split(' ')[0]) {
              alert('Выбрано больше дней, чем доступно');
            }
            // else if (totalDays(dateReverseFormat(start), dateReverseFormat(end)) > left.value) {
            //   alert('Выбрано больше дней, чем будет доступно на ' + (nextYear - 1) + ' год');
            // }
            else {
              date.value =
                  {
                    start: start,
                    end: end,
                    userId: currentUser.value.id,
                  }
              store.dispatch('addWish', date.value);
            }
            date.value = null;
          }
        }
        doubleShowAlert.value++;
    }

    const del = async (id) => await store.dispatch('deleteWish', id);

    const sendAll = async() => {
      let record = {};
      let total = 0;
      let fourteen = 0;
      let current = 0;
      wishes.value.forEach(p => {
        const start = dateUsualFormat(p.start);
        const end = dateUsualFormat(p.end);
        current = totalDays(start, end);
        total += current;
        if (current >= 14) {
          fourteen++;
        }
      });
      if (total > totalLeft.value.split(' ')[0] || (total > left.value && currentUser.value.rules)) {
        alert('Выбрано больше дней, чем доступно!');
      }
      else if (fourteen === 0 && currentUser.value.allow && currentUser.value.acceptAll) {
        (alert('Хотя бы один отпуск должен быть не менее 14 дней!'));
      }
      else {
        const vacs = [];
        wishes.value.forEach((p, index) => {
          record = {
            start: dateChartFormat(dateUsualFormat(p.start)),
            end: dateChartFormat(dateUsualFormat(p.end)),
            requested_date: moment(),
            paid: paid.value[wishes.value.indexOf(p)] ? 1 : 0,
            status: 'Ожидание',
            userId: currentUser.value.id,
            number: last.value + index,
          }
          vacs.push(record);
          socket.value.send(JSON.stringify({
            method: 'message',
            department: currentUser.value.department,
          }))
          del(p.id);
        })
        const data = {
          vacs, total,
        }
        await store.dispatch('addVacation', data);
      }
    }

    return {
      len,
      intersInUsersDep,
      token,
      rows,
      columns,
      attrs,
      dis,
      minDate,
      date,
      paid,
      wishes,
      left,
      totalLeft,
      sendAll,
      showWish,
      del,
    }
  },

}
</script>

<style scoped>

h2
{
  margin-left: 20px;
}

.wishes
{
  position: relative;
  width: 80%;
  height: fit-content;
  min-height: 200px;
  background: white;
  text-align: center;
  margin-top: 0;
  left: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  border-width: 0;
  padding: 10px 5px 5px;
}

.checkbox
{
  position: relative;
  top: 7px;
  left: 0;
}

.check_div
{
  top: -3px;
  left: 0;
  width: 60px;
  height: 30px;
  border-radius: 100px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.check_input
{
  display: none;
}

.check_div:before
{
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  background: #8482FF;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.check_input:checked ~ .check_div
{
  background: #8482FF;
}

.check_input:checked ~ .check_div:before
{
  background: white;
  left: 33px;
}

.check_div:hover
{
  filter: brightness(1.2);
}

.wishesDates
{
  display: flex;
  flex-direction: row;
  background: #f3f3f3;
  height: 48px;
  justify-content: space-between;
  flex-flow: row wrap;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Arial";
  border-radius: 5px;
  margin-bottom: 5px;
}

.wishesDates button
{
  top: -9px;
  margin-bottom: 2px;
  padding: 0 15px 2px;
  height: 27px;
}

.colours
{
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  position: absolute;
  top: 100px;
  left: 30px;
  width: fit-content;
}

.colour div
{
  width: 30px;
  height: 30px;
}

.colour
{
  display: flex;
  margin-right: 10px;
}

.colour p
{
  position: relative;
  margin-left: 10px;
  font-size: 16px;
  top: -10px;
}

.infoBar {
  margin: -20px 0 0 30px;
}

.infoBar > h2 {
  margin-bottom: 40px;
}

.calendar {
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  top: 60px;
  left: 10px;
}

.wishesInfo {
  margin-top: 100px;
}

@media screen and (max-width: 1470px) {
  .infoBar {
    position: absolute;
    left: 0;
    top: 120px;
  }
  .calendar {
    top: 160px;
    margin-bottom: 100px;
  }
  .colours {
    top: 180px;
  }
  @media screen and (max-width: 1250px) {
    .wishes {
      width: 95%;
    }
    @media screen and (max-width: 1100px){
      .calendar {
        top: 200px;
        margin-bottom: 120px;
      }

      .colours {
        width: 570px;
      }
      @media screen and (max-width: 1080px) {
        .wishesDates {
          height: 100px;
        }
        .wishes {
          width: 85%;
        }
        .colours {
        }
        @media screen and (max-width: 1000px) {
          .wishes {
            width: 100%;
          }
          .wishesDates {
            height: fit-content;
          }
          @media screen and (max-width: 630px) {
            .colours {
              width: 400px;
            }
          }
          @media screen and (max-width: 550px) {
            .pay {
              display: none;
            }
          }
        }
      }

    }
  }

}

</style>