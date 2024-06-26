<template >
  <sample-page choice="allVacations"
                @rerender="rerender">
    <VueMultiselect class="selectDep"
                    :options="allDeps"
                    :placeholder="localize('ChooseDepartment')"
                    :show-labels="false"
                    :show-no-results="false"
                    v-model="selectedDep"
                    @close="chartClick"
                    v-if="currentUser.director"/>
    <h2 v-if="vacations.filter(p => p.status === 'Waiting').length > 0 && !currentUser.director">
      {{ localize('SignRequest') }}
    </h2>
    <signature-table
        :requested="vacations"
        :clickedName="clickedName"
        :clickedNumber="clickedNumber"
        :clicked="clickEvent"
        @accepted="accept"
        @showWindow="show"
        @showRec="showData"
        v-if="!currentUser.director"
        :key="rerenderKey">
    </signature-table>
    <dialog class="failure">
      <form @submit.prevent>
        <h2>
          {{ localize('IndicateRefusalReason') }}
        </h2>
        <textarea v-model="explanation"/>
        <my-button @click="explain(id)">
          {{ localize('Send') }}
        </my-button>
        <my-button @click="cancelExplain">
          {{ localize('Cancel') }}
        </my-button>
      </form>
    </dialog>
    <h2 v-show="vacations.length > 0 && (selectedDep !== '' || !currentUser.director)">
      {{ localize('VacationsChart') }}
    </h2>
    <div class="range"
         v-show=" selectedDep !== '' || !currentUser.director">
      <div class="changeYear"
           v-show="vacations.length > 0">
        <button @click="prevRange ">
          &#60;
        </button>
        <h3 class="year">
          {{rangeChart()}}
        </h3>
        <button @click="nextRange">
          &#62;
        </button>
      </div>
      <VueMultiselect class="selectRange"
                      :options="ranges"
                      :placeholder="localize('ChartRange')"
                      :show-labels="false"
                      :show-no-results="false"
                      :key="rerenderKey"
                      v-model="selectedRange"
                      @close="changeRangeInChart(selectedRange)"/>
    </div>
    <div class="chart">
      <canvas id="myChart"
              :style="{height: height + 'px'}"
              @click="showRec"
              tabindex="-1"/>
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
import {mapActions, mapMutations, mapState} from "vuex";
import VueMultiselect from "vue-multiselect";
import {dateUsualFormat} from "@/hooks/generalMoment/dateUsualFormat";
import {dateChartFormat} from "@/hooks/generalMoment/dateChartFormat";
import {amountDays} from "@/hooks/generalMoment/amountDays";
import {getLastStart} from "@/hooks/intersections/getLastStart";
import {findIntersection} from "@/hooks/intersections/findIntersection";
import NotAccess from "@/components/Samples/NotAccess.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {localize} from "@/hooks/localize.js";

