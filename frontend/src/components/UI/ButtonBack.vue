<template>
  <button-icon class="back">
    <img src="../../images/BackIcon.png"
         alt="back icon">
  </button-icon>
</template>

<script setup>
import ButtonIcon from "@/components/UI/ButtonIcon.vue";

</script>

<style scoped>


.back
{
  width: fit-content;
  height: 25px;
  border-radius: 100%;
  padding: 0;
}

.back:hover
{
  background: #c5c5c5;
}

</style>