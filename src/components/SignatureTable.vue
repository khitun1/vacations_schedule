<template>
  <div class="rec"
      v-for="vac in requested.filter(p => p.status === 'Ожидание')"
    :key="vac.id"
     @mouseover="visible=vac.id" @mouseleave="visible = false">
      <div class="info" v-bind:style="{background: vac.intersections === 'Нет'? '#8886fc': '#fc7a7a'}">
        <div class="withOutInter">
          <p class="name">
            {{vac.surname}} {{vac.name}} {{vac.lastname}}
          </p>
          <p>
            {{ vac.start }} - {{ vac.end }}
          </p>
          <p style="width: 130px">
            кол-во дней: {{totalDays(vac.start, vac.end)}}
          </p>
          <p style="width: 130px">
            {{vac.paid === 'Да'? 'Оплачиваемый': 'Не оплачиваемый'}}
          </p>
        </div>
        <p class="inters"
           v-bind:style="vac.intersections === 'Да'? {border: '2px solid red'}: 'none'">
          {{ vac.intersections === 'Да' ? "Перeсечение" : "" }}
        </p>
      </div>
    <button style="color: #17c42c" v-if="visible === vac.id && vac.intersections === 'Нет'"
            @click="this.$emit('accepted', vac.id)"
            title="Утвердить">
      &#10004;
    </button>
    <button style="color: #fd2626" v-if="visible === vac.id"
            @click="this.$emit('showWindow', vac.id)"
            title="Отказать">
      &#10006;
    </button>
  </div>

</template>

<script>
import moment from "moment";
export default {
  name: "SignatureTable",

  data() {
    return {
      menuVisible: 0,
      visible: false,
    }
  },
  methods: {

    totalDays(start,end){
      return moment(end, 'DD.MM.YYYY').diff(moment(start, 'DD.MM.YYYY'), 'days');
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

.rec
{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-right: 50px;
  width: 1200px;
}

.info
{
  display: flex;
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
  cursor: default;
}

.withOutInter
{
  display: flex;
  justify-content: space-between;
}

p
{
  margin-right: 44px;
}

.inters
{
  height: fit-content;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  margin-top: 15px;
  margin-right: 5px;
}

.name
{
  width: 250px;
}

button
{
  margin-left: 20px;
  height: fit-content;
  margin-top: 15px;
  font-weight: bold;
  font-size: 22px;
  border-width: 0;
  background: none;
  cursor: pointer;
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
  font-family: "Times New Roman";
  font-size: 16px;
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


</style>