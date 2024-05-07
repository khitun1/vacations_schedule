<template>
  <div class="table">
    <h1>Личные данные</h1>
    <div class="info surname">
      <p>
        Фамилия:
      </p>
      <div class="text">
        <my-input readonly
                  :value="currentUser.surname"/>
      </div>
    </div>
    <div class="info name">
      <p>
        Имя:
      </p>
      <div class="text">
        <my-input readonly
                  :value="currentUser.first_name"/>
      </div>
    </div>
    <div class="info lastname">
      <p>
        Отчество:
      </p>
      <div class="text">
        <my-input readonly
                  :value="currentUser.last_name"/>
      </div>
    </div>
    <div class="info mail">
      <p>
        Почта:
      </p>
      <div class="text">
        <my-input :readonly="changeMail"
                  v-model="newMail"
                  class="inputMail"/>
      </div>
      <my-button class="change"
                 @click="change_mail">
        {{ textMailBtn }}
      </my-button>
    </div>
    <div class="info login">
      <p>
        Логин:
      </p>
      <div class="text">
        <my-input :readonly="changeLogin"
                  v-model="newLogin"
                  class="inputLogin"/>
      </div>
      <my-button class="change"
                 @click="changeLog">
        {{ textLogBtn }}
      </my-button>
    </div>
    <div class="info password">
      <p>
        Пароль:
      </p>
      <div class="text">
        <my-input class="inputPassword"
            :readonly="changePassword"
            :type="typePassword"
            v-model="newPassword"/>
        <button-icon class="watch"
                     @click="typePassword = typePassword === 'text'? 'password' : 'text'">
          <img src="@/images/WatchIcon.png"
               alt="show password"
               v-show="typePassword === 'text'">
          <img src="@/images/closePassword.webp"
               alt="hide password"
               v-show="typePassword !== 'text'">
        </button-icon>
      </div>
      <my-button class="change"
                 @click="changePas">
        {{ textPasBtn }}
      </my-button>
    </div>
    <div class="info department">
      <p>
        Отдел:
      </p>
      <div class="text">
        <my-input readonly
                  :value="currentUser.department"/>
      </div>
    </div>
  </div>

</template>

<script>

import {computed, ref} from "vue";
import {useStore} from "vuex";
import jwt_decode from "jwt-decode";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import ButtonIcon from "@/components/UI/ButtonIcon.vue";

export default {
  name: "PersonalData",
  components: {ButtonIcon, MyButton, MyInput},

  setup() {
    const store = useStore();
    const currentUser = computed(() => store.state.my.currentUser);
    const newLogin = ref(jwt_decode(localStorage.getItem('token')).login);
    const newPassword = ref(jwt_decode(localStorage.getItem('token')).password);
    const newMail = ref(jwt_decode(localStorage.getItem('token')).mail);
    const changePassword = ref(true) ;
    const typePassword = ref('password');
    const changeLogin = ref(true);
    const changeMail = ref(true);
    const textLogBtn = ref('Изменить логин');
    const textMailBtn = ref('Изменить почту');
    const textPasBtn = ref('Изменить пароль');

    const changeLog = () => {
      document.getElementsByClassName('inputLogin')[0].focus();
      if(changeLogin.value === true)  textLogBtn.value = 'Подтвердить';
      else
      {
        store.dispatch('changeLogin', newLogin.value);
        store.dispatch('auth');
        textLogBtn.value = 'Изменить логин';
      }
      changeLogin.value = !changeLogin.value;
    }
    const changePas = () => {
      document.getElementsByClassName('inputPassword')[0].focus();
      if(changePassword.value === true) textPasBtn.value = 'Подтвердить';
      else{
        store.dispatch('changePassword', newPassword.value);
        store.dispatch('auth');
        textPasBtn.value = 'Изменить пароль';
      }
      changePassword.value = !changePassword.value;
    }

    const change_mail = () => {
      document.getElementsByClassName('inputMail')[0].focus();
      if(changeMail.value === true) textMailBtn.value = 'Подтвердить';
      else{
        store.dispatch('changeMail', newMail.value);
        store.dispatch('auth');
        textMailBtn.value = 'Изменить почту';
      }
      changeMail.value = !changeMail.value;
    }

    return {
      currentUser,
      newPassword,
      newLogin,
      typePassword,
      changePassword,
      changeLogin,
      textLogBtn,
      textPasBtn,
      textMailBtn,
      newMail,
      changeMail,
      change_mail,
      changePas,
      changeLog
    }
  },

}
</script>

<style scoped>

.watch
{
  top: 2px;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  flex-flow: row wrap;
}

input {
  height: fit-content;
}

.info p {
  width: 120px;
}

.change {
  padding: 5px 20px;
}

.text {
  width: 260px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.table
{
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 10px;
  margin-top: 5px;
  background: #f5f5f5;
  border-radius: 10px;
  height: 95%;
  width: fit-content;

}

@media screen and (max-width: 1000px) {
  .table {
    width: 108%;
  }
  .info p {
    width: 90px;
  }
  @media screen and (max-width: 715px) {
    .table {
      width: 119%;
    }
    .change {
      margin-left: 25%;
    }
  }
}




</style>