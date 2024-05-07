<template>
  <sample-page :choice="'settings'"
               v-if="token !== null">
    <personal-data/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import {useStore} from "vuex";
import {computed} from "vue";


export default {
  name: "MySettings",

  components:{
    PersonalData,
    SamplePage,
  },

  setup() {
    const store = useStore();
    const token = localStorage.getItem('token');
    const isLoading = computed(() => store.state.isLoading);
    store.dispatch('createSocket');

    return {
      token,
      isLoading,
    }
  }
}
</script>

<style scoped>

</style>