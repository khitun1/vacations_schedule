<template>
  <sample-page :choice="'settings'">
    <personal-data/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import {onBeforeMount} from "vue";
import {useStore} from "vuex";


export default {
  name: "MySettings",

  components:{
    PersonalData,
    SamplePage,
  },

  setup() {
    const store = useStore();
    onBeforeMount(async () => {
      console.log('before')
      await store.dispatch('auth');
      console.log(store.state.my.currentUser.login)
    })
  }

}
</script>

<style scoped>

</style>