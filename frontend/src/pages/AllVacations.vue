<template>
  <sample-page :choice="'allVacations'">
      <h2>Запросы на подпись отпуска</h2>
    <VueMultiselect
        class="chooseDep"
        v-model="selectedDep"
        :options="namesDeps"
        :show-no-results="false"
        @close="chartClick"
        placeholder="Выберите отдел"
        :show-labels="false"/>
    <signature-table
            :requested="vacations"
            :clickedName="clickedName"
            :clickedNumber="clickedNumber"
            :clicked="clickEvent"
            @accepted="accept"
            @showWindow="show"
            @showRec="showData">
    </signature-table>
    <dialog class="failure">
      <form @submit.prevent>
        <h2>Укажите причину отказа</h2>
        <textarea v-model="explanation"></textarea>
        <my-button @click="explain(id)">Отправить</my-button>
        <my-button @click="cancelExplain">Отменить</my-button>
      </form>
    </dialog>
    <h2 v-show="vacations.length > 0">График отпусков</h2>
    <div class="changeYear" v-show="vacations.length > 0">
      <button @click="prevYear ">&#60;</button>
      <h3 class="year">{{year}} г.</h3>
      <button @click="nextYear">&#62;</button>
    </div>
    <div class="block" v-if="vacations.length === 0"></div>
    <div class="chart">
      <canvas id="myChart"
              :style="{height: height + 'px'}"
              @click="showRec" tabindex="-1"/>
    </div>
  </sample-page>
</template>

<script>
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import {options} from "@/components/Options";
import moment from "moment";
import SignatureTable from "@/components/SignatureTable";
import SamplePage from "@/components/Samples/SamplePage";
import VueMultiselect from 'vue-multiselect';
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";


