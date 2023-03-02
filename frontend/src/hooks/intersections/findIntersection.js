import {dateUsualFormat} from "@/hooks/generalMoment/dateUsualFormat";
import {amountDays} from "@/hooks/generalMoment/amountDays";

export function findIntersection(i, j) {
    const iStart = dateUsualFormat(i.start);
    const jStart = dateUsualFormat(j.start);
    const iEnd = dateUsualFormat(i.end);
    const jEnd = dateUsualFormat(j.end);
    return (amountDays(iEnd) <= amountDays(jStart)) ||
        amountDays(iStart) >= amountDays(jEnd);
}