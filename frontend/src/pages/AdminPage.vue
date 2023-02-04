<template>
  <sample-page :choice="'admin'">
    <h1> Панель администратора</h1>
    <div class="buttons">
      <add-user/>
      <delete-user/>
      <set-data/>
    </div>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import AddUser from "@/components/AddUser";
import SetData from "@/components/SetData";
import DeleteUser from "@/components/DeleteUser.vue";
import {mapActions} from "vuex";

export default {
  name: "SetSignature",

  components:{
    DeleteUser,
    SamplePage,
    AddUser,
    SetData,
  },

  methods: {
    ...mapActions ({
      getDepartments: 'getDepartments',
    }),
  },

  mounted() {
    //this.getDepartments();
  }
}
</script>

<style scoped>

.buttons
{
  display: flex;
  flex-direction: column;
}

</style>