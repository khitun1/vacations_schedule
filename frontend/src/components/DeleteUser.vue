<template>
  <my-button @click="changeVisibleDeleteUser"
             v-show="!visibleAdminWindow"
             class="open">
    {{localize('DeleteUser')}}
  </my-button>
  <div v-show="visibleDeleteUser"
      class="main">
    <button-back @click="changeVisibleDeleteUser"/>
    <h2>
      {{localize('DeletingUser')}}
    </h2>
    <div class="inputs">
      <my-input class="delete"
                :placeholder="localize('FindUser')"
                v-model="user"/>
    </div>
    <h2>
      {{localize('UserList')}}
    </h2>
    <div class="rec"
         v-for="userItem in usersList"
         :key="userItem.id">
      <p>
        {{userItem.surname + ' ' + userItem.first_name + ' ' + userItem.last_name}}
      </p>
      <button-icon @click="deleteUser(userItem.id)">
        <img src="@/images/DeleteIcon.png"
             alt="delete icon">
      </button-icon>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import MyButton from "@/components/UI/MyButton.vue";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import MyInput from "@/components/UI/MyInput.vue";
import ButtonIcon from "@/components/UI/ButtonIcon.vue";
import {localize} from "../hooks/localize.js";

const store = useStore();
const currentUser = computed(() => store.state.my.currentUser);
const visibleDeleteUser = computed(() => store.state.admin.visibleDeleteUser);
const users = computed(() => store.state.admin.users);
const department = computed(() => store.state.admin.department);
const visibleAdminWindow = computed(() => store.getters.visibleAdminWindow);
const user = ref('');
const searchUser = computed(() => new RegExp('^' + user.value + '.+'));

const usersList = computed(() => {
  if (user.value === '')  {
    return [];
  }
  let list = users.value.filter(p => searchUser.value.test(p.name) || p.name === user.value);
  list.splice(list.indexOf(list.find(p => p.id === currentUser.value.id)), 1);
  return list;
})
const changeVisibleDeleteUser = () => {
  store.commit('changeVisibleDeleteUser');
}
const deleteUser = (id) => {
  store.dispatch('deleteUser', id);
}
</script>

<style scoped>
.main {
  width: 650px;
  background: #f5f5f5;
  padding: 10px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.inputs {
  display: flex;
  flex-flow: row wrap;
}


.open
{
  height: 40px;
  width: 250px;
}

.delete
{
  margin-left: 60px;
  margin-top: 18px;
  font-size: 17px;
  width: 250px;
  height: 25px;
}

.rec
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 350px;
  border-radius: 10px;
  height: 50px;
  background: #e3e3e3;
  cursor: default;
}

@media screen and (max-width: 800px) {
  .main {
    width: 90%;
  }
  .inputs {
    background: red;
  }

  .delete {
    margin-left: 10px;
  }

  .rec {
    width: 90%;
  }
}

</style>