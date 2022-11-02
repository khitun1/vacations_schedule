<template>
 <div>
<!--   <my-settings-->
<!--      :user="current_user"-->
<!--      :deps="departments"-->
<!--      :types="types"-->
<!--      :users="users"-->
<!--      @create="createUser"-->
<!--      @add="addName"-->
<!--      @changePassword="changePas"-->
<!--      @changeLogin="changeLog"-->
<!--      @changeCondition="changeCon"-->
<!--   />-->
<!--   <set-signature-->
<!--       :requested="vacations"-->
<!--       @getExplanation="explain"-->
<!--       @accepted="accept"-->
<!--   />-->
<!--   <all-vacations-->
<!--      :deps="departments"-->
<!--   />-->
<!--   <take-vacation-->
<!--        :types="types"-->
<!--        @create="request"-->
<!--   />-->
<!--   <my-vacations-->
<!--      :plans="myPlans"-->
<!--      :history="myHistory"-->
<!--   />-->
<!--  <start-screen/>-->
 </div>
</template>

<script>
 //import StartScreen from "@/components/Pages/StartScreen";
 //import MyVacations from "@/components/Pages/MyVacations";
 //import TakeVacation from "@/components/Pages/TakeVacation";
// import AllVacations from "@/components/Pages/AllVacations";
 //import SetSignature from "@/components/Pages/SetSignature";
//import MySettings from "@/components/Pages/MySettings";

export default {
  components: {
 //  MySettings,
    // SetSignature,
  //   AllVacations,
    // TakeVacation,
    // MyVacations,
     //StartScreen,
  },
  data(){
    return {
      vacations : [
        {id: 1, surname: 'Хитун', name: 'Иван', lastname: 'Михайлович', start: '01.01.2022', end: '02.02.2022',
          total: 12, paid: 'Да', type: '', dateRequest: '',
          intersections: 'Нет', explanation: '', status: 'Ожидание', comment: '', countries: '',},
        {id: 2, surname: 'Иванов', name: 'Владислав', lastname: 'Андреевич', start: '01.01.2022', end: '02.02.2022',
          total: 20, paid: 'Нет', type: '', dateRequest: '',
          intersections: 'Да', explanation: '', status: 'Ожидание', comment: '', countries: '',},
      ],

      current_user: {
        id: 1, surname: 'Adams', name: 'John', lastname: 'Jack', login: 'Flash', password: 'qwerty',
        department: 'Developers', daysLeft: 10,
      },

      users: [
      ],

      departments: [
        {id: 2, name: 'first', min: 7, total: 55, percent: 30,},
        {id: 3, name: 'sdgsg', min: 7, total: 55, percent: 30,},
      ],

      types: [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
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

      myHistory: [
        {id: 1, start: '04.02.2022', end: '13.03.2022', total: 12, dateRequest: '01.07.2021', paid: 'yes', status: 'Отменено',},
        {id: 2, start: '04.02.2022', end: '13.03.2022', total: 12, dateRequest: '01.07.2021', paid: 'yes', status: 'Использовано',},

      ],
    }
  },
  methods: {
    createUser(user)
    {
      this.users.push(user);
    },

    addName(name)
    {
      let flag = name.flag;
      delete name.flag;
      if(flag === 1)
      {
        name.min = 7;
        name.total = 30;
        name.percent = 30;
        this.departments.push(name)
      }
      else this.types.push(name);
    },

    explain(exp)
    {
      this.vacations.find(p => p.id === exp.id).explanation = exp.exp;
      this.vacations.find(p => p.id === exp.id).status = 'Отказ';
    },

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
      rec.dateRequest = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
      this.vacations.push(rec);
      this.myPlans.push(rec);
    },

    changePas(pas)
    {
      this.current_user.password = pas;
    },

    changeLog(log)
    {
      this.current_user.login = log;
    },

    changeCon(con)
    {
      this.departments.find(p => p.id === con.id).min = con.min;
      this.departments.find(p => p.id === con.id).total = con.total;
      this.departments.find(p => p.id === con.id).percent = con.percent;
    },

    accept(id)
    {
      this.vacations.find(p => p.id === id).status = 'Утверждено';
    }
  }

}
</script>

<style>

</style>