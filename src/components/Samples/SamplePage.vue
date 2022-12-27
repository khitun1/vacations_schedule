<template>
  <sample-hat/>
    <div class="main">
      <div class="bar" :style="{height: 'this.$refs.info.clientHeight'}">
        <sample-nav-bar :choice="choice"/>
      </div>
      <div class="info">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import SampleHat from "@/components/Samples/SampleHat";
import SampleNavBar from "@/components/Samples/SampleNavBar";

export default {
  name: "SamplePage",

  components:{
    SampleNavBar,
    SampleHat,
  },

  props: {
    choice: {
      type: String,
      requested: true,
    },
  },


}
</script>

<style>
.main
{
  display: flex;
  justify-items: flex-start;
  background: white;
  border-radius: 10px;
  margin-left: 6px;
  width: 99%;
  min-height: 650px;
}

img
{
  height: 25px;
  width: 25px;
}

.info
{
  position: relative;
  width: 80%;
  padding-left: 10px;
}

.bar
{
  width: 300px;
  background: #f6f6f6;
  padding-left: 10px;
  border-radius: 10px 0 0 10px;
}


</style>