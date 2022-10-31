<template>
  <h1>Отделы</h1>
  <form @submit.prevent>
    <my-select>
      <option disabled selected value="Просмотр отделов">Просмотр отделов</option>
      <option v-for="dep in deps"
              :key="dep.id">
        {{dep.name}}
      </option>
    </my-select>
    <my-input class="new" placeholder="Новый отдел"
              v-model="dep"/>
    <my-button class="add" @click="createDep(1)">Добавить</my-button>
  </form>
  <h1>Типы отпусков</h1>
  <form @submit.prevent>
    <my-select>
      <option disabled selected value="Просмотр типов отпусков">Просмотр типов отпусков</option>
      <option v-for="type in types"
              :key="type.id">
        {{type.name}}
      </option>
    </my-select>
    <my-input class="new" placeholder="Новый тип отпуска"
                v-model="type"/>
    <my-button class="add" @click="createDep(2)">Добавить</my-button>
  </form>
  <h1>Назначить условия</h1>
  <div>
    <my-select class="choice">
      <option selected value="Все сотрудники">Все сотрудники</option>
      <option v-for="dep in deps"
              :key="dep.id">
          {{dep.name}}
      </option>

    </my-select>
    <table style="text-align: left">
      <tr>
        <td>Минимальное кол-во дней отпуска:</td>
        <td>7</td>
        <td><my-button>изменить</my-button></td>
      </tr>
      <tr>
        <td>Всего дней для отпуска:</td>
        <td>30</td>
        <td><my-button>изменить</my-button></td>
      </tr>
      <tr>
        <td>% максимально допустимых одновременных отпусков:</td>
        <td>30</td>
        <td><my-button>изменить</my-button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
export default {
  name: "SetData",
  data() {
    return {
      dep: '',
      type: '',
      newOne: {name: ''},
    }
  },
  components: {
    MySelect,
    MyButton,
    MyInput},
  methods: {
    createDep(flag){
      this.newOne.id = Date.now();
      this.newOne.flag = flag;
      this.newOne.name = this.dep ===''? this.type: this.dep;
      this.$emit('create', this.newOne);
      flag == 1? this.dep = '': this.type = '';
      this.newOne = {name: ''};
    }
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

  }
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
</style>