<template>
  <sample-page :choice="'takeVacation'">
    <h2 style="margin-top: 40px">Календарь отпусков</h2>
    <div style="display: flex">
      <v-date-picker is-range :rows="1" :columns="3" v-model="date"
                     @click="showDate"
                     :attributes="attrs"
                     :disabled-dates="dis"
                      style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"/>
      <div style="margin: -20px 0 0 30px">
        <h2 style="margin-top: -20px">Осталось отпускных дней: {{$store.state.left}}</h2>
        <div class="prog">
          <div class="progBar"/>
        </div>
      </div>
    </div>
    <h2>Выбранные даты</h2>
    <div class="wishes">
      <div class="wishesDates"
           v-for="wish in wishes" :key="wish.id">
        <p>{{wish.start}} - {{wish.end}}</p>
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
<!--    <v-date-picker :rows="3" :columns="4"   :value="null"-->
<!--                   color="red"-->
<!--                   is-dark-->
<!--                   is-range/>-->

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
      return 100 - store.state.left / store.state.total * 100 + '%';
    },

    attrs: function (){
      let attrs =  [];
      store.state.myVacations.forEach(p => attrs.push(this.chooseColor(p)));
      this.selectedAttrs.forEach(p => attrs.push(p));
      return attrs;
    },

    dis: function(){
      let dis =  [];
      store.state.myVacations.forEach(p => dis.push(this.disDates(p)));
      this.selectedDis.forEach(p => dis.push(p));
      return dis;
    }
  },

  data()
  {
    return {
      current_user: {
        id: 1, surname: 'Adams', name: 'John', lastname: 'Jack', login: 'Flash', password: 'qwerty',
        department: 'Developers', daysLeft: 10,
      },

      selectedAttrs: [

      ],

      selectedDis: [
        {
          end: new Date(),
        },
      ],

      visibleTake: false,

      wishes: [],

      date: null,

      value: '',
      context: null,

      choice: {},

      paid: [],
    }
  },

  components:{
    MyButton,
    SamplePage,
  },

  methods: {

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
        this.wishes.push(this.date);
        this.selectedAttrs.push({
          id: cur_id,
          highlight: {
            start: { fillMode: 'transparent' },
            base: { fillMode: 'light', color: 'gray'},
            end: { fillMode: 'transparent' },
          },
          dates: { start: moment(this.date.start, 'DD.MM.YYYY')._d, end: moment(this.date.end, 'DD.MM.YYYY')._d },
        })
        this.selectedDis.push({
          id: cur_id,
          start: moment(this.date.start, 'DD.MM.YYYY')._d,
          end: moment(this.date.end, 'DD.MM.YYYY')._d,
        })
        this.date = null;
      }
    },

    del(id){
      this.selectedAttrs.splice(this.selectedAttrs.findIndex(p => p.id === this.wishes.find(p => p.id === id).bindId) ,1);
      this.selectedDis.splice(this.selectedDis.findIndex(p => p.id === this.wishes.find(p => p.id === id).bindId) ,1);
      this.wishes.splice(this.wishes.findIndex(p => p.id === id), 1);
    },

    send(wish){
      let last = 0;
      store.state.myVacations.forEach(p => {
        if (p.number > last) {
          last = p.number
        }
      });
      last += 1;
      let record = {
        id: wish.id,
        start: wish.start,
        end: wish.end,
        number: last,
        dateRequest: moment().format('DD.MM.YYYY'),
        paid: this.paid[this.wishes.indexOf(wish)] ? 'Да' : 'Нет',
        status: 'Ожидание',
      }
      if (this.totalDays(record.start, record.end) <= store.state.left){
        store.state.left -= this.totalDays(record.start, record.end);
        store.state.myVacations.push(record);
        this.del(wish.id);
      }
      else (alert('Выбрано больше дней, чем доступно!'));
    },

    sendAll(){
      let record = {};
      let total = 0;
      this.wishes.forEach(p => {
        total += this.totalDays(p.start, p.end);
      });
      if (total <= store.state.left){
        this.wishes.forEach(p => {
          record = {
            id: p.id,
            start: p.start,
            end: p.end,
            dateRequest: moment().format('DD.MM.YYYY'),
            paid: this.paid[this.wishes.indexOf(p)] ? 'Да' : 'Нет',
            status: 'Ожидание',
          }
          store.state.left -= this.totalDays(record.start, record.end);
          store.state.myVacations.push(record);
        })
        this.selectedAttrs = [];
        this.wishes = [];
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
            base: { fillMode: 'light', color: rec.status === 'Утверждено'? 'green':
                  rec.status === 'Ожидание'? 'yellow': rec.status === 'Использовано' ? 'purple': rec.status === 'Отказ' ? 'red':'none'},
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

    checkAmount(){

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
  width: 744px;
  height: fit-content;
  min-height: 200px;
  background: white;
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
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
}


.take
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  width: 500px;
  background: white;
  margin-top: 50px;
  height: 80px;
  filter: drop-shadow(0 5px 5px #7e7e7e);
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
}

</style>