export default {
  name: "AllVacations",
  data() {
    return{
      color:  'deepskyblue',
      intersections:  [],
      amount:  0,
      indent: 0,
      explanation: '',
      id: 0,
      clickedName: '',
      clickedNumber: undefined,
      clickEvent: 0,
      ranges: [localize('Year'), localize('Quarter'), localize('Month')],
      selectedRange: localize('Year'),
      selectedDep: '',
      showVacations: [],
      rerenderKey: 0,
    }
  },
  components: {
    MyButton,
    NotAccess,
    SamplePage,
    SignatureTable,
    VueMultiselect,
  },

  computed: {
    ...mapState ({
      year: state => state.admin.year,
      department: state => state.admin.department,
      users: state => state.admin.users,
      all: state => state.admin.all,
      vacations: state => state.admin.vacations,
      percent: state => state.my.currentUser.percent,
      range: state => state.admin.range,
      month: state => state.admin.month,
      quarter: state => state.admin.quarter,
      departments: state => state.admin.departments,
      currentUser: state => state.my.currentUser,
    }),

    allDeps() {
      let deps = [];
      this.departments.forEach(p => deps.push(p.name));
      return deps;
    },

    token() {
      return localStorage.getItem('token');
    },

    height: function (){
      return this.showVacations.length * 50 + 125;
    },
    top: function(){
      return this.showVacations.length === 0? '-250px': 0;
    },

    width_chart() {
      if (this.selectedDep !== '' || !this.currentUser.director) {
        return '95%';
      }
      return '0';
    },

    height_chart() {
      if (this.selectedDep !== '' || !this.currentUser.director) {
        return 'fit-content';
      }
      return '0';
    },
  },

  methods:{
    localize,
    ...mapMutations ({
      prev: 'prevYear',
      next: 'nextYear',
      changeYear: 'changeYear',
      changeMonth: 'changeMonth',
      changeQuarter: 'changeQuarter',
      changeRange: 'changeRange',
    }),
    ...mapActions ({
      createSocket: 'createSocket',
      getUsers: 'getUsers',
      getEmployeesVacations: 'getEmployeesVacations',
      decisionVacation: 'decisionVacation',
      clear: 'clear',
    }),

    cancelExplain() {
      this.explanation = '';
      document.querySelector('dialog').close();
    },

    rangeChart() {
      let curMonth = this.month < 10 ? '0' + this.month : this.month;
      return this.range === localize('Year') ? this.year + localize('Y') :
          this.range === localize('Quarter') ? this.quarter + ' ' +
              localize('Quarter').toLowerCase() + ' ' + this.year + localize('Y') :
              localize(moment(this.year + '-' + curMonth + '-01').format('MMMM')) +
              ' ' + this.year + localize('Y');
    },

    rerender() {
      this.rerenderKey++;
    },

      setRangeInChart(start = null){
      if (start) {
        this.changeYear(start.split('.')[2]);
        this.changeQuarter(Math.floor((start.split('.')[1] - 1) / 3  + 1));
        this.changeMonth(start.split('.')[1]);
      }
      if (this.range === localize('Year')) {
        this.myChart.options.scales.x.time.unit = 'month';
        this.myChart.options.scales.x.min = this.year + '-01-01';
        this.myChart.options.scales.x.max = this.year + '-12-31';
      }
      else if (this.range === localize('Quarter')) {
        this.myChart.options.scales.x.time.unit = 'week';
        let startMonth = (1 + ( 3 * (this.quarter - 1)));
        startMonth = startMonth < 10 ? '0' + startMonth : startMonth;
        let min = this.year + '-' + startMonth + '-01';
        let endMonth = (3 + ( 3 * (this.quarter - 1)));
        endMonth = endMonth < 10 ? '0' + endMonth : endMonth;
        const days = moment(this.year + '-' + endMonth, 'YYYY-MM').daysInMonth();
        let max = this.year + '-' + endMonth + '-' + days;
        this.myChart.options.scales.x.min = min;
        this.myChart.options.scales.x.max = max;
      }
      else if (this.range === localize('Month')) {
        this.myChart.options.scales.x.time.unit = 'day';
        let Month = this.month < 10 ? '0' + this.month : this.month;
        let min = this.year + '-' + Month + '-01';
        const days = moment(this.year + '-' + Month).daysInMonth();
        let max = this.year + '-' + Month + '-' + days;
        this.myChart.options.scales.x.min = min;
        this.myChart.options.scales.x.max = max;
      }
      this.myChart.update();
    },

    changeRangeInChart(selectedRange) {
      this.changeRange(selectedRange);
      this.setRangeInChart();
    },

    prevRange() {
      this.prev();
      this.setRangeInChart();
    },

    nextRange() {
      this.next();
      this.setRangeInChart();
    },

    getDates(number){ // get vacation range
      if (number === -1) {
        return ['0001-01-01', '0000-01-01'];
      }
      let dates = [];
      dates.push(dateChartFormat(dateUsualFormat(this.showVacations[number].start)));
      dates.push(dateChartFormat(dateUsualFormat(this.showVacations[number].end)));
      return dates;
    },

    getId(name){ // find name for add record, if number of vacation > 1
      return this.myChart.data.labels.indexOf(name);
    },

    getLabels(){  // get unique names
      let labels = [];
      this.showVacations.forEach(p => labels.push(p.surname + ' ' + p.first_name + ' ' + p.last_name));
      return [...new Set(labels)];
    },

    findSet(n){ // create dataset for nonexistent number of vacation
      let check = 0;
      let label = localize('Vacation') + ' ' + n;
      this.myChart.data.datasets.forEach(p => {
        if (p.label === label)  {
          check++;
        }
      })
      if (check === 0) {
        this.myChart.data.datasets.splice(n-1+this.amount, 0,{
          label: label,
          grouped: false,
          data: [],
          backgroundColor: this.color,
          hoverBackgroundColor: '#ffed76',
        })
      }
    },
    getLastDate(inter){ // get last date in date set of intersections
      let help = [];
      inter.forEach(p => {
        help.push(amountDays(dateUsualFormat(p)));
      });
      return help.indexOf(Math.max(...help));
    },

    draw(i,lastStart, quarter){
      let inters = [];
      let start;
      let end;
      for(let j = 0; j < i; j++) {
        start = dateUsualFormat(this.showVacations[j].start);
        end = dateUsualFormat(this.showVacations[j].end);
        if (lastStart <= amountDays(end) &&
            lastStart >= amountDays(start) &&
            inters.length >= quarter) {
          inters.push(this.showVacations[j].start);
          this.showVacations[j].intersections = true;
        }
        else this.showVacations[j].intersections = false;
      }
      if (inters.length !== 0 && inters.length >= quarter) {
        inters.push(this.showVacations[i].start);
        this.showVacations[i].intersections = true;
        let last = inters[this.getLastDate(inters)];
        if (this.intersections.indexOf(last) === -1) {
          this.intersections.push(last);
          last = dateUsualFormat(last)
        }
        else return;
        let line = [];
        for(let q = 0; q < this.showVacations.length; q++)  line.push(dateChartFormat(dateUsualFormat(last)));
        this.myChart.data.datasets.unshift({
          label: localize('Intersection') + ' ' + last,
          type: 'line',
          data: line,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
        })
        this.amount++;
      }
      else this.showVacations[i].intersections = false;
    },

    intersection(i){ // find intersection
      let quarter = Math.floor(this.percent * this.users.length);
      let lastStart;
      if (i === 0)  {
        this.showVacations[i].intersections = false;
      }
      for (let j = 0; j < i; j++) {
        if (!findIntersection(this.showVacations[i], this.showVacations[j])
            && this.users.find(p => p.id === this.showVacations[i].userId).departmentId ===
            this.users.find(p => p.id === this.showVacations[j].userId).departmentId) {
          lastStart = getLastStart(this.showVacations[i].start, this.showVacations[j].start);
          this.draw(i, lastStart, quarter);
        }
      }
    },
    chartClick(){
      this.myChart.data.datasets = [];
      this.intersections = [];
      this.amount = 0;
      let counter = 0;
      this.showVacations = [];
      if (this.currentUser.director) {
        this.vacations.forEach(p => {
          if (this.departments.find(q => q.id === this.users.find(h => h.id === p.userId).departmentId).name
              === this.selectedDep) {
            this.showVacations.push(p);
          }
        })
      }
      else {
        this.vacations.forEach(p => {
            this.showVacations.push(p);
        })
      }
      this.myChart.data.labels = this.getLabels();
      this.showVacations.forEach(p => {
        if (p.status === 'none')  {
          counter++;
        }
      })

      if (counter === this.users.length) {
        this.myChart.data.datasets.splice(0, 0,{
          label: localize('EmptyVacations'),
          grouped: false,
          data: [],
        })
      }
      else {
        for(let i = 0; i < this.showVacations.length; i++) {
          const n = this.showVacations[i].number;
          this.findSet(n);
          if (this.showVacations[i].status !== 'Rejected' &&
              this.showVacations[i].status !== 'none') {
            if (n === 1) {
              this.myChart.data.datasets[this.amount].data.push(this.getDates(i));
            }
            else {
              let name = this.showVacations[i].surname + ' ' + this.showVacations[i].first_name +
                  ' ' + this.showVacations[i].last_name;
              this.myChart.data.datasets[n-1+this.amount].data[this.getId(name)] = this.getDates(i);
            }
            this.intersection(i);
          }
          else {
            if (n === 1) {
              this.myChart.data.datasets[0].data.push(this.getDates(-1))
            }
          }
        }
      }
      this.myChart.update();
    },

    explain(){
      let surname = this.vacations.find(p => p.id === this.id).surname;
      let name = this.vacations.find(p => p.id === this.id).first_name;
      let lastname = this.vacations.find(p => p.id === this.id).last_name;
      let arr = [surname, name, lastname];
      let count = [];
      this.vacations.forEach(p => p.surname === arr[0] && p.first_name === arr[1]
      && p.last_name === arr[2] ? count.push(p) : false);
      document.querySelector('dialog').close();
      this.indent = 0;
      const rej = {
        id: this.id,
        explanation: this.explanation,
        status: 'Rejected'
      }
      this.decisionVacation(rej);
      this.explanation = '';
      this.chartClick();
    },

    accept(id){
      const obj = {
        id: id,
        status: 'Accepted',
      }
      this.decisionVacation(obj);
    },

    show(id){
      document.querySelector('dialog').showModal();
      this.id = id;
      if (this.vacations.filter(p => p.status === 'Waiting').length === 1) {
        this.indent = 100;
      }
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
      ])
      this.setRangeInChart(index[2]);
      this.myChart.update();
      document.getElementById('myChart') .focus();
    },
  },

  mounted() {
    this.createSocket();
    this.clear();
    this.getUsers();
    this.getEmployeesVacations();
    const ctx = document.getElementById('myChart')
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {},
      options: options(),
    })
    return this.myChart;
  },
  watch: {
    vacations: {
      handler() {
        this.chartClick();
      },
      deep: true
    },
  }
}
</script>

<style src="../../node_modules/vue-multiselect/dist/vue-multiselect.css">
</style>

<style scoped>
.chart
{
  width: v-bind(width_chart);
  margin-top: v-bind(indent + 'px');
  height: v-bind(height_chart);
  position: relative;
  top: v-bind(top);
}

.range {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 90%;
}

.selectRange {
  height: 30px;
  width: 200px;
  margin-left: 71px;
  margin-top: 15px;
  margin-bottom: 20px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
}


#myChart
{
  height: v-bind(height);
}

. failure
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
  justify-content: space-between;
  width: 250px;
  cursor: default;
}
.changeYear button {
  background: none;
  border: 0;
  cursor: pointer;
  margin-top: 5px;
}

.selectDep {
  width: 250px;
  margin-top: 10px;
  border-width: 0;
  border-radius: 15px;
  font-size: 16px;
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