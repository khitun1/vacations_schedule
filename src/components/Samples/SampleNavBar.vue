<template>
    <div class="menu" >
      <router-link to="requestVacation">
        <button class="take"
                @mouseover="hover0=true"
                @mouseleave="hover0=false"
                :style="choice === 'takeVacation' || hover0 ? { backgroundColor: '#E2E2E2' } : { backgroundColor: '#f6f6f6' }">
          <img src="@/images/Plus.png"/>
          <p>Планировщик отпусков</p>
        </button>
      </router-link>
      <router-link to="myVacations">
        <button class="mine"
                @mouseover="hover1=true"
                @mouseleave="hover1=false"
                :style="choice === 'myVacations' || hover1 ? { backgroundColor: '#E2E2E2' } : { backgroundColor: '#f6f6f6' }">
          <img src="@/images/VacationIcon.png"/>
          <p>Мои отпуска</p>
        </button>
      </router-link>
      <router-link to="allVacations" v-if="$store.state.isAdmin === '1'">
        <button class="employees"
                @mouseover="hover2=true"
                @mouseleave="hover2=false"
                :style="choice === 'allVacations' || hover2 ? { backgroundColor: '#E2E2E2' } : { backgroundColor: '#f6f6f6' }">
        <img src="@/images/CalendarIcon.png"/>
        <p>Отпуска сотрудников</p>
      </button>
        </router-link>
      <router-link to="admin" v-if="$store.state.isAdmin === '1'">
        <button class="admin"
                @mouseover="hover3=true"
                @mouseleave="hover3=false"
                :style="choice === 'admin' || hover3 ? { backgroundColor: '#E2E2E2' } : { backgroundColor: '#f6f6f6' }">
        <img src="@/images/LetterIcon.png"/>
        <p>Админ</p>
       </button>
      </router-link>
      <router-link to="settings">
        <button class="settings"
                @mouseover="hover4=true"
                @mouseleave="hover4=false"
                :style="choice === 'settings' || hover4 ? { backgroundColor: '#E2E2E2' } : { backgroundColor: '#f6f6f6' }">
        <img src="@/images/SettingsIcon.png"/>
        <p>Настройки</p>
      </button>
        </router-link>
    </div>
</template>

<script>
export default {
  name: "SampleNavBar",

  data(){
    return{
      hover0: false,
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
  }
}
</script>

<style scoped>
.menu
{
  position: absolute;
  top: 120px;
  width: 240px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 15px;
}

.menu button
{
  height: 60px;
  width: 260px;
  cursor: pointer;
  border-width: 0;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 25px;
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



</style>