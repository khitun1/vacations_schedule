<template>
    <my-button @click="changeVisibleCon"
               v-show="!visibleAdminWindow">
        {{localize('ChangeConditions')}}
    </my-button>
    <div v-show="visibleChangeCon"
         class="con">
      <button-back @click="changeVisibleCon"/>
      <h2>
        {{ localize('SetConditions') }}
      </h2>
      <div class="conditions">
        <form @submit.prevent>
          <p>
            {{ localize('MinimalDays') }}
          </p>
          <my-input v-model="condition.min"
                    :readonly="changeMin"
                    class="minDays"
                    type="number"/>
          <my-button @click="setCon(1)"
                     type="submit">
            {{minText}}
          </my-button>
        </form>
        <form @submit.prevent>
          <p>
            {{ localize('TotalVacationDays') }}
          </p>
          <my-input v-model="condition.total"
                    :readonly="changeTotal"
                    class="totalDays"
                    type="number"/>
          <my-button @click="setCon(3)"
                     type="submit">
            {{totalText}}
          </my-button>
        </form>
        <form @submit.prevent>
          <p>
            {{ localize('AllowedPercent') }}
          </p>
          <my-input v-model="condition.percents"
                    :readonly="changePercent"
                    class="percentsDays"
                    type="number" />
          <my-button @click="setCon(4)"
                     type="submit">
            {{percentText}}
          </my-button>
        </form>
        <div class="debt">
          <p>
            {{ localize('AllowedDebtDays') }}
          </p>
          <label class="checkbox">
            <input type="checkbox"
                   class="check_input"
                   :checked="!rule"
                   @input="changeRule"/>
            <div class="check_div"/>
          </label>
        </div>
      </div>
      <p class="error"
         v-show="errorNum">
        {{ errorMsg }}
      </p>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import {localize} from "../hooks/localize.js";

const store = useStore();
const rule = computed(() => store.state.admin.department.rules);
const changeMin =  ref(true);
const changeTotal =  ref(true);
const changePercent =  ref(true);
const minText =  ref(localize('Change'));
const totalText =  ref(localize('Change'));
const percentText =  ref(localize('Change'));
const errorNum =  ref(false);
const errorMsg =  ref('');
const visibleChangeCon = computed(() => store.state.admin.visibleChangeCon);
const visibleAdminWindow = computed(() => store.getters.visibleAdminWindow)
const condition = computed(() => store.state.admin.department);
const changeVisibleCon = () => store.commit('changeVisibleChangeCon');
const setCon = (flag) => {
  let accept = false;
  switch (flag){
    case 1:
      if(changeMin.value === false) {
        if (validate(condition.value.min)) {
          if (condition.value.min <= condition.value.total) {
            changeMin.value = true;
            minText.value =  localize('Change');
            accept = true;
          }
          else {
            errorMsg.value = localize('MinimalLessThenTotal');
          }
        }
        else {
          errorMsg.value = localize('MinimalPositiveInteger');
        }
      }
      else
      {
        changeMin.value = false;
        document.getElementsByClassName('minDays')[0].focus();
        minText.value =  localize('Accept');
      }
      break;
    case 3:
      if (changeTotal.value === false) {
        if (validate(condition.value.total)) {
          if (condition.value.min <= condition.value.total) {
            changeTotal.value = true;
            totalText.value = localize('Change');
            accept = true;
          }
          else {
            errorMsg.value = localize('TotalGreaterThenMinimal');
          }
        }
        else {
          errorMsg.value = localize('TotalPositiveInteger');
        }
      }
      else
      {
        changeTotal.value = false;
        document.getElementsByClassName('totalDays')[0].focus();
        totalText.value = localize('Accept');
      }
      break;
    case 4:
      if (changePercent.value === false) {
        if (validate(condition.value.percents) && condition.value.percents <= 100) {
          changePercent.value = true;
          percentText.value = localize('Change');
          accept = true;
        }
        else errorMsg.value = localize('PercentPositiveInteger');
      }
      else
      {
        changePercent.value = false;
        document.getElementsByClassName('percentsDays')[0].focus();
        percentText.value =  localize('Accept');
      }
      break;
  }

  if (accept) {
    store.dispatch('changeConditions',condition.value);
    errorNum.value = false;
    errorMsg.value = '';
  }
  else errorNum.value = true;
}
const validate = (con) => con && con >= 0 && con % 1 === 0;
const changeRule = async(e) => {
  await store.dispatch('changeRules', e.target.checked);
  await store.dispatch('getUsers');
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
  width: 120px;
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
  justify-content: space-between;
  padding: 0 0 0 10px;
  width: 90%;
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

</style>