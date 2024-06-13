<template>
  <sample-page :choice="'myVacations'"
               v-if="token !== null">
    <div v-show="calendarShow">
      <h2>
        {{ localize('AvailableVacationDays') + totalLeft}}
      </h2>
      <my-button class="calendar"
                 @click="calendarShow = false">
        <img src="@/images/CalendarIcon.png"
             alt="calendar icon"/>
        <p>
          {{ localize('InCalendarMode') }}
        </p>
      </my-button>
      <div class="plan">
        <h1 v-show="myVacations.length > 0">
          {{ localize('PlannedVacations') }}
        </h1>
        <my-table
            :records="myVacations.filter(p => p.status !== 'Done')"/>
        <h1 style="margin-top: 20px"
            v-show="myVacations.length > 0">
          {{ localize('VacationsHistory') }}
        </h1>
        <my-table
            :records="myVacations.filter(p => p.status === 'Done')"/>
      </div>
    </div>
    <div v-show="!calendarShow"
         class="Main">
      <button-back @click="calendarShow = true"
                  class="back"/>
      <div class="calendarShow">
        <v-calendar :rows="rows"
                    :columns="columns"
                    :attributes="attrs"
                    :disabled-dates="dis"
                    class="vCalendar"/>
        <div class="inside">
          <h2 style="margin-top: -20px">
            {{ localize('AvailableVacationDays') + totalLeft}}
          </h2>
        </div>
    </div>
      <div class="colours">
        <div class="colour">
          <div style="background: #d6bcfa"/>
          <p>
            {{ localize('Done') }}
          </p>
        </div>
        <div class="colour">
          <div style="background: #9deab7"/>
          <p>
            {{ localize('Accepted') }}
          </p>
        </div>
        <div class="colour">
          <div style="background: #fde1b2"/>
          <p>
            {{ localize('Waiting') }}
          </p>
        </div>
        <div class="colour">
          <div style="background:#feb2b2"/>
          <p>
            {{ localize('Rejected') }}
          </p>
        </div>
        <div class="colour">
          <div style="background: #e2e8f0"/>
          <p>
            {{ localize('WishesDates') }}
          </p>
        </div>
      </div>
    </div>
  </sample-page>
</template>

<script setup>
import MyTable from "@/components/MyTable";
import SamplePage from "@/components/Samples/SamplePage";
import {calendar} from "@/hooks/calendar";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import MyButton from "@/components/UI/MyButton.vue";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import {localize} from "../hooks/localize.js";

const store = useStore();
onMounted(async () => {
  await store.dispatch('createSocket');
  await store.dispatch('getHolidays');
  await store.dispatch('getVacations');
})
const {rows, columns, attrs, dis, calendarShow, myVacations} = calendar([], 1);
const token = localStorage.getItem('token');
const totalLeft = computed(() => store.getters.totalLeft);
const total = computed(() => store.state.my.total);
const width = computed(() => 100 - totalLeft.value / total.value * 100 + '%');
</script>

<style scoped>
.Main {
  height: 600px;
}

.plan
{
  margin-left: 10px;
  height: fit-content;
}

.plan h1
{
  height: 20px;
  margin-top: 0;
  margin-bottom: 30px;
  font-family: "Times New Roman";
  font-size: 32px;
}

.calendar
{
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 50px;
  background: white;
  border-radius: 40px;
  color: black;
}

.calendar img
{
  position: absolute;
  left: 20px;
  top: 10px;
}

.calendar p
{
  position: absolute;
  top: -10px;
  left: 50px;
  font-size: 18px;
}

.calendarShow
{
  display: flex;
  position: relative;
  top: 50px;
  left: 10px;
}

.back
{
  padding: 0;
  position: relative;
  top: 40px;
}

.colours
{
  display: flex;
  flex-direction: column;
  position: relative;
  top: -400px;
  left: 800px;
  width: fit-content;
}

.colour div
{
  width: 30px;
  height: 30px;
}

.vCalendar {
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
}

.colour
{
  display: flex;
}

.colour p
{
  position: relative;
  margin-left: 10px;
  font-size: 16px;
  top: -10px;
}

.inside {
  margin: -20px 0 0 30px
}

@media screen and (max-width: 1460px) {
  .inside{
    position: absolute;
    top: 50px;
  }

  .Main {
    height: 900px;
  }

  .vCalendar {
    top: 200px;
  }
  .colours
  {
    flex-flow: row wrap;
    position: relative;
    top: -360px;
    left: 12px;
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
  @media screen and (max-width: 1100px) {
    .colours {
      width: 570px;
    }
    .vCalendar {
      top: 240px;
    }
    .Main {
      height: 1000px;
    }
    @media screen and (max-width: 1000px) {
      .colours {
          width: fit-content;
      }
      .calendar {
        margin-right: -90px;
      }
        @media screen and (max-width: 950px) {
          .calendar {
            margin-right: -80px;
          }
          @media screen and (max-width: 900px) {
            .calendar {
              margin-right: -80px;
            }
            @media screen and (max-width: 850px) {
              .calendar {
                margin-right: -60px;
              }
              @media screen and (max-width: 800px) {
                .calendar {
                  margin-right: -30px;
                }
                @media screen and (max-width: 715px) {
                  .calendar p {
                    display: none;
                  }
                  .calendar {
                    top: -10px;
                    width: fit-content;
                    left: 105%;
                    background: none;
                  }
                  @media screen and (max-width: 600px) {
                    .calendar {
                      left: 100%;
                    }
                    @media screen and (max-width: 510px) {
                      .vCalendar {
                        top: 290px;
                      }
                    }
                  }
                }
              }
            }
        }
      }
    }
  }
}

</style>