<template>
  <sample-page choice="admin"
                @rerender="rerender">
    <h1>
      {{ localize('AdminPanel') }}
    </h1>
    <div class="buttons" :key="rerenderKey">
      <user-list/>
      <add-user/>
      <set-data/>
    </div>
  </sample-page>
</template>

<script setup>
import SamplePage from "@/components/Samples/SamplePage";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";
import {useStore} from "vuex";
import UserList from "@/components/UserList.vue";
import jwt_decode from "jwt-decode";
import NotAccess from "@/components/Samples/NotAccess.vue";
import {localize} from "../hooks/localize.js";
import {ref} from "vue";

const store = useStore();
const token = localStorage.getItem('token');

const rerenderKey = ref(0);
const rerender = () => {
  rerenderKey.value++;
}

store.dispatch('createSocket');
store.dispatch('getDepartment');
store.dispatch('getUsers');
</script>

<style scoped>

.buttons
{
  display: flex;
  flex-direction: column;
}

</style>