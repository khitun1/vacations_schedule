<template>
  <div class="rec"
       v-for="rec in records.filter(p => p.status !== 'Удалено')"
       :key="rec.id"
       @mouseover="visible = rec.id" @mouseleave="visible = false">
      <div class="info" v-bind:style="{background: setColor(rec.status)}">
        <p class="dates">{{rec.start}} - {{rec.end}}</p>
        <p class="amount">кол-во дней: {{totalDays(rec.start, rec.end)}}          </p>
        <div class="status"
             v-bind:style="{
          borderColor: setBorder(rec.status),
          color: setBorder(rec.status)
        }"
             @mouseover="visibleExplanation =  rec.status === 'Отказ';
             explanation = rec.explanation;"
             @mouseleave="visibleExplanation = false">
          {{rec.status}}
        </div>
      </div>
      <button-icon class="del" v-if="checkDel(rec.status, rec.id)" @click="Del(rec.id)">
        <img src="@/images/DeleteIcon.png">
      </button-icon>
  </div>
  <div class="exp"
       v-if="visibleExplanation">
    <h4>Причина отказа:</h4>
    {{ explanation }}
  </div>
</template>

<script>
import {colors} from "@/hooks/colors";
import {block} from "@/hooks/block";

export default {
  name: "MyTable",
  props: {
    records: {
      type: Array,
      required: false,
    }
  },

  setup() {
    const { setColor, setBorder} = colors();
    let { visible, visibleExplanation, explanation, Del, checkDel, totalDays,} = block();
    return {
      visible,
      visibleExplanation,
      explanation,
      Del,
      checkDel,
      totalDays,
      setColor,
      setBorder}
  },
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
  width: 50%;
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
  width: 130px;
}


.info
{
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 87%;
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
    width: 70%;
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