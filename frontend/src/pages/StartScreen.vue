<template>
  <h1>Планирование отпусков</h1>
    <div class="main">
      <div class="gif">
        <img src="@/images/Bear.gif" alt="bear">
      </div>
      <form class="login" @submit.prevent>
        <h3>Авторизация</h3>
        <my-input placeholder="Логин или почта"
                  v-model="login"/>
        <my-input placeholder="Пароль"
                  v-model="password"
                  :type="'password'"/>
        <my-button class="test"
                   @click="check"
                   type="submit">
          Войти
        </my-button>
        <p class="error">
          {{ error }}
        </p>
      </form>
    </div>

</template>

<script setup>
import router from "@/router/router";
import {computed, ref} from "vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {useStore} from "vuex";

const store = useStore()
const login = ref('');
const password = ref('');
const error = computed(() => store.state.my.errorMsg);
const check = async () => {
  if (login.value === '' || password.value === '') {
    return
  }
  await store.dispatch('login', {login: login.value, password: password.value});
  if (error.value === '') {
    const url = '/myVacations';
    await router.push(url);
  }
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

.error {
  color: #ff3131;
  font-family: 'Arial';
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
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