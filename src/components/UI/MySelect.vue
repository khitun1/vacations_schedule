<template>
  <select :value="modelValue" @input="updateInput">
    <slot></slot>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  }
}
</script>

<style scoped>
select
{
  border-width: 0;
  outline: none;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  border-radius: 100px;
  height: 30px;
  font-family: "Times New Roman";
  cursor: pointer;
  font-size: 16px;
  text-align: center;
}

</style>