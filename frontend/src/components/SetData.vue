<template>
<!--    <my-button @click="$store.state.visibleAddDep = true"-->
<!--                v-show="!$store.getters.visibleAdminWindow">-->
<!--      Отделы-->
<!--    </my-button>-->
<!--    <form @submit.prevent v-show="$store.state.visibleAddDep">-->
<!--      <button-back @click="$store.state.visibleAddDep = false"/>-->
<!--      <h2>Отделы</h2>-->
<!--      <div>-->
<!--        <my-input class="new" placeholder="Найти или добавить отдел"-->
<!--                  v-model="dep"/>-->
<!--        <my-button class="add"-->
<!--                   @click="cursor ? create() : false"-->
<!--                   :style="{cursor: (cursor && this.dep !== '') ? 'pointer' : 'default'}">-->
<!--          Добавить отдел-->
<!--        </my-button>-->
<!--      </div>-->
<!--      <h2>Список отделов</h2>-->
<!--      <div class="rec"-->
<!--           v-for="dep in activeDeps" :key="dep.id">-->
<!--        <input id="nameDep" class='classNameDep' name=dep.name :readonly="readDep" :value="dep.name">-->
<!--        <button-icon class="edit"-->
<!--                       v-if="changeDep !== dep.id"-->
<!--                       @click="focus(dep.id, dep.name, 'dep')">-->
<!--          <img src="@/images/EditIcon.png">-->
<!--        </button-icon>-->
<!--        <button class="accept"-->
<!--                  v-if="changeDep === dep.id" @click="changeNameDep(dep.id)"-->
<!--                  :style="{cursor: (cursorChange) ? 'pointer' : 'default'}">-->
<!--            &#10004;-->
<!--        </button>-->
<!--        </div>-->
<!--    </form>-->

<!--    <my-button @click="$store.state.visibleAddType = true"-->
<!--               v-show="!$store.getters.visibleAdminWindow">-->
<!--      Типы отпусков-->
<!--    </my-button>-->

<!--    <form @submit.prevent v-show="$store.state.visibleAddType">-->
<!--      <button-back @click="$store.state.visibleAddType = false"/>-->
<!--      <h2>Добавить тип отпуска</h2>-->
<!--      <div>-->
<!--        <my-input class="new" placeholder="Найти или добавить тип отпуска"-->
<!--                  v-model="type"/>-->
<!--        <my-button class="add" @click="cursor ? create() : false"-->
<!--                   :style="{cursor: (cursor && this.type !=='') ? 'pointer' : 'default'}">-->
<!--          Добавить-->
<!--        </my-button>-->
<!--      </div>-->
<!--      <h2>Типы отпусков</h2>-->
<!--        <div class="rec"-->
<!--             v-for="type in activeTypes" :key="type.id">-->
<!--          <input id="nameType" class="classNameType" :readonly="readType" :value="type.name">-->
<!--          <button-icon class="edit"-->
<!--                       v-if="changeType !== type.id"-->
<!--                       @click="focus(type.id, type.name, 'type')">-->
<!--            <img src="@/images/EditIcon.png">-->
<!--          </button-icon>-->
<!--          <button class="accept"-->
<!--                  v-if="changeType === type.id" @click="changeNameType(type.id)"-->
<!--                  :style="{cursor: (cursorChange) ? 'pointer' : 'default'}">-->
<!--            &#10004;-->
<!--          </button>-->
<!--        </div>-->
<!--    </form>-->

    <my-button @click="$store.state.visibleChangeCon = true"
               v-show="!$store.getters.visibleAdminWindow">
      Изменить условия
    </my-button>

    <div v-show="$store.state.visibleChangeCon" class="con">
      <button-back @click="$store.state.visibleChangeCon = false"/>
      <h2>Назначить условия</h2>
      <VueMultiselect class="selectDep"
                      v-model="selectedDep"
                      :options="namesDeps"
                      placeholder="Выберите отдел"
                      :show-no-results="false"
                      :show-labels="false"
                      @close="changeConditions"/>
      <div class="conditions">
        <div>
          <p>Минимальное кол-во дней отпуска:</p>
          <my-input v-model="condition.min" :readonly="changeMin" class="minDays"/>
          <my-button @click="selectedDep !== ''? setCon(1): 0">{{minText}}</my-button>
        </div>
        <div>
          <p>Максимальное кол-во дней отпуска:</p>
          <my-input v-model="condition.max" :readonly="changeMax" class="maxDays"/>
          <my-button @click="selectedDep !== ''? setCon(2): 0">{{maxText}}</my-button>
        </div>
        <div>
          <p>Всего дней для отпуска:</p>
          <my-input v-model="condition.total" :readonly="changeTotal" class="totalDays"/>
          <my-button @click="selectedDep !== ''? setCon(3): 0">{{totalText}}</my-button>
        </div>
        <div>
          <p>% максимально допустимых одновременных отпусков:</p>
          <my-input v-model="condition.percent" :readonly="changePercent" class="percentsDays"/>
          <my-button @click="selectedDep !== ''? setCon(4): 0">{{percentText}}</my-button>
        </div>
      </div>
      <p class="error" v-show="errorNum"> {{ errorMsg }}</p>
    </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import store from "@/store";

