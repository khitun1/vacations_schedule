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
      <router-link to="allVacations" v-if="currentUser.is_admin || currentUser.director" class="link">
        <button class="pick all" title="Отпуска сотрудников">
          <img src="@/images/CalendarIcon.png"/>
          <p>Отпуска сотрудников</p>
        </button>
      </router-link>
      <router-link to="admin" v-if="currentUser.is_admin && !currentUser.director" class="link">
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
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "SampleNavBar",

  props: {
    choice: {
      type: String,
      requested: true,
    },
  },

  setup(props) {
    const store = useStore();
    const currentUser =  computed(() => store.state.my.currentUser);
    const take = computed(() => props.choice === 'takeVacation' ? '#e2e2e2': 'none');
    const mine = computed(() => props.choice === 'myVacations' ? '#e2e2e2': 'none');
    const all = computed(() => props.choice === 'allVacations' ? '#e2e2e2': 'none');
    const admin = computed(() => props.choice === 'admin' ? '#e2e2e2': 'none');
    const settings = computed(() => props.choice === 'settings' ? '#e2e2e2': 'none');

    return {
      currentUser,
      take,
      mine,
      all,
      admin,
      settings,
    }
  },

}
</script>

<style scoped lang="scss">
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
  padding: 0;
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