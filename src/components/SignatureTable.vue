<template>
  <table style="text-align: center">
    <tr>
      <th>Ф.И.О. сотрудника</th>
      <th>Даты отпуска</th>
      <th>Всего дней</th>
      <th>Оплачиваемый</th>
      <th>Пересечения</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <td>Хитун Иван Михайлович</td>
      <td>09.11.2022 - 20.11.2022</td>
      <td>12 дней</td>
      <td>Да</td>
      <td>Нет</td>
      <td><button class="answer" style="color: #8482FF;">утвердить</button></td>
      <td><button class="answer">отказать</button></td>
      <td><button-icon><img src="@/components/images/Triplets.png">

      </button-icon></td>

    </tr>
    <tr>
      <td>Хитун Иван Михайлович</td>
      <td>09.11.2022 - 20.11.2022</td>
      <td>12 дней</td>
      <td>Да</td>
      <td>Нет</td>
      <td><button class="answer" style="color: #8482FF;">утвердить</button></td>
      <td><button class="answer">отказать</button></td>
      <td><button-icon><img src="@/components/images/Triplets.png">
        <div class="triplets">
          <button>Все детали отпуска</button>
          <button>В общем календаре</button>
          <button>В календаре сотрудника</button>
        </div>
      </button-icon></td>
    </tr>
  </table>
  <div class="failure">
    <h3>Укажите причину отказа</h3>
    <textarea></textarea>
    <my-button>Отправить</my-button>
    <my-button>Отменить</my-button>
  </div>

</template>

<script>
import ButtonIcon from "@/components/UI/ButtonIcon";
import MyButton from "@/components/UI/MyButton";
export default {
  name: "SignatureTable",
  components: {MyButton, ButtonIcon},
  methods: {

  }
}
</script>

<style scoped>
th
{
  border-bottom: 1px solid lightslategray;
  padding-left: 20px;
  padding-right: 20px;
}

td
{
  border-bottom: 1px solid lightslategray;
  height: 30px;
  padding-left: 20px;
  padding-right: 20px;
}

.answer
{
  font-weight: bold;
  border-width: 0;
  background: none;
  cursor: pointer;
}

img
{
  height: 20px;
  width: 20px;
}

.failure
{
  position: absolute;
  top: 80px;
  left: 300px;
  width: 400px;
  height: 300px;
  background: #946cda;
  color: #FCFF7C;
  border-width: 0;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  border-radius: 40px;
  text-align: center;
  display: none;
}


textarea
{
  padding: 10px;
  height: 150px;
  width: 300px;
  border-width: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  resize: none;
  outline: none;
  font-family: "Times New Roman";
  font-size: 16px;
}

.failure button
{
  height: 30px;
  width: 120px;
  background: #8482FF;
  color: #FCFF7C;
}

.triplets
{
  position: relative;
  top: -25px;
  left: -200px;
  height: 200px;
  width: 200px;
  border-width: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background: #DDDDDD;
  display: none;
}

.triplets button
{

  width: 100%;
  height: 33.3333%;
  border-width: 0;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  background: #DDDDDD;
}

.triplets button:hover
{
  background: white;
}
</style>