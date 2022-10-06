<template>
  <h1>Личные данные</h1>
  <table style="text-align: center">
    <tr>
      <td>
        Фамилия:
      </td>
      <td>
        Хитун
      </td>
    </tr>
    <tr>
      <td>
        Имя:
      </td>
      <td>
        Иван
      </td>
    </tr>
    <tr>
      <td>
        Отчество:
      </td>
      <td>
        Михайлович
      </td>
    </tr>
    <tr>
      <td>
        Логин:
      </td>
      <td>
        Flash
      </td>
      <td><my-button class="change">Изменить логин</my-button></td>
    </tr>
    <tr>
      <td>
        Пароль:
      </td>
      <td>
        Qwertyu123456
        <button-icon class="watch"><img src="@/components/images/WatchIcon.png"></button-icon>
      </td>
      <td><my-button class="change">Изменить пароль</my-button></td>
    </tr>
    <tr>
      <td>
        Отдел:
      </td>
      <td>
        Разработка
      </td>
    </tr>
  </table>
</template>

<script>
import ButtonIcon from "@/components/UI/ButtonIcon";
import MyButton from "@/components/UI/MyButton";
export default {
  name: "PersonalData",
  components: {MyButton, ButtonIcon}
}
</script>

<style scoped>
td
{
  position: relative;
  height: 20px;
  text-align: left;
  padding-left: 50px;
  padding-right: 50px;
  height: 50px;
  font-size: 18px;
  padding-bottom: 20px;
}

.watch
{
  left: 20px;
  top: 8px;
}

.change
{
  padding: -5px;
  color: #FCFF7C;
  background: #9492FF;
  height: 30px;
  width: 200px;
  font-size: 16px;
  font-family: "Times New Roman";
}

</style>