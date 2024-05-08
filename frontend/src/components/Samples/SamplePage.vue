<template>
  <sample-hat/>
    <div class="main">
      <div class="bar">
        <sample-nav-bar :choice="choice"/>
      </div>
      <div class="info">
        <slot></slot>
      </div>
    </div>
</template>

<script setup>
import SampleNavBar from "@/components/Samples/SampleNavBar.vue";
import SampleHat from "@/components/Samples/SampleHat.vue";

defineProps({
  choice: {
    type: String,
    requested: true,
  },
})
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
  margin-bottom: 50px;
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
  height: fit-content;
  padding-bottom: 20px;
}

.bar {
  background: #f6f6f6;
  border-radius: 10px 0 0 10px;
  padding: 10px;
}


@media screen and (max-width: 715px) {
  .bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    height: 40px;
    bottom: -2px;
    background: #b6b6b6;
    width: 93.9%;
    border-radius: 0 0 10px 10px;
    z-index: 2;
  }
}

@media screen and (max-width: 700px) {
  .bar {
    width: 93.8%;
  }
}

@media screen and (max-width: 680px) {
  .bar {
    width: 93.6%;
  }
}

@media screen and (max-width: 650px) {
  .bar {
    width: 93.4%;
  }
}

@media screen and (max-width: 600px) {
  .bar {
    width: 93%;
  }
}

@media screen and (max-width: 560px) {
  .bar {
    width: 92.5%;
  }
}

</style>