<template>
 <div>
   <router-view></router-view>
 </div>
</template>

<script>

export default {

}
</script>

<style>

body
{
  background: #e5e5e5;
}

body::-webkit-scrollbar {
  width: 10px;               /* ширина всей полосы прокрутки */
}


body::-webkit-scrollbar-thumb {
  background-color: #7e7e7e;    /* цвет бегунка */
  border-radius: 20px;       /* округлось бегунка */
}

</style>