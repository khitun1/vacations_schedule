<template>
  <sample-page>
    <personal-data/>
    <add-user/>
    <set-data/>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";

export default {
  components:{
    SetData,
    AddUser,
    PersonalData,
    SamplePage,
  },
  name: "MySettings"
}
</script>

<style scoped>

</style>