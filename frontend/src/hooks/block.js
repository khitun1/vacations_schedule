import moment from "moment/moment";
import store from "@/store";
import {computed, ref} from "vue";

export function block() {
    let visible = ref(false);
    let visibleExplanation = ref(false);
    let explanation = ref('');
    const Del = (id) => {
        store.dispatch('deleteVacation', id);
    }

    const checkDel = (status, id) => {
        if(visible.value !== id) return false;
        if(status !== 'Утверждено' && status !== 'Использовано') return true;
    }

    const totalDays = (start,end) => {
        const s = moment(start, 'DD.MM.YYYY');
        const e = moment(end, 'DD.MM.YYYY');
        let total = moment(e).diff((s), 'days') + 1;
        const hollidays = computed(() => store.getters.hollidays);
        hollidays.value.forEach(p => {
            const holliday = moment(p).format('DD.MM.YYYY');
                if (moment(p).isBetween(s,e) || holliday === s.format('DD.MM.YYYY')
                    || holliday === e.format('DD.MM.YYYY'))   total--;
        })
        const daysOff = computed(() => store.getters.daysOff);
        daysOff.value.forEach(p => {
            const dayOff= moment(p.dates).format('DD.MM.YYYY');
            if (moment(p.dates).isBetween(s,e)|| dayOff === s.format('DD.MM.YYYY')
                || dayOff === e.format('DD.MM.YYYY'))   {
                total--;
            }
        })
        return total;
    }
    
    return {
        visible,
        visibleExplanation,
        explanation,
        Del,
        checkDel,
        totalDays,
    }
}