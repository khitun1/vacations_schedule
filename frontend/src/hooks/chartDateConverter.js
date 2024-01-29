import moment from "moment";

export function chartDateConverter(value) {

    const converterInYear = () => moment(value, 'MMM YYYY').format('MMMM');
    const converterInQuarter = () => moment(value, 'MMM YYYY').format('DD.MM');

    const converterInMonth = () => moment(value, 'MMM YYYY').format('DD.MM');

    return {
        converterInYear,
        converterInQuarter,
        converterInMonth,
    }


}