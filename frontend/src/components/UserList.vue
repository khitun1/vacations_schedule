<template>
  <my-button @click="changeVisibleUserList"
             v-show="!visibleAdminWindow"
             class="open">
    Список сотрудников
  </my-button>
  <div v-show="visibleUserList"
       class="main">
    <button-back @click="changeVisibleUserList"/>
    <div class="input">
      <my-input class="delete"
                placeholder="Найти пользователя"
                v-model="searchUser"/>
    </div>
    <table>
      <tr>
        <th>
          Ф.И.О.
        </th>
        <th>
          Остаток дней на дату актуализации
        </th>
        <th>
          Наличие плана на отпуск
        </th>
        <th>
          Проставить ненормированные дни
        </th>
        <th>
          Исключить из правил
        </th>
        <th>
          Удалить сотрудника
        </th>
      </tr>
      <tr v-for="user in userList"
          :key="user.id">
        <td>
          {{ user.surname + ' ' + user.first_name[0] + '. ' + user.last_name[0] + '.'}}
        </td>
        <td>
          {{user.actual_days}} на {{dateReverseFormat(user.actual_date)}}
        </td>
        <td>
          <div :style="{color: user.allow ? '#ff2323': '#36f64a'}">
            {{user.allow ? '&#10006;' : '&#10004;'}}
          </div>
        </td>
        <td>
          <div class="add"
               @click="showModal(user.id)">
            +
          </div>
        </td>
        <td class="check">
          <label class="checkbox">
            <input type="checkbox"
                   class="check_input"
                   :checked="!user.rules"
                   @input="e => excludeRules(e, user.id)"/>
            <div class="check_div"/>
          </label>
        </td>
        <td>
          <button-icon class="delUser"
                       @click="deleteUser(user.id)">
            <img src="@/images/DeleteIcon.png"
                 alt="delete icon">
          </button-icon>
        </td>
      </tr>
    </table>
    <dialog>
      <form @submit.prevent
            class="extraDays">
        <my-input placeholder="Введите кол-во дней"
                  type="number"
                  v-model="amountExtra"/>
        <my-button type='submit'
                   @click="sendExtraDays">
          Отправить
        </my-button>
        <my-button @click="closeModal">
          Отменить
        </my-button>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {dateReverseFormat} from "../hooks/generalMoment/dateReverseFormat";
import ButtonIcon from "@/components/UI/ButtonIcon.vue";
import ButtonBack from "@/components/UI/ButtonBack.vue";

const store = useStore();
const userId = ref(null);
const amountExtra = ref(null);
const visibleAdminWindow = computed(() => store.getters.visibleAdminWindow);
const searchUser = ref('');
const userList = computed(() => {
      if (searchUser.value === '') {
        return store.state.admin.users;
      }
  return store.state.admin.users.filter(p => p.surname.toLowerCase().includes(searchUser.value.toLowerCase()));
})
const visibleUserList = computed(() => store.state.admin.visibleUserList);
const changeVisibleUserList = () => {
  store.commit('changeVisibleUserList');
}
const showModal = (id) => {
  userId.value = id;
  document.querySelector('dialog').showModal();
}
const closeModal = () => {
  document.querySelector('dialog').close();
}
const excludeRules = (e, id) => {
  store.dispatch('excludeRules', {id: id, value: !e.target.checked})
}
const sendExtraDays = async () => {
  await store.dispatch('addExtraDays', {id: userId.value, number: amountExtra.value})
  await store.dispatch('getUsers');
  closeModal();
}
const deleteUser = async (id) => {
  await store.dispatch('deleteUser', id);
  await store.dispatch('getUsers');
}
</script>

<style scoped>

.main {
  background: #eeeeee;
  padding: 5px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 400px;
}

table, tr, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
  padding: 5px 0;
}

.open
{
  height: 40px;
  width: 250px;
}

.input {
  margin-bottom: 10px;
}
.delete
{
  margin-left: 60px;
  margin-top: 18px;
  font-size: 17px;
  width: 250px;
  height: 25px;
}

.check {
  text-align: left;
  display: flex;
  border: none;
  justify-content: center;
}

.delUser {
  height: 25px;
  width: 25px;
}

.checkbox
{
  position: relative;
}

.check_div
{
  width: 60px;
  height: 30px;
  border-radius: 100px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.check_input
{
  display: none;
}

.check_div:before
{
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  background: #8482FF;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.check_input:checked ~ .check_div
{
  background: #8482FF;
}

.check_input:checked ~ .check_div:before
{
  background: white;
  left: 33px;
}

.check_div:hover
{
  filter: brightness(1.2);
}

.add {
  background: #8482FF;
  width: 25px;
  height: 25px;
  margin-left: 46%;
  display: flex;
  border-radius: 100%;
  color: #ffffff;
  font-weight: bold;
  font-size: 25px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

dialog {
  border: none;
}

.extraDays {
  display: flex;
  flex-direction: column;
}



</style>