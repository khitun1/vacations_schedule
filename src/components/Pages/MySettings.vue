<template>
  <sample-page
      :choice="'settings'"
      :admin="isAdmin">
    <personal-data
        :user="current_user"
        @eventChangePas="changePas"
        @eventChangeLog="changeLog"
    />
    <add-user v-if="isAdmin !== 0"
        @create="createUser"
        :users="users"
        :deps="departments"
    />
    <set-data v-if="isAdmin !== 0"
      :deps="departments"
      :types="types"
      @create="createNew"
      @changeCon="setCon"
    />
  </sample-page>

</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";

export default {
  name: "MySettings",

  components:{
    SetData,
    AddUser,
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
    createUser(user) {
      this.users.push(user);
    },

    createNew(name) {
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

    changePas(pas){
      this.current_user.password = pas;
    },

    changeLog(log){
      this.current_user.login = log;
    },

    setCon(con){
      this.departments.find(p => p.id === con.id).min = con.min;
      this.departments.find(p => p.id === con.id).total = con.total;
      this.departments.find(p => p.id === con.id).percent = con.percent;
    }
  }
}
</script>

<style scoped>

</style>