<template>
  <sample-page :choice="'settings'">
    <personal-data
        :user="currentUser"/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import {mapState} from "vuex";


export default {
  name: "MySettings",

  components:{
    PersonalData,
    SamplePage,
  },

  computed: {
    ...mapState ({
      currentUser: state => state.my.currentUser,
    }),
  }

}
</script>

<style scoped>

</style>