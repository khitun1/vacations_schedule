import * as ru from "../locales/ru.json"
import * as en from "../locales/en.json"
import {totalDays} from "@/components/Options.js";
import {useStore} from "vuex";
export const localize = str => {
    return localStorage.getItem('lang') === '🌍 RU' ? ru[str] : en[str];
}


export const totalLeft = () => {
    let total = 0;
    const store = useStore()
    store.state.my.wishes.forEach(p => {
        total += totalDays(p.start, p.end)
    });
    if (store.state.my.currentUser.allow && store.state.my.currentUser.acceptAll) {
        return (store.state.my.currentUser.left - total + store.state.my.total) + localize('On')
            + (parseInt(store.state.my.year) + 1) + ' ' + localize('Year').toLowerCase();
    }
    else if ((!store.state.my.currentUser.allow && !store.state.my.currentUser.acceptAll) ||
        (store.state.my.currentUser.allow && !store.state.my.currentUser.acceptAll)) {
        return store.state.my.currentUser.actual_days + store.state.my.currentUser.left -
            total + store.state.my.total + localize('On') + (parseInt(store.state.my.year) + 1) +
            ' ' + localize('Year').toLowerCase();
    }
    else {
        return (store.state.my.currentUser.left + store.state.my.total) + localize('On')
            + (parseInt(store.state.my.year) + 2) + ' ' + localize('Year').toLowerCase();
    }
}