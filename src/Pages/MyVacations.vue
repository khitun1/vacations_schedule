<template>
  <sample-page :choice="'myVacations'">
        <h2>Осталось отпускных дней: {{$store.state.left}}</h2>
        <div class="prog">
          <div class="progBar"/>
        </div>
<!--        <my-button class="calendar">-->
<!--          <img src="@/components/images/CalendarIcon.png"/>-->
<!--          <p>В режиме календаря</p>-->
<!--        </my-button>-->
        <div class="plan">
          <h1>Запланированные отпуска</h1>
          <my-table
              :records="$store.state.myVacations.filter(p => p.status !== 'Использовано')"/>
          <h1 style="margin-top: 20px">История отпусков</h1>
          <my-table
              :records="$store.state.myVacations.filter(p => p.status === 'Использовано')"/>
        </div>
  </sample-page>
</template>

<script>
import MyTable from "@/components/MyTable";
import SamplePage from "@/components/Samples/SamplePage";
import store from "@/store";

export default {
  name: "MyVacations",

  components:{
    MyTable,
    SamplePage,
  },

  data(){
    return {
        width: (100 - store.state.left / store.state.total * 100) + '%',
    }
  },

  methods: {

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



</style>