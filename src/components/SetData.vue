<template>
    <my-button @click="visibleDep = true; this.$emit('hideUser', true)"
                v-show="hideSet || visibleCon || visibleType? false: !visibleDep">
      Отделы
    </my-button>
    <form @submit.prevent v-show="visibleDep">
      <button-icon class="back" @click="visibleDep = false; this.$emit('hideUser', false)">
        <img src="@/components/images/BackIcon.png">
      </button-icon>
      <h2>Отделы</h2>
      <div>
        <my-input class="new" placeholder="Найти или добавить отдел"
                  v-model="dep"/>
        <my-button class="add"
                   @click="cursor ? createDep(1) : false"
                   :style="{cursor: (cursor && this.dep !== '') ? 'pointer' : 'default'}">
          Добавить отдел
        </my-button>
<!--        <my-button class="cancel" @click="visibleDep = false; this.$emit('hideUser', false)">Закрыть</my-button>-->
      </div>
      <h2>Список отделов</h2>
        <div class="rec"
             v-for="dep in activeDeps" :key="dep.id">
            <input id="nameDep" :readonly="readDep" :value="dep.name">
          <button-icon class="edit"
                       v-if="changeDep !== dep.id"
                       @click="changeDep = dep.id; readDep = false">
            <img src="@/components/images/EditIcon.png">
          </button-icon>
          <button class="accept"
                  v-if="changeDep === dep.id" @click="changeNameDep(dep.id, dep.name); readDep = true;"
                  :style="{cursor: (cursorChange) ? 'pointer' : 'default'}">
            &#10004;
          </button>
        </div>
    </form>

    <my-button @click="visibleType = true; this.$emit('hideUser', true)"
               v-show="hideSet || visibleDep || visibleCon? false: !visibleType">
      Типы отпусков
    </my-button>

    <form @submit.prevent v-show="visibleType">
      <button-icon class="back" @click="visibleType = false; this.$emit('hideUser', false)">
        <img src="@/components/images/BackIcon.png">
      </button-icon>
      <h2>Добавить тип отпуска</h2>
      <div>
        <my-input class="new" placeholder="Найти или добавить тип отпуска"
                  v-model="type"/>
        <my-button class="add" @click="cursor ? createDep(2) : false"
                   :style="{cursor: (cursor && this.type !=='') ? 'pointer' : 'default'}"
        >Добавить
        </my-button>
<!--        <my-button class="cancel" @click="visibleType = false; this.$emit('hideUser', false)">Закрыть</my-button>-->
      </div>
      <h2>Типы отпусков</h2>
        <div class="rec"
             v-for="type in activeTypes" :key="type.id">
          <input id="nameType" :readonly="readType" :value="type.name">
          <button-icon class="edit"
                       v-if="changeType !== type.id"
                       @click="changeType = type.id; readType = false">
            <img src="@/components/images/EditIcon.png">
          </button-icon>
          <button class="accept"
                  v-if="changeType === type.id" @click="changeNameType(type.id, type.name); readType = true;"
                  :style="{cursor: (cursorChange) ? 'pointer' : 'default'}">
            &#10004;
          </button>
        </div>
    </form>

    <my-button @click="visibleCon = true; this.$emit('hideUser', true)"
               v-show="hideSet || visibleDep || visibleType? false: !visibleCon">
      Изменить условия
    </my-button>

    <div v-show="visibleCon" class="con">
      <button-icon class="back"
                   @click="visibleCon = false; this.$emit('hideUser', false)">
        <img src="@/components/images/BackIcon.png">
      </button-icon>
      <h2>Назначить условия</h2>
      <VueMultiselect class="selectDep"
                      v-model="selectedDep"
                      :options="namesDeps"
                      placeholder="Выберите отдел"
                      :show-no-results="false"
                      :show-labels="false"
                      @close="changeConditions"/>