export default {
  name: "AllVacations",

  data() {
    return{
      colors:  ['lightblue', 'deepskyblue' , 'royalblue ', 'blue', 'darkblue', 'purple'],
      intersections:  [],
      amount:  0,
      indent: 0,
      explanation: '',
      id: 0,
      clickedName: '',
      clickedNumber: undefined,
      clickEvent: 0,
    }
  },

  components: {
    SamplePage,
    VueMultiselect,
    SignatureTable,
  },

  computed: {
    ...mapState ({
      selectedDep: state => state.admin.selectedDep,
      year: state => state.admin.year,
      departments: state => state.admin.departments,
      users: state => state.admin.users,
      all: state => state.admin.all,
    }),

    ...mapGetters ({
      vacations: "vacations",
    }),

    height: function (){
      return this.vacations.filter(p => p.department === this.selectedDep).length * 50 + 125;
    },

    percent: function (){
      return this.departments.find(p => p.name === this.selectedDep).percent / 100;
    },

    top: function(){
      return this.vacations.length === 0? '-250px': 0;
    },

    namesDeps: function (){
      let arr = [];
      this.departments.forEach(p => arr.push(p.name));
      return arr;
    }
  },

  methods:{
    ...mapMutations ({
      prev: 'prevYear',
      next: 'nextYear',
      vuex_shift: "shift",
      vuex_reject: 'reject',
      vuex_accept: 'accept',
      changeYear: 'changeYear',
    }),

    ...mapActions ({
      auth: 'auth',
    }),

    cancelExplain() {
      this.explanation = '';
      document.querySelector('dialog').close();
    },
    prevYear() {
      this.prev();
      this.myChart.options.scales.x.min = this.year + '-01-01';
      this.myChart.options.scales.x.max = this.year + '-12-31';
      this.myChart.update();
    },
    nextYear() {
      this.next();
      this.myChart.options.scales.x.min = this.year + '-01-01';
      this.myChart.options.scales.x.max = this.year + '-12-31';
      this.myChart.update();
    },
    getDates(number){ // get vacation range
      if (number === -1) {
        return ['0001-01-01', '0000-01-01'];
      }
      let dates = [];
      dates.push(moment(this.vacations[number].start, 'DD.MM.YYYY').format('YYYY-MM-DD'));
      dates.push(moment(this.vacations[number].end, 'DD.MM.YYYY').format('YYYY-MM-DD'));
      return dates;
    },

    getId(name){ // find name for add record, if number of vacation > 1
      return this.myChart.data.labels.indexOf(name);
    },

    getLabels(){  // get unique names
      let labels = [];
      this.vacations.forEach(p => labels.push(p.surname + ' ' + p.name + ' ' + p.lastname));
      return [...new Set(labels)];
    },

    findSet(n){ // create dataset for nonexistent number of vacation
      let check = 0;
      let label = 'Отпуск ' + n;
      this.myChart.data.datasets.forEach(p => {
        if(p.label === label)  check++;
      })
      if(check === 0)
        this.myChart.data.datasets.splice(n-1+this.amount, 0,{
          label: label,
          grouped: false,
          data: [],
          backgroundColor: this.colors[n-1],
          hoverBackgroundColor: '#ffed76',
        })
    },

    getLastDate(inter){ // get last date in date set of intersections
      let help = [];
      inter.forEach(p => {
        help.push(moment(p, 'DD.MM.YYYY').diff('01.01.2022', 'days'));
      });
      return help.indexOf(Math.max(...help));
    },

    findIntersection(i, j){
      let iStart = moment(this.vacations[i].start, 'DD.MM.YYYY');
      let jStart = moment(this.vacations[j].start, 'DD.MM.YYYY');
      let iEnd = moment(this.vacations[i].end, 'DD.MM.YYYY');
      let jEnd = moment(this.vacations[j].end, 'DD.MM.YYYY');
      return (iEnd.diff('01.01.2022', 'days') <= jStart.diff('01.01.2022', 'days')) ||
          iStart.diff('01.01.2022', 'days') >= jEnd.diff('01.01.2022', 'days');
    },


    getRange(i,j){
      let iStart = moment(this.vacations[i].start, 'DD.MM.YYYY');
      let jStart = moment(this.vacations[j].start, 'DD.MM.YYYY');
      if(iStart.diff('01.01.2022', 'days') > jStart.diff('01.01.2022', 'days'))
        return iStart.diff('01.01.2022', 'days');
      return jStart.diff('01.01.2022', 'days');
    },

    draw(i,range, quarter){
      let inters = [];
      let start;
      let end;
      for(let j = 0; j < i; j++){
        start = moment(this.vacations[j].start, 'DD.MM.YYYY');
        end = moment(this.vacations[j].end, 'DD.MM.YYYY');
        if(range <= end.diff('01.01.2022', 'days') &&
            range >= start.diff('01.01.2022', 'days'))
        {
          inters.push(this.vacations[j].start);
        }
      }

      if(inters.length !== 0 && inters.length >= quarter)
      {
        inters.push(this.vacations[i].start);
        let last = inters[this.getLastDate(inters)];
        if(this.intersections.indexOf(last) === -1)
        {
          this.intersections.push(last);
          last = moment(last, 'DD.MM.YYYY')
        }
        else return;

        let line = [];
        for(let q = 0; q < this.vacations.length; q++)  line.push(moment(last, 'DD.MM.YYYY').format('YYYY-MM-DD'));
        this.myChart.data.datasets.unshift({
          label: 'Пересечение ' + moment(last).format('DD.MM.YYYY'),
          type: 'line',
          data: line,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
        });
        this.amount++;
      }
    },

    intersection(i){ // find intersection
      let quarter = Math.floor(this.percent * this.users.filter(p => p.department === this.selectedDep).length);
      let range;
      for (let j = 0; j < i; j++){
        if(!this.findIntersection(i,j)) {
          range = this.getRange(i,j);
          this.draw(i, range, quarter);
        }
      }
    },

    chartClick(){
      this.myChart.data.datasets = [];
      this.intersections = [];
      this.amount = 0;
      this.myChart.data.labels = this.getLabels();
      for(let i = 0; i < this.vacations.length; i++) {
        let n = this.vacations[i].number;
          if (this.vacations[i].status !== 'Отказ' &&
              this.vacations[i].status !== 'none') {
            this.findSet(n);
            if(n === 1) this.myChart.data.datasets[this.amount].data.push(this.getDates(i));
            else {
              let name = this.vacations[i].surname + ' ' + this.vacations[i].name + ' ' + this.vacations[i].lastname;
              this.myChart.data.datasets[n-1+this.amount].data[this.getId(name)] = this.getDates(i);
            }
            this.intersection(i);
          }
          else {
            if (n === 1) this.myChart.data.datasets[this.amount].data.push(this.getDates(-1))
          }
      }
      this.myChart.update();
    },

    explain(){
      let surname = this.all.find(p => p.id === this.id).surname;
      let name = this.all.find(p => p.id === this.id).name;
      let lastname = this.all.find(p => p.id === this.id).lastname;
      let arr = [surname, name, lastname];
      let count = [];
      const num = this.all.find(p => p.id === this.id).number;
      this.all.forEach(p => p.surname === arr[0] && p.name === arr[1] && p.lastname === arr[2] ? count.push(p) : false);
      const len = count.length;
      if (num < len) {
        const con = {
          arr: arr,
          num: num,
        }
        this.vuex_shift(con);
      }
      document.querySelector('dialog').close();
      this.indent = 0;
      const rej = {
        id: this.id,
        exp: this.explanation,
      }
      this.vuex_reject(rej);
      this.explanation = '';
      this.chartClick();
    },

    accept(id){
      this.vuex_accept(id);
    },

    show(id){
      document.querySelector('dialog').showModal();
      this.id = id;
        if(this.vacations.filter(p => p.status === 'Ожидание').length === 1) this.indent = 100;
    },
    showRec(){
      this.clickEvent++;
      let clickedIndex = this.myChart.getActiveElements()[0].index;
      this.clickedName = this.myChart.data.labels[clickedIndex];
      this.clickedNumber = this.myChart.getActiveElements()[0].datasetIndex;
    },

    showData(index){
      this.myChart.setActiveElements([
        {datasetIndex: index[1], index: this.myChart.data.labels.indexOf(index[0])},
      ]);
      this.myChart.options.scales.x.min = index[2] + '-01-01';
      this.myChart.options.scales.x.max = index[2] + '-12-31';
      this.changeYear(index[2]);
      this.myChart.update();
      document.getElementById('myChart') .focus();
    },
  },

  mounted() {
    this.auth();
    const ctx = document.getElementById('myChart')
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {},
      options: options(),
    })
    return this.myChart;
  }
}
</script>

