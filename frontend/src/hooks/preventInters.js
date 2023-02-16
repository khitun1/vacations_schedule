import moment from "moment/moment";
import store from "@/store";
import {ref, computed, onMounted} from "vue";

export function preventInters() {
    const percent = computed(() => store.state.my.currentUser.percent);
    const len = computed(() => store.state.my.len);
    const intersInUsersDep = computed(() => store.state.my.dates);
    let inters = ref([]);
    const currentUser = computed(() => store.state.my.currentUser);

    const intersections = () => {
        let quarter = Math.floor(percent.value * len.value);
        if (quarter <= 1) {
            intersInUsersDep.value.forEach(p => {
                if (p.userId !== currentUser.value.id) {
                    const vac = {
                        start: p.start,
                        end: p.end,
                        status: 'inters',
                    }
                    inters.value.push(vac);
                }
            })
        }
        else {
            let lastStart;
            for (let i = 0; i < intersInUsersDep.value.length; i++) {
                for (let j = 0; j < i; j++){
                    if(findIntersection(intersInUsersDep.value[i], intersInUsersDep.value[j])) {
                        lastStart = getLastStart(i,j);
                        draw(i, lastStart, quarter);
                    }
                }
            }
        }
    }

    const getLastStart = (i,j) => {
        let iStart = moment(intersInUsersDep.value[i].start, 'DD.MM.YYYY');
        let jStart = moment(intersInUsersDep.value[j].start, 'DD.MM.YYYY');
        if(iStart.diff('01.01.2022', 'days') > jStart.diff('01.01.2022', 'days'))
            return iStart.diff('01.01.2022', 'days');
        return jStart.diff('01.01.2022', 'days');
    }

    const findIntersection = (first, second) => {
        let iStart = moment(first.start, 'DD.MM.YYYY');
        let jStart = moment(second.start, 'DD.MM.YYYY');
        let iEnd = moment(first.end, 'DD.MM.YYYY');
        let jEnd = moment(second.end, 'DD.MM.YYYY');
        return iStart.isBetween(jStart, jEnd) || iEnd.isBetween(jStart, jEnd);
    }

    const draw = (i, lastStart, quarter) => {
        let start;
        let end;
        for(let j = 0; j < i; j++){
            start = moment(intersInUsersDep.value[j].start, 'DD.MM.YYYY')
                .diff('01.01.2022', 'days');
            end = moment(intersInUsersDep.value[j].end, 'DD.MM.YYYY')
                .diff('01.01.2022', 'days');
            if(lastStart <= end &&
                lastStart >= start)
            {
                let range = {};
                range.start = intersInUsersDep.value[i].start;
                const earlierEnd = moment(intersInUsersDep.value[i].end, 'DD.MM.YYYY')
                    .diff('01.01.2022', 'days');
                range.end = earlierEnd < end ? intersInUsersDep.value[i].end
                    : intersInUsersDep.value[j].end;
                range.status = 'inters';
                inters.value.push(range);
            }
        }

        if (inters.value.length < quarter) {
            inters.value = [];
        }
    }

    onMounted(async () => {
        await store.dispatch('auth');
        await store.dispatch('getDates');
        await store.dispatch('getWishes');
        await store.dispatch('getVacations');
        intersections();
    });

    return {
        findIntersection,
        len,
        intersInUsersDep,
        currentUser,
        inters,
    }
}