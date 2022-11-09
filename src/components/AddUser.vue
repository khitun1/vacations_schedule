<template>
  <h1>Новый пользователь</h1>
    <form @submit.prevent>
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
      <my-input class="in" :placeholder="pas" :type="typePassword"
                v-model="user.password"
                v-bind:style="{boxShadow: user.password === '' && flag? color : ''}"/>
      <button-icon style="top: 8px;" @click="typePassword = typePassword === 'text'? 'password': 'text'">
        <img src="@/components/images/WatchIcon.png" />
      </button-icon>
      <my-input class="in" :placeholder="dep"
                v-model="user.department"
                v-bind:style="{boxShadow: user.department === '' && flag? color : ''}"/>
      <p class="error" v-show="error">{{ errorMsg }}</p>
      <my-button class="create" @click="createUser">
        Добавить
      </my-button>
    </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import ButtonIcon from "@/components/UI/ButtonIcon";
export default {
  name: "AddUser",
  components: {ButtonIcon, MyButton, MyInput},
  props: {
    users: {
      type: Array,
      required: false,
    },
    deps: {
      type: Array,
      required: false,
    }
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
      else if(this.users.find(p => p.login === this.user.login))
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
        this.$emit('create', this.user)
        this.user = {
          surname: '',
          name: '',
          lastname: '',
          login: '',
          password: '',
          department: '',
        }
        this.surname = 'Фамилия';
        this.name = 'Имя';
        this.lastname = 'Отчество';
        this.log = 'Логин';
        this.pas = 'Пароль';
        this.dep = 'Отдел';
        this.error = false;
        this.flag = false;
      }
    }
  }
}
</script>

<style scoped>
form
{
  width: 400px;
  margin-left: 40px;
}

.create
{
  width: 250px;
  height: 37px;
  color: #FCFF7C;
  background: #9492FF;
  margin-left: -10px;
  font-size: 18px;
}

.in
{
  height: 22px;
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


</style>