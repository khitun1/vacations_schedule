<template>
  <sample-page>
    <my-select>
      <option selected disabled value="">Выберите отдел</option>
      <option v-for="dep in deps"
              :key="dep.id">
        {{ dep.name }}
      </option>
    </my-select>
    <my-input class="search" placeholder="поиск сотрудника"/>
    <div class="interval">
      <h3>Интервал отображения</h3>
      <my-input class="date" type="date"></my-input>
      &mdash;
      <my-input class="date" type="date"></my-input>
    </div>
    <div class="chart">

    </div>
  </sample-page>
</template>

<script>
import SamplePage from "@/components/Samples/SamplePage";
import MyInput from "@/components/UI/MyInput";
import MySelect from "@/components/UI/MySelect";

export default {
  name: "AllVacations",
  components: {
    MySelect,
    MyInput,
    SamplePage,
  },
  props: {
    deps: {
      type: Array,
      required: false,
    }
  }
}
</script>

<style scoped>

select
{
  position: absolute;
  top: 20px;
  left: 30px;
  text-align: center;
  font-size: 16px;
  width: 250px;
  cursor: pointer;
  outline: none;
}

.search
{
  position: absolute;
  top: 13px;
  left: 350px;
  border-radius: 10px;
  height: 20px;
  width: 300px;
}

.interval
{
  position: absolute;
  top: 5px;
  left: 800px;
  width: fit-content;
  height: fit-content;
  text-align: center;
}

.date
{
  height: 23px;
  width: 150px;
  font-size: 16px;
  margin-top: 0;
  font-family: "Times New Roman";
}

</style>