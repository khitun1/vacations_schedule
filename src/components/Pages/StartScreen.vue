<template>
  <h1>Планирование отпусков</h1>
    <div class="main">
      <div class="gif">
        <img src="@/components/images/Bear.gif">
      </div>
      <div class="login">
        <h3>Авторизация</h3>
        <my-input placeholder="Логин"/>
        <my-input placeholder="Пароль"/>
        <router-link to="myVacations" :isAdmin="isAdmin">
          <my-button class="test">Войти</my-button>
        </router-link>
      </div>
    </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";

export default {
  name: "StartScreen",

  data() {
    return {
      isAdmin: 2,
    }
  },

  components:{
    MyInput,
    MyButton,
  },
}
</script>

<style scoped>

.login{
  position: absolute;
  top: 150px;
  right: 350px;
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
  height: 89.1%;
  left: 20px;
  background: white;
  border-radius: 10px;
}

button
{
  position: absolute;
  width: 240px;
  height: 30px;
  background: #595959;
  color: white;
  left: -5px;
  bottom: 10px;
}


input
{
  top: 20px;
  width: 240px;
  height: 20px;
}

.gif
{
  height: 500px;
  overflow: hidden
}

.gif img
{
  position: relative;
  left: 100px;
  width: fit-content;
  height: fit-content;
}

</style>