<!--      <my-select class="choice" v-model="selectedDep" @change="changeConditions">-->
<!--        <option selected value="" disabled>Выберите отдел</option>-->
<!--        <option v-for="dep in deps"-->
<!--                :key="dep.id">-->
<!--          <p>{{dep.name}}</p>-->
<!--        </option>-->
<!--      </my-select>-->

      <div class="conditions">
        <div>
          <p>Минимальное кол-во дней отпуска:</p>
          <my-input v-model="condition.min" :readonly="changeMin"/>
          <my-button @click="selectedDep !== ''? setCon(1): 0">{{minText}}</my-button>
        </div>
        <div>
          <p>Максимальное кол-во дней отпуска:</p>
          <my-input v-model="condition.max" :readonly="changeMax"/>
          <my-button @click="selectedDep !== ''? setCon(2): 0">{{maxText}}</my-button>
        </div>
        <div>
          <p>Всего дней для отпуска:</p>
          <my-input v-model="condition.total" :readonly="changeTotal"/>
          <my-button @click="selectedDep !== ''? setCon(3): 0">{{totalText}}</my-button>
        </div>
        <div>
          <p>% максимально допустимых одновременных отпусков:</p>
          <my-input v-model="condition.percent" :readonly="changePercent"/>
          <my-button @click="selectedDep !== ''? setCon(4): 0">{{percentText}}</my-button>
        </div>
      </div>
      <p class="error" v-show="errorNum"> {{ errorMsg }}</p>
<!--      <my-button @click="visibleCon = false; this.$emit('hideUser', false)">Закрыть</my-button>-->
    </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
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

    hideSet: {
      type: Boolean,
      required: true,
    }
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

    createDep(flag) {
      this.newOne.id = Date.now();
      this.newOne.flag = flag;
      if(this.dep !== '')
      {
          this.newOne.name = this.dep;
          this.$emit('create', this.newOne);
          this.dep = '';

      }
      if(this.type !== '')
      {
          this.newOne.name = this.type;
          this.$emit('create', this.newOne);
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
            this.minText =  'Подтвердить';
          }
          break;
        case 2:
          if(this.changeMax === false)
          {
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
            this.maxText =  'Подтвердить';
          }
          break;
        case 3:
          if(this.changeTotal === false)
          {
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
            this.totalText =  'Подтвердить';
          }
          break;
        case 4:
          if(this.changePercent === false)
          {
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
            this.percentText =  'Подтвердить';
          }
          break;
      }

      if (accept){
          this.$emit('changeCon', this.condition);
          this.errorNum = false;
          this.errorMsg = '';
      }
      else this.errorNum = true;
    },

    validate(con){
      return (parseInt(con) && con > 0 && con % 1 === 0)
    },

    changeNameDep(id, name){
      if (this.deps.find(p => p.name === document.getElementById('nameDep').value) &&
          name !== document.getElementById('nameDep').value) {
        this.changeDep = true;
        return;
      }
      this.newOne.id = id;
      this.newOne.name = document.getElementById('nameDep').value;
      this.$emit('changeNameDep', this.newOne);
      this.changeDep = true;
      this.cursorChange = true;
      this.newOne = {name: ''};
    },

    changeNameType(id, name){
      if (this.types.find(p => p.name === document.getElementById('nameType').value) &&
          name !== document.getElementById('nameType').value) {
        this.changeType = true;
        return;
      }
      this.newOne.id = id;
      this.newOne.name = document.getElementById('nameType').value;
      this.$emit('changeNameType', this.newOne);
      this.changeType = true;
      this.cursorChange = true;
      this.newOne = {name: ''};
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

.add, .cancel
{
  margin-left: 50px;
  margin-top: 4px;
  width: 200px;
  top: 3px;
  font-size: 16px;
}

.choice
{
  width: 300px;
  height: 30px;

}

select
{
  width: 200px;
  text-align: center;
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

.back
{
  width: fit-content;
  height: 25px;
  border-radius: 100%;
  padding: 0px 0px 0px;
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

.back:hover
{
  background: #c5c5c5;
}

</style>