import moment from "moment";

export function amountDays(date) {
    return moment(date).diff('01.01.2022', 'days');
}