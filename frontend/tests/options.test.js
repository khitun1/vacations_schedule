import {daysOff, totalDays} from "@/components/Options.js";
import store from "@/store";
import moment from "moment";

describe("days off", () => {
    test("weekends between dates", () => {
        expect(daysOff('01.01.2025', '09.01.2025')).toBe(2)
    })
    test("weekends on first date", () => {
        expect(daysOff('04.01.2025', '09.01.2025')).toBe(2)
    })
    test("weekends on last date", () => {
        expect(daysOff('04.01.2025', '11.01.2025')).toBe(3)
    })
    test("weekends is border", () => {
        expect(daysOff('04.01.2025', '12.01.2025')).toBe(4)
    })
    test("invalid value", () => {
        expect(daysOff(undefined, undefined)).toBe(0)
    })
    test("invalid format 'MM.DD.YYYY'", () => {
        expect(daysOff('01.19.2025', '01.25.2025')).toBe(0)
    })
    test("invalid format with '-'", () => {
        expect(daysOff('19-01-2025', '25-01-2025')).toBe(2)
    })
})


describe("total days", () => {
    beforeAll(() => {
        store.state.my.holidays = [
            moment('2022-02-23')._d,
            moment('2022-03-08')._d,
            moment('2022-05-01')._d,
            moment('2022-05-09')._d,
        ]
    })
    test("whole year", () => {
        expect(totalDays('01.01.2022', '01.01.2023')).toBe(362)
    })
    test("first day is holiday", () => {
        expect(totalDays('09.05.2022', '01.01.2023')).toBe(totalDays('10.05.2022', '01.01.2023'))
    })
    test("last day is holiday", () => {
        expect(totalDays('01.01.2022', '09.05.2022')).toBe(totalDays('01.01.2022', '08.05.2022'))
    })
})