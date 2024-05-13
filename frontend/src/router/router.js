import MyVacations from "../pages/MyVacations.vue";
import {createRouter, createWebHistory} from "vue-router";
import TakeVacation from "../pages/TakeVacation.vue";
import AllVacations from "../pages/AllVacations.vue";
import AdminPage from "../pages/AdminPage.vue";
import MySettings from "../pages/MySettings.vue";
import StartScreen from "../pages/StartScreen.vue";
import NotAccess from "@/components/Samples/NotAccess.vue";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem('token');

const routes = [
    {
      path: '/',
      component: StartScreen,
    },
    {
        path: '/myVacations',
        component: () => {
            return token ? MyVacations : '';
        },
    },
    {
        path: '/requestVacation',
        component: () => {
            return token ? TakeVacation : '';
        },
    },
    {
        path: '/allVacations',
        component: () => {
            const isAdmin = jwt_decode(token).is_admin;
            const director = jwt_decode(token).director;
            return token ? (isAdmin || director ? AllVacations : NotAccess) : '';
        },

    },
    {
        path: '/admin',
        component: () => {
            const isAdmin = jwt_decode(token).is_admin;
            const director = jwt_decode(token).director;
            return token ? (isAdmin && !director ? AdminPage : NotAccess) : '';
        },
    },
    {
        path: '/settings',
        component: () => {
            return token ? MySettings : '';
        },
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
    }
)

export default router;