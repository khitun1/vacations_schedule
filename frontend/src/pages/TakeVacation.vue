<template>
  <sample-page :choice="'takeVacation'">
    <h2 style="margin-top: 40px">Календарь отпусков</h2>
    <div style="display: flex">
      <v-date-picker is-range :rows="rows" :columns="columns" v-model="date"
                     @click="showWish"
                     :attributes="attrs"
                     :disabled-dates="dis"
                     class="calendar"
                      :min-date="minDate"/>
      <div class="infoBar">
        <h2 style="margin-top: -20px">Осталось отпускных дней: {{left}}</h2>
        <div class="prog">
          <div class="progBar"/>
        </div>
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
          <my-button @click="send(wish)">Отправить заявку</my-button>
          <my-button @click="del(wish.id)">Удалить</my-button>
        </div>
        <my-button v-if="wishes.length > 1"
                   style="padding: 5px 15px"
                   @click="sendAll">
          Отправить все
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
import {total_days} from "@/hooks/totalDays";

export default {
  name: "TakeVacation",

  setup() {
    const store = useStore();
    store.dispatch('createSocket');
    store.dispatch('getDepartment');
    const percent = computed(() => store.state.my.currentUser.percent);
    const len = computed(() => store.state.my.len);
    const intersInUsersDep = computed(() => store.state.my.dates);
    const inters = ref([]);
    const currentUser = computed(() => store.state.my.currentUser);

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
              lastStart = getLastStart(i,j);
              draw(i, lastStart, quarter);
            }
          }
        }
      }
    }

    const getLastStart = (i,j) => {
      let iStart = moment(intersInUsersDep.value[i].start, 'DD.MM.YYYY');
      let jStart = moment(intersInUsersDep.value[j].start, 'DD.MM.YYYY');
      if(iStart.diff('01.01.2022', 'days') > jStart.diff('01.01.2022', 'days'))
        return iStart.diff('01.01.2022', 'days');
      return jStart.diff('01.01.2022', 'days');
    }

    const findIntersection = (first, second) => {
      let iStart = moment(first.start, 'DD.MM.YYYY');
      let jStart = moment(second.start, 'DD.MM.YYYY');
      let iEnd = moment(first.end, 'DD.MM.YYYY');
      let jEnd = moment(second.end, 'DD.MM.YYYY');
      return iStart.isBetween(jStart, jEnd) || iEnd.isBetween(jStart, jEnd);
    }

    const draw = (i, lastStart, quarter) => {
      let start;
      let end;
      for(let j = 0; j < i; j++){
        start = moment(intersInUsersDep.value[j].start, 'DD.MM.YYYY')
            .diff('01.01.2022', 'days');
        end = moment(intersInUsersDep.value[j].end, 'DD.MM.YYYY')
            .diff('01.01.2022', 'days');
        if(lastStart <= end &&
            lastStart >= start)
        {
          let range = {};
          range.start = intersInUsersDep.value[i].start;
          const earlierEnd = moment(intersInUsersDep.value[i].end, 'DD.MM.YYYY')
              .diff('01.01.2022', 'days');
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
    const left = computed(() => store.getters.left);
    const total = computed(() => store.state.my.total);
    const width = computed(() => 100 - left.value / total.value * 100 + '%');

    const date = ref(null);
    const paid = ref([]);
    const last = computed(() => store.getters.last);
    const wishes = computed(() => store.state.my.wishes);
    const socket = computed(() => store.state.my.socket);

    const showWish = () => {
      if (date.value !== null){
        const start =  moment(date.value.start).format('YYYY-MM-DD');
        const end = moment(date.value.end).format('YYYY-MM-DD');
        if (totalDays(moment(start).format('DD.MM.YYYY'), moment(end).format('DD.MM.YYYY')) >
            store.state.admin.department.max) {
          alert('Выбрано больше дней, чем максимум за один отпуск!');
        }
        else if (totalDays(moment(start).format('DD.MM.YYYY'), moment(end).format('DD.MM.YYYY')) <
            store.state.admin.department.min) {
          alert('Выбрано меньше дней, чем минимум за один отпуск!');
        }
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

    const del = async (id) => await store.dispatch('deleteWish', id);

    const send = async (wish) => {
      let flag = 0;
      let record = {
        start: moment(wish.start, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        end: moment(wish.end, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        number: last.value,
        requested_date: moment(),
        paid: paid.value[wishes.value.indexOf(wish)] ? 1 : 0,
        status: 'Ожидание',
        userId: currentUser.value.id,
      }
      intersInUsersDep.value.forEach(p => {
        if (findIntersection(record, p)) {
          flag = 1;
        }
      })
      if (flag === 1) alert('Выбранные даты вызовут пересечение');
      else if (totalDays(moment(record.start).format('DD.MM.YYYY'), moment(record.end).format('DD.MM.YYYY')) <= left.value){
        await store.dispatch('addVacation', record);
        socket.value.send(JSON.stringify({
          method: 'message',
          department: currentUser.value.department,
        }))
        del(wish.id);
      }
      else (alert('Выбрано больше дней, чем доступно!'));
    }

    const sendAll = () => {
      let record = {};
      let total = 0;
      wishes.value.forEach(p => {
        const start = moment(p.start, 'DD.MM.YYYY');
        const end = moment(p.end, 'DD.MM.YYYY');
        total += totalDays(start, end);
      });
      if (total <= left.value){
        wishes.value.forEach(async (p, index) => {
          record = {
            start: moment(p.start, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            end: moment(p.end, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            requested_date: moment(),
            paid: paid.value[wishes.value.indexOf(p)] ? 1 : 0,
            status: 'Ожидание',
            userId: currentUser.value.id,
            number: last.value + index,
          }
          await store.dispatch('addVacation', record);
          socket.value.send(JSON.stringify({
            method: 'message',
            department: currentUser.value.department,
          }))
          del(p.id);
        })
      }
      else (alert('Выбрано больше дней, чем доступно!'));
    }

    const {totalDays} = total_days();

    return {
      findIntersection,
      len,
      intersInUsersDep,
      currentUser,
      rows,
      columns,
      attrs,
      dis,
      minDate,
      width,
      date,
      paid,
      wishes,
      left,
      send,
      sendAll,
      showWish,
      del,
    }
  },

  components:{
    SamplePage,
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

.prog
{
  width: 300px;
  height: 20px;
  margin-left: 50px;
  margin-bottom: 20px;
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
}

.progBar
{
  width: v-bind(width);
  background: #a09fff;
  height: 100%;
  border-radius: 100px;
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