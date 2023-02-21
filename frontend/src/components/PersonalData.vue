<template>
  <div class="table">
    <h1>Личные данные</h1>
    <div class="info surname">
      <p>Фамилия:</p>
      <div class="text"><my-input readonly :value="currentUser.surname"/></div>
    </div>
    <div class="info name">
      <p>Имя:</p>
      <div class="text"><my-input readonly :value="currentUser.first_name"/></div>
    </div>
    <div class="info lastname">
      <p>Отчество:</p>
      <div class="text"><my-input readonly :value="currentUser.last_name"/></div>
    </div>
    <div class="info login">
      <p>Логин:</p>
      <div class="text">
        <my-input :readonly="changeLogin"
                  v-model="newLogin" class="inputLogin"/>
      </div>
      <my-button class="change" @click="changeLog">
        {{ textLogBtn }}
      </my-button>
    </div>
    <div class="info password">
      <p>Пароль:</p>
      <div class="text">
        <my-input :readonly="changePassword" :type="typePassword"
                  v-model="newPassword" class="inputPassword"/>
        <button-icon class="watch" @click="typePassword = typePassword === 'text'? 'password' : 'text'"  >
          <img src="@/images/WatchIcon.png" v-show="typePassword === 'text'">
          <img src="@/images/closePassword.webp" v-show="typePassword !== 'text'">
        </button-icon>
      </div>
      <my-button class="change" @click="changePas">
        {{ textPasBtn }}
      </my-button>
    </div>
    <div class="info department">
      <p>Отдел:</p>
      <div class="text">
        <my-input readonly :value="currentUser.department"/>
      </div>

    </div>
  </div>

</template>

<script>

import {changePersonal} from "@/hooks/changePersonal";
import {onMounted} from "vue";
import {useStore} from "vuex";

export default {
  name: "PersonalData",

  setup() {
    const {
      currentUser,
      newPassword,
      newLogin,
      typePassword,
      changePassword,
      changeLogin,
      textLogBtn,
      textPasBtn,
      changePas,
      changeLog
    } = changePersonal();

    const store = useStore();

    onMounted(async () => {
      console.log(store.state.my.currentUser.login)
      newLogin.value = store.state.my.currentUser.login;
    })

    return {
      currentUser,
      newPassword,
      newLogin,
      typePassword,
      changePassword,
      changeLogin,
      textLogBtn,
      textPasBtn,
      changePas,
      changeLog
    }
  },

}
</script>

<style scoped>

.watch
{
  top: 2px;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  flex-flow: row wrap;
}

input {
  height: fit-content;
}

.info p {
  width: 120px;
}

.change {
  padding: 5px 20px;
}

.text {
  width: 260px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.table
{
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 10px;
  margin-top: 5px;
  background: #f5f5f5;
  border-radius: 10px;
  height: 95%;
  width: fit-content;

}

@media screen and (max-width: 1000px) {
  .table {
    width: 108%;
  }
  .info p {
    width: 90px;
  }
  @media screen and (max-width: 715px) {
    .table {
      width: 119%;
    }
    .change {
      margin-left: 25%;
    }
  }
}




</style>