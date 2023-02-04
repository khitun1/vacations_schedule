<template>
  <my-button @click="changeVisibleAddUser"
             v-show="!visibleAdminWindow"
             class="open">
    Добавить нового пользователя
  </my-button>
    <form @submit.prevent  class="form" v-show="visibleAddUser">
      <button-back @click="clear"/>
      <h2>Новый пользователь</h2>
      <div>
        <my-input class="in" :placeholder="surname"
                  v-model="user.surname"
                  v-bind:style="{boxShadow: user.surname === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="name"
                  v-model="user.first_name"
                  v-bind:style="{boxShadow: user.first_name === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="lastname"
                  v-model="user.lastname"
                  v-bind:style="{boxShadow: user.last_name === '' && flag? color : ''}"/>
        <my-input class="in" :placeholder="log"
                  v-model="user.login"
                  v-bind:style="{boxShadow: user.login === '' && flag? color : ''}"/>
        <div>
          <my-input class="in" :placeholder="pas" :type="typePassword" style="left: 20px"
                    v-model="user.md5password"
                    v-bind:style="{boxShadow: user.md5password === '' && flag? color : ''}"/>
          <button-icon style="top: 8px; left: 15px" @click="typePassword = typePassword === 'text'? 'password': 'text'">
            <img src="@/images/WatchIcon.png" v-show="typePassword === 'text'"/>
            <img src="@/images/closePassword.webp" v-show="typePassword !== 'text'">
          </button-icon>
        </div>
        <VueMultiselect class="selectDep"
                        v-model="user.departmentId"
                        :options="namesDeps"
                        :show-no-results="false"
                        placeholder="Выберите отдел"
                        :show-labels="false"/>
        <VueMultiselect class="selectDep"
                        v-model="user.is_admin"
                        :options="rights"
                        :show-no-results="false"
                        placeholder="Укажите права"
                        :show-labels="false"/>
        <p class="error" v-show="error">{{ errorMsg }}</p>
        <div class="pair">
          <my-button class="create" @click="createUser">
            Добавить
          </my-button>
        </div>
      </div>

    </form>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "AddUser",

  components: {
    VueMultiselect,
  },

  computed: {
    ...mapState ({
      visibleAddUser: state => state.admin.visibleAddUser,
      departments: state => state.admin.departments,
      users: state => state.admin.users,
    }),

    ...mapGetters ({
      visibleAdminWindow: "visibleAdminWindow",
    }),
    namesDeps: function (){
      let arr = [];
      this.departments.forEach(p => arr.push(p.name));
      return arr;
    }
  },

  data() {
    return {
      rights: ['Обычный сотрудник', 'Админ'],
      color: 'inset 0px 0px 5px red',
      user: {
        surname: '',
        first_name: '',
        last_name: '',
        login: '',
        md5password: '',
        departmentId: '',
        is_admin: '',
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
    ...mapActions({
      addUser: 'addUser',
    }),

    ...mapMutations({
      changeVisibleAddUser: 'changeVisibleAddUser',

    }),

    createUser(){
      if(!this.user.surname && !this.user.name && !this.user.lastname
      && !this.user.login && !this.user.password && !this.user.department && !this.user.isAdmin)  return;
      this.flag = true;
      if(!this.user.surname)  this.surname = 'Введите фамилию!';
      if(!this.user.name)  this.name = 'Введите имя!';
      if(!this.user.lastname)  this.lastname = 'Введите отчество!';
      if(!this.user.login)  this.log = 'Введите логин!';
      if(!this.user.password)  this.pas = 'Введите пароль!';
      if(!this.user.departmentId)  this.dep = 'Выберите отдел!';
      if(!this.user.is_admin)  this.dep = 'Укажите права!';
      else if(this.users.find(p => p.login === this.user.login))
      {
        this.errorMsg = 'Пользователь с таким логином уже есть!';
        this.error = true;
      }
      else {
        const id = this.departments.find(p => p.name === this.user.departmentId).id;
        this.user.departmentId = id;
        this.addUser(this.user)
        this.clear();
      }
    },

    clear(){
      this.user = {
        surname: '',
        name: '',
        lastname: '',
        login: '',
        password: '',
        department: '',
      };
      // this.surname = 'Фамилия';
      // this.name = 'Имя';
      // this.lastname = 'Отчество';
      // this.log = 'Логин';
      // this.pas = 'Пароль';
      // this.dep = 'Отдел';
      this.error = false;
      this.flag = false;
      this.changeVisibleAddUser();
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
