<script setup>
import {ref} from "vue";

const language = ref(localStorage.getItem('lang'));

const languages = ['Русский', 'English']

const selectLanguage = () => {
  localStorage.setItem('lang', language.value);
  location.reload()
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
  }
</style>