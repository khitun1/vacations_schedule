<template>
  <sample-hat style="z-index: 0"/>
  <div class="login">
    <my-input placeholder="Логин"/>
    <my-input placeholder="Пароль"/>
    <my-button class="test">Войти</my-button>
  </div>
  <div class="gif" style="overflow:hidden">
    <img src="@/components/images/Bear.gif">
  </div>
</template>

<script>
import SampleHat from "@/components/Samples/SampleHat";
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";

export default {
  components:{
    SampleHat,
    MyInput,
    MyButton,
  },
  name: "StartScreen"
}
</script>

<style scoped>

.login{
  padding-left: 60px;
}

button
{
  left: 1000px;
  top: 1px;
  width: 110px;
  height: 30px;
  background: #595959;
  color: white;
}

input
{
  width: 130px;
  height: 20px;
  left: 1000px;
}

.gif img
{
  position: relative;
  left: 330px;
  top: 30px;
  margin-bottom: -10px;
}

</style>