import MyVacations from "../pages/MyVacations.vue";
import {createRouter, createWebHistory} from "vue-router";
import TakeVacation from "../pages/TakeVacation.vue";
import AllVacations from "../pages/AllVacations.vue";
import AdminPage from "../pages/AdminPage.vue";
import MySettings from "../pages/MySettings.vue";
import StartScreen from "../pages/StartScreen.vue";


const routes = [
    {
      path: '/',
      component: StartScreen,
    },
    {
        path: '/myVacations',
        component: MyVacations,
    },
    {
        path: '/requestVacation',
        component: TakeVacation,
    },
    {
        path: '/allVacations',
        component: AllVacations,
    },
    {
        path: '/admin',
        component: AdminPage,
    },
    {
        path: '/settings',
        component: MySettings,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
    }
)

export default router;