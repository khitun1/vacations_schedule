<template>
  <sample-page>
    <h1>Заявление на отпуск</h1>
    <div class="dates">
      <p>Даты отпуска</p>
      <my-input class="date" type="date"></my-input>
      &mdash;
      <my-input class="date" type="date"></my-input>
    </div>
    <div class="free">
      <p>Список доступных дат</p>
      <div>
        <p>13.01.2022 - 17.01.2022</p>
        <p>13.01.2022 - 17.01.2022</p>
      </div>
    </div>
    <div class="type">
      <p>Тип отпуска</p>
      <my-select>
        <option selected value="Выберите из списка" disabled>Выберите из списка</option>
        <option>1</option>
        <option>2</option>
      </my-select>
    </div>
    <div class="countries">
      <p>Какие страны собираетесь посетить?</p>
      <my-input class="list" placeholder="Если едете заграницу, укажите страну"/>
    </div>
    <div class="payed">
      <p>Оплачиваемый</p>
      <label class="checkbox">
        <input type="checkbox" class="check_input"/>
        <div class="check_div"/>
      </label>
    </div>
    <div class="comment">
      <p>Поле для комментария</p>
      <textarea placeholder="Добавьте комментарий, если считаете нужным"/>
    </div>
    <my-button class="send">
      Отправить заявление
    </my-button>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";

export default {
  components:{
    MySelect,
    MyButton,
    MyInput,
    SamplePage,
  },
  name: "TakeVacation"
}
</script>

<style scoped>

p
{
  font-size: 18px;
}

h1
{
  position: absolute;
}

textarea
{
  position: absolute;
  left: 10px;
  height: 90px;
  width: 500px;
  border-width: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  resize: none;
  outline: none;
  font-family: "Times New Roman";
  font-size: 16px;
}

div
{
  position: relative;
  top: 50px;
  left: 10px;
  padding-bottom: -10px;
  border-radius: 15px;

}


.date
{
  height: 23px;
  width: 150px;
  font-size: 18px;
  margin-top: 0;
  font-family: "Times New Roman";
}

.date::-webkit-calendar-picker-indicator {
  cursor: pointer;
}


.free
{
  position: absolute;
  top: 60px;
  left: 900px;
  text-align: center;
}

.free div
{
  position: absolute;
  left: -30px;
  top: 40px;
  width: 230px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

select
{
  position: relative;
  left: 10px;
  width: 250px;
  height: 30px;
  font-size: 16px;
  text-align: left;
}

.list
{
  width: 300px;
  height: 30px;
  text-align: left;
  margin-top: -10px;
  font-family: "Times New Roman";
  font-size: 16px;
}

.send
{
  position: absolute;
  width: 300px;
  height: 55px;
  top: 535px;
  text-align: center;
  font-size: 22px;
  color: #FCFF7C;
  background: #9492FF;
  border-radius: 40px;
  font-family: "Times New Roman";
}

.checkbox
{
  position: absolute;
  left: 150px;
  top: -55px;
}

.check_div
{
  width: 60px;
  height: 30px;
  border-radius: 100px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.check_input
{
  display: none;
}

.check_div:before
{
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  background: #8482FF;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.check_input:checked ~ .check_div
{
  background: #8482FF;
}

.check_input:checked ~ .check_div:before
{
  background: white;
  left: 33px;
}

.check_div:hover
{
  filter: brightness(1.2);
}

</style>