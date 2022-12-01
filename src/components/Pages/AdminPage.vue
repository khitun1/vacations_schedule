<template>
  <sample-page
      :choice="'admin'">
    <h1> Панель админа</h1>

    <div class="buttons">
      <add-user
          @create="createUser"
          @hideSet="HideSet"
          :users="users"
          :deps="departments.sort((a, b) => a.name > b.name ? 1 : -1)"
          :hideUser="hideUser"
      />
      <set-data
          :deps="departments.sort((a, b) => a.name > b.name ? 1 : -1)"
          :types="types.sort((a, b) => a.name > b.name ? 1 : -1)"
          :hideSet="hideSet"
          @changeNameDep="changeDep"
          @changeNameType="changeType"
          @hideUser="HideUser"
          @create="createNew"
          @changeCon="setCon"
      />
    </div>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";

export default {
  name: "SetSignature",

  components:{
    SamplePage,
    AddUser,
    SetData,
  },

  data(){
    return {
      departments: [
        {id: 1, name: 'airst', min: 8, max: 30, total: 49, percent: 30,},
        {id: 2, name: 'bdgsg', min: 7, max: 20, total: 55, percent: 25,},
        {id: 3, name: 'cirst', min: 8, max: 30, total: 49, percent: 30,},
        {id: 4, name: 'ddgsg', min: 7, max: 20, total: 55, percent: 25,},
        {id: 5, name: 'first', min: 8, max: 30, total: 49, percent: 30,},
        {id: 6, name: 'edgsg', min: 7, max: 20, total: 55, percent: 25,},
        {id: 7, name: 'virst', min: 8, max: 30, total: 49, percent: 30,},
        {id: 8, name: 'xdgsg', min: 7, max: 20, total: 55, percent: 25,},
        {id: 9, name: 'yirst', min: 8, max: 30, total: 49, percent: 30,},
        {id: 10, name: 'zdgsg', min: 7, max: 20, total: 55, percent: 25,},
      ],

      types: [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
      ],

      users: [
      ],

      hideSet: false,
      hideUser: false,
    }
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


    setCon(con){
      this.departments.find(p => p.id === con.id).min = parseInt(con.min) ;
      this.departments.find(p => p.id === con.id).total = parseInt(con.total);
      this.departments.find(p => p.id === con.id).percent = parseInt(con.percent);
      this.departments.find(p => p.id === con.id).max = parseInt(con.max);
    },

    HideSet(check){
      this.hideSet = check;
    },

    HideUser(check){
      this.hideUser = check;
    },

    changeDep(name){
      this.departments.find(p => p.id === name.id).name = name.name;
    },

    changeType(name){
      this.types.find(p => p.id === name.id).name = name.name;
    }
  },

  props: {

  },
}
</script>

<style scoped>

.buttons
{
  display: flex;
  flex-direction: column;
}

</style>