export default {
  name: "SetData",

  components: {
    VueMultiselect,
  },

  computed:{
    searchDep: function(){
      return new RegExp('^' + this.dep + '.+');
    },

    activeDeps: function (){
      if (this.dep === '')  return [];
      return this.deps.filter(p => this.searchDep.test(p.name) || p.name === this.dep);
    },

    searchType: function(){
      return new RegExp('^' + this.type + '.+');
    },

    activeTypes: function (){
      if (this.type === '')  return [];
      return this.types.filter(p => this.searchType.test(p.name) || p.name === this.type);
    },

    cursor: function(){
      return !(this.deps.find(p => p.name === this.dep) || this.types.find(p => p.name === this.type));
    },

    namesDeps: function (){
      let arr = [];
      this.deps.forEach(p => arr.push(p.name));
      return arr;
    },
  },

  props: {
    deps: {
      type: Array,
      required: false,
    },

    types: {
      type: Array,
      required: false,
    },
  },

  data() {
    return {
      dep: '',
      type: '',
      newOne: {name: ''},
      selectedDep: '',
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
      condition: {

      },
    }
  },

  methods: {
    focus(id, name, type) {
      if (type === 'dep') {
        const index = this.activeDeps.findIndex(p => p.name === name);
        document.getElementsByClassName('classNameDep')[index].focus();
        this.changeDep = id;
        this.readDep = false;
      }
      else {
        const index = this.activeTypes.findIndex(p => p.name === name);
        document.getElementsByClassName('classNameType')[index].focus();
        this.changeType = id;
        this.readType = false;
      }
    },

    create() {
      this.newOne.id = Date.now();
      if(this.dep !== '')
      {
        this.newOne.name = this.dep;
        this.newOne.min = 7;
        this.newOne.total = 30;
        this.newOne.percent = 30;
        store.commit('addDep', this.newOne);
        this.dep = '';

      }
      if(this.type !== '')
      {
        this.newOne.name = this.type;
        store.commit('addType', this.newOne);
        this.type = '';
      }
      this.newOne = {name: ''};

    },

    changeConditions(){
      this.condition = this.deps.find(p => p.name === this.selectedDep);
    },

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
            this.condition.percent = parseInt(this.condition.percent);
            if(this.validate(this.condition.percent) && this.condition.percent < 100) {
              this.changePercent = true;
              this.percentText = 'Изменить';
              accept = true;
            }
            else this.errorMsg = '% пересечений должен быть целым, положительным и меньшем, чем 100, числом !';
          }
          else
          {
            this.changePercent = false;
            document.getElementsByClassName('percentsDaysDays')[0].focus();
            this.percentText =  'Подтвердить';
          }
          break;
      }

      if (accept){
        store.commit('changeConditions', this.condition);
        this.errorNum = false;
        this.errorMsg = '';
      }
      else this.errorNum = true;
    },

    validate(con){
      return con && con > 0 && con % 1 === 0
    },

    changeNameDep(id){
      let name = document.getElementById('nameDep').value;
      const change = {
        id: id,
        name: name,
      }
      if (store.state.departments.find(p => p.id === id).name !== name &&
              store.state.departments.find(p => p.name === name) === undefined) {
        store.commit('changeDepName', change);
      }
      this.readDep = true;
      this.changeDep = true;
    },

    changeNameType(id){
      let name = document.getElementById('nameType').value;
      const change = {
        id: id,
        name: name,
      }
      if (store.state.types.find(p => p.id === id).name !== name &&
          store.state.types.find(p => p.name === name) === undefined) {
        store.commit('changeTypeName', change);
      }
      this.readType = true;
      this.changeType = true;
    },
  },
}
</script>

<style scoped>
.new
{
  margin-left: 45px;
  font-size: 16px;
  width: 250px;
}

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

.add
{
  margin-left: 50px;
  margin-top: 4px;
  width: 200px;
  top: 3px;
  font-size: 16px;
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

.rec
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 250px;
  border-radius: 10px;
  height: 50px;
  background: #e3e3e3;
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

.accept
{
  background: #cccccc;
  border-width: 0;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
}

.edit
{
  text-align: right;
}

.rec input
{
  background: none;
  border-width: 0;
  height: 80%;
  font-size: 16px;
  font-family: "Times New Roman";
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

</style>