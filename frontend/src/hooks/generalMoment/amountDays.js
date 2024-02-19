import moment from "moment";

export function amountDays(date) {
    const dateForDif = moment('01.01.2022', 'dd.mm.yyyy');
    return date.diff(dateForDif, 'days');
}