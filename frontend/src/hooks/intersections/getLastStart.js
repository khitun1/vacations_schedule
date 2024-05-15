import {dateUsualFormat} from "@/hooks/generalMoment/dateUsualFormat";
import {amountDays} from "@/hooks/generalMoment/amountDays";

export function getLastStart(i, j) {
    const iStart = dateUsualFormat(i);
    const jStart = dateUsualFormat(j);
    if(amountDays(iStart) > amountDays(jStart)) {
        return amountDays(iStart);
    }
    return amountDays(jStart);
}