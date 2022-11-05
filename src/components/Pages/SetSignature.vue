<template>
  <sample-page
      :choice="'signature'"
      :admin="isAdmin">
    <h1>Запросы на подпись отпуска</h1>
    <signature-table
      :requested="vacations"
      @getExplanation="explain"
      @accepted="accept"
    />
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import SignatureTable from "@/components/SignatureTable";

export default {
  name: "SetSignature",

  components:{
    SignatureTable,
    SamplePage,
  },

  data(){
    return {
      vacations : [
        {id: 1, surname: 'Хитун', name: 'Иван', lastname: 'Михайлович', start: '01.01.2022', end: '11.11.2022',
          paid: 'Да', type: '', dateRequest: '',
          intersections: 'Нет', explanation: '', status: 'Ожидание', comment: '', countries: '',},
        {id: 22, surname: 'Иванов', name: 'Владислав', lastname: 'Андреевич', start: '01.01.2022', end: '02.02.2022',
          paid: 'Нет', type: '', dateRequest: '',
          intersections: 'Да', explanation: '', status: 'Ожидание', comment: '', countries: '',},
      ],
    }
  },

  methods: {
    explain(exp){
      this.vacations.find(p => p.id === exp.id).explanation = exp.exp;
      this.vacations.find(p => p.id === exp.id).status = 'Отказ';
    },

    accept(id){
      this.vacations.find(p => p.id === id).status = 'Утверждено';
    }
  },

  props: {
    isAdmin:{
      type: Number,
      requested: true,
    },
  },
}
</script>

<style scoped>

</style>