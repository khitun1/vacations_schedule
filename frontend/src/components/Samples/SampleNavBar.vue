<template>
      <router-link to="requestVacation" class="link">
        <button class="pick take" title="Планировщик">
          <img src="@/images/Plus.png"/>
          <p>Планировщик отпусков</p>
        </button>
      </router-link>
      <router-link to="myVacations" class="link">
        <button class="pick mine" title="Мои отпуска">
          <img src="@/images/VacationIcon.png"/>
          <p>Мои отпуска</p>
        </button>
      </router-link>
      <router-link to="allVacations" v-if="$store.state.currentUser.isAdmin" class="link">
        <button class="pick all" title="Отпуска сотрудников">
          <img src="@/images/CalendarIcon.png"/>
          <p>Отпуска сотрудников</p>
        </button>
      </router-link>
      <router-link to="admin" v-if="$store.state.currentUser.isAdmin" class="link">
        <button class="pick admin" title="Админ">
          <img src="@/images/LetterIcon.png"/>
          <p>Админ</p>
        </button>
      </router-link>
      <router-link to="settings" class="link">
        <button class="pick settings" title="Настройки">
          <img src="@/images/SettingsIcon.png"/>
          <p>Настройки</p>
        </button>
      </router-link>
</template>

<script>
export default {
  name: "SampleNavBar",

  data(){
    return{
    }
  },

  props: {
    choice: {
      type: String,
      requested: true,
    },
  },

  computed: {
    take(){
      return this.choice === 'takeVacation' ? '#e2e2e2': 'none';
    },
    mine(){
      return this.choice === 'myVacations' ? '#e2e2e2': 'none';
    },
    all(){
      return this.choice === 'allVacations' ? '#e2e2e2': 'none';
    },
    admin(){
      return this.choice === 'admin' ? '#e2e2e2': 'none';
    },
    settings(){
      return this.choice === 'settings' ? '#e2e2e2': 'none';
    },
  },
}
</script>

<style scoped>
.link {
  text-decoration: none;
}



.pick {
  display: flex;
  justify-content: left;
  height: 60px;
  width: 260px;
  cursor: pointer;
  border-width: 0;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 25px;
  background: none;
}

.take {
  background: v-bind(take);
}

.mine {
  background: v-bind(mine);
}

.all {
  background: v-bind(all);
}

.admin {
  background: v-bind(admin);
}

.settings {
  background: v-bind(settings);
}

.pick:hover {
  background: #E2E2E2;
}


.pick img {
  position: relative;
  top: 15px;
  left: 5px;
  margin-right: 20px;
}

.pick p {
  margin-top: 18px;
}



@media screen and (max-width: 1000px) {

  .pick {
    height: 50px;
    width: 50px;
  }

  .pick p {
    display: none;
  }

  .pick img {
    top: 11px;
    left: 6px;
  }

  .take {
    background: v-bind(take);
  }

  .mine {
    background: v-bind(mine);
  }

  .all {
    background: v-bind(all);
  }

  .admin {
    background: v-bind(admin);
  }

  .settings {
    background: v-bind(settings);
  }
}


</style>