<style src="../../node_modules/vue-multiselect/dist/vue-multiselect.css">


</style>

<style scoped>

.chooseDep
{
  width: 300px;
  margin-left: 40px;
  margin-bottom: 20px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  outline: none;

}

.chart
{
  width: 95%;
  margin-top: v-bind(indent + 'px');
  height: fit-content;
  position: relative;
  top: v-bind(top);
  z-index: 0;

}

#myChart
{
  height: v-bind(height);
}

.block
{
  position: relative;
  width: 100%;
  background: white;
  height: 300px;
  z-index: 1;
}

.failure
{
  position: absolute;
  width: 400px;
  height: fit-content;
  background: #ceb4ff;
  color: #ffffff;
  border-width: 0;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  border-radius: 40px;
  text-align: center;
  font-weight: lighter;
}

dialog::backdrop{
  background: rgba(0, 0, 0, 0.6);
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

.failure button
{
  height: 30px;
  width: 120px;
  font-size: 16px;
}

.changeYear {
  display: flex;
  flex-direction: row;
  cursor: default;
}

.changeYear button {
  background: none;
  border: 0;
  cursor: pointer;
  margin-top: 5px;
}




@media screen and (max-width: 800px) {
  .changeYear {
    margin-bottom: 0;
  }
}

</style>

<style>
.multiselect__option--highlight
{
  background: #e7e7e7;
  outline: none;
  color: black;
}

.multiselect__option--selected.multiselect__option--highlight
{
  background: #e7e7e7;
  color: black;
}

.multiselect__tags {
  min-height: 20px;
  display: block;
  padding: 7px 0 0 0;
  border-radius: 20px;
  background: #fff;
  font-size: 16px;
  text-align: center;
}

.multiselect__content-wrapper::-webkit-scrollbar {
  width: 7px;
}

.multiselect__content-wrapper::-webkit-scrollbar-thumb {
  background-color: #7e7e7e;
  border-radius: 20px;
}

.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

</style>

