<template>
  <h1>Планирование отпусков</h1>
    <div class="main">
      <div class="gif">
        <img src="@/images/Bear.gif">
      </div>
      <div class="login">
        <h3>Авторизация</h3>
        <my-input placeholder="Логин" v-model="login"/>
        <my-input placeholder="Пароль"/>
        <router-link to="myVacations">
          <my-button class="test" @click="check">Войти</my-button>
        </router-link>
      </div>
    </div>
</template>

<script>
import store from "@/store";

export default {
  name: "StartScreen",

  data() {
    return {
      login: '',
    }
  },

  methods: {
    check() {
      store.commit('getAdmin', this.login);
    }
  },
}
</script>

<style scoped>

.login{
  position: absolute;
  top: 150px;
  right: 25%;
  height: 300px;
  display: flex;
  flex-direction: column;
  background: #dedede;
  width: fit-content;
  border-radius: 10px;
}

h3
{
  text-align: center;
  position: relative;
  top: 10px;
}

.main
{
  position: absolute;
  width: 96%;
  top: 80px;
  height: 89%;
  left: 2%;
  background: white;
  border-radius: 10px;
}


input
{
  top: 20px;
  width: 240px;
  height: 20px;
}

.gif
{
  height: 70%;
  overflow: hidden;
}



.gif img
{
  position: relative;
  left: 10%;
  width: fit-content;
  height: fit-content;
}

.test
{
  position: absolute;
  width: 240px;
  height: 30px;
  background: #595959;
  color: white;
  left: -5px;
  bottom: 10px;
}

@media screen and (max-width: 800px) { /* Для цветных экранов */
  .gif {
    display: none;
  }

  .login{
    top: 10%;
    left: 30%;
    right: 30%;
    height: 300px;
  }
}


</style>