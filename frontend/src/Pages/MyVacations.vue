<template>
  <sample-page :choice="'myVacations'">
    <div v-show="calendarShow">
      <h2>Осталось отпускных дней: {{$store.getters.left}}</h2>
      <div class="prog">
        <div class="progBar"/>
      </div>
      <my-button class="calendar" @click="calendarShow = false">
        <img src="@/images/CalendarIcon.png"/>
        <p>В режиме календаря</p>
      </my-button>
      <div class="plan">
        <h1>Запланированные отпуска</h1>
        <my-table
            :records="$store.state.myVacations.filter(p => p.status !== 'Использовано')"/>
        <h1 style="margin-top: 20px">История отпусков</h1>
        <my-table
            :records="$store.state.myVacations.filter(p => p.status === 'Использовано')"/>
      </div>
    </div>
    <div v-show="!calendarShow">
      <button-back @click="calendarShow = true"
                  class="back"/>
      <div class="calendarShow">
        <v-calendar is-range :rows="2" :columns="3"
                       :attributes="attrs"
                       :disabled-dates="dis"
                       style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"/>
        <div style="margin: -20px 0 0 30px">
          <h2 style="margin-top: -20px">Осталось отпускных дней: {{$store.getters.left}}</h2>
          <div class="prog">
            <div class="progBar"/>
          </div>
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
          <p>Пожелания</p>
        </div>
      </div>
    </div>
  </sample-page>
</template>

<script>
import MyTable from "@/components/MyTable";
import SamplePage from "@/components/Samples/SamplePage";
import store from "@/store";
import MyButton from "@/components/UI/MyButton";
import moment from "moment";
import ButtonBack from "@/components/UI/ButtonBack";

export default {
  name: "MyVacations",

  components:{
    ButtonBack,
    MyTable,
    SamplePage,
    MyButton,
  },

  data(){
    return {
      width: (100 - store.getters.left / store.state.total * 100) + '%',
      calendarShow: true,
    }
  },

  computed: {
    attrs: function () {
      let attrs = [];
      store.state.myVacations.forEach(p => attrs.push(this.chooseColor(p)));
      store.state.wishes.forEach(p => attrs.push(this.chooseColor(p)));
      return attrs;
    },
    dis: function () {
      let dis = [];
      store.state.myVacations.forEach(p => dis.push(this.disDates(p)));
      store.state.wishes.forEach(p => dis.push(this.disDates(p)));
      return dis;
    }
  },


    methods: {
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
      disDates(rec) {
        return {
          id: new Date(),
          start: moment(rec.start, 'DD.MM.YYYY')._d,
          end: moment(rec.end, 'DD.MM.YYYY')._d,
        }
      },
    }
}
</script>

<style scoped>
.prog
{
  width: 300px;
  height: 20px;
  margin-left: 30px;
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

.plan
{
  margin-left: 10px;
  height: fit-content;
}

.plan h1
{
  height: 20px;
  margin-top: 0;
  margin-bottom: 30px;
  font-family: "Times New Roman";
  font-size: 32px;
}

.calendar
{
  position: absolute;
  top: 0;
  right: 0;
  width: 230px;
  height: 50px;
  background: white;
  border-radius: 40px;
  color: black;

}

.calendar img
{
  position: absolute;
  left: 20px;
  top: 10px;
}

.calendar p
{
  position: absolute;
  left: 55px;
  top: -3px;
  font-size: 18px;
}

.calendarShow
{
  display: flex;
  position: relative;
  top: 50px;
  left: 10px;
}

.back
{
  padding: 0;
  position: relative;
  top: 40px;
}

.colours
{
  display: flex;
  flex-direction: column;
  position: relative;
  top: -400px;
  left: 800px;
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
}

.colour p
{
  position: relative;
  margin-left: 10px;
  font-size: 16px;
  top: -10px;
}

</style>