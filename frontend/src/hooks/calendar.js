import {computed, onMounted, ref} from "vue";
import moment from "moment/moment";
import store from "@/store";

export function  calendar(inters , flag = 0) {
    const rows = ref('2');
    let columns = ref('3');
    let calendarShow = ref(true);
    let myVacations = computed(() => store.state.my.myVacations);
    let wishes = computed(() => store.state.my.wishes);


    let attrs = computed(() => {
        let attrs = [];
        const holidays = computed(() => store.getters.holidays);

        const daysOff = computed(() => store.getters.daysOff);

        daysOff.value.forEach(p => {
            attrs.push(p);
        })

        holidays.value.forEach(p => {
            attrs.push({
                content: 'red',
                dates: p,
                bar: 'red'
            })
            if (moment(p).format('dddd') === 'Sunday' || moment(p).format('dddd') === 'Saturday') {
                attrs.push({
                    content: 'red',
                    dates: moment(p).weekday(1)._d,
                    bar: 'red',
                    status: 'holliday',
                })
            }
        })


        myVacations.value.forEach(p => {
            if (flag === 0) {
                if (p.status !== 'Отказ' && p.status !== 'Использовано') attrs.push(chooseColor(p));
            }
            else {
                if (p.status !== 'inters') attrs.push(chooseColor(p));
            }
        });
        wishes.value.forEach(p => attrs.push(chooseColor(p)));
        if (flag === 0) inters.value.forEach(p => attrs.push(chooseColor(p)));
        return attrs;
    })

    let dis = computed(() => {
        let dis = [];
        myVacations.value.forEach(p => {
            if (flag === 0) {
                if (p.status !== 'Отказ' && p.status !== 'Использовано')
                {
                    dis.push(disDates(p))
                }
            }
            else {
                if (p.status !== 'inters') dis.push(disDates(p));
            }
        });
        wishes.value.forEach(p => dis.push(disDates(p)));
        return dis;
    })

    let minDate = computed(() => {
        const start = moment().year() + 1 + '-01-01';
        return moment(start)._d;
    });

    const updateColumns = () => {
        columns.value = window.innerWidth > 1100? 3 : window.innerWidth > 600 ? 2 : 1;
    }

    const chooseColor = (rec) => {
        return {
            id: new Date(),
            highlight: {
                start: { fillMode: 'transparent' },
                base: { fillMode: 'light', color: rec.status === undefined ? 'gray' :
                        rec.status === 'Утверждено'? 'green': rec.status === 'Использовано' ? 'purple':
                            rec.status === 'Ожидание'? 'orange'
                                : (rec.status === 'inters' || rec.status === 'Отказ') ? 'red' :'none'},
                end: { fillMode: 'transparent' },
            },
            dates: { start: moment(rec.start, 'DD.MM.YYYY')._d, end: moment(rec.end, 'DD.MM.YYYY')._d },
        }
    }

    const disDates = (rec) => {
        return {
            id: new Date(),
            start: moment(rec.start, 'DD.MM.YYYY')._d,
            end: moment(rec.end, 'DD.MM.YYYY')._d,
        }
    }


    onMounted(async () => {
        window.addEventListener('resize', updateColumns);
        await store.dispatch('auth');
        await store.dispatch('getVacations');

    })

    return {
        rows,
        columns,
        attrs,
        dis,
        minDate,
        calendarShow,
        myVacations,
    }


}