<template>
      <router-link to="requestVacation"
          class="link">
        <button class="pick take"
            :title="localize('VacationsPlanner')">
          <img src="@/images/Plus.png"
               alt="plus"/>
          <p>
            {{localize('VacationsPlanner')}}
          </p>
        </button>
      </router-link>
      <router-link to="myVacations"
                   class="link">
        <button class="pick mine"
            :title="localize('MyVacations')">
          <img src="@/images/VacationIcon.png"
               alt="vacations"/>
          <p>
            {{localize('MyVacations')}}
          </p>
        </button>
      </router-link>
      <router-link to="allVacations"
          v-if="currentUser.is_admin || currentUser.director"
          class="link">
        <button class="pick all"
            :title="localize('EmployeesVacations')">
          <img src="@/images/CalendarIcon.png"
               alt="calendar icon"/>
          <p>
            {{localize('EmployeesVacations')}}
          </p>
        </button>
      </router-link>
      <router-link to="admin"
          v-if="currentUser.is_admin && !currentUser.director"
          class="link">
        <button class="pick admin"
            :title="localize('Admin')">
          <img src="@/images/LetterIcon.png"
               alt="letter icon"/>
          <p>
            {{ localize('Admin') }}
          </p>
        </button>
      </router-link>
      <router-link to="settings"
          class="link">
        <button class="pick settings"
            :title="localize('Settings')">
          <img src="@/images/SettingsIcon.png"
               alt="settings"/>
          <p>
            {{localize('Settings')}}
          </p>
        </button>
      </router-link>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
import {localize} from "@/hooks/localize.js";

const props = defineProps({
  choice: {
    type: String,
    requested: true,
  },
})

const token = localStorage.getItem('token');
const store = useStore();
const currentUser = computed(() => store.state.my.currentUser);
const take = computed(() => props.choice === 'takeVacation' ? '#e2e2e2': 'none');
const mine = computed(() => props.choice === 'myVacations' ? '#e2e2e2': 'none');
const all = computed(() => props.choice === 'allVacations' ? '#e2e2e2': 'none');
const admin = computed(() => props.choice === 'admin' ? '#e2e2e2': 'none');
const settings = computed(() => props.choice === 'settings' ? '#e2e2e2': 'none');
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