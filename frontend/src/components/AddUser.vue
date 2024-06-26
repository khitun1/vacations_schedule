<template>
  <my-button @click="changeVisibleAddUser"
             v-show="!visibleAdminWindow"
             class="open">
    {{localize('AddNewUser')}}
  </my-button>
    <form @submit.prevent
          v-show="visibleAddUser">
      <button-back @click="clear"/>
      <h2>
        {{localize('NewUser')}}
      </h2>
      <div>
        <my-input class="in"
                  :placeholder="surname"
                  v-model="user.surname"
                  :style="{boxShadow: user.surname === '' && flag? color : ''}"/>
        <my-input class="in"
                  :placeholder="name"
                  v-model="user.first_name"
                  :style="{boxShadow: user.first_name === '' && flag? color : ''}"/>
        <my-input class="in"
                  :placeholder="lastname"
                  v-model="user.last_name"
                  :style="{boxShadow: user.last_name === '' && flag? color : ''}"/>
        <my-input class="in"
                  :placeholder="mail"
                  v-model="user.mail"
                  :style="{boxShadow: user.mail === '' && flag? color : ''}"/>
        <my-input class="in"
                  :placeholder="log"
                  v-model="user.login"
                  :style="{boxShadow: user.login === '' && flag? color : ''}"/>
        <div>
          <my-input class="in"
                    :placeholder="pas"
                    :type="typePassword"
                    style="left: 20px"
                    v-model="user.password"
                    :style="{boxShadow: user.password === '' && flag? color : ''}"/>
          <button-icon style="top: 8px; left: 15px"
              @click="typePassword = typePassword === 'text'? 'password': 'text'">
            <img src="@/images/WatchIcon.png"
                 alt="show password"
                 v-show="typePassword === 'text'"/>
            <img src="@/images/closePassword.webp"
                 alt="hide password"
                 v-show="typePassword !== 'text'">
          </button-icon>
        </div>
        <VueMultiselect class="selectDep"
                        v-model="user.is_admin"
                        :options="rights"
                        :show-no-results="false"
                        :placeholder="rightsPlaceholder"
                        :show-labels="false"/>
        <p class="error"
            v-show="error">
          {{ errorMsg }}
        </p>
        <div class="pair">
          <my-button class="create"
              @click="createUser">
            {{ localize('Add') }}
          </my-button>
        </div>
      </div>
    </form>
</template>

<script setup>
import VueMultiselect from "vue-multiselect";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import MyButton from "@/components/UI/MyButton.vue";
import ButtonIcon from "@/components/UI/ButtonIcon.vue";
import MyInput from "@/components/UI/MyInput.vue";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import {localize} from "../hooks/localize.js";

const store = useStore();
const users = computed(() => store.state.admin.users);
const changeVisibleAddUser = () => {
  store.commit('changeVisibleAddUser');
}
const visibleAdminWindow = computed(() => store.getters.visibleAdminWindow);
const visibleAddUser = computed(() => store.state.admin.visibleAddUser);

const rights = [localize('RegularEmployee'), localize('Supervisor')];
const color = 'inset 0px 0px 5px red';
const user = ref({
  surname: '',
  first_name: '',
  last_name: '',
  mail: '',
  login: '',
  password: '',
  is_admin: '',
})
const surname = ref(localize('Surname'));
const name = ref(localize('Name'));
const lastname = ref(localize('Patron'));
const mail = ref(localize('Mail'));
const log = ref(localize('Login'));
const pas = ref(localize('Password'));
const rightsPlaceholder = ref(localize('IndicateRights'));
const error = ref(false);
const errorMsg = ref('');
const typePassword = ref('text');
const flag = ref(false);
const createUser = () => {
  error.value = false;
  errorMsg.value = '';
  if (!user.value.surname && !user.value.first_name && !user.value.last_name
      && !user.value.login && !user.value.password && !user.value.is_admin && !user.value.mail)  {
    return;
  }
  if (!user.value.surname)  {
    error.value = true;
    surname.value = localize('InputSurname');
  }
  flag.value = true;
  if (!user.value.first_name)  {
    error.value = true;
    name.value = localize('InputName');
  }
  if (!user.value.last_name)  {
    error.value = true;
    lastname.value = localize('InputPatron');
  }
  if (!user.value.mail)  {
    error.value = true;
    mail.value = localize('InputMail');
  }
  if (!user.value.login)  {
    error.value = true;
    log.value = localize('InputLogin');
  }
  if (!user.value.password)  {
    error.value = true;
    pas.value = localize('InputPassword');
  }
  if (!user.value.is_admin)  {
    error.value = true;
    rightsPlaceholder.value = localize('InputRights');
  }
  if (users.value.find(p => p.login === user.value.login)) {
    errorMsg.value = localize('UserAlreadyExists');
    error.value = true;
  }
  if (error.value === false) {
    store.dispatch('addUser', user.value);
    clear();
  }
}
const clear = () => {
  user.value = {
    surname: '',
    first_name: '',
    last_name: '',
    mail: '',
    login: '',
    password: '',
    is_admin: '',
  };
  surname.value = localize('Surname');
  name.value = localize('Name');
  lastname.value = localize('Patron');
  mail.value = localize('Mail');
  log.value = localize('Login');
  pas.value = localize('Password');
  rights.value = localize('IndicateRights');
  error.value = false;
  flag.value = false;
  store.commit('changeVisibleAddUser');
}
</script>

<style scoped>
form
{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 400px;
  text-align: center;
  padding-left: 15px;
  padding-top: 5px;
  border-radius: 10px;
  top: 20%;
  left: 20px;
  margin-bottom: 15px;
  background: #f5f5f5;
}

.create
{
  width: 250px;
  height: 37px;
  margin-left: 30px;
  font-size: 18px;
}

.in
{
  height: 22px;
  width: 250px;
  margin-left: 10px;
  font-size: 16px;
}

.error
{
  position: relative;
  color: red;
  width: fit-content;
  left: 25px;
  font-size: larger;
  font-weight: bold;
}

.open
{
  height: 40px;
  width: 250px;
}

.selectDep
{
  height: 30px;
  width: 260px;
  margin-left: 71px;
  margin-top: 15px;
  margin-bottom: 20px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
}

</style>
