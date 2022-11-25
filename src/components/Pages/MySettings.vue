<template>
  <sample-page
      :choice="'settings'"
      :admin="isAdmin">
    <personal-data
        :user="current_user"
        @eventChangePas="changePas"
        @eventChangeLog="changeLog"
    />

  </sample-page>

</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";


export default {
  name: "MySettings",

  components:{
    PersonalData,
    SamplePage,
  },

  data() {
    return {
      current_user: {
        id: 1, surname: 'Adams', name: 'John', lastname: 'Jack', login: 'Flash', password: 'qwerty',
        department: 'Developers', daysLeft: 10,
      },

      departments: [
        {id: 2, name: 'first', min: 8, max: 30, total: 49, percent: 30,},
        {id: 3, name: 'sdgsg', min: 7, max: 20, total: 55, percent: 25,},
      ],

      types: [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
      ],

      users: [
      ],

      newType: {
        name: '',
      },
    }
  },

  props: {
    isAdmin:{
      type: Number,
      requested: true,
    },
    isSuperAdmin: {
      type: Boolean,
      requested: true,
    },
  },

  methods: {

    changePas(pas){
      this.current_user.password = pas;
    },

    changeLog(log){
      this.current_user.login = log;
    },
  }
}
</script>

<style scoped>

</style>