<template>
  <my-button @click="changeVisibleDeleteUser"
             v-show="!visibleAdminWindow"
             class="open">
    Удалить пользователя
  </my-button>
  <div v-show="visibleDeleteUser" class="main">
    <button-back @click="changeVisibleDeleteUser"/>
    <h2>Удаление пользователя</h2>
    <div class="inputs">
      <my-input class="delete" placeholder="Найти пользователя"
                v-model="user"/>
    </div>
    <h2>Список пользователей</h2>
    <div class="rec"
         v-for="user in usersList" :key="user.id">
      <p>{{user.surname + ' ' + user.first_name + ' ' + user.last_name}}</p>
      <button-icon @click="deleteUser(user.id)">
        <img src="@/images/DeleteIcon.png">
      </button-icon>
    </div>
  </div>
</template>

<script>
import ButtonBack from "@/components/UI/ButtonBack.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "deleteUser",

  components: {
    ButtonBack,
  },

  data() {
    return {
      selectedDep: '',
      user: '',
    }
  },

  methods: {
    ...mapMutations ({
      changeVisibleDeleteUser: 'changeVisibleDeleteUser',
    }),

    ...mapActions ({
      deleteUserVuex: 'deleteUser',
    }),

    deleteUser(id) {
      this.deleteUserVuex(id);
    }
  },

  computed: {
    ...mapState ({
      currentUser: state => state.my.currentUser,
      visibleDeleteUser: state => state.admin.visibleDeleteUser,
      users: state => state.admin.users,
      department: state => state.admin.department
    }),

    ...mapGetters ({
      visibleAdminWindow: 'visibleAdminWindow',
    }),

    searchUser: function(){
      return new RegExp('^' + this.user + '.+');
    },

    usersList: function () {
      if (this.user === '')  return [];
      let list = this.users.filter(p => (this.searchUser.test(p.name) || p.name === this.user)
          && p.departmentId === this.department.name);
      list.splice(list.indexOf(list.find(p => p.id === this.currentUser.id)), 1);
      return list;
    },
  },

}
</script>

<style scoped>
.main {
  width: 650px;
  background: #f5f5f5;
  padding: 10px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.inputs {
  display: flex;
  flex-flow: row wrap;
}


.open
{
  height: 40px;
  width: 250px;
}

.delete
{
  margin-left: 60px;
  margin-top: 18px;
  font-size: 17px;
  width: 250px;
  height: 25px;
}

.rec
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 350px;
  border-radius: 10px;
  height: 50px;
  background: #e3e3e3;
  cursor: default;
}

@media screen and (max-width: 800px) {
  .main {
    width: 90%;
  }
  .inputs {
    background: red;
  }

  .delete {
    margin-left: 10px;
  }

  .rec {
    width: 90%;
  }
}

</style>