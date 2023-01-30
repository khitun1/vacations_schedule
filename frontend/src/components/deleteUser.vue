<template>
  <my-button @click="$store.state.visibleDeleteUser = true"
             v-show="!$store.getters.visibleAdminWindow"
             class="open">
    Удалить пользователя
  </my-button>
  <div v-show="$store.state.visibleDeleteUser" class="main">
    <button-back @click="$store.state.visibleDeleteUser = false"/>
    <h2>Удаление пользователя</h2>
    <div class="inputs">
      <VueMultiselect class="selectDep"
                      v-model="selectedDep"
                      :options="namesDeps"
                      placeholder="Выберите отдел"
                      :show-no-results="false"
                      :show-labels="false"/>
      <my-input class="delete" placeholder="Найти пользователя"
                v-model="user"/>
    </div>
    <h2>Список пользователей</h2>
    <div class="rec"
         v-for="user in users" :key="user.id">
      <p>{{user.surname + ' ' + user.name + ' ' + user.lastname}}</p>
      <button-icon @click="deleteUser(user.id)">
        <img src="@/images/DeleteIcon.png">
      </button-icon>
    </div>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import store from "@/store";
export default {
  name: "deleteUser",

  components: {
    ButtonBack,
    VueMultiselect,
  },

  data() {
    return {
      selectedDep: '',
      user: '',
    }
  },

  methods: {
    deleteUser(id) {
      return id;
    }
  },

  computed: {
    namesDeps: function (){
      let arr = [];
      this.deps.forEach(p => arr.push(p.name));
      return arr;
    },

    searchUser: function(){
      return new RegExp('^' + this.user + '.+');
    },

    users: function () {
      if (this.user === '')  return [];
      return store.state.users.filter(p => (this.searchUser.test(p.name) || p.name === this.user)
          && p.department === this.selectedDep);
    },
  },

  props: {
    deps: {
      type: Array,
      required: false,
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
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
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

</style>