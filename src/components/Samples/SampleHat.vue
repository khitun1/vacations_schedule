<template>
  <div class="hat">
    <h1>Планирование отпусков</h1>
    <div class="panel">
      <p>Хитун Иван Михайлович</p>
      <button-icon class="btn">
        <img src="@/components/images/NoticeIcon.png">
      </button-icon>
      <router-link to="/">
        <button-icon class="btn">
          <img src="@/components/images/ExitIcon.png">
        </button-icon>
      </router-link>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>


.panel p
{
  position: relative;
  top: 6px;
  width: fit-content;
  left: -50px;
  height: 40px;

  font-size: 18px;
}

.panel
{
  display: flex;
  padding: 10px;
  right: 20px;
  position: absolute;
  top: -10px;
}

.btn
{
  position: relative;
  top: 20px;
  margin-right: 20px;
}

img
{
  height: 25px;
  width: 25px;
}


</style>