import moment from "moment";

export function dateChartFormat(date) {
    return moment(date).format('YYYY-MM-DD');
}