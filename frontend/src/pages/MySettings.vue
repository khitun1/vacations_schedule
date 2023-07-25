<template>
  <sample-page :choice="'settings'" v-if="token !== null">
    <personal-data/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import {useStore} from "vuex";


export default {
  name: "MySettings",

  components:{
    PersonalData,
    SamplePage,
  },

  setup() {
    const store = useStore();
    const token = localStorage.getItem('token');
    store.dispatch('auth');
    return {
      token,
    }
  }
}
</script>

<style scoped>

</style>