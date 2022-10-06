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
    <tr>
      <td>07.10.2022 - 18.10.2022</td>
      <td>11 дней</td>
      <td>15.08.2022</td>
      <td>Да</td>
      <td>Подтверждено</td>
      <td><div class="circle" style="background: greenyellow"></div></td>
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
    <tr>
      <td>07.10.2022 - 18.10.2022</td>
      <td>11 дней</td>
      <td>15.08.2022</td>
      <td>Да</td>
      <td>Ожидает подтверждения</td>
      <td><div class="circle" style="background: orange"></div></td>
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
    <tr>
      <td>07.10.2022 - 18.10.2022</td>
      <td>11 дней</td>
      <td>15.08.2022</td>
      <td>Да</td>
      <td>Ожидает подтверждения</td>
      <td><div class="circle" style="background: orange"></div></td>
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
    <tr>
      <td>07.10.2022 - 18.10.2022</td>
      <td>11 дней</td>
      <td>15.08.2022</td>
      <td>Да</td>
      <td>Ожидает подтверждения</td>
      <td><div class="circle" style="background: orange"></div></td>
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
    <tr>
      <td>07.10.2022 - 18.10.2022</td>
      <td>11 дней</td>
      <td>15.08.2022</td>
      <td>Да</td>
      <td>Ожидает подтверждения</td>
      <td><div class="circle" style="background: orange"></div></td>
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
    <tr>
      <td>07.10.2022 - 18.10.2022</td>
      <td>11 дней</td>
      <td>15.08.2022</td>
      <td>Да</td>
      <td>Ожидает подтверждения</td>
      <td><div class="circle" style="background: orange"></div></td>
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
    }
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