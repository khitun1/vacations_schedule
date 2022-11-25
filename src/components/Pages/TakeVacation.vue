<template>
  <sample-page
      :choice="'takeVacation'"
      :admin="isAdmin">
    <h1>Планировщик отпусков</h1>
    <b-calendar></b-calendar>
    <h2>Осталось отпускных дней: {{left}}</h2>
    <div class="prog">
      <div class="progBar"/>
    </div>
<!--      <label class="checkbox">-->
<!--        <input type="checkbox" class="check_input" v-model="record.paid"/>-->
<!--        <div class="check_div"/>-->
<!--      </label>-->
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";


export default {
  name: "TakeVacation",
  data()
  {
    return {
      current_user: {
        id: 1, surname: 'Adams', name: 'John', lastname: 'Jack', login: 'Flash', password: 'qwerty',
        department: 'Developers', daysLeft: 10,
      },

      types: [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
      ],

      vacations : [
        {id: 1, surname: 'Хитун', name: 'Иван', lastname: 'Михайлович', start: '01.01.2022', end: '02.02.2022',
          total: 12, paid: 'Да', type: '', dateRequest: '',
          intersections: 'Нет', explanation: '', status: 'Ожидание', comment: '', countries: '',},
        {id: 22, surname: 'Иванов', name: 'Владислав', lastname: 'Андреевич', start: '01.01.2022', end: '02.02.2022',
          total: 20, paid: 'Нет', type: '', dateRequest: '',
          intersections: 'Да', explanation: '', status: 'Ожидание', comment: '', countries: '',},
      ],

      myPlans: [
        {id: 1, start: '01.01.2022', end: '02.02.2022', total: 12, dateRequest: '01.06.2021', paid: 'Да', status: 'Утверждено',
          explanation: '',},
        {id: 2, start: '01.01.2022', end: '02.02.2022', total: 12, dateRequest: '01.06.2021', paid: 'Нет', status: 'Ожидание',
          explanation: '',},
        {id: 3, start: '01.01.2022', end: '02.02.2022', total: 12, dateRequest: '01.06.2021', paid: 'Да', status: 'Отказ',
          explanation: '',},
        {id: 4, start: '01.01.2022', end: '02.02.2022', total: 12, dateRequest: '01.06.2021', paid: 'Нет', status: 'Удалено',
          explanation: '',},

      ],

      record: {
       start: '',
       end: '',
       comment: '',
       type: '',
       countries: '',
       paid: false,
      },

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

  components:{
    SamplePage,
  },

  methods: {
    request(rec)
    {
      let date = new Date()
      rec.paid = rec.paid === true? 'Да' : 'Нет';
      rec.surname = this.current_user.surname;
      rec.name = this.current_user.name;
      rec.lastname = this.current_user.lastname;
      rec.intersections = 'Нет';
      rec.explanation = '';
      rec.status = 'Ожидание';
      rec.triplets = false;
      rec.dateRequest = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
      this.vacations.push(rec);
      this.myPlans.push(rec);
    },
  },
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
.checkbox
{
  position: absolute;
  left: 150px;
  top: -3px;
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

</style>