<template>
  <my-button @click="$store.state.visibleAddUser = true"
             v-show="!$store.getters.visibleAdminWindow"
             class="open">
    Добавить нового пользователя
  </my-button>
    <form @submit.prevent  class="form" v-show="$store.state.visibleAddUser">
      <button-back @click="clear"/>
      <h2>Новый пользователь</h2>
      <div>
        <my-input class="in" :placeholder="surname"
                  v-model="user.surname"
                  v-bind:style="{boxShadow: user.surname === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="name"
                  v-model="user.name"
                  v-bind:style="{boxShadow: user.name === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="lastname"
                  v-model="user.lastname"
                  v-bind:style="{boxShadow: user.lastname === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="log"
                  v-model="user.login"
                  v-bind:style="{boxShadow: user.login === '' && flag? color : ''}"/>
        <div>
          <my-input class="in" :placeholder="pas" :type="typePassword" style="left: 20px"
                    v-model="user.password"
                    v-bind:style="{boxShadow: user.password === '' && flag? color : ''}"/>
          <button-icon style="top: 8px; left: 15px" @click="typePassword = typePassword === 'text'? 'password': 'text'">
            <img src="@/images/WatchIcon.png" />
          </button-icon>
        </div>
        <VueMultiselect class="selectDep"
                        v-model="user.department"
                        :options="namesDeps"
                        :show-no-results="false"
                        placeholder="Выберите отдел"
                        :show-labels="false"/>
<!--        <my-select class="selector" v-model="user.department"-->
<!--                   v-bind:style="{boxShadow: user.department === '' && flag? color : ''}">-->
<!--          <option selected value="" disabled>Выберите отдел</option>-->
<!--          <option v-for="dep in deps"-->
<!--                  :key="dep.id">-->
<!--            <p>{{dep.name}}</p>-->
<!--          </option>-->
<!--        </my-select>-->
        <p class="error" v-show="error">{{ errorMsg }}</p>
        <div class="pair">
          <my-button class="create" @click="createUser">
            Добавить
          </my-button>
<!--          <my-button class="cancel" @click="clear">-->
<!--            Закрыть-->
<!--          </my-button>-->
        </div>
      </div>

    </form>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import store from "@/store";

export default {
  name: "AddUser",

  components: {
    VueMultiselect,
  },

  computed: {
    namesDeps: function (){
      let arr = [];
      this.deps.forEach(p => arr.push(p.name));
      return arr;
    }
  },

  props: {
    deps: {
      type: Array,
      required: false,
    },
  },

  data() {
    return {
      color: 'inset 0px 0px 5px red',
      user: {
        surname: '',
        name: '',
        lastname: '',
        login: '',
        password: '',
        department: '',
      },
      surname: 'Фамилия',
      name: 'Имя',
      lastname: 'Отчество',
      log: 'Логин',
      pas: 'Пароль',
      dep: 'Отдел',
      error: false,
      visible: true,
      errorMsg: 'sad',
      typePassword: 'text',
      flag: false,
      visibleForm: false,
   }
  },
  methods: {
    createUser(){
      if(!this.user.surname && !this.user.name && !this.user.lastname
      && !this.user.login && !this.user.password && !this.user.department)  return;
      this.flag = true;
      if(!this.user.surname)  this.surname = 'Введите фамилию!';
      if(!this.user.name)  this.name = 'Введите имя!';
      if(!this.user.lastname)  this.lastname = 'Введите отчество!';
      if(!this.user.login)  this.log = 'Введите логин!';
      if(!this.user.password)  this.pas = 'Введите пароль!';
      if(!this.user.department)  this.dep = 'Введите отдел!';
      else if(store.state.users.find(p => p.login === this.user.login))
      {
        this.errorMsg = 'Пользователь с таким логином уже есть!';
        this.error = true;
      }

      else if (!this.deps.find(p => p.name === this.user.department))
      {
        this.errorMsg = 'Отдел с таким названием отсутствует!';
        this.error = true;
      }

      else {
        this.user.id = Date.now()
        store.state.users.push(this.user);
        this.clear();
      }
    },

    clear(){
      // this.user = {
      //   surname: '',
      //   name: '',
      //   lastname: '',
      //   login: '',
      //   password: '',
      //   department: '',
      // };
      // this.surname = 'Фамилия';
      // this.name = 'Имя';
      // this.lastname = 'Отчество';
      // this.log = 'Логин';
      // this.pas = 'Пароль';
      // this.dep = 'Отдел';
      this.error = false;
      this.flag = false;
      store.state.visibleAddUser = false;
    }
  }
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
  border-radius: 10px;
  top: 20%;
  left: 20px;
  margin-bottom: 15px;
  background: #f5f5f5;
}

.create, .cancel
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

.back
{
  margin-top: 10px;
  margin-left: -8px;
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
