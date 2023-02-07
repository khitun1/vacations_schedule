<template>
  <sample-page :choice="'myVacations'">
    <div v-show="calendarShow">
      <h2>Осталось отпускных дней: {{left}}</h2>
      <div class="prog">
        <div class="progBar"/>
      </div>
      <my-button class="calendar" @click="calendarShow = false">
        <img src="@/images/CalendarIcon.png"/>
        <p>В режиме календаря</p>
      </my-button>
      <div class="plan">
        <h1 v-show="myVacations.length > 0">Запланированные отпуска</h1>
        <my-table
            :records="myVacations.filter(p => p.status !== 'Использовано')"/>
        <h1 style="margin-top: 20px" v-show="myVacations.length > 0">История отпусков</h1>
        <my-table
            :records="myVacations.filter(p => p.status === 'Использовано')"/>
      </div>
    </div>
    <div v-show="!calendarShow"  class="Main">
      <button-back @click="calendarShow = true"
                  class="back"/>
      <div class="calendarShow">
        <v-calendar :rows="rows" :columns="columns"
                       :attributes="attrs"
                       :disabled-dates="dis"
                       class="vCalendar"/>
        <div class="inside">
          <h2 style="margin-top: -20px">Осталось отпускных дней: {{left}}</h2>
          <div class="prog">
            <div class="progBar"/>
          </div>
        </div>
    </div>
      <div class="colours">
        <div class="colour">
          <div style="background: #d6bcfa"/>
          <p>Использовано</p>
        </div>
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
          <p>Отказ</p>
        </div>
        <div class="colour">
          <div style="background: #e2e8f0"/>
          <p>Желаемые даты</p>
        </div>
      </div>
    </div>
<!--    <button @click="auth">Click me!</button>-->
<!--    <p v-for="user in $store.state.users" :key="user.id">{{user.surname}}</p>-->
  </sample-page>
</template>

<script>
import MyTable from "@/components/MyTable";
import SamplePage from "@/components/Samples/SamplePage";
import MyButton from "@/components/UI/MyButton";
import moment from "moment";
import ButtonBack from "@/components/UI/ButtonBack";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "MyVacations",

  components:{
    ButtonBack,
    MyTable,
    SamplePage,
    MyButton,
  },

  data(){
    return {
      calendarShow: true,
      rows: 2,
      columns: 3,
    }
  },

  computed: {
    ...mapState ({
      myVacations: state => state.my.myVacations,
      wishes: state => state.my.wishes,
      total: state => state.my.total,
    }),

    ...mapGetters ({
      left: 'left',
    }),

    width: function(){
      return 100 - this.left / this.total * 100 + '%';
    },

    attrs: function () {
      let attrs = [];
      this.myVacations.forEach(p => attrs.push(this.chooseColor(p)));
      this.wishes.forEach(p => attrs.push(this.chooseColor(p)));
      return attrs;
    },
    dis: function () {
      let dis = [];
      this.myVacations.forEach(p => dis.push(this.disDates(p)));
      this.wishes.forEach(p => dis.push(this.disDates(p)));
      return dis;
    },
  },

    created() {
      window.addEventListener('resize', this.updateColumns);
    },

  methods: {
      ...mapActions({
        getUsers: "getUsers",
        auth: "auth",
        getVacations: "getVacations",
      }),

      updateColumns() {
        this.columns = window.innerWidth > 1100? 3 : window.innerWidth > 600 ? 2 : 1;
      },
      chooseColor(rec){
        return {
          id: new Date(),
          highlight: {
            start: { fillMode: 'transparent' },
            base: { fillMode: 'light', color: rec.status === undefined ? 'gray' :
                  rec.status === 'Утверждено'? 'green':
                      rec.status === 'Ожидание'? 'orange': rec.status === 'Использовано' ? 'purple': rec.status === 'Отказ' ? 'red':'none'},
            end: { fillMode: 'transparent' },
          },
          dates: { start: moment(rec.start, 'DD.MM.YYYY')._d, end: moment(rec.end, 'DD.MM.YYYY')._d },
        }
      },
      disDates(rec) {
        return {
          id: new Date(),
          start: moment(rec.start, 'DD.MM.YYYY')._d,
          end: moment(rec.end, 'DD.MM.YYYY')._d,
        }
      },
    },

  mounted() {
    this.auth();
    this.getVacations();
  },
}
</script>

<style scoped>
.Main {
  height: 600px;
}

.prog
{
  width: 300px;
  height: 20px;
  margin-left: 30px;
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
  width: 230px;
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
  left: 55px;
  top: -3px;
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