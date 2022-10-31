<template>
  <table>
    <tr>
      <th width="250px">Даты отпуска</th>
      <th width="150px">Всего дней</th>
      <th width="150px">Запрошено</th>
      <th width="150px">Оплачиваемый</th>
      <th width="250px">Статус заявки</th>
      <th width="50px"/>
      <th width="50px"/>
      <th width="50px"/>
    </tr>
    <tr v-for="rec in records"
          :key="rec.id">
      <td>{{rec.start}} - {{rec.end}}</td>
      <td>{{rec.total}} дней</td>
      <td>{{rec.dateRequest}}</td>
      <td>{{rec.paid}}</td>
      <td>{{rec.status}}</td>
      <td>
        <div class="circle" v-if="rec.status === 'Утверждено'" style="background: #00FF19"/>
        <div class="circle" v-else-if="rec.status === 'Ожидание'" style="background: #FFB800"/>
        <div class="circle" v-else-if="rec.status === 'Отказ'" style="background: #FF0000"/>
        <div class="circle" v-else-if="rec.status === 'Удалено'" style="background: #9E9E9E"/>
        <div class="circle" v-else-if="rec.status === 'Использовано'" style="background: #8482FF"/>
        <div class="circle" v-else-if="rec.status === 'Отменено'" style="background: #9E9E9E"/>
      </td>
      <td>
        <button-icon>
          <img src="@/components/images/EditIcon.png"/>
        </button-icon>
      </td>
      <td>
        <button-icon>
          <img src="@/components/images/DeleteIcon.png"/>
        </button-icon>
      </td>
    </tr>

  </table>
</template>

<script>
import ButtonIcon from "@/components/UI/ButtonIcon";
export default {
  name: "MyTable",
  components: {
    ButtonIcon,
  },
  props: {
    records: {
      type: Array,
      required: false,
    }
  },
}
</script>

<style scoped>

th
{
  border-bottom: 1px solid lightslategray;
}

td
{
  border-bottom: 1px solid lightslategray;
  height: 30px;
  text-align: center;
}

button-icon
{
  top: 10px;
  right: 10px;
}

img
{
  width: 20px;
  height: 20px;
}

.circle
{
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 25px;
  left: 15px;
}

</style>