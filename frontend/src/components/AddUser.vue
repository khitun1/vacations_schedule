<template>
  <my-button @click="changeVisibleAddUser"
             v-show="!visibleAdminWindow"
             class="open">
    Добавить нового пользователя
  </my-button>
    <form @submit.prevent  class="form" v-show="visibleAddUser">
      <button-back @click="clear"/>
      <h2>Новый пользователь</h2>
      <div>
        <my-input class="in" :placeholder="surname"
                  v-model="user.surname"
                  v-bind:style="{boxShadow: user.surname === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="name"
                  v-model="user.first_name"
                  v-bind:style="{boxShadow: user.first_name === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="lastname"
                  v-model="user.last_name"
                  v-bind:style="{boxShadow: user.last_name === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="log"
                  v-model="user.login"
                  v-bind:style="{boxShadow: user.login === '' && flag? color : ''}"/>
        <div>
          <my-input class="in" :placeholder="pas" :type="typePassword" style="left: 20px"
                    v-model="user.password"
                    v-bind:style="{boxShadow: user.password === '' && flag? color : ''}"/>
          <button-icon style="top: 8px; left: 15px" @click="typePassword = typePassword === 'text'? 'password': 'text'">
            <img src="@/images/WatchIcon.png" v-show="typePassword === 'text'"/>
            <img src="@/images/closePassword.webp" v-show="typePassword !== 'text'">
          </button-icon>
        </div>
        <VueMultiselect class="selectDep"
                        v-model="user.is_admin"
                        :options="rights"
                        :show-no-results="false"
                        placeholder="Укажите права"
                        :show-labels="false"/>
        <p class="error" v-show="error">{{ errorMsg }}</p>
        <div class="pair">
          <my-button class="create" @click="createUser">
            Добавить
          </my-button>
        </div>
      </div>

    </form>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import {addUser} from "@/hooks/createUser";

export default {
  name: "AddUser",

  components: {
    VueMultiselect,
  },

  setup() {
    let {rights, color, user, surname, name, lastname, log, pas, dep,
      error, visible, errorMsg, typePassword, flag, visibleForm, visibleAdminWindow,
      visibleAddUser, clear, createUser, changeVisibleAddUser} = addUser();
    return {
      rights,
      color,
      user,
      surname,
      name,
      lastname,
      log,
      pas,
      dep,
      error,
      visible,
      errorMsg,
      typePassword,
      flag,
      visibleForm,
      visibleAdminWindow,
      visibleAddUser,
      clear,
      createUser,
      changeVisibleAddUser,
    }
  },
}
</script>

<style scoped>
form
{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 400px;
  text-align: center;
  padding-left: 15px;
  border-radius: 10px;
  top: 20%;
  left: 20px;
  margin-bottom: 15px;
  background: #f5f5f5;
}

.create
{
  width: 250px;
  height: 37px;
  margin-left: 30px;
  font-size: 18px;
}

.in
{
  height: 22px;
  width: 250px;
  margin-left: 10px;
  font-size: 16px;
}

.error
{
  position: relative;
  color: red;
  width: fit-content;
  left: 25px;
  font-size: larger;
  font-weight: bold;
}

.open
{
  height: 40px;
  width: 250px;
}

.back
{
  margin-top: 10px;
  margin-left: -8px;
}

.selectDep
{
  height: 30px;
  width: 260px;
  margin-left: 71px;
  margin-top: 15px;
  margin-bottom: 20px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
}

</style>
