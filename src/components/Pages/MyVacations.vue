<template>
  <sample-page
    :choice="'myVacations'"
    :admin="isAdmin">
        <h2>Осталось отпускных дней: {{left}}</h2>
        <div class="prog">
          <div class="progBar"/>
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
import MyTable from "@/components/MyTable";
import MyButton from "@/components/UI/MyButton";
import SamplePage from "@/components/Samples/SamplePage";

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
        {id: 7, start: '01.01.2022', end: '02.02.2022', dateRequest: '01.06.2021', paid: 'Нет', status: 'Ожидание',
          explanation: '',},

      ],

      myHistory: [
        {id: 1, start: '04.02.2022', end: '13.03.2022', dateRequest: '01.07.2021', paid: 'Да', status: 'Отменено',},
        {id: 2, start: '04.02.2022', end: '13.03.2022', dateRequest: '01.07.2021', paid: 'Да', status: 'Использовано',},
      ],

        width: (100 - this.left / this.total * 100) + '%',
    }
  },

  props: {
    isAdmin:{
      type: Number,
      requested: true,
    },
    total: {
      type: Number,
      requested: true,
    },
    left: {
      type: Number,
      requested: true,
    },
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