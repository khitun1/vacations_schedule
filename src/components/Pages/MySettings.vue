<template>
  <sample-page>
    <personal-data
        :user="user"
    />
    <add-user
        @create="createUser"
    />
    <set-data
      :deps="deps"
      :types="types"
      @create="createNew"
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
      newUser: {
        surname: '',
        name: '',
        lastname: '',
        login: '',
        password: '',
        department: '',
      },
      newType: {
        name: '',
      }
    }
  },
  methods: {
    createUser(user){
      this.newUser = user;
      this.$emit('create', this.newUser);
      this.newUser = {
        surname: '',
        name: '',
        lastname: '',
        login: '',
        password: '',
        department: '',
      }
    },
    createNew(type){
      this.newType = type;
      this.$emit('add', this.newType);
    }
  }
}
</script>

<style scoped>

</style>