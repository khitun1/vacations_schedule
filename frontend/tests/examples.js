// // import {useStore} from "vuex";
// // import axios from "axios";
// const axios = require("axios")
// const vuex = require("vuex");
// const {useStore} = require("vuex");
//
// function testStore() {
//      const store = vuex.useStore()
//      return store.state.lang
//     // return sum()
//     // const {data} = await axios.get("123");
//     // const data = useStore()
//     return sum()
// }
//
// function sum() {
//     return 4
// }
//
// module.exports = {
//     testStore,
//     sum}



// const {sum} = require("./mod.js");
// const {useStore} = require("vuex");
//
// function testMy() {
//     const store = useStore()
//     return store.state.lang
// }
//
// function localTest() {
//     return localStorage['lang']
// }
//
//
//
// module.exports = {
//     testMy,
//     localTest
// }

export const localTest = () => {
    return localStorage['lang']
}