<template>
    <my-button @click="changeVisibleCon"
               v-show="!visibleAdminWindow">
        Изменить условия
    </my-button>

    <div v-show="visibleChangeCon" class="con">
      <button-back @click="changeVisibleCon"/>
      <h2>Назначить условия</h2>
      <div class="conditions">
        <form @submit.prevent>
          <p>Минимальное кол-во дней отпуска:</p>
          <my-input v-model="condition.min" :readonly="changeMin" class="minDays"/>
          <my-button @click="setCon(1)" type="submit">{{minText}}</my-button>
        </form>
        <form @submit.prevent>
          <p>Всего дней для отпуска:</p>
          <my-input v-model="condition.total" :readonly="changeTotal" class="totalDays"/>
          <my-button @click="setCon(3)" type="submit">{{totalText}}</my-button>
        </form>
        <form @submit.prevent>
          <p>% максимально допустимых одновременных отпусков:</p>
          <my-input v-model="condition.percents" :readonly="changePercent" class="percentsDays"/>
          <my-button @click="setCon(4)" type="submit">{{percentText}}</my-button>
        </form>
        <div class="debt">
          <p>Возможность брать отпускные дни в долг:</p>
          <label class="checkbox">
            <input type="checkbox" class="check_input" :checked="!rule" @input="changeRule"/>
            <div class="check_div"/>
          </label>
        </div>
      </div>
      <p class="error" v-show="errorNum"> {{ errorMsg }}</p>
    </div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "SetData",

  setup() {
    const store = useStore();
    const rule = computed(() => store.state.admin.department.rules);
    const changeMin =  ref(true);
    const changeMax =  ref(true);
    const changeTotal =  ref(true);
    const changePercent =  ref(true);
    const minText =  ref('Изменить');
    const totalText =  ref('Изменить');
    const percentText =  ref('Изменить');
    const errorNum =  ref(false);
    const errorMsg =  ref('');
    const visibleCon =  ref(false);
    const visibleChangeCon = computed(() => store.state.admin.visibleChangeCon);
    const visibleAdminWindow = computed(() => store.getters.visibleAdminWindow)
    const condition = computed(() => store.state.admin.department);
    const changeVisibleCon = () => store.commit('changeVisibleChangeCon');
    const setCon = (flag) => {
      let accept = false;
      switch (flag){
        case 1:
          if(changeMin.value === false)
          {
            condition.value.min = parseInt(condition.value.min);
            if (validate(condition.value.min)) {
                changeMin.value = true;
                minText.value =  'Изменить';
                accept = true;
            }
            else errorMsg.value = 'Минимальное количество дней должно быть целым и положительным числом!';
          }
          else
          {
            changeMin.value = false;
            document.getElementsByClassName('minDays')[0].focus();
            minText.value =  'Подтвердить';
          }
          break;
        case 3:
          if(changeTotal.value === false)
          {
            condition.value.total = parseInt(condition.value.total);
            if(validate(condition.value.total)) {
              changeTotal.value = true;
              totalText.value = 'Изменить';
              accept = true;
            }
            else errorMsg.value = 'Общее количество дней должно быть целым и положительным числом!';
          }
          else
          {
            changeTotal.value = false;
            document.getElementsByClassName('totalDays')[0].focus();
            totalText.value =  'Подтвердить';
          }
          break;
        case 4:
          if(changePercent.value === false)
          {
            condition.value.percents = parseInt(condition.value.percents);
            if(validate(condition.value.percents) && condition.value.percents < 100) {
              changePercent.value = true;
              percentText.value = 'Изменить';
              accept = true;
            }
            else errorMsg.value = '% пересечений должен быть целым, положительным и меньшем, чем 100, числом !';
          }
          else
          {
            changePercent.value = false;
            document.getElementsByClassName('percentsDays')[0].focus();
            percentText.value =  'Подтвердить';
          }
          break;
      }

      if (accept){
        store.dispatch('changeConditions',condition.value);
        errorNum.value = false;
        errorMsg.value = '';
      }
      else errorNum.value = true;
    }
    const validate = (con) => con && con > 0 && con % 1 === 0;
    const changeRule = async(e) => {
      await store.dispatch('changeRules', e.target.checked);
      await store.dispatch('getUsers');
    }

    return {
      changeMin,
      changeMax,
      changeTotal,
      changePercent,
      minText,
      totalText,
      percentText,
      errorNum,
      errorMsg,
      visibleCon,
      visibleChangeCon,
      visibleAdminWindow,
      condition,
      rule,
      changeVisibleCon,
      setCon,
      changeRule,
    }
  }
}
</script>

<style scoped>

button
{

  width: 250px;
  height: 40px;
}

form button
{
  width: 100px;
  height: 30px;
}

.error
{

  width: fit-content;
  color: red;
  font-weight: bold;
  font-size: larger;
}

form
{
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  width: 90%;
  margin-bottom: 10px;
}

.con
{
  padding: 10px;
  background: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 90%;
}

.conditions form
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  flex-flow: row wrap;
}

.conditions p
{
  width: 400px;
}

.conditions button
{
  width: 100px;
  height: 30px;
}

.rec input
{
  background: none;
  border-width: 0;
  height: 80%;
  font-size: 16px;
  font-family: "Times New Roman";
}

.checkbox
{
  position: relative;
  top: 12px;
  margin-left: -70px;
}

.check_div
{
  top: -3px;
  left: 0;
  width: 60px;
  height: 30px;
  border-radius: 100px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  background: #ffffff;
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

.debt {
  display: flex;
  flex-direction: row;
  padding: 0 0 0 10px;
  width: fit-content;
}

</style>