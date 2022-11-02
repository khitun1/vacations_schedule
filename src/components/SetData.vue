<template>
  <h1>Отделы</h1>
  <form @submit.prevent>
    <my-select>
      <option disabled selected value="">Просмотр отделов</option>
      <option v-for="dep in deps"
              :key="dep.id">
        {{dep.name}}
      </option>
    </my-select>
    <my-input class="new" placeholder="Новый отдел"
              v-model="dep"/>
    <my-button class="add" @click="createDep(1)">Добавить</my-button>
    <p class="error" v-show="errorDep">Отдел с таким названием уже существует!</p>
  </form>
  <h1>Типы отпусков</h1>
  <form @submit.prevent>
    <my-select>
      <option disabled selected value="">Просмотр типов отпусков!</option>
      <option v-for="type in types"
              :key="type.id">
        {{type.name}}
      </option>
    </my-select>
    <my-input class="new" placeholder="Новый тип отпуска"
                v-model="type"/>
    <my-button class="add" @click="createDep(2)">Добавить</my-button>
    <p class="error" v-show="errorType">Тип отпуска с таким названием уже существует!</p>
  </form>
  <h1>Назначить условия</h1>
  <div>
    <my-select class="choice" v-model="selectedDep" @change="changeConditions">
      <option selected value="" disabled>Выберите отдел</option>
      <option v-for="dep in deps"
              :key="dep.id">
          {{dep.name}}
      </option>
    </my-select>

    <table style="text-align: left">
      <tr>
        <td>Минимальное кол-во дней отпуска:</td>
        <td><my-input v-model="condition.min" :readonly="changeMin"/> </td>
        <td>
          <my-button @click="setCon(1)">{{minText}}</my-button>
        </td>
      </tr>
      <tr>
        <td>Всего дней для отпуска:</td>
        <td><my-input v-model="condition.total" :readonly="changeTotal"/></td>
        <td><my-button @click="setCon(2)">{{totalText}}</my-button></td>
      </tr>
      <tr>
        <td>% максимально допустимых одновременных отпусков:</td>
        <td><my-input v-model="condition.percent" :readonly="changePercent"/></td>
        <td><my-button @click="setCon(3)">{{percentText}}</my-button></td>
      </tr>
    </table>
    <p class="error" v-show="errorNum"> {{ errorMsg }}</p>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
export default {
  name: "SetData",
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
      changeTotal: true,
      changePercent: true,
      minText: 'Изменить',
      totalText: 'Изменить',
      percentText: 'Изменить',
      errorDep: false,
      errorType: false,
      errorNum: false,
      errorMsg: '',
      condition: {

      },
    }
  },
  components: {
    MySelect,
    MyButton,
    MyInput},
  methods: {

    createDep(flag) {
      this.newOne.id = Date.now();
      this.newOne.flag = flag;
      if(this.dep !== '')
      {
        if(this.deps.find(p => p.name === this.dep))  this.errorDep = true;
        else {
          this.newOne.name = this.dep;
          this.$emit('create', this.newOne);
          this.dep = '';
          this.errorDep = false;
        }
      }
      if(this.type !== '')
      {
        if(this.types.find(p => p.name === this.type))  this.errorType = true;
        else {
          this.newOne.name = this.type;
          this.$emit('create', this.newOne);
          this.type = '';
          this.errorType = false;
        }
      }
      this.newOne = {name: ''};
    },

    changeConditions(){
      this.condition = this.deps.find(p => p.name === this.selectedDep);
    },

    setCon(flag){
      switch (flag){
        case 1:
          if(this.changeMin == false)
          {
            if(parseInt(this.condition.min) && this.condition.min > 0 && this.condition.min % 1 == 0)
            {
              this.$emit('changeCon', this.condition);
              this.errorNum = false;
              this.changeMin = true;
              this.minText =  'Изменить';
            }
            else
            {
              this.errorMsg = 'Минимальное количество дней должно быть целым и положительным числом!';
              this.errorNum = true;
            }
          }
          else
          {
            this.changeMin = false;
            this.minText =  'Подтвердить';
          }
          break;
        case 2:
          if(this.changeTotal == false)
          {
            if(parseInt(this.condition.total) && this.condition.total > 0 && this.condition.min % 1 == 0) {
              this.$emit('changeCon', this.condition);
              this.errorNum = false;
              this.changeTotal = true;
              this.totalText = 'Изменить';
            }
            else
            {
              this.errorMsg = 'Общее количество дней должно быть целым и положительным числом!';
              this.errorNum = true;
            }
          }
          else
          {
            this.changeTotal = false;
            this.totalText =  'Подтвердить';
          }
          break;
        case 3:
          if(this.changePercent == false)
          {
            if(parseInt(this.condition.percent) && this.condition.percent > 0 && this.condition.percent < 100
                && this.condition.min % 1 == 0)
            {
              this.$emit('changeCon', this.condition);
              this.errorNum = false;
              this.changePercent = true;
              this.percentText = 'Изменить';
            }
            else
            {
              this.errorMsg = '% пересечений должен быть целым, положительным и меньшем, чем 100, числом !';
              this.errorNum = true;
            }
          }
          else
          {
            this.changePercent = false;
            this.percentText =  'Подтвердить';
          }
          break;
      }
    },
  },
}
</script>

<style scoped>
.new
{
  margin-left: 100px;
  font-size: 16px;
}

.add
{
  width: 100px;
  height: 30px;

  margin-left: 50px;
  margin-top: 4px;
  top: 3px;
  font-size: 16px;
}

.choice
{
  width: 300px;
  height: 30px;

}

td
{
  padding-right: 30px;
  padding-left: 20px;
}

select
{
  width: 200px;
  text-align: center;
}

button
{
  color: #FCFF7C;
  background: #9492FF;
}

.error
{

  width: fit-content;
  color: red;
  font-weight: bold;
  font-size: larger;
}

</style>