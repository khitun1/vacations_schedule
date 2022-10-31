<template>
 <div>
<!--   <my-settings-->
<!--      :user="current_user"-->
<!--      :deps="departments"-->
<!--      :types="types"-->
<!--      @create="createUser"-->
<!--      @add="addName"-->
<!--   />-->
<!--   <set-signature-->
<!--       :requested="requested"-->
<!--       @getExplanation="explain"-->
<!--   />-->
<!--   <all-vacations/>-->
<!--   <take-vacation-->
<!--        :types="types"-->
<!--        @create="request"-->
<!--   />-->
<!--   <my-vacations-->
<!--      :plans="myPlans"-->
<!--      :history="myHistory"-->
<!--   />-->
  <start-screen/>
 </div>
</template>

<script>
 import StartScreen from "@/components/Pages/StartScreen";
 //import MyVacations from "@/components/Pages/MyVacations";
 //import TakeVacation from "@/components/Pages/TakeVacation";
// import AllVacations from "@/components/Pages/AllVacations";
// import SetSignature from "@/components/Pages/SetSignature";
//import MySettings from "@/components/Pages/MySettings";

export default {
  components: {
//   MySettings,
 //    SetSignature,
    // AllVacations,
     //TakeVacation,
     //MyVacations,
     StartScreen,
  },
  data(){
    return {
      requested : [
        {id: 1, surname: 'Хитун', name: 'Иван', lastname: 'Михайлович', start: '01.01.2022', end: '02.02.2022',
          total: 12, paid: 'Да', intersections: 'Нет'},
        {id: 2, surname: 'Иванов', name: 'Владислав', lastname: 'Андреевич', start: '01.01.2022', end: '02.02.2022',
          total: 20, paid: 'Нет', intersections: 'Да'},
      ],

      current_user: {
        id: 1, surname: 'Adams', name: 'John', lastname: 'Jack', login: 'Flash', password: 'qwerty',
        department: 'Developers', daysLeft: 10,
      },

      users: [
      ],

      departments: [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
      ],

      types: [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
      ],

      myPlans: [
        {id: 1, start: '01.01.2022', end: '02.02.2022', total: 12, dateRequest: '01.06.2021', paid: 'yes', status: 'Утверждено',
          explanation: '',},
        {id: 2, start: '01.01.2022', end: '02.02.2022', total: 12, dateRequest: '01.06.2021', paid: 'yes', status: 'Ожидание',
          explanation: '',},
        {id: 3, start: '01.01.2022', end: '02.02.2022', total: 12, dateRequest: '01.06.2021', paid: 'yes', status: 'Отказ',
          explanation: '',},
        {id: 4, start: '01.01.2022', end: '02.02.2022', total: 12, dateRequest: '01.06.2021', paid: 'yes', status: 'Удалено',
          explanation: '',},

      ],

      myHistory: [
        {id: 1, start: '04.02.2022', end: '13.03.2022', total: 12, dateRequest: '01.07.2021', paid: 'yes', status: 'Отменено',},
        {id: 2, start: '04.02.2022', end: '13.03.2022', total: 12, dateRequest: '01.07.2021', paid: 'yes', status: 'Использовано',},

      ],

      vacations: [

      ],
    }
  },
  methods: {
    createUser(user)
    {
      this.users.push(user)
    },

    addName(name)
    {
      let flag = name.flag;
      delete name.flag;
      flag == 1? this.departments.push(name): this.types.push(name);
    },

    explain(exp)
    {
      this.myPlans[0].explanation = exp;
    },

    request(rec)
    {
      this.vacations.push(rec);
    }
  }

}
</script>

<style>

</style>