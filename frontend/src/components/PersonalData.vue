<template>
  <div class="table">
    <h1>Личные данные</h1>
    <table style="text-align: center">
      <tr>
        <td>
          Фамилия:
        </td>
        <td>
          <my-input readonly :value="user.surname"/>
        </td>
      </tr>
      <tr>
        <td>
          Имя:
        </td>
        <td>
          <my-input readonly :value="user.name"/>
        </td>
      </tr>
      <tr>
        <td>
          Отчество:
        </td>
        <td>
          <my-input readonly :value="user.lastname"/>
        </td>
      </tr>
      <tr>
        <td>
          Логин:
        </td>
        <td>
          <my-input :readonly="changeLogin"
                    v-model="newLogin"/>
        </td>
        <td>
          <my-button class="change" @click="changeLog">
            {{ textLogBtn }}
          </my-button>
        </td>
      </tr>
      <tr>
        <td>
          Пароль:
        </td>
        <td>
          <my-input :readonly="changePassword" :type="typePassword"
                    v-model="newPassword"/>
          <button-icon class="watch" @click="typePassword = typePassword === 'text'? 'password' : 'text'"  >
            <img src="@/images/WatchIcon.png">
          </button-icon>
        </td>
        <td>
          <my-button class="change" @click="changePas">
            {{ textPasBtn }}
          </my-button>
        </td>
      </tr>
      <tr>
        <td>
          Отдел:
        </td>
        <td>
          <my-input readonly :value="user.department"/>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
import store from "@/store";

export default {
  name: "PersonalData",

  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      changePassword: true,
      typePassword: 'text',
      changeLogin: true,
      newPassword: this.user.password,
      newLogin: this.user.login,
      textLogBtn: 'Изменить логин',
      textPasBtn: 'Изменить пароль',
    }
  },
  methods: {
    changePas(){
      if(this.changePassword === true) this.textPasBtn = 'Подтвердить';
      else{
        store.commit('changePassword', this.newPassword);
        this.textPasBtn = 'Изменить пароль';
      }
      this.changePassword = !this.changePassword;
    },

    changeLog(){
      if(this.changeLogin === true)  this.textLogBtn = 'Подтвердить';
      else
      {
        store.commit('changeLogin', this.newLogin);
        this.textLogBtn = 'Изменить логин';
      }
      this.changeLogin = !this.changeLogin;
    },
  }

}
</script>

<style scoped>
td
{
  position: relative;
  text-align: left;
  padding-left: 50px;
  padding-right: 50px;
  height: 50px;
  font-size: 18px;
  padding-bottom: 20px;
}

.watch
{
  left: 20px;
  top: 8px;
}

.change
{
  padding: -5px;
  height: 30px;
  width: 200px;
  font-size: 16px;
}

.table
{
  padding: 10px;
  margin-top: 5px;
  background: #f5f5f5;
  border-radius: 10px;
  height: 95%;
  width: 80%;
}

</style>