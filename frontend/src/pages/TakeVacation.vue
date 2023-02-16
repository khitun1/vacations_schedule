<template>
  <sample-page :choice="'takeVacation'">
    <h2 style="margin-top: 40px">Календарь отпусков</h2>
    <div style="display: flex">
      <v-date-picker is-range :rows="rows" :columns="columns" v-model="date"
                     @click="showWish"
                     :attributes="attrs"
                     :disabled-dates="dis"
                     class="calendar"
                      :min-date="minDate"/>
      <div class="infoBar">
        <h2 style="margin-top: -20px">Осталось отпускных дней: {{left}}</h2>
        <div class="prog">
          <div class="progBar"/>
        </div>
      </div>
    </div>
    <div class="wishesInfo">
      <h2>Выбранные даты</h2>
      <div class="wishes">
        <div class="wishesDates"
             v-for="wish in wishes" :key="wish.id">
          <p>{{wish.start}} - {{wish.end}}</p>
          <p class="pay">Оплачиваемость</p>
          <label class="checkbox">
            <input type="checkbox" class="check_input" v-model="paid[wishes.indexOf(wish)]"/>
            <div class="check_div"/>
          </label>
          <my-button @click="send(wish)">Отправить заявку</my-button>
          <my-button @click="del(wish.id)">Удалить</my-button>
        </div>
        <my-button v-if="wishes.length > 1"
                   style="padding: 5px 15px"
                   @click="sendAll">
          Отправить все
        </my-button>
      </div>
    </div>
    <div class="colours">
      <div class="colour">
        <div style="background: #9deab7"/>
        <p>Одобрено</p>
      </div>
      <div class="colour">
        <div style="background: #fde1b2"/>
        <p>Ожидание</p>
      </div>
      <div class="colour">
        <div style="background:#feb2b2"/>
        <p>Выбран лимит отдела</p>
      </div>
      <div class="colour">
        <div style="background: #e2e8f0"/>
        <p>Желаемые даты</p>
      </div>
    </div>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import {preventInters} from "@/hooks/preventInters";
import {calendar} from "@/hooks/calendar";
import {progBar} from "@/hooks/progBar";
import {wishesAndVacations} from "@/hooks/wishesAndVacations";

export default {
  name: "TakeVacation",

  setup() {
    let { len, inters, intersInUsersDep, currentUser, findIntersection } = preventInters();
    let { rows, columns, attrs, dis, minDate } = calendar(inters);
    let {width} = progBar();
    let {date, paid, wishes, left,
      send, sendAll, showWish, del,} = wishesAndVacations(currentUser, findIntersection, intersInUsersDep);

    return {
      findIntersection,
      len,
      intersInUsersDep,
      currentUser,
      rows,
      columns,
      attrs,
      dis,
      minDate,
      width,
      date,
      paid,
      wishes,
      left,
      send,
      sendAll,
      showWish,
      del,
    }
  },

  components:{
    SamplePage,
  },

}
</script>

<style scoped>

h2
{
  margin-left: 20px;
}

.wishes
{
  position: relative;
  width: 80%;
  height: fit-content;
  min-height: 200px;
  background: white;
  text-align: center;
  margin-top: 0;
  left: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  border-width: 0;
  padding: 10px 5px 5px;
}

.prog
{
  width: 300px;
  height: 20px;
  margin-left: 50px;
  margin-bottom: 20px;
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
}

.progBar
{
  width: v-bind(width);
  background: #a09fff;
  height: 100%;
  border-radius: 100px;
}
.checkbox
{
  position: relative;
  top: 7px;
  left: 0;
}

.check_div
{
  top: -3px;
  left: 0;
  width: 60px;
  height: 30px;
  border-radius: 100px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.check_input
{
  display: none;
}

.check_div:before
{
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  background: #8482FF;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.check_input:checked ~ .check_div
{
  background: #8482FF;
}

.check_input:checked ~ .check_div:before
{
  background: white;
  left: 33px;
}

.check_div:hover
{
  filter: brightness(1.2);
}

.wishesDates
{
  display: flex;
  flex-direction: row;
  background: #f3f3f3;
  height: 48px;
  justify-content: space-between;
  flex-flow: row wrap;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Arial";
  border-radius: 5px;
  margin-bottom: 5px;
}

.wishesDates button
{
  top: -9px;
  margin-bottom: 2px;
  padding: 0 15px 2px;
  height: 27px;
}

.colours
{
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  position: absolute;
  top: 100px;
  left: 30px;
  width: fit-content;
}

.colour div
{
  width: 30px;
  height: 30px;
}

.colour
{
  display: flex;
  margin-right: 10px;
}

.colour p
{
  position: relative;
  margin-left: 10px;
  font-size: 16px;
  top: -10px;
}

.infoBar {
  margin: -20px 0 0 30px;
}

.calendar {
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  top: 60px;
  left: 10px;
}

.wishesInfo {
  margin-top: 100px;
}

@media screen and (max-width: 1470px) {
  .infoBar {
    position: absolute;
    left: 0;
    top: 120px;
  }
  .calendar {
    top: 160px;
    margin-bottom: 100px;
  }
  .colours {
    top: 180px;
  }
  @media screen and (max-width: 1250px) {
    .wishes {
      width: 95%;
    }
    @media screen and (max-width: 1100px){
      .calendar {
        top: 200px;
        margin-bottom: 120px;
      }

      .colours {
        width: 570px;
      }
      @media screen and (max-width: 1080px) {
        .wishesDates {
          height: 100px;
        }
        .wishes {
          width: 85%;
        }
        .colours {
        }
        @media screen and (max-width: 1000px) {
          .wishes {
            width: 100%;
          }
          .wishesDates {
            height: fit-content;
          }
          @media screen and (max-width: 630px) {
            .colours {
              width: 400px;
            }
          }
          @media screen and (max-width: 550px) {
            .pay {
              display: none;
            }
          }
        }
      }

    }
  }

}

</style>