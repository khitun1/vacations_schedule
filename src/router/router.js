import MyVacations from "@/Pages/MyVacations";
import {createRouter, createWebHistory} from "vue-router";
import TakeVacation from "@/Pages/TakeVacation";
import AllVacations from "@/Pages/AllVacations";
import AdminPage from "@/Pages/AdminPage";
import MySettings from "@/Pages/MySettings";
import StartScreen from "@/Pages/StartScreen";


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