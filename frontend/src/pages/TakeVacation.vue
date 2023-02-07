<template>
  <sample-page :choice="'takeVacation'">
    <h2 style="margin-top: 40px">Календарь отпусков</h2>
    <div style="display: flex">
      <v-date-picker is-range :rows="rows" :columns="columns" v-model="date"
                     @click="showDate"
                     :attributes="attrs"
                     :disabled-dates="dis"
                     class="calendar"/>
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
        <p>Пересекаемые даты</p>
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
import moment from "moment";
import MyButton from "@/components/UI/MyButton";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "TakeVacation",

  computed: {
    ...mapState ({
      myVacations: state => state.my.myVacations,
      wishes: state => state.my.wishes,
      currentUser: state => state.my.currentUser,
      total: state => state.my.total,
      len: state => state.my.len,
    }),

    ...mapGetters ({
      left: 'left',
      intersInUsersDep: 'intersInUsersDep',
      last: 'last',
    }),

    percent() {
      return this.currentUser.percent;
    },


    width: function(){
      return 100 - this.left / this.total * 100 + '%';
    },

    attrs: function (){
      let attrs =  [];
      this.myVacations.forEach(p => {
        if (p.status !== 'Отказ') attrs.push(this.chooseColor(p))
      });
      this.wishes.forEach(p => attrs.push(this.chooseColor(p)));
      this.inters.forEach(p => attrs.push(this.chooseColor(p)));
      return attrs;
    },

    dis: function(){
      let dis =  [];
      this.myVacations.forEach(p => {
        if (p.status !== 'Отказ')   dis.push(this.disDates(p))
      });
      this.wishes.forEach(p => dis.push(this.disDates(p)));
      this.inters.forEach(p => dis.push(this.disDates(p)));
      return dis;
    }
  },

  data()
  {
    return {
      visibleTake: false,
      value: '',
      context: null,
      choice: {},
      date: null,
      paid: [],
      rows: 2,
      columns: 3,
      inters: [],
    }
  },

  components:{
    MyButton,
    SamplePage,
  },

  created() {
    window.addEventListener('resize', this.updateColumns);
  },

  methods: {
    ...mapActions({
      addWish: 'addWish',
      getWishes: 'getWishes',
      delWish: 'deleteWish',
      addVacation: 'addVacation',
      getVacations: 'getVacations',
      auth: 'auth',
      getDates: 'getDates',
    }),

    ...mapMutations ({

    }),

    intersections() {
      let quarter = Math.floor(this.percent * this.len);
      if (quarter <= 1) {
        this.intersInUsersDep.forEach(p => {
          if (p.userId !== this.currentUser.id) {
            const vac = {
              start: p.start,
              end: p.end,
              status: 'inters',
            }
            console.log(p.userId)
            this.inters.push(vac);
          }
        })
      }
      else {
        let lastStart;
        for (let i = 0; i < this.intersInUsersDep.length; i++) {
          for (let j = 0; j < i; j++){
            if(this.findIntersection(this.intersInUsersDep[i], this.intersInUsersDep[j])) {
              lastStart = this.getLastStart(i,j);
              this.draw(i, lastStart, quarter);
            }
          }
        }
      }
    },

    getLastStart(i,j){
      let iStart = moment(this.intersInUsersDep[i].start, 'DD.MM.YYYY');
      let jStart = moment(this.intersInUsersDep[j].start, 'DD.MM.YYYY');
      if(iStart.diff('01.01.2022', 'days') > jStart.diff('01.01.2022', 'days'))
        return iStart.diff('01.01.2022', 'days');
      return jStart.diff('01.01.2022', 'days');
    },

    draw(i, lastStart, quarter){
      let start;
      let end;
      for(let j = 0; j < i; j++){
        start = moment(this.intersInUsersDep[j].start, 'DD.MM.YYYY')
            .diff('01.01.2022', 'days');
        end = moment(this.intersInUsersDep[j].end, 'DD.MM.YYYY')
            .diff('01.01.2022', 'days');
        if(lastStart <= end &&
            lastStart >= start)
        {
          let range = {};
          range.start = this.intersInUsersDep[i].start;
          const earlierEnd = moment(this.intersInUsersDep[i].end, 'DD.MM.YYYY')
              .diff('01.01.2022', 'days');
          range.end = earlierEnd < end ? this.intersInUsersDep[i].end
              : this.intersInUsersDep[j].end;
          range.status = 'inters';
          this.inters.push(range);
        }
      }

      if (this.inters.length < quarter) {
        this.inters = [];
      }
    },


    findIntersection(first, second){
      let iStart = moment(first.start, 'DD.MM.YYYY');
      let jStart = moment(second.start, 'DD.MM.YYYY');
      let iEnd = moment(first.end, 'DD.MM.YYYY');
      let jEnd = moment(second.end, 'DD.MM.YYYY');
      return (iEnd.diff('01.01.2022', 'days') >= jStart.diff('01.01.2022', 'days')) ||
          iStart.diff('01.01.2022', 'days') <= jEnd.diff('01.01.2022', 'days');
    },

    updateColumns() {
      this.columns = window.innerWidth > 1100? 3 : window.innerWidth > 600 ? 2 : 1;
    },

    showDate(){
      if (this.date !== null){
        this.date =
            {
              start: moment(this.date.start).format('YYYY-MM-DD'),
              end: moment(this.date.end).format('YYYY-MM-DD'),
              userId: this.currentUser.id,
            }
            this.addWish(this.date);
        this.date = null;
      }
    },

    del(id){
      this.delWish(id);
    },

    send(wish){
      let flag = 0;
      let record = {
        start: moment(wish.start, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        end: moment(wish.end, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        number: this.last,
        requested_date: moment(),
        paid: this.paid[this.wishes.indexOf(wish)] ? 1 : 0,
        status: 'Ожидание',
        userId: this.currentUser.id,
      }
      this.intersInUsersDep.forEach(p => {
        if (this.findIntersection(record, p)) {
          flag = 1;
        }
      })
      if (flag === 1) alert('Выбранные даты вызовут пересечение');
      else if (this.totalDays(record.start, record.end) <= this.left){
        this.addVacation(record);
        this.del(wish.id);
      }
      else (alert('Выбрано больше дней, чем доступно!'));
    },

    sendAll(){
      let record = {};
      let total = 0;
      this.wishes.forEach(p => {
        const start = moment(p.start, 'DD.MM.YYYY').format('YYYY-MM-DD');
        const end = moment(p.end, 'DD.MM.YYYY').format('YYYY-MM-DD');
        total += this.totalDays(start, end);
      });
      if (total <= this.left){
        this.wishes.forEach((p, index) => {
          record = {
            start: moment(p.start, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            end: moment(p.end, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            requested_date: moment(),
            paid: this.paid[this.wishes.indexOf(p)] ? 1 : 0,
            status: 'Ожидание',
            userId: this.currentUser.id,
            number: this.last + index,
          }
          this.addVacation(record);
          this.del(p.id);
        })
      }
      else (alert('Выбрано больше дней, чем доступно!'));
    },

    totalDays(start,end){
      return moment(end, 'YYYY-MM-DD').diff(moment(start, 'YYYY-MM-DD'), 'days') + 1;
    },

    chooseColor(rec){
        return {
          id: new Date(),
          highlight: {
            start: { fillMode: 'transparent' },
            base: { fillMode: 'light', color: rec.status === undefined ? 'gray' :
                  rec.status === 'Утверждено'? 'green':
                  rec.status === 'Ожидание'? 'orange': rec.status === 'Использовано' ? 'purple'
                      : rec.status === 'inters' ? 'red':'none'},
            end: { fillMode: 'transparent' },
          },
          dates: { start: moment(rec.start, 'DD.MM.YYYY')._d, end: moment(rec.end, 'DD.MM.YYYY')._d },
        }
    },

    disDates(rec){
      return {
        id: new Date(),
        start: moment(rec.start, 'DD.MM.YYYY')._d,
        end: moment(rec.end, 'DD.MM.YYYY')._d,
      }
    },
  },


  async mounted() {
    await this.auth();
    await this.getDates();
    await this.getWishes();
    await this.getVacations();
    this.intersections();
  }
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
  left: 0%;
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