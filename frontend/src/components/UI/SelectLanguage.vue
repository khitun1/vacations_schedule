<script setup>
import {getCurrentInstance, ref} from "vue";

const language = ref(localStorage.getItem('lang'));

const languages = ['RU', 'EN'];

const emit = defineEmits(['rerender']);

const selectLanguage = () => {
  localStorage.setItem('lang', language.value);
  emit('rerender');
}

</script>

<template>
  <select v-model="language" @change="selectLanguage" class="language">
    <option v-for="language in languages" :key="language">
      🌍 {{language}}
    </option>
  </select>
</template>

<style scoped>
  .language{
    background: transparent;
    border-color: transparent;
    width: fit-content;
    height: 25px;
    cursor: pointer;
    -webkit-appearance:none;
    -moz-appearance:none;
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>