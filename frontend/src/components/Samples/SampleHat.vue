<template>
  <div class="hat">
    <h1>Планирование отпусков</h1>
    <div class="panel">
      <p>Хитун Иван Михайлович</p>
      <button-icon class="btn">
        <img src="@/images/NoticeIcon.png">
      </button-icon>
      <router-link to="/">
        <button-icon class="btn">
          <img src="@/images/ExitIcon.png">
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
  top: 15px;
  width: fit-content;
  left: -50px;
  height: 40px;
  font-size: 18px;
}

.panel
{
  display: flex;
  position: relative;
  width: fit-content;
}

.btn
{
  position: relative;
  top: 25px;
  margin-right: 20px;
  cursor: pointer;
}

img
{
  height: 25px;
  width: 25px;
}

.hat {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media screen and (max-width: 800px) {
  .hat {
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-top: 0;
  }

  .panel {
    left: 60px;
    margin-top: -30px;
  }
}


</style>