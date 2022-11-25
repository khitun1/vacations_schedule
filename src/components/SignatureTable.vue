<template>
  <div class="person" v-for="u in uniq" :key="u">
    {{u}}
    <div class="rec"
         v-for="vac in requested.filter(p => p.status === 'Ожидание'
         && (p.surname + ' ' + p.name + ' ' + p.lastname) === u)"
         :key="vac.id"
         @mouseover="visible=vac.id" @mouseleave="visible = false"
          tabindex="-1">
      <div class="info" v-bind:style="{background: vac.intersections === 'Нет'? '#d9ccff': '#ffd8d1'}">
        <button class="withOutInter" @click="showData(vac.surname, vac.name, vac.lastname, vac.number)">
<!--          <p class="name">-->
<!--            {{vac.surname}} {{vac.name}} {{vac.lastname}}-->
<!--          </p>-->
          <p style="width: 150px">
            {{ vac.start }} - {{ vac.end }}
          </p>
          <p style="width: 130px">
            кол-во дней: {{totalDays(vac.start, vac.end)}}
          </p>
          <p style="width: 130px">
            {{vac.paid === 'Да'? 'Оплачиваемый': 'Не оплачиваемый'}}
          </p>
        </button>
        <p class="inters" style="margin-left: 0"
           v-bind:style="vac.intersections === 'Да'? {border: '2px solid #d70000', color: '#d70000'}: 'none'">
          {{ vac.intersections === 'Да' ? "Перeсечение" : "" }}
        </p>
        <div class="btns">
          <button class="dec"
                  style="color: #36f64a; background: #a19fff"
                  v-if="vac.intersections === 'Нет'"
                  @click="this.$emit('accepted', vac.id)"
                  title="Утвердить">
            &#10004;
          </button>
          <button class="dec"
                  style="color: #ff2323"
                  v-bind:style="vac.intersections === 'Да'? {background: '#ff9e9e'}: {background:'#a19fff'}"
                  @click="this.$emit('showWindow', vac.id)"
                  title="Отказать">
            &#10006;
          </button>
        </div>
      </div>
    </div>
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
      index: [],
    }
  },

  computed: {
    uniq: function () {
      let u = new Set();
      this.requested.filter(p => p.status === "Ожидание").forEach(p => u.add(p.surname + ' ' + p.name + ' ' + p.lastname));
      u = Array.from(u);
      return u;
    },
  },

  watch: {
    clicked(){
      let person = document.getElementsByClassName('person')[this.uniq.indexOf(this.clickedName)];
      person.getElementsByClassName('rec')[this.clickedNumber].focus();
    },
  },


  methods: {
    totalDays(start,end){
      return moment(end, 'DD.MM.YYYY').diff(moment(start, 'DD.MM.YYYY'), 'days');
    },

    showData(surname, name, lastname, num){
      this.index[0] = surname + ' ' + name + ' ' + lastname;
      this.index[1] = num - 1;
      this.$emit('showRec', this.index);
    },

  },

  props: {
    requested: {
      type: Array,
      required: false,
    },

    clickedName: {
      type: String,
      required: false,
    },

    clickedNumber: {
      type: Number,
      required: false,
    },

    clicked: {
      type: Number,
      required: false,
    },

  },
}
</script>

<style scoped>

.rec
{
  display: flex;
  margin: 10px 0 10px 10px;
  width: 100%;
  background: none;
  border-width: 0;
  /*filter: brightness(1.5);*/
  /*filter: contrast(200%);*/
}

.info
{
  display: flex;
  width: 97%;
  height: 40px;
  align-items: center;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  cursor: default;
  border-width: 0;
}

.withOutInter
{
  display: flex;
  justify-content: flex-start;
  background: none;
  width: 75%;
  border-width: 0;
}

p
{
  margin-right: 30px;
  text-align: left;
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
  margin-left: 10px;
  text-align: left;
}

.dec
{
  margin-left: 20px;
  height: fit-content;
  font-weight: bold;
  font-size: 22px;
  border-width: 0;
  background: gray;
  cursor: pointer;
  border-radius: 5px;
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
  font-size: 16px;
}

.person
{
  padding: 15px;
  background: #efefef;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 63%;
}

.rec:focus
{
  filter: drop-shadow(0 2px 12px #7951f5);
}

.btns
{
  width: 180px;
  text-align: right;
}

</style>