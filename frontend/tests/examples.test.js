// const store = require("./examples.js");
// const axios= require("axios")
// const vuex = require("vuex");
// const {testStore} = require("./examples.js");
// // jest.mock("axios")
//
// describe('require axios', () => {
//     test('first', () => {
//         const users = [{
//             id: 1,
//             name: 'John'
//         }]
//         const res = {
//             data: users,
//         }
//
//         // axios.get.mockReturnValue(res)
//         const mock = jest.spyOn(store, "sum")
//         mock.mockReturnValue(2)
//         expect(store.sum()).toBe(2)
//         expect(mock).toBeCalled()
//
//         const mockUseStore = jest.spyOn(vuex, "useStore")
//         mockUseStore.mockReturnValue({
//             state: {lang: 'ru'}
//         })
//         expect(testStore()).toBe('ru')
//         expect(mockUseStore).toBeCalled()
//
//
//     })
// })


// const {testMy} = require("./examples.js");
// // const {sum} = require("./mod.js");
// // const store = require("./examples.js")
// // const mod = require('./mod.js')
//
// jest.mock("./mod.js")
// const {sum} = require("./mod.js");
// // const {sum} = jest.requireActual('./mod.js')
//
//
// describe("test_1", () => {
//     test("test_1.1.", () => {
//         // expect(testMy()).toBe(4)
//         // const sumMock = jest.spyOn(store, 'sum')
//         sum.mockReturnValue(2)
//         expect(testMy()).toBe(2)
//         // testMy();
//         // expect(sum()).toBeCalled()
//     })
// })


// const {testMy} = require("./examples.js");
// jest.mock("vuex")
// const {useStore} = require("vuex")
// describe("test useStore", () => {
//     let store;
//     beforeAll(() => {
//         store = {
//             state: {
//                 lang: 'RU'
//             }
//         }
//     })
//
//     test("useStore without vuex.", () => {
//         useStore.mockReturnValue(store)
//         expect(testMy()).toBe('RU')
//     })
// })



// const {localTest} = require("./examples.js");
import {localTest} from './examples.js'

test('localStorage', () => {
    // let localStorage;
    //     global.localStorage = {
    //         lang: 'RU'
    //     }
    expect(localTest()).toBe('RU')
})