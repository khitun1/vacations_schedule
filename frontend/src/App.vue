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

const store = useStore()

const isLoading = computed(() => store.state.isLoading);
store.commit('setLoading', true);

onMounted(() => {
  store.commit('setLoading', false);
})

// setTimeout(() => {
//   store.commit('setLoading', true)
// }, 1000);
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
  height: 50px;
  position: absolute;
  top: 40%;
  left: 45%;
  border: 10px solid #5b30b7;
  animation: progress 1s cubic-bezier(.25, .4, .75, .6) infinite;

}

@keyframes progress {
  0% { clip-path: polygon(50% 50%, 50% -21%, -21% 50%, 50% 121%, 121% 50%, 50% -21%); }
  12% { clip-path: polygon(50% 50%, 50% -21%, -21% 50%, 50% 121%, 121% 50%, 121% 50%); }
  25% { clip-path: polygon(50% 50%, 50% -21%, -21% 50%, 50% 121%, 50% 121%, 50% 121%); }
  37% { clip-path: polygon(50% 50%, 50% -21%, -21% 50%, -21% 50%, -21% 50%, -21% 50%); }
  50% { clip-path: polygon(50% 50%, 50% -21%, 50% -21%, 50% -21%, 50% -21%, 50% -21%); }
  62% { clip-path: polygon(50% 50%, 50% -21%, 121% 50%, 121% 50%, 121% 50%, 121% 50%); }
  75% { clip-path: polygon(50% 50%, 50% -21%, 121% 50%, 50% 121%, 50% 121%, 50% 121%); }
  87% { clip-path: polygon(50% 50%, 50% -21%, 121% 50%, 50% 121%, -21% 50%, -21% 50%); }
  100% { clip-path: polygon(50% 50%, 50% -21%, 121% 50%, 50% 121%, -21% 50%, 50% -21%); }
}

</style>