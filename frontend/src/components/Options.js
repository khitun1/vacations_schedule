import moment from "moment";
import store from "@/store";
import {chartDateConverter} from "@/hooks/chartDateConverter";
import {ref} from "vue";

export function options() // config for chart
{
    return {
        indexAxis: 'y',
        animation: false,
        barPercentage: 0.5,
        maintainAspectRatio: false,
        scales: {
            x: {
                position: 'top',
                type: 'time',
                time: {
                    unit: 'month'
                },
                min: store.state.admin.year + '-01-01',
                max: store.state.admin.year +'-12-31',
                ticks: {
                    align: 'start',
                    stepSize: 1,
                    callback: function (value) {
                            const {converterInYear, converterInQuarter, converterInMonth} = chartDateConverter(value);
                            return store.state.admin.range === 'Год' ? converterInYear() :
                                store.state.admin.range === 'Квартал' ? converterInQuarter() : converterInMonth();
                    }
                }
            }
        },
        plugins: {
            legend: {
              display: false,
            },
            // title: {
            //     display: true,
            //     text: 'График отпусков',
            //     font: {
            //         size: 16,
            //     }
            // },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        const start = moment(context.parsed._custom.barStart).format('DD.MM.YYYY');
                        const end = moment(context.parsed._custom.barEnd).format('DD.MM.YYYY');
                        if (label) {
                            label = label + ': Начало: ' + start +
                                '   Конец: ' + end + '    Кол-во дней:  ' + totalDays(start, end);
                        }
                        return label;
                    },
                }
            }
        }
    }
}


export function viewDate(date) // collect date in view 'dd.mm.yy'
{
    let view = ''
    let split = date.split('-')
    view = split[2] + '.' + split[1] + '.' + split[0][2] + split[0][3]
    return view
}

export function totalDays(start,end) {
    const s = moment(start, 'DD.MM.YYYY');
    const e = moment(end, 'DD.MM.YYYY');
    let total = moment(e).diff((s), 'days') + 1;
    const holidays = ref(store.state.my.holidays);
    holidays.value.forEach(p => {
        const holiday = moment(p).format('DD.MM.YYYY');
        if (moment(p).isBetween(s,e) || holiday === s.format('DD.MM.YYYY')
            || holiday === e.format('DD.MM.YYYY'))   {
            total--;
        }
    })
    return total;
}

export const daysOff = (start, end) => {
    const s = moment(start, 'DD.MM.YYYY');
    const e = moment(end, 'DD.MM.YYYY');
    let total = 0;
    const daysOff = ref(store.getters.daysOff);
    daysOff.value.forEach(p => {
        const dayOff = moment(p.dates).format('DD.MM.YYYY');
        if (moment(p.dates).isBetween(s,e) || dayOff === s.format('DD.MM.YYYY')
            || dayOff === e.format('DD.MM.YYYY'))   {
            total++;
        }
    })
    return total;
}
