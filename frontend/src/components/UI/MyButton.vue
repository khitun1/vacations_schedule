<template>
 <button>
   <slot></slot>
 </button>
</template>

<script setup>

</script>

<style scoped>
button
{
  position:relative;
  margin: 20px;
  padding: 5px;
  font-family: "Times New Roman";
  border-width: 0;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  background: #a8a6ff;
}
</style>