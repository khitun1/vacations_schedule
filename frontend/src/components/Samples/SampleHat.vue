<template>
  <div class="notesList"
       v-click-away="onClickAway"
       v-if="showAllNotes">
    <div class="recInList"
         v-for="note in notes.filter((p, index) => index < 3)"
         :key="note.id">
      Пользователь {{note.user}} отправил заявку на отпуск
      {{getTime(note.createdAt)}}
    </div>
    <p v-if="notes.length > 3"
       class="etc">
      И ещё {{notes.length - 3}}...
    </p>
    <my-button class="showAll"
        v-if="notes.length > 0"
        @click="seeAll">
      Просмотреть все
    </my-button>
  </div>
  <div class="hat">
    <h1>
      Планирование отпусков
    </h1>
    <div class="panel">
      <p>
        {{currentUser.surname + ' ' + currentUser.first_name + ' '
        + currentUser.last_name}}
      </p>
      <button-icon class="btn"
          v-if="currentUser.is_admin"
          @click="showAllNotes = true">
        <img src="@/images/NoticeIcon.png"
             alt="notice icon">
        <div class="notes"
            v-if="notes.length > 0">
          {{notes.length}}
        </div>
      </button-icon>
      <router-link to="/">
        <button-icon class="btn"
                     @click="exit">
          <img src="@/images/ExitIcon.png"
               alt="exit icon">
        </button-icon>
      </router-link>
    </div>
  </div>
  <transition name="note">
    <div class="newNote"
        v-if="showNote && currentUser.is_admin">
      Пользователь {{noteName}} отправил заявку на отпуск
    </div>
  </transition>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import moment from "moment";
import router from "@/router/router";
import {useStore} from "vuex";
import MyButton from "@/components/UI/MyButton.vue";
import ButtonIcon from "@/components/UI/ButtonIcon.vue";

const store = useStore();
const showNote = ref(false);
const showAllNotes = ref(false);
const currentUser = computed(() => store.state.my.currentUser);
const noteName = computed(() => store.state.my.noteName);
const notes = computed(() => store.state.my.notes);

const getTime = time => moment(time).format('HH:mm:ss');
const onClickAway = () => {
      showAllNotes.value = false;
    }
const exit = () => {
      localStorage.removeItem('token');
      store.commit('clear');
    }
const seeAll = () => {
      showAllNotes.value = false;
      router.push('/allVacations');
      store.dispatch('clear');
    }
watch (noteName, () => {
      if (noteName.value !== '') {
        showNote.value = true;
        setTimeout(() => {
          showNote.value = false;
          store.commit('clearNoteName');
        }, 2000)
      }
    })
</script>

<style scoped>

.notes{
  width: 20px;
  height: 20px;
  background: orange;
  border-radius: 100%;
  position: relative;
  top: -35px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.panel p
{
  position: relative;
  top: 12px;
  width: fit-content;
  left: -50px;
  height: 40px;
  font-size: 18px;
}

.notesList{
  display: flex;
  flex-direction: column;
  width: 260px;
  min-height: 100px;
  height: fit-content;
  border-radius: 10px;
  background: #eeeeee;
  position: absolute;
  z-index: 2;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
  right: 3%;
  top: 70px;
  padding: 10px;
}

.recInList {
  margin-bottom: 10px;
  background: #b3b2ff;
  padding: 7px;
  border-radius: 8px;
  color: white;
}

.note-enter-active, .note-leave-active {
  transition: opacity .8s;
}

.note-enter, .note-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
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

.newNote {
  width: 400px;
  height: 30px;
  position: absolute;
  top: 70px;
  background: #d1c1ff;
  padding: 10px;
  right: 40px;
  border-radius: 10px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.showAll {
  margin: 10px 0;
}

.etc {
  color: #000000;
  margin: 0;
  text-align: right;
}

@media screen and (max-width: 800px) {
  .hat {
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-top: 0;
  }

  .newNote {
    left: 20px;
    top: 90px;
  }

  .panel {
    left: 60px;
    margin-top: -30px;
  }
}


</style>