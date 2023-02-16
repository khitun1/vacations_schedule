<template>
  <sample-page :choice="'settings'">
    <personal-data/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import store from "@/store";


export default {
  name: "MySettings",

  components:{
    PersonalData,
    SamplePage,
  },

  setup() {
    store.dispatch('auth');
  }

}
</script>

<style scoped>

</style>