import { createApp } from 'vue'
import App from './App.vue'
import VueClickAway from "vue3-click-away";
import router from "@/router/router";
import 'v-calendar/dist/style.css';
import components from "@/components/UI";
import VCalendar from 'v-calendar';
import store from "@/store";


const app = createApp(App)

components.forEach(p => app.component(p.name, p))

app
    .use(router)
    .use(store)
    .use(VCalendar)
    .use(VueClickAway)
    .mount('#app')
