<template>
  <sample-page :choice="'admin'" v-if="token">
    <h1> Панель администратора</h1>
    <div class="buttons">
      <user-list/>
      <add-user/>
<!--      <delete-user/>-->
      <set-data/>
    </div>
  </sample-page>
  <not-auth v-else/>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";
//import DeleteUser from "@/components/DeleteUser.vue";
import {useStore} from "vuex";
import NotAuth from "@/components/Samples/NotAuth.vue";
import UserList from "@/components/UserList.vue";

export default {
  name: "SetSignature",

  components:{
    UserList,
    NotAuth,
    //DeleteUser,
    SamplePage,
    AddUser,
    SetData,
  },

  setup() {
    const store = useStore();
    const token = localStorage.getItem('token') !== null;
    store.dispatch('auth');
    store.dispatch('getDepartment');
    store.dispatch('getUsers');
    return {
      token,
    }
  }
}
</script>

<style scoped>

.buttons
{
  display: flex;
  flex-direction: column;
}

</style>