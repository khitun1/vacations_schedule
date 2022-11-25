<template>
  <sample-page
      :choice="'allVacations'"
      :admin="isAdmin">
      <h2>Запросы на подпись отпуска</h2>
      <my-select v-model="choice" @change="chartClick">
        <option selected disabled value="">Выберите отдел</option>
        <option v-for="dep in departments"
                :key="dep.id">
          {{ dep.name }}
        </option>
      </my-select>
        <signature-table
            :requested="vacations"
            :clickedName="clickedName"
            :clickedNumber="clickedNumber"
            :clicked="clickEvent"
            @accepted="accept"
            @showWindow="show"
            @showRec="showData"
        />
      <form @submit.prevent class="failure" v-show="expVis">
        <h3>Укажите причину отказа</h3>
        <textarea v-model="explanation"></textarea>
        <my-button @click="explain(id)">Отправить</my-button>
        <my-button @click="expVis=false; this.explanation = ''">Отменить</my-button>
      </form>
      <h2>График отпусков</h2>
      <div class="block" v-show="this.vacations.length === 0"></div>
      <div class="chart">
        <canvas id="myChart"
                :style="{height: height + 'px'}"
                @click="showRec"/>
      </div>
    <button class="focus"></button>
<!--      <div class="buttons">-->
<!--        <div class="pair" v-for="vac in vacations.filter(p => p.number === 1)"-->
<!--             :key="vac.id" >-->
<!--          <button style="color: #17c42c" :style="vac.status === 'Ожидание' && vac.intersections === 'Нет'?-->
<!--              {background: 'default'}: {background: 'white', color: 'white', borderWidth: 0}"-->
<!--                  @click="accept(vac.id)">-->
<!--            &#10004;-->
<!--          </button>-->
<!--          <button style="color: #fd2626" :style="vac.status === 'Ожидание'?-->
<!--              {background: 'default'}: {background: 'white', color: 'white', borderWidth: 0}"-->
<!--                  @click="show(vac.id)">-->
<!--            &#10006;-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
  </sample-page>
</template>

<script>
import MySelect from "@/components/UI/MySelect";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import {options} from "@/components/Options";
import moment from "moment";
import SignatureTable from "@/components/SignatureTable";
import MyButton from "@/components/UI/MyButton";
import SamplePage from "@/components/Samples/SamplePage";


