<template>
 <input :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
input
{
  position: relative;
  margin: 10px;
  padding: 5px;
  border-radius: 16px;
  text-align: center;
  font-family: "Times New Roman";
  border-width: 0;
  font-size: 16px;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  outline: none;
}
</style>