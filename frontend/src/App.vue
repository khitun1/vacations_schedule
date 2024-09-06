<template>
  <div v-if="isLoading"
       class="loader"/>
  <div v-else>
   <router-view></router-view>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {useStore} from "vuex";

const store = useStore();

const isLoading = computed(() => store.state.isLoading);
store.commit('setLoading', true);

onMounted(() => {
  store.commit('setLoading', false);
})
</script>

<style>

body
{
  background: #e5e5e5;
}

body::-webkit-scrollbar {
  width: 10px;
}


body::-webkit-scrollbar-thumb {
  background-color: #7e7e7e;
  border-radius: 20px;
}

.loader {
  border-radius: 50%;
  width: 50px;
  aspect-ratio: 1;
  position: absolute;
  top: 40%;
  left: 45%;
  background: conic-gradient(var(--clr-fill) var(--pie, 0deg), var(--clr-empty) 0);
  mask: radial-gradient(farthest-side, #0000 80%, #000 0);
  animation: progress 1s linear infinite;
}

@property --pie {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@property --clr-fill {
  syntax: "<color>";
  inherits: false;
  initial-value: #5b30b7;
}

@property --clr-empty {
  syntax: "<color>";
  inherits: false;
  initial-value: rgba(255, 0, 0, 0);
}

@keyframes progress {
  0% {
    --pie: 0deg;
    rotate: 0;
  }
  30% {
    --pie: 300deg;
  }
  50% {
    --pie: 360deg;
    --clr-fill: #5b30b7;
    --clr-empty: rgba(255, 0, 0, 0);
  }
  50.1%{
    --pie: 0deg;
    --clr-fill: rgba(255, 0, 0, 0);
    --clr-empty: #5b30b7;
  }
  80% {
    --pie: 300deg;
  }
  100% {
    --pie: 360deg;
    --clr-fill: rgba(255, 0, 0, 0);
    --clr-empty: #5b30b7;
    rotate: 360deg;
  }
}
</style>