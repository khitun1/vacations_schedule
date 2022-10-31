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
      <my-input class="in" placeholder="Пароль"
                v-model="user.password"/>
      <my-input class="in" placeholder="Отдел"
                v-model="user.department"/>
      <my-button class="create" @click="createUser">
        Добавить
      </my-button>
    </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
export default {
  name: "AddUser",
  components: {MyButton, MyInput},
  data() {
    return {
      user: {
        surname: '',
        name: '',
        lastname: '',
        login: '',
        password: '',
        department: '',
      }
   }
  },
  methods: {
    createUser(){
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

</style>