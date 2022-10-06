<template>
  <h1>Новый пользователь</h1>
  <div>
    <my-input class="in" placeholder="Фамилия"/>
    <my-input class="in" placeholder="Имя"/>
    <my-input class="in" placeholder="Отчество"/>
    <my-input class="in" placeholder="Логин"/>
    <my-input class="in" placeholder="Пароль"/>
    <my-input class="in" placeholder="Отдел"/>
    <my-button class="create">Добавить</my-button>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
export default {
  name: "AddUser",
  components: {MyButton, MyInput}
}
</script>

<style scoped>
div
{
  width: 300px;
  margin-left: 40px;
}

.create
{
  width: 250px;
  height: 37px;
  color: #FCFF7C;
  background: #9492FF;
  margin-left: -10px;
  font-size: 18px;
}

.in
{
  height: 22px;
  font-size: 16px;
}

</style>