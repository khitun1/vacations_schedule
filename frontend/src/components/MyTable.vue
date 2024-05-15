<template>
  <div class="rec"
       v-for="rec in records.filter(p => p.status !== 'Удалено')"
       :key="rec.id"
       @mouseover="visible = rec.id"
       @mouseleave="visible = false">
      <div class="info"
           :style="{background: setColor(rec.status)}">
        <p class="dates">
          {{rec.start}} - {{rec.end}}
        </p>
        <p class="amount">
          кол-во дней всего: {{totalDays(rec.start, rec.end)}}
        </p>
        <p class="amount offs">
          кол-во выходных дней: {{daysOff(rec.start, rec.end)}}
        </p>
        <div class="status"
             :style="{
              borderColor: setBorder(rec.status),
              color: setBorder(rec.status)
              }"
             @mouseover="visibleExplanation = rec.status === 'Отказ';
             explanation = rec.explanation;"
             @mouseleave="visibleExplanation = false">
          {{rec.status}}
        </div>
      </div>
      <button-icon class="del"
          v-if="checkDel(rec.status, rec.id)"
          @click="Del(rec.id)">
        <img src="@/images/DeleteIcon.png"
             alt="delete icon">
      </button-icon>
  </div>
  <div class="exp"
       v-if="visibleExplanation">
    <h4>
      Причина отказа:
    </h4>
    {{ explanation }}
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {daysOff, totalDays} from "@/components/Options";
import ButtonIcon from "@/components/UI/ButtonIcon.vue";

defineProps({
  records: {
    type: Array,
    required: false,
  }
})
const store = useStore();
const setColor = (status) => {
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
}
const setBorder = (status) => {
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
}
const visible = ref(false);
const visibleExplanation = ref(false);
const explanation = ref('');
const currentUser = computed(() => store.state.my.currentUser)
const Del = (id) => {
  store.dispatch('deleteVacation', id);
}
const checkDel = (status, id) => {
  if (visible.value !== id) {
    return false;
  }
  if ((status === 'Утверждено' && currentUser.value.allow && !currentUser.value.acceptAll) ||
      status === 'Отказ') {
    return true;
  }
}
</script>

<style scoped lang="scss">

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
  height: fit-content;
  width: 90%;
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

.dates {
  width: 200px;
}

.amount {
  width: 25%;
}


.info
{
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 87%;
  height: 60px;
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
  margin-top: 14px;
  margin-right: 10px;
  width: 100px;
}

.exp
{
  position: fixed;
  top: 30%;
  right: 20%;
  width: 250px;
  height: fit-content;
  padding: 10px;
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

@media screen and (max-width: 1400px) {
  .rec {
    width: 90%;
  }
  .exp {
    right: 5%;
  }
  @media screen and (max-width: 1200px) {
      .exp {
        right: 3%;
        width: 200px;
      }
    @media screen and (max-width: 1000px) {
      .rec {
        width: 80%;
      }
      .exp {
        width: 200px;
      }
      @media screen and (max-width: 780px) {
        .rec {
          width: 80%;
        }

        .exp {
          right: 2%;
          width: 180px;
        }

        @media screen and (max-width: 715px) {
          .rec {
            width: 100%;
          }

          .amount {
            display: none;
          }
          .exp {
            display: none;
          }
        }
      }
    }
  }
}





</style>