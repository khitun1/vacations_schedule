<template>
  <sample-page :choice="'admin'"
               v-if="token !== null && isAdmin">
    <h1>
      Панель администратора
    </h1>
    <div class="buttons">
      <user-list/>
      <add-user/>
      <set-data/>
    </div>
  </sample-page>
  <not-access v-else-if="token !== null"/>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";
import {useStore} from "vuex";
import UserList from "@/components/UserList.vue";
import jwt_decode from "jwt-decode";
import NotAccess from "@/components/Samples/NotAccess.vue";

export default {
  name: "SetSignature",

  components:{
    NotAccess,
    UserList,
    SamplePage,
    AddUser,
    SetData,
  },

  setup() {
    const store = useStore();
    const token = localStorage.getItem('token');
    const isAdmin = jwt_decode(token).is_admin;
    store.dispatch('createSocket');
    store.dispatch('getDepartment');
    store.dispatch('getUsers');
    return {
      token,
      isAdmin
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