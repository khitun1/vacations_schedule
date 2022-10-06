<template>
  <div class="nav">
      <button class="take">
        &#10010;
        Оформить отпуск
      </button>
    <div class="menu">
      <button class="mine">
        <img src="@/components/images/VacationIcon.png"/>
        <p>Мои отпуска</p>
      </button>
      <button class="employees">
        <img src="@/components/images/CalendarIcon.png"/>
        <p>Отпуска сотрудников</p>
      </button>
      <button class="signature">
        <img src="@/components/images/LetterIcon.png"/>
        <p>Заявления на подпись</p>
      </button>
      <button class="settings">
        <img src="@/components/images/SettingsIcon.png"/>
        <p>Настройки</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SampleNavBar"
}
</script>

<style scoped>

.take
{
  position: fixed;
  width: 240px;
  height: 100px;
  left: 13px;
  top: 110px;
  border-width: 0;
  background: #9492FF;
  border-radius: 15px 15px 0px 0px;
  cursor: pointer;
  font-family: "Times New Roman";
  font-size: 24px;
  color: #FCFF7C;
}



.menu
{
  position: fixed;
  width: 240px;
  height: 460px;
  left: 13px;
  top: 210px;
  background: #E2E2E2;
  border-radius: 0px 0px 15px 15px;
}

.menu button
{
  height: 70px;
  width: 240px;
  cursor: pointer;
  background: #E2E2E2;
  border-width: 0px;
  font-size: 16px;
}

.menu button:hover
{
  background: #FFFFFF;
}

.menu img
{
  position: absolute;
  left: 5px;
  margin-top: 10px;
  padding-right: 15px;
  height: 30px;
  width: 30px;
}

.menu p
{
  position: relative;
  left: 50px;
  text-align: left;
}

</style>