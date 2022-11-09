import MyVacations from "@/components/Pages/MyVacations";
import {createRouter, createWebHistory} from "vue-router";
import TakeVacation from "@/components/Pages/TakeVacation";
import AllVacations from "@/components/Pages/AllVacations";
import SetSignature from "@/components/Pages/SetSignature";
import MySettings from "@/components/Pages/MySettings";
import StartScreen from "@/components/Pages/StartScreen";

let admin = 1;
let left = 20;
let total = 100;
let selected = 1;
let dep = 'first';


const routes = [
    {
      path: '/',
      component: StartScreen,
    },
    {
        path: '/myVacations',
        component: MyVacations,
        props: {
            isAdmin: admin,
            left: left,
            total: total,
        },
    },
    {
        path: '/requestVacation',
        component: TakeVacation,
        props: { isAdmin: admin},
    },
    {
        path: '/allVacations',
        component: AllVacations,
        props: {
            isAdmin: admin,
            selected: selected,
            dep: dep,
        },
    },
    {
        path: '/setSignature',
        component: SetSignature,
        props: { isAdmin: admin},
    },
    {
        path: '/settings',
        component: MySettings,
        props: { isAdmin: admin,},
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
    }

)

export default router;