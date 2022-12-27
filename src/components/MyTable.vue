<template>
  <div class="rec"
       v-for="rec in records.filter(p => p.status !== 'Удалено')"
       :key="rec.id"
       @mouseover="visible = rec.id" @mouseleave="visible = false">
      <div class="info" v-bind:style="{background: setColor(rec.status)}">
        <pre>{{rec.start}} - {{rec.end}}      кол-во дней: {{totalDays(rec.start, rec.end)}}          </pre>
        <div class="status"
             v-bind:style="{
          borderColor: setBorder(rec.status),
          color: setBorder(rec.status)
        }"
             @mouseover="visibleExplanation = rec.id" @mouseleave="visibleExplanation = false">
          {{rec.status}}
        </div>
      </div>
<!--      <button-icon class="edit" v-if="checkEdit(rec.status, rec.id) ">-->
<!--        <img src="@/components/images/EditIcon.png">-->
<!--      </button-icon>-->
      <button-icon class="del" v-if="checkDel(rec.status, rec.id)" @click="Del(rec.id)">
        <img src="@/images/DeleteIcon.png">
      </button-icon>
    <div class="exp"
         v-if="rec.hasOwnProperty('explanation') && visibleExplanation === rec.id">
      <h4>Причина отказа:</h4>
      {{ rec.explanation }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "@/store";

export default {
  name: "MyTable",

  data(){
    return{
      visible: false,
      visibleExplanation: false,
    }
  },
  props: {
    records: {
      type: Array,
      required: false,
    }
  },

  methods: {
    setColor(status){
      switch (status){
        case 'Утверждено':
          return '#b6faba';
        case 'Ожидание':
          return '#ffd7a6';
        case 'Использовано':
          return '#b2b0ff';
        case 'Отказ':
          return '#ffc4b9';
        case 'Отменено':
          return '#c0c0c0';
      }
    },

    setBorder(status){
      switch (status){
        case 'Утверждено':
          return '#01b026';
        case 'Ожидание':
          return '#d07100';
        case 'Использовано':
          return '#5b30b7';
        case 'Отказ':
          return '#d70000';
        case 'Отменено':
          return '#606060';
      }
    },

    Del(id){
      store.state.selectedID = id;
      store.commit('delVac');
    },

    checkDel(status, id){
      if(this.visible !== id) return false;
      if(status !== 'Утверждено' && status !== 'Использовано') return true;
    },

    totalDays(start,end){
      return moment(end, 'DD.MM.YYYY').diff(moment(start, 'DD.MM.YYYY'), 'days') + 1;
    }
  }
}
</script>

<style scoped>

button-icon
{
  top: 10px;
  right: 10px;
}

img
{
  width: 20px;
  height: 20px;
}

.rec
{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-right: 50px;
  width: 600px;

}

.del
{
  top: 15px;
}


pre
{
  font-size: 14px;
  font-family: "Arial";
  margin-left: 10px;
}


.info
{
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding: 5px;
  border-radius: 10px;
  cursor: default;
  color: #595959;
}

.status
{
  height: fit-content;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  margin-top: 12px;
  margin-right: 10px;
}

.exp
{
  position: absolute;
  width: 250px;
  height: fit-content;
  padding: 10px;
  left: 700px;
  top: 150px;
  text-align: center;
  background: #ffc4b9;
  border-radius: 10px;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25));
  color: #595959;
}

.exp h4
{
  color: #d70000;
}

</style>