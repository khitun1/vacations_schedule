import {chartDateConverter} from "@/hooks/chartDateConverter.js";


describe('converter in year', () => {
    test('January', () => {
        expect(chartDateConverter("Jan 2024").converterInYear()).toBe('January')
    });
    test('March', () => {
        expect(chartDateConverter("Mar 2024").converterInYear()).toBe('March')
    });
    test('March', () => {
        expect(chartDateConverter("Mqr 2024").converterInYear()).toBe("Invalid date")
    });
    test('March', () => {
        expect(chartDateConverter("qwerty").converterInYear()).toBe("Invalid date")
    });
})

describe('converter in month', () => {
    test('January', () => {
        expect(chartDateConverter("Jan 2024").converterInMonth()).toBe('01.01')
    });
    test('March', () => {
        expect(chartDateConverter("Mar 2024").converterInMonth()).toBe('01.03')
    });
    test('March', () => {
        expect(chartDateConverter("Mqr 2024").converterInMonth()).toBe("Invalid date")
    });
    test('March', () => {
        expect(chartDateConverter("qwerty").converterInMonth()).toBe("Invalid date")
    });
})