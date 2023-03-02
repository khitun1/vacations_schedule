import moment from "moment/moment";

export function dateUsualFormat(date) {
    return moment(date, 'DD.MM.YYYY');
}