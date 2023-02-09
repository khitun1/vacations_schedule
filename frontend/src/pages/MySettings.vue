<template>
  <sample-page :choice="'settings'">
    <personal-data/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import {mapActions} from "vuex";


export default {
  name: "MySettings",

  components:{
    PersonalData,
    SamplePage,
  },

  methods: {
    ...mapActions ({
      auth: 'auth',
    }),
  },

  mounted() {
    this.auth();
  }

}
</script>

<style scoped>

</style>