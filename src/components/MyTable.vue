<template>
  <div class="rec"
       v-for="rec in records.filter(p => p.status !== 'Удалено')"
       :key="rec.id"
       @mouseover="visible = rec.id" @mouseleave="visible = false">
      <div class="info" v-bind:style="{background: setColor(rec.status)}">
        <pre>{{rec.start}} - {{rec.end}}      кол-во дней: {{totalDays(rec.start, rec.end)}}          </pre>
        <div class="status" v-bind:style="{borderColor: setBorder(rec.status)}">{{rec.status}}</div>
      </div>
<!--      <button-icon class="edit" v-if="checkEdit(rec.status, rec.id) ">-->
<!--        <img src="@/components/images/EditIcon.png">-->
<!--      </button-icon>-->
      <button-icon class="del" v-if="checkDel(rec.status, rec.id)" @click="Del(rec.id)">
        <img src="@/components/images/DeleteIcon.png">
      </button-icon>
  </div>
</template>

<script>
import ButtonIcon from "@/components/UI/ButtonIcon";
import moment from "moment";
export default {
  name: "MyTable",
  components: {
    ButtonIcon
  },

  data(){
    return{
      visible: false,
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
          return '#81ff8a';
        case 'Ожидание':
          return '#fdc581';
        case 'Использовано':
          return '#8886fc';
        case 'Отказ':
          return '#fc7a7a';
        case 'Отменено':
          return '#9E9E9E';
      }
    },

    setBorder(status){
      switch (status){
        case 'Утверждено':
          return '#22d346';
        case 'Ожидание':
          return '#fa8d0c';
        case 'Использовано':
          return '#5d3ca4';
        case 'Отказ':
          return '#ce2222';
        case 'Отменено':
          return '#777777';
      }
    },

    Del(id){
      this.$emit('Del', id)
    },

    checkDel(status, id){
      if(this.visible !== id) return false;
      if(status !== 'Утверждено' && status !== 'Использовано') return true;
    },

    totalDays(start,end){
      return moment(end, 'DD.MM.YYYY').diff(moment(start, 'DD.MM.YYYY'), 'days');
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
  font-size: 16px;
  font-family: "Times New Roman";
}


.info
{
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding: 5px;
  border-radius: 10px;
  cursor: default;
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
  margin-top: 15px;
}

</style>