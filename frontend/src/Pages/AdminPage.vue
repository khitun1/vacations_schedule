<template>
  <sample-page :choice="'admin'">
    <h1> Панель администратора</h1>
    <div class="buttons">
      <add-user
          :deps="$store.state.departments.sort((a, b) => a.name > b.name ? 1 : -1)"/>
      <set-data
          :deps="$store.state.departments.sort((a, b) => a.name > b.name ? 1 : -1)"
          :types="$store.state.types.sort((a, b) => a.name > b.name ? 1 : -1)"
          @changeCon="setCon"/>
    </div>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";

export default {
  name: "SetSignature",

  components:{
    SamplePage,
    AddUser,
    SetData,
  },

  data(){
    return {

    }
  },

  methods: {
  },
}
</script>

<style scoped>

.buttons
{
  display: flex;
  flex-direction: column;
}

</style>