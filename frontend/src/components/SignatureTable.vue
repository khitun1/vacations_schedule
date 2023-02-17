<template>
  <div class="person" v-for="u in uniq" :key="u">
    {{u}}
    <div class="rec"
         v-for="vac in requested.filter(p => p.status === 'Ожидание'
         && (p.surname + ' ' + p.first_name + ' ' + p.last_name) === u)"
         :key="vac.id"
         @mouseover="visible=vac.id" @mouseleave="visible = false"
         tabindex="-1">
      <div class="info" v-bind:style="{background: vac.intersections === 'Да'? '#ffd8d1': '#d9ccff'}">
        <button class="withOutInter" @click="showData(vac); $emit('showRec', index);">
          <p style="width: 150px">
            {{ vac.start }} - {{ vac.end }}
          </p>
          <p style="width: 130px">
            кол-во дней: {{totalDays(vac.start, vac.end)}}
          </p>
          <p style="width: 130px">
            {{vac.paid ? 'Оплачиваемый': 'Не оплачиваемый'}}
          </p>
        </button>
        <p class="inters" style="margin-left: 0"
           v-bind:style="vac.intersections === 'Да'? {border: '2px solid #d70000', color: '#d70000'}: 'none'">
          {{ vac.intersections === 'Да' ? "Перeсечение" : "" }}
        </p>
        <div class="btns">
          <button class="dec"
                  style="color: #36f64a; background: #a19fff"
                  v-if="vac.intersections !== 'Да'"
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
import {showDataHook} from "@/hooks/showData";
import {watch} from "vue";
import {block} from "@/hooks/block";
export default {
  name: "SignatureTable",

  setup(props) {
    let {
      uniq,
      index,
      prevPerson,
      prevRec,
      requested,
      visible,
      showData,
    } = showDataHook();

    const {totalDays} =  block();

    watch(() => props.clicked, () => {
      if (uniq.value.indexOf(props.clickedName) !== -1)
      {
        let person;
        if (prevPerson.value !== null){
          if (prevRec.value >= 0) {
            person = document.getElementsByClassName('person')[prevPerson.value];
            person.getElementsByClassName('rec')[prevRec.value].style.filter = 'none';
          }
        }
        prevPerson.value = uniq.value.indexOf(props.clickedName);
        prevRec.value = props.clickedNumber - requested.value.filter(p =>
            (p.surname + ' ' + p.first_name + ' ' + p.last_name === props.clickedName)
            && (p.status === 'Использовано' || p.status === 'Утверждено')).length;
        if (prevRec.value >= 0) {
          person = (document.getElementsByClassName('person')[prevPerson.value]);
          person.getElementsByClassName('rec')[prevRec.value].focus();
          person.getElementsByClassName('rec')[prevRec.value].style.filter = 'drop-shadow(0 2px 12px #7951f5)';
        }
      }
    })

    return {
      uniq,
      index,
      prevPerson,
      prevRec,
      requested,
      visible,
      showData,
      totalDays,
    }
  },
  props: {
    clickedName: {
      type: String,
    },
    clickedNumber: {
      type: Number,
    },
    clicked: {
      type: Number,
    },
  },
}
</script>

<style scoped>
.rec
{
  display: flex;
  align-items: center;
  margin: 10px 0 10px 10px;
  width: 95%;
  background: none;
  border-width: 0;
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
  color: #595959;
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
.dec
{
  margin-left: 20px;
  height: fit-content;
  font-weight: bold;
  font-size: 22px;
  border-width: 0;
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
  margin-left: 15px;
  width: 65%;
}
.rec:focus
{
  filter: drop-shadow(0 2px 12px #7951f5);
}
.btns
{
  position: absolute;
  right: 10px;
  text-align: right;
}
@media screen and (max-width: 1400px) {
  .inters {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    .person {
      width: 100%;
    }
    @media screen and (max-width: 580px) {
      .person {
        width: 108%;
      }
      @media screen and (max-width: 540px) {
        .info {
          height: 65px;
        }
      }
    }
  }
}
</style>