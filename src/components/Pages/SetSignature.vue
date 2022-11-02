<template>
  <sample-page>
    <h1>Запросы на подпись отпуска</h1>
    <signature-table
      :requested="requested"
      @getExplanation="explain"
      @accepted="accept"
    />
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import SignatureTable from "@/components/SignatureTable";

export default {
  components:{
    SignatureTable,
    SamplePage,
  },
  props:{
    requested: {
      type: Array,
      required: false,
    }
  },
  methods: {
    explain(exp){
      this.$emit('getExplanation', exp);
    },

    accept(id){
      this.$emit('accepted', id);
    }
  },
  name: "SetSignature"
}
</script>

<style scoped>

</style>