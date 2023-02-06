<template>
  <sample-page :choice="'settings'">
    <personal-data
        :user="currentUser"/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import {mapActions, mapState} from "vuex";


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