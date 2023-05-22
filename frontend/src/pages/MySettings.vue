<template>
  <sample-page :choice="'settings'" v-if="token">
    <personal-data/>
  </sample-page>
  <not-auth v-else/>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import {useStore} from "vuex";
import NotAuth from "@/components/Samples/NotAuth.vue";


export default {
  name: "MySettings",

  components:{
    NotAuth,
    PersonalData,
    SamplePage,
  },

  setup() {
    const store = useStore();
    const token = localStorage.getItem('token') !== null;
    store.dispatch('auth');
    return {
      token,
    }
  }
}
</script>

<style scoped>

</style>