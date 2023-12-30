<template>
  <sample-page :choice="'settings'" v-if="token !== null && !isLoading">
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
    store.commit('setLoading', true);
    const token = localStorage.getItem('token');
    const isLoading = computed(() => store.state.isLoading);
    store.dispatch('auth');
    setTimeout(() => {
      store.commit('setLoading', false);
    }, 50);

    return {
      token,
      isLoading,
    }
  }
}
</script>

<style scoped>

</style>