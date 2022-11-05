<template>
  <sample-page
    :choice="'myVacations'"
    :admin="isAdmin">
    <h3>Осталось 25 дней</h3>
    <div class="fill">
      <div class="prev"/>
      <div class="present"/>
      <div class="year">
        <p style="left: 0">2021</p>
        <p style="left: 290px">2022</p>
      </div>
    </div>
    <my-button class="calendar">
      <img src="@/components/images/CalendarIcon.png"/>
      <p>В режиме календаря</p>
    </my-button>
    <div class="plan">
      <h1>Запланированные отпуска</h1>
      <my-table
        :records="myPlans"
        @Del="delPlan"
      />
      <h1 style="margin-top: 20px">История отпусков</h1>
      <my-table
        :records="myHistory"
        @Del="delHistory"

      />
    </div>
    </sample-page>

</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import MyTable from "@/components/MyTable";
import MyButton from "@/components/UI/MyButton";

export default {
  name: "MyVacations",

  components:{
    MyButton,
    MyTable,
    SamplePage,
  },

  data(){
    return {
      myPlans: [
        {id: 1, start: '11.12.2022', end: '02.02.2023', dateRequest: '01.06.2021', paid: 'Да', status: 'Утверждено',
          explanation: '',},
        {id: 2, start: '01.01.2022', end: '02.02.2022', dateRequest: '01.06.2021', paid: 'Нет', status: 'Ожидание',
          explanation: '',},
        {id: 3, start: '01.01.2022', end: '02.02.2022', dateRequest: '01.06.2021', paid: 'Да', status: 'Отказ',
          explanation: '',},
        {id: 4, start: '01.01.2022', end: '02.02.2022', dateRequest: '01.06.2021', paid: 'Нет', status: 'Удалено',
          explanation: '',},
        {id: 5, start: '01.01.2022', end: '03.05.2022', dateRequest: '01.06.2021', paid: 'Да', status: 'Отказ',
          explanation: '',},
        {id: 6, start: '01.01.2022', end: '02.02.2022', dateRequest: '01.06.2021', paid: 'Нет', status: 'Удалено',
          explanation: '',},

      ],

      myHistory: [
        {id: 1, start: '04.02.2022', end: '13.03.2022', dateRequest: '01.07.2021', paid: 'Да', status: 'Отменено',},
        {id: 2, start: '04.02.2022', end: '13.03.2022', dateRequest: '01.07.2021', paid: 'Да', status: 'Использовано',},
      ],
    }
  },

  props: {
    isAdmin:{
      type: Number,
      requested: true,
    }
  },

  methods: {
    delPlan(id){
      this.myPlans.find(p => p.id === id).status = 'Удалено';
    },

    delHistory(id){
      this.myHistory.find(p => p.id === id).status = 'Удалено';
    }
  }
}
</script>

<style scoped>

h3
{
  position: absolute;
  left: 10px;
  top: 0;
  font-family: "Times New Roman";
  font-weight: bold;
  font-size: 20px;
}

.fill
{
  position: absolute;
  width: 550px;
  height: 20px;
  left: 10px;
  top: 50px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
}

.prev
{
  width: 295px;
  height: 20px;
  background: #00FF19;
  border-radius: 100px;
}

.present
{
  position: inherit;
  top: 0;
  width: 200px;
  height: 20px;
  left: 265px;
  z-index: -1;
  background: #8482FF;
  border-radius: 100px;
}

.year p
{
  position: absolute;
  top: 10px;
}

.plan
{
  position: absolute;
  top: 100px;
  left: 10px;
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
  width: 230px;
  height: 50px;
  left: 940px;
  top: 30px;
  background: white;
  border-radius: 40px;
  margin: 10px;
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
  font-family: "Times New Roman";
  font-size: 18px;
}

</style>