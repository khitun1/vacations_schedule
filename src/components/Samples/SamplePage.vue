<template>
  <sample-hat/>
  <div class="panel" style="position: fixed; z-index: 2;">
    <p>Хитун Иван Михайлович</p>
    <button-icon class="btn">
      <img src="@/components/images/NoticeIcon.png">
    </button-icon>
    <button-icon class="btn">
      <img src="@/components/images/ExitIcon.png">
    </button-icon>
  </div>
  <sample-nav-bar/>
  <div class="work">
    <slot></slot>
  </div>
</template>

<script>
import SampleHat from "@/components/Samples/SampleHat";
import SampleNavBar from "@/components/Samples/SampleNavBar";
import ButtonIcon from "@/components/UI/ButtonIcon";

export default {
  components:{
    ButtonIcon,
    SampleHat,
    SampleNavBar
  },
  name: "SamplePage"
}
</script>

<style>

.work
{
  position: absolute;
  left: 300px;
  width: 1200px;
  top: 100px;
  height: 600px;
}

.btn
{
  left: 1430px;
  top: 18px;
  margin-right: 10px;
}

.panel p
{
  position: absolute;
  left: 1000px;
  top: 6px;
  width: 400px;
  height: 40px;
  font-family: "Times New Roman";
  font-size: 18px;
  text-align: right;
}

img
{
  height: 25px;
  width: 25px;
}

</style>