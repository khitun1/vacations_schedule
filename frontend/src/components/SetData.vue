<template>
    <my-button @click="changeVisibleChangeCon"
               v-show="!visibleAdminWindow">
      Изменить условия
    </my-button>

    <div v-show="visibleChangeCon" class="con">
      <button-back @click="changeVisibleChangeCon"/>
      <h2>Назначить условия</h2>
      <div class="conditions">
        <div>
          <p>Минимальное кол-во дней отпуска:</p>
          <my-input v-model="condition.min" :readonly="changeMin" class="minDays"/>
          <my-button @click="setCon(1)">{{minText}}</my-button>
        </div>
        <div>
          <p>Максимальное кол-во дней отпуска:</p>
          <my-input v-model="condition.max" :readonly="changeMax" class="maxDays"/>
          <my-button @click="setCon(2)">{{maxText}}</my-button>
        </div>
        <div>
          <p>Всего дней для отпуска:</p>
          <my-input v-model="condition.total" :readonly="changeTotal" class="totalDays"/>
          <my-button @click="setCon(3)">{{totalText}}</my-button>
        </div>
        <div>
          <p>% максимально допустимых одновременных отпусков:</p>
          <my-input v-model="condition.percents" :readonly="changePercent" class="percentsDays"/>
          <my-button @click="setCon(4)">{{percentText}}</my-button>
        </div>
      </div>
      <p class="error" v-show="errorNum"> {{ errorMsg }}</p>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "SetData",

  computed:{
    ...mapState ({
      visibleAddDep: state => state.admin.visibleAddDep,
      visibleAddType: state => state.admin.visibleAddType,
      visibleChangeCon: state => state.admin.visibleChangeCon,
      department: state => state.admin.department,
    }),

    ...mapGetters ({
      visibleAdminWindow: 'visibleAdminWindow',
    }),

    condition() {
      return this.department;
    }
  },

  data() {
    return {
      dep: '',
      type: '',
      changeMin: true,
      changeMax: true,
      changeTotal: true,
      changePercent: true,
      minText: 'Изменить',
      maxText: 'Изменить',
      totalText: 'Изменить',
      percentText: 'Изменить',
      errorNum: false,
      errorMsg: '',
      visibleDep: false,
      visibleType: false,
      visibleCon: false,
      changeDep: true,
      cursorChange: true,
      readDep: true,
      changeType: true,
      readType: true,
    }
  },

  methods: {
    ...mapMutations ({
      addDep: 'addDep',
      addType: 'addType',
      changeDepName: 'changeDepName',
      changeTypeName: 'changeTypeName',
      changeVisibleAddDep: 'changeVisibleAddDep',
      changeVisibleAddType: 'changeVisibleAddType',
      changeVisibleChangeCon: 'changeVisibleChangeCon',
    }),

    ...mapActions ({
      changeConditions: 'changeConditions',
    }),

    setCon(flag){
      let accept = false;
      switch (flag){
        case 1:
          if(this.changeMin === false)
          {
            this.condition.min = parseInt(this.condition.min);
            if (this.validate(this.condition.min)) {
              if (this.condition.min > this.condition.max)
              {
                this.errorMsg = 'Максимальное кол-во дней не может быть меньше минимального';
                this.errorNum = true;
              }
              else {
                this.changeMin = true;
                this.minText =  'Изменить';
                accept = true;
              }
            }
            else this.errorMsg = 'Минимальное количество дней должно быть целым и положительным числом!';
          }
          else
          {
            this.changeMin = false;
            document.getElementsByClassName('minDays')[0].focus();
            this.minText =  'Подтвердить';
          }
          break;
        case 2:
          if(this.changeMax === false)
          {
            this.condition.max = parseInt(this.condition.max);
            if (this.validate(this.condition.max)) {
              if (this.condition.min > this.condition.max)
              {
                this.errorMsg = 'Максимальное кол-во дней не может быть меньше минимального';
                this.errorNum = true;
              }
              else{
                this.changeMax = true;
                this.maxText =  'Изменить';
                accept = true;
              }
            }
            else this.errorMsg = 'Максимальное количество дней должно быть целым и положительным числом!';
          }
          else
          {
            this.changeMax = false;
            document.getElementsByClassName('maxDays')[0].focus();
            this.maxText =  'Подтвердить';
          }
          break;
        case 3:
          if(this.changeTotal === false)
          {
            this.condition.total = parseInt(this.condition.total);
            if(this.validate(this.condition.total)) {
              this.changeTotal = true;
              this.totalText = 'Изменить';
              accept = true;
            }
            else this.errorMsg = 'Общее количество дней должно быть целым и положительным числом!';
          }
          else
          {
            this.changeTotal = false;
            document.getElementsByClassName('totalDays')[0].focus();
            this.totalText =  'Подтвердить';
          }
          break;
        case 4:
          if(this.changePercent === false)
          {
            this.condition.percents = parseInt(this.condition.percents);
            if(this.validate(this.condition.percents) && this.condition.percents < 100) {
              this.changePercent = true;
              this.percentText = 'Изменить';
              accept = true;
            }
            else this.errorMsg = '% пересечений должен быть целым, положительным и меньшем, чем 100, числом !';
          }
          else
          {
            this.changePercent = false;
            document.getElementsByClassName('percentsDays')[0].focus();
            this.percentText =  'Подтвердить';
          }
          break;
      }

      if (accept){
        this.changeConditions(this.condition);
        this.errorNum = false;
        this.errorMsg = '';
      }
      else this.errorNum = true;
    },

    validate(con){
      return con && con > 0 && con % 1 === 0
    },

  },
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

.conditions div
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