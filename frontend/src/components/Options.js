import moment from "moment";
import store from "@/store";

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
                min: '2022-01-01',
                max: '2022-12-31',
                ticks: {
                    align: 'start',
                    stepSize: 1,
                    callback: function (value) {
                        switch (value) {
                            case 'Jan ' + store.state.year:
                                return '  Январь'
                            case 'Feb ' + store.state.year:
                                return ' Февраль'
                            case 'Mar ' + store.state.year:
                                return '    Март'
                            case 'Apr ' + store.state.year:
                                return '  Апрель'
                            case 'May ' + store.state.year:
                                return '     Май'
                            case 'Jun ' + store.state.year:
                                return '    Июнь'
                            case 'Jul ' + store.state.year:
                                return '    Июль'
                            case 'Aug ' + store.state.year:
                                return '   Август'
                            case 'Sep ' + store.state.year:
                                return ' Сентябрь'
                            case 'Oct ' + store.state.year:
                                return '  Октябрь'
                            case 'Nov ' + store.state.year:
                                return '   Ноябрь'
                            case 'Dec ' + store.state.year:
                                return '  Декабрь'
                            default:
                                break
                        }
                    }
                }
            }
        },
        plugins: {
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

                        let start = new Date(context.parsed._custom.barStart);
                        let end = new Date(context.parsed._custom.barEnd);
                        let dif = moment(end).diff('01-01-2022', 'days') - moment(start).diff('01-01-2022', 'days');
                        if (label) {
                            label = label + ': Начало: ' + moment(start).format('DD.MM.YYYY')+
                                '   Конец: ' + moment(end).format('DD.MM.YYYY') + '    Кол-во дней:  ' + dif;
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
