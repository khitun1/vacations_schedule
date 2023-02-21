import moment from "moment/moment";
import {ref} from "vue";
import {useStore} from "vuex";

export function total_days() {
    const store = useStore();
    const totalDays = (start,end) => {
        const s = moment(start, 'DD.MM.YYYY');
        const e = moment(end, 'DD.MM.YYYY');
        let total = moment(e).diff((s), 'days') + 1;
        // const hollidays = computed(() => store.getters.hollidays);
        // hollidays.value.forEach(p => {
        //     const holliday = moment(p).format('DD.MM.YYYY');
        //     if (moment(p).isBetween(s,e) || holliday === s.format('DD.MM.YYYY')
        //         || holliday === e.format('DD.MM.YYYY'))   total--;
        // })
        const daysOff = ref(store.getters.daysOff);
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
        totalDays,
    }
}