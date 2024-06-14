<template>
  <sample-page choice="settings"
                @rerender="rerender">
    <personal-data :key="rerenderKey"/>
  </sample-page>
</template>

<script setup>
import SamplePage from "@/components/Samples/SamplePage";
import PersonalData from "@/components/PersonalData";
import {useStore} from "vuex";
import {computed, ref} from "vue";

const store = useStore();
const token = localStorage.getItem('token');
const isLoading = computed(() => store.state.isLoading);

const rerenderKey = ref(0);
const rerender = () => {
  rerenderKey.value++;
}

store.dispatch('createSocket');
</script>

<style scoped>

</style>