<template>
  <h1>Новый пользователь</h1>
    <form @submit.prevent>
      <my-input class="in" placeholder="Фамилия"
                v-model="user.surname"/>
      <my-input class="in" placeholder="Имя"
                v-model="user.name"/>
      <my-input class="in" placeholder="Отчество"
                v-model="user.lastname"/>
      <my-input class="in" placeholder="Логин"
                v-model="user.login"/>
      <my-input class="in" placeholder="Пароль" :type="typePassword"
                v-model="user.password"/>
      <button-icon style="top: 8px;" @click="typePassword = typePassword == 'text'? 'password': 'text'">
        <img src="@/components/images/WatchIcon.png" />
      </button-icon>
      <my-input class="in" placeholder="Отдел"
                v-model="user.department"/>
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
      user: {
        surname: '',
        name: '',
        lastname: '',
        login: '',
        password: '',
        department: '',
      },
      error: false,
      visible: true,
      errorMsg: 'sad',
      typePassword: 'text',
   }
  },
  methods: {
    createUser(){
      if(!this.user.surname || !this.user.name || !this.user.lastname
          || !this.user.login || !this.user.password || !this.user.department)
      {
        this.errorMsg = 'Заполните все поля!';
        this.error = true;
      }
      else if(this.users.find(p => p.login == this.user.login))
      {
        this.errorMsg = 'Пользователь с таким логином уже есть!';
        this.error = true;
      }
      else if (!this.deps.find(p => p.name == this.user.department))
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
        this.error = false;
      }
    }
  }
}
</script>

<style scoped>
form
{
  width: 300px;
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
  left: 25px;
  font-size: larger;
  font-weight: bold;
}

</style>