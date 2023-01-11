<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "button-icon"
}
</script>

<style scoped>
button
{
  position: relative;
  height: 35px;
  width: 35px;
  cursor: pointer;
  background: none;
  border-width: 0;
}

</style>