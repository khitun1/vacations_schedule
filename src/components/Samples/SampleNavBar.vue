<template>

  <div class="nav">
    <router-link to="requestVacation">
      <button class="take" v-if="choice !== 'take'">
        &#10010;
        Планировщик отпусков
      </button>
      <button class="cancel" v-else>
        &#x2212;
        Отменить планирование
      </button>
    </router-link>
    <div class="menu" >
      <router-link to="myVacations">
        <button class="mine"
                @mouseover="hover1=true"
                @mouseleave="hover1=false"
                :style="choice === 'myVacations' || hover1 ? { backgroundColor: 'white' } : { backgroundColor: '#E2E2E2' }">
        <img src="@/components/images/VacationIcon.png"/>
        <p>Мои отпуска</p>
      </button>
        </router-link>
      <router-link to="allVacations" >
        <button class="employees" v-if="admin !== 0"
                @mouseover="hover2=true"
                @mouseleave="hover2=false"
                :style="choice === 'allVacations' || hover2 ? { backgroundColor: 'white' } : { backgroundColor: '#E2E2E2' }">
        <img src="@/components/images/CalendarIcon.png"/>
        <p>Отпуска сотрудников</p>
      </button>
        </router-link>
      <router-link to="setSignature" >
        <button class="signature" v-if="admin !== 0"
                @mouseover="hover3=true"
                @mouseleave="hover3=false"
                :style="choice === 'signature' || hover3 ? { backgroundColor: 'white' } : { backgroundColor: '#E2E2E2' }">
        <img src="@/components/images/LetterIcon.png"/>
        <p>Заявления на подпись</p>
      </button>
        </router-link>
      <router-link to="settings">
        <button class="settings"
                @mouseover="hover4=true"
                @mouseleave="hover4=false"
                :style="choice === 'settings' || hover4 ? { backgroundColor: 'white' } : { backgroundColor: '#E2E2E2' }">
        <img src="@/components/images/SettingsIcon.png"/>
        <p>Настройки</p>
      </button>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SampleNavBar",

  data(){
    return{
      hover1: false,
      hover2: false,
      hover3: false,
      hover4: false,
    }
  },

  props: {
    choice: {
      type: String,
      requested: true,
    },
    admin: {
      type: Number,
      requested: true,
    },
  }
}
</script>

<style scoped>

.nav
{
  position: fixed;
  top: 120px;
  display: flex;
  flex-direction: column;
  width: 240px;
}

.take, .cancel
{
  height: 100px;
  border-width: 0;
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  font-family: "Times New Roman";
  font-size: 24px;

}

.take
{
  color: #FCFF7C;
  background: #9492FF;
}

.cancel
{
  color: #9492FF;
  background: #fffbfb;
}



.menu
{
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 0 0 15px 15px;
}

.menu button
{
  height: 80px;
  width: 240px;
  cursor: pointer;
  border-width: 0;
  font-size: 16px;
}

.menu img
{
  position: absolute;
  left: 15px;
  margin-top: 10px;
  height: 30px;
  width: 30px;
}

p
{
  position: relative;
  left: 50px;
  text-align: left;
}

.settings
{
  border-radius: 0 0 15px 15px;
}



</style>