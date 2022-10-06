<template>
  <sample-page>
    <h1>Запросы на подпись отпуска</h1>
    <signature-table/>
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
  name: "SetSignature"
}
</script>

<style scoped>

</style>