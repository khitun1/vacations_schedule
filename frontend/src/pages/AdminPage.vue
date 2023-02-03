<template>
  <sample-page :choice="'admin'">
    <h1> Панель администратора</h1>
    <div class="buttons">
      <add-user
          :deps="$store.state.departments.sort((a, b) => a.name > b.name ? 1 : -1)"/>
      <delete-user
          :deps="$store.state.departments.sort((a, b) => a.name > b.name ? 1 : -1)"/>
      <set-data
          :deps="$store.state.departments.sort((a, b) => a.name > b.name ? 1 : -1)"
          :types="$store.state.types.sort((a, b) => a.name > b.name ? 1 : -1)"/>
    </div>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";
import DeleteUser from "@/components/DeleteUser.vue";

export default {
  name: "SetSignature",

  components:{
    DeleteUser,
    SamplePage,
    AddUser,
    SetData,
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