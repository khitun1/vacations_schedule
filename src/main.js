import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import 'v-calendar/dist/style.css';
import components from "@/components/UI";


const app = createApp(App)

components.forEach(p => app.component(p.name, p))

app
    .use(router)
    .mount('#app')
import VCalendar from 'v-calendar';

// Use plugin with defaults
app.use(VCalendar, {})