export default {
  name: "AllVacations",

  data() {
    return{
      departments: [
        {id: 2, name: 'first', min: 7, total: 55, percent: 30, amount: 15},
        {id: 3, name: 'sdgsg', min: 7, total: 55, percent: 30, amount: 15},
      ],

      all : [
        {id: 1, surname: 'Хитун', name: 'Иван', lastname: 'Михайлович', start: '01.01.2022', end: '20.01.2022',
          paid: 'Да', department: 'first', number: 1,
          intersections: 'Нет', status: 'Ожидание',},
        {id: 22, surname: 'Хитун', name: 'Иван', lastname: 'Михайлович', start: '02.02.2022', end: '20.02.2022',
          paid: 'Нет', department: 'first', number: 2,
          intersections: 'Да', status: 'Ожидание',},
         {id: 12, surname: 'Алиев', name: 'Иван', lastname: 'Михайлович', start: '01.03.2022', end: '20.03.2022',
           paid: 'Да', department: 'first', number: 1,
           intersections: 'Нет', status: 'Принято',},
        {id: 12, surname: 'Алиев', name: 'Иван', lastname: 'Михайлович', start: '01.07.2022', end: '20.08.2022',
          paid: 'Да', department: 'first', number: 2,
          intersections: 'Нет', status: 'Принято',},
        {id: 220, surname: 'Ивановa', name: 'Владислав', lastname: 'Андреевич', start: '01.04.2022', end: '20.04.2022',
          paid: 'Нет', department: 'first', number: 1,
          intersections: 'Да', status: 'Ожидание',},
        {id: 120, surname: 'Алиевa', name: 'Иван', lastname: 'Михайлович', start: '01.05.2022', end: '20.05.2022',
          paid: 'Да', department: 'first', number: 1,
          intersections: 'Нет', status: 'Ожидание',},
         {id: 222, surname: 'Семеренко', name: 'Владислав', lastname: 'Андреевич', start: '01.06.2022', end: '20.06.2022',
           paid: 'Нет', department: 'first', number: 1,
           intersections: 'Да', status: 'Принято',},
        {id: 122, surname: 'Шарипов', name: 'Иван', lastname: 'Михайлович', start: '05.05.2022', end: '11.11.2022',
          paid: 'Да', type: '', dateRequest: '', department: 'sdgsg', number: 1,
          intersections: 'Нет', explanation: '', status: 'Ожидание', comment: '', countries: '',},
        {id: 2222, surname: 'Михайлов', name: 'Владислав', lastname: 'Андреевич', start: '01.01.2022', end: '02.02.2022',
          paid: 'Нет', department: 'sdgsg', number: 1,
          intersections: 'Нет', status: 'Ожидание',},
  ],


      colors:  ['lightblue', 'deepskyblue' , 'royalblue ', 'blue', 'darkblue', 'purple'],
      intersections:  [],
      amount:  0,
      choice: '',
      visible: false,
      indent: 0,
      expVis: false,
      explanation: '',
      id: 0,
      clickedName: '',
      clickedNumber: undefined,
      clickEvent: 0,
    }
  },

  components: {
    SamplePage,
    MySelect,
    SignatureTable,
    MyButton,
  },

  props: {
    isAdmin:{
      type: Number,
      requested: true,
    },
    selected:{
      type: Number,
    },
    dep:{
      type: String,
    }
  },

  computed: {
    vacations: function (){
      return this.all.filter(p => p.department === this.choice && p.status !== 'Отказ');
    },

    height: function (){
      return this.vacations.filter(p => p.department === this.choice).length * 50 + 125;
    },

    percent: function (){
      return this.departments.find(p => p.name === this.choice).percent / 100;
    },

    top: function(){
      return this.vacations.length === 0? '-250px': 0;
    },
  },

  methods:{
    getDates(number) // get vacation range
    {
      let dates = [];
      dates.push(moment(this.vacations[number].start, 'DD.MM.YYYY').format('YYYY-MM-DD'));
      dates.push(moment(this.vacations[number].end, 'DD.MM.YYYY').format('YYYY-MM-DD'));
      return dates;
    },


    getId(name) // find name for add record, if number of vacation > 1
    {
      return this.myChart.data.labels.indexOf(name);
    },

    getLabels()  // get unique names
    {
      let labels = [];
      this.vacations.forEach(p => labels.push(p.surname + ' ' + p.name + ' ' + p.lastname));
      return [...new Set(labels)];
    },

    findSet(n) // create dataset for nonexistent number of vacation
    {
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
          hoverBackgroundColor: '#548aff',
        })
    },

    getLastDate(inter) // get last date in date set of intersections
    {
      let help = [];
      inter.forEach(p => {
        help.push(moment(p, 'DD.MM.YYYY').diff('01.01.2022', 'days'));
      });
      return help.indexOf(Math.max(...help));
    },

    findIntersection(i, j)
    {
      let iStart = moment(this.vacations[i].start, 'DD.MM.YYYY');
      let jStart = moment(this.vacations[j].start, 'DD.MM.YYYY');
      let iEnd = moment(this.vacations[i].end, 'DD.MM.YYYY');
      let jEnd = moment(this.vacations[j].end, 'DD.MM.YYYY');
      return (iEnd.diff('01.01.2022', 'days') <= jStart.diff('01.01.2022', 'days')) ||
          iStart.diff('01.01.2022', 'days') >= jEnd.diff('01.01.2022', 'days');
    },


    getRange(i,j)
    {
      let iStart = moment(this.vacations[i].start, 'DD.MM.YYYY');
      let jStart = moment(this.vacations[j].start, 'DD.MM.YYYY');
      if(iStart.diff('01.01.2022', 'days') > jStart.diff('01.01.2022', 'days'))
        return iStart.diff('01.01.2022', 'days');
      return jStart.diff('01.01.2022', 'days');
    },

    draw(i,range, quarter)
    {
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

    intersection(i) // find intersection
    {
      let quarter = Math.floor(this.percent * this.departments[i].amount);
      let range;
      for (let j = 0; j < i; j++){
        if(!this.findIntersection(i,j)) {
          range = this.getRange(i,j);
          this.draw(i, range, quarter);
        }
      }
    },


    chartClick()
    {
      this.myChart.data.datasets = [];
      this.intersections = [];
      this.amount = 0;
      this.visible = true;
      this.myChart.data.labels = this.getLabels();
      for(let i = 0; i < this.vacations.length; i++){
          let n = this.vacations[i].number;
          this.findSet(n);
          if(n === 1) this.myChart.data.datasets[this.amount].data.push(this.getDates(i));
          else {
            let name = this.vacations[i].surname + ' ' + this.vacations[i].name + ' ' + this.vacations[i].lastname;
            this.myChart.data.datasets[n-1+this.amount].data[this.getId(name)] = (this.getDates(i));
          }
          this.intersection(i);
      }
      this.myChart.update();
    },

    explain(){
      this.expVis = false;
      this.indent = 0;
      this.all.find(p => p.id === this.id).explanation = this.explanation;
      this.all.find(p => p.id === this.id).status = 'Отказ';
      this.explanation = '';
      this.chartClick();
    },

    accept(id){
      this.all.find(p => p.id === id).status = 'Утверждено';
    },

    show(id){
      this.id = id;
      this.expVis = true;
        if(this.vacations.filter(p => p.status === 'Ожидание').length === 1) this.indent = 100;
    },

    reject(id){
      this.all.find(p => p.id === id).explanation = 'Пересечение';
      this.all.find(p => p.id === id).status = 'Отказ';
    },

    showRec(){
      this.clickEvent++;
      let clickedIndex = this.myChart.getActiveElements()[0].index;
      this.clickedName = this.myChart.data.labels[clickedIndex];
      this.clickedNumber = this.myChart.getActiveElements()[0].datasetIndex;
      console.log( this.clickedName, this.clickedNumber)
    },

    showData(index){
      this.myChart.setActiveElements([
        {datasetIndex: index[1], index: this.myChart.data.labels.indexOf(index[0])},
      ]);
      this.myChart.update();
      document.getElementsByClassName('focus')[0].focus();
    },
  },

  mounted() {
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

<style scoped>

select
{
  position: relative;
  left: 30px;
  text-align: center;
  font-size: 16px;
  width: 250px;
  cursor: pointer;
  outline: none;
  margin-bottom: 20px;
}

.chart
{
  width: fit-content;
  margin-top: v-bind(indent + 'px');
  height: fit-content;
  position: relative;
  top: v-bind(top);
  z-index: 0;
}

#myChart
{
  width: 1100px;
  height: v-bind(height);
}

.block
{
  position: relative;
  width: 1110px;
  background: white;
  height: 300px;
  z-index: 1;
}

.failure
{
  position: absolute;
  top: 80px;
  left: 300px;
  width: 400px;
  height: 300px;
  background: #946cda;
  color: #FCFF7C;
  border-width: 0;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  border-radius: 40px;
  text-align: center;
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
  background: #8482FF;
  color: #FCFF7C;
  font-size: 16px;
}

.focus
{
  border-width: 0;
  background: none;
}


</style>