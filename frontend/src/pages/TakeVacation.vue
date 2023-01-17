<template>
  <sample-page :choice="'takeVacation'">
    <h2 style="margin-top: 40px">Календарь отпусков</h2>
    <div style="display: flex">
      <v-date-picker is-range :rows="rows" :columns="columns" v-model="date"
                     @click="showDate"
                     :attributes="attrs"
                     :disabled-dates="dis"
                     class="calendar"/>
      <div class="infoBar">
        <h2 style="margin-top: -20px">Осталось отпускных дней: {{$store.getters.left}}</h2>
        <div class="prog">
          <div class="progBar"/>
        </div>
      </div>
    </div>
    <div class="wishesInfo">
      <h2>Выбранные даты</h2>
      <div class="wishes">
        <div class="wishesDates"
             v-for="wish in $store.state.wishes" :key="wish.id">
          <p>{{wish.start}} - {{wish.end}}</p>
          <p class="pay">Оплачиваемость</p>
          <label class="checkbox">
            <input type="checkbox" class="check_input" v-model="paid[$store.state.wishes.indexOf(wish)]"/>
            <div class="check_div"/>
          </label>
          <my-button @click="send(wish)">Отправить заявку</my-button>
          <my-button @click="del(wish.id)">Удалить</my-button>
        </div>
        <my-button v-if="$store.state.wishes.length > 1"
                   style="padding: 5px 15px"
                   @click="sendAll">
          Отправить все
        </my-button>
      </div>
    </div>
    <div class="colours">
      <div class="colour">
        <div style="background: #d6bcfa"/>
        <p>Использовано</p>
      </div>
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
        <p>Пересекаемые даты</p>
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
import moment from "moment";
import MyButton from "@/components/UI/MyButton";
import store from "@/store";

export default {
  name: "TakeVacation",

  computed: {
    width: function(){
      return 100 - store.getters.left / store.state.total * 100 + '%';
    },

    attrs: function (){
      let attrs =  [];
      store.state.myVacations.forEach(p => attrs.push(this.chooseColor(p)));
      store.state.wishes.forEach(p => attrs.push(this.chooseColor(p)));
      return attrs;
    },

    dis: function(){
      let dis =  [];
      store.state.myVacations.forEach(p => dis.push(this.disDates(p)));
      store.state.wishes.forEach(p => dis.push(this.disDates(p)));
      return dis;
    }
  },

  data()
  {
    return {

      visibleTake: false,
      value: '',
      context: null,
      choice: {},
      date: null,
      paid: [],
      rows: 2,
      columns: 3,
    }
  },

  components:{
    MyButton,
    SamplePage,
  },

  created() {
    window.addEventListener('resize', this.updateColumns);
  },

  methods: {
    updateColumns() {
      this.columns = window.innerWidth > 1100? 3 : window.innerWidth > 600 ? 2 : 1;
    },
    showDate(){
      const cur_id = new Date();
      if (this.date !== null){
        this.date =
            {
              start: moment(this.date.start).format('DD.MM.YYYY'),
              end: moment(this.date.end).format('DD.MM.YYYY'),
              id: new Date(),
              bindId: cur_id,
            }
        store.commit('addWish', this.date);
        this.date = null;
      }
    },

    del(id){
      store.commit('delWish', id);
    },

    send(wish){
      let last = 0;
      store.state.myVacations.forEach(p => {
        if (p.number > last) {
          last = p.number
        }
      })
      last += 1;
      let record = {
        id: wish.id,
        start: wish.start,
        end: wish.end,
        number: last,
        dateRequest: moment().format('DD.MM.YYYY'),
        paid: this.paid[store.state.wishes.indexOf(wish)] ? 'Да' : 'Нет',
        status: 'Ожидание',
      }
      if (this.totalDays(record.start, record.end) <= store.getters.left){
        store.commit('addVacation', record);
        this.del(wish.id);
      }
      else (alert('Выбрано больше дней, чем доступно!'));
    },

    sendAll(){
      let record = {};
      let total = 0;
      store.state.wishes.forEach(p => {
        total += this.totalDays(p.start, p.end);
      });
      if (total <= store.getters.left){
        store.state.wishes.forEach(p => {
          record = {
            id: p.id,
            start: p.start,
            end: p.end,
            dateRequest: moment().format('DD.MM.YYYY'),
            paid: this.paid[store.state.wishes.indexOf(p)] ? 'Да' : 'Нет',
            status: 'Ожидание',
          }
          store.commit('addVacation', record);
        })
        store.commit('clearWishes');
      }
      else (alert('Выбрано больше дней, чем доступно!'));
    },

    totalDays(start,end){
      return moment(end, 'DD.MM.YYYY').diff(moment(start, 'DD.MM.YYYY'), 'days') + 1;
    },

    chooseColor(rec){
        return {
          id: new Date(),
          highlight: {
            start: { fillMode: 'transparent' },
            base: { fillMode: 'light', color: rec.status === undefined ? 'gray' :
                  rec.status === 'Утверждено'? 'green':
                  rec.status === 'Ожидание'? 'orange': rec.status === 'Использовано' ? 'purple': rec.status === 'Отказ' ? 'red':'none'},
            end: { fillMode: 'transparent' },
          },
          dates: { start: moment(rec.start, 'DD.MM.YYYY')._d, end: moment(rec.end, 'DD.MM.YYYY')._d },
        }
    },

    disDates(rec){
      return{
        id: new Date(),
        start: moment(rec.start, 'DD.MM.YYYY')._d,
        end: moment(rec.end, 'DD.MM.YYYY')._d,
      }
    },
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
  left: 0%;
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
  top: -10px;
  margin-bottom: 2px;
  padding: 0 15px 2px;
  height: fit-content;
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
  margin-top: 100px
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