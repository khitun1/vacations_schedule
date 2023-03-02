import moment from "moment";

export function dateReverseFormat(date) {
    return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
}