<template>
  <table style="text-align: center">
    <tr>
      <th>Ф.И.О. сотрудника</th>
      <th>Даты отпуска</th>
      <th>Всего дней</th>
      <th>Оплачиваемый</th>
      <th>Пересечения</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
    <tr  v-for="vac in requested"
      :key="vac.id">
      <td v-if="vac.status === 'Ожидание'">{{vac.surname}} {{vac.name}} {{vac.lastname}}</td>
      <td v-if="vac.status === 'Ожидание'">{{ vac.start }} - 20.11.2022</td>
      <td v-if="vac.status === 'Ожидание'">{{ vac.total }} дней</td>
      <td v-if="vac.status === 'Ожидание'">{{ vac.paid }}</td>
      <td v-if="vac.status === 'Ожидание'">{{ vac.intersections }}</td>
      <td v-if="vac.status === 'Ожидание'"><button class="answer" style="color: #8482FF;" @click="accept(vac.id)">утвердить</button></td>
      <td v-if="vac.status === 'Ожидание'"><button class="answer" @click="visible=true; this.id = vac.id">отказать</button></td>
      <td v-if="vac.status === 'Ожидание'">
        <button-icon @click="menuVis = !menuVis">
          <img src="@/components/images/Triplets.png">
          <div class="menu" v-show="menuVis">
            <button>
              Все детали отпуска
            </button>
            <button>
              В общем календаре
            </button>
            <button>
              Календарь сотрудника
            </button>
          </div>
        </button-icon>

      </td>
    </tr>
  </table>
  <form @submit.prevent class="failure" v-show="visible">
    <h3>Укажите причину отказа</h3>
    <textarea v-model="explanation.exp"></textarea>
    <my-button @click="explain">Отправить</my-button>
    <my-button @click="visible=false">Отменить</my-button>
  </form>

</template>

<script>
import ButtonIcon from "@/components/UI/ButtonIcon";
import MyButton from "@/components/UI/MyButton";
export default {
  name: "SignatureTable",
  components: {MyButton, ButtonIcon},
  data() {
    return {
      //vacs: this.requested.filter(p => p.status == 'wait'),
      visible: false,
      menuVis: false,
      id: 0,
      explanation: {
        exp: '',
      },
    }
  },
  methods: {
    explain(){
        this.explanation.id = this.id;
        this.$emit('getExplanation', this.explanation);
        this.explanation.exp = '';
        this.visible = false;
    },

    accept(id){
      this.$emit('accepted', id);
    }
  },

  props: {
    requested: {
      type: Array,
      required: false,
    }
  }
}
</script>

<style scoped>
th
{
  border-bottom: 1px solid lightslategray;
  padding-left: 20px;
  padding-right: 20px;
}

td
{
  border-bottom: 1px solid lightslategray;
  height: 30px;
  padding-left: 20px;
  padding-right: 20px;
  overflow: visible;
}

.answer
{
  font-weight: bold;
  border-width: 0;
  background: none;
  cursor: pointer;
}

img
{
  height: 20px;
  width: 20px;
}

.failure
{
  position: absolute;
  top: 80px;
  left: 300px;
  width: 400px;
  height: 300px;
  background: #946cda;
  color: #FCFF7C;
  border-width: 0;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  border-radius: 40px;
  text-align: center;
}


textarea
{
  padding: 10px;
  height: 150px;
  width: 300px;
  border-width: 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  resize: none;
  outline: none;
  font-family: "Times New Roman";
  font-size: 16px;
}

.failure button
{
  height: 30px;
  width: 120px;
  background: #8482FF;
  color: #FCFF7C;
}

.triplets button
{

  width: 100%;
  height: 33.3333%;
  border-width: 0;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  background: #DDDDDD;
}

.triplets button:hover
{
  background: white;
}

.menu
{
  position: relative;
  top: -30px;
  right: 210px;
  width: fit-content;
  height: fit-content;

  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.menu button
{
  width: 200px;
  height: 50px;

  background: #FFFFFF;
  border-width: 0;
  border-radius: 10px;
}

.menu button:hover
{
  background:  #D9D9D9;
}
</style>