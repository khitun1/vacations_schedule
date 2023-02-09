import MyVacations from "@/pages/MyVacations";
import {createRouter, createWebHistory} from "vue-router";
import TakeVacation from "@/pages/TakeVacation";
import AllVacations from "@/pages/AllVacations";
import AdminPage from "@/pages/AdminPage";
import MySettings from "@/pages/MySettings";
import StartScreen from "@/pages/StartScreen";


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