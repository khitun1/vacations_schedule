<template>
  <button-icon class="back">
    <img src="@/components/images/BackIcon.png">
  </button-icon>
</template>

<script>
export default {
  name: "ButtonBack"
}
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