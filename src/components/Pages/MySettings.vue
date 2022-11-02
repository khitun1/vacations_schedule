<template>
  <sample-page>
    <personal-data
        :user="user"
        @eventChangePas="changePas"
        @eventChangeLog="changeLog"
    />
    <add-user
        @create="createUser"
        :users="users"
        :deps="deps"
    />
    <set-data
      :deps="deps"
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
  components:{
    SetData,
    AddUser,
    PersonalData,
    SamplePage,
  },

  props: {
    users: {
      type: Array,
      required: false,
    },
    user: {
      type: Object,
      required: true,
    },

    deps: {
      type: Array,
      required: false,
    },

    types: {
      type: Array,
      required: false,
    },
  },

  name: "MySettings",

  data() {
    return {
      newType: {
        name: '',
      }
    }
  },

  methods: {
    createUser(user) {
      this.$emit('create', user);
    },

    createNew(type) {
      this.$emit('add', type);
    },

    changePas(pas){
      this.$emit('changePassword', pas);
    },

    changeLog(log){
      this.$emit('changeLogin', log);
    },

    setCon(con){
      this.$emit('changeCondition', con);
    }
  }
}
</script>

<style scoped>

</style>