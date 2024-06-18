import {chartDateConverter} from '@/hooks/chartDateConverter.js'
import {amountDays} from "@/hooks/generalMoment/amountDays.js";
import moment from "moment";
import {dateChartFormat} from "@/hooks/generalMoment/dateChartFormat.js";
import {dateReverseFormat} from "@/hooks/generalMoment/dateReverseFormat.js";
import {dateUsualFormat} from "@/hooks/generalMoment/dateUsualFormat.js";

describe('amount days', () => {
    test('01.01.2022', () => {
        expect(amountDays(moment('01.01.2022'))).toBe(0);
    });
    test('29.02.2022', () => {
        expect(amountDays(moment('29.02.2022', 'DD.MM.YYYY'))).toBe(NaN);
    });
    test('29.02.2024', () => {
        expect(amountDays(moment('02.29.2024'))).not.toBeNaN();
    });
    test('01.01.2023', () => {
        expect(amountDays(moment('01.01.2023'))).toBe(364);
    });
    test('31.12.2021', () => {
        expect(amountDays(moment('31.12.2021', 'DD.MM.YYYY'))).toBe(-1);
    });
    test('31.13.2021', () => {
        expect(amountDays(moment('31.13.2021'))).toBeNaN();
    });
    test('32.12.2021', () => {
        expect(amountDays(moment('32.12.2021'))).toBeNaN();
    });
})

describe('date in chart format', () => {
    test('01.01.2022', () => {
        expect(dateChartFormat('01.01.2022')).toBe('2022-01-01');
    });
    test('29.02.2022', () => {
        expect(dateChartFormat('29.02.2022')).toBe("Invalid date");
    });
    test('29.02.2024', () => {
        expect(dateChartFormat('02.29.2024')).toBe('2024-02-29');
    });
    test('01.01.2023', () => {
        expect(dateChartFormat('01.01.2023')).toBe('2023-01-01');
    });
    test('31.12.2021', () => {
        expect(dateChartFormat('12.31.2021')).toBe('2021-12-31');
    });
    test('31.13.2021', () => {
        expect(dateChartFormat('13.31.2021')).toBe("Invalid date");
    });
    test('32.12.2021', () => {
        expect(dateChartFormat('32.12.2021')).toBe("Invalid date");
    });
})


describe('date in reverse format', () => {
    test('01.01.2022', () => {
        expect(dateReverseFormat('2022-01-01')).toBe('01.01.2022');
    });
    test('29.02.2022', () => {
        expect(dateReverseFormat('2022-02-29')).toBe("Invalid date");
    });
    test('29.02.2024', () => {
        expect(dateReverseFormat('2024-02-29')).toBe('29.02.2024');
    });
    test('01.01.2023', () => {
        expect(dateReverseFormat('2023-01-01')).toBe('01.01.2023');
    });
    test('31.12.2021', () => {
        expect(dateReverseFormat('2021-12-31')).toBe('31.12.2021');
    });
    test('31.13.2021', () => {
        expect(dateReverseFormat('2021-13-31')).toBe("Invalid date");
    });
    test('32.12.2021', () => {
        expect(dateReverseFormat('2021-12-32')).toBe("Invalid date");
    });
})

describe('date usual format', () => {
    test('01.01.2022', () => {
        expect(dateUsualFormat('01.01.2022')).toStrictEqual(moment('01.01.2022', 'DD.MM.YYYY'));
    });
    test('29.02.2024', () => {
        expect(dateUsualFormat('29.02.2024')).toStrictEqual(moment('29.02.2024', 'DD.MM.YYYY'));
    });
    test('31.12.2021', () => {
        expect(dateUsualFormat('31.12.2021')).toStrictEqual(moment('31.12.2021', 'DD.MM.YYYY'));
    });
})