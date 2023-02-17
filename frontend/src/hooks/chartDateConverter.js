
import moment from "moment";

export function chartDateConverter(value) {

    const converterInYear = () => moment(value).lang('ru').format('MMMM');
    const converterInQuarter = () => moment(value).format('DD.MM');

    const converterInMonth = () => moment(value).format('DD.MM');

    return {
        converterInYear,
        converterInQuarter,
        converterInMonth,
    }


}