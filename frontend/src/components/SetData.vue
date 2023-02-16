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
          <p>Максимальное кол-во дней отпуска:</p>
          <my-input v-model="condition.max" :readonly="changeMax" class="maxDays"/>
          <my-button @click="setCon(2)" type="submit">{{maxText}}</my-button>
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
      </div>
      <p class="error" v-show="errorNum"> {{ errorMsg }}</p>
    </div>
</template>

<script>

import {setData} from "@/hooks/setData";

export default {
  name: "SetData",

  setup() {
    let {
      changeMin,
          changeMax,
          changeTotal,
          changePercent,
          minText,
          maxText,
          totalText,
          percentText,
          errorNum,
          errorMsg,
          visibleCon,
          visibleChangeCon,
          visibleAdminWindow,
          condition,
          changeVisibleCon,
          setCon,
    } = setData();
    return {
      changeMin,
      changeMax,
      changeTotal,
      changePercent,
      minText,
      maxText,
      totalText,
      percentText,
      errorNum,
      errorMsg,
      visibleCon,
      visibleChangeCon,
      visibleAdminWindow,
      condition,
      changeVisibleCon,
      setCon,
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

</style>