<template>
  <h1>Отделы</h1>
  <div>
    <my-select>
      <option disabled selected value="Просмотр отделов">Просмотр отделов</option>
      <option>2</option>
      <option>3</option>
    </my-select>
    <my-input class="new" placeholder="Новый отдел"/>
    <my-button class="add">Добавить</my-button>
  </div>
  <h1>Типы отпусков</h1>
  <div>
    <my-select>
      <option disabled selected value="Просмотр типов отпусков">Просмотр типов отпусков</option>
      <option>2</option>
      <option>3</option>
    </my-select>
    <my-input class="new" placeholder="Новый тип отпуска"/>
    <my-button class="add">Добавить</my-button>
  </div>
  <h1>Назначить условия</h1>
  <div>
    <my-select class="choice">
      <option selected value="Все сотрудники">Все сотрудники</option>
      <option>2</option>
      <option>В3</option>
    </my-select>
    <table style="text-align: left">
      <tr>
        <td>Минимальное кол-во дней отпуска:</td>
        <td>7</td>
        <td><my-button>изменить</my-button></td>
      </tr>
      <tr>
        <td>Всего дней для отпуска:</td>
        <td>30</td>
        <td><my-button>изменить</my-button></td>
      </tr>
      <tr>
        <td>% максимально допустимых одновременных отпусков:</td>
        <td>30</td>
        <td><my-button>изменить</my-button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
export default {
  name: "SetData",
  components: {
    MySelect,
    MyButton,
    MyInput}
}
</script>

<style scoped>
.new
{
  margin-left: 100px;
  font-size: 16px;
}

.add
{
  width: 100px;
  height: 30px;

  margin-left: 50px;
  margin-top: 4px;
  top: 3px;
  font-size: 16px;
}

.choice
{
  width: 300px;
  height: 30px;

}

td
{
  padding-right: 30px;
  padding-left: 20px;
}

select
{
  width: 200px;
  text-align: center;
}

button
{
  color: #FCFF7C;
  background: #9492FF;
}
</style>