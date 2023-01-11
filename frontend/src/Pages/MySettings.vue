<template>
  <sample-page :choice="'settings'">
    <personal-data
        :user="$store.state.currentUser"/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";


export default {
  name: "MySettings",

  components:{
    PersonalData,
    SamplePage,
  },

}
</script>

<style scoped>

</style>