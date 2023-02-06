import {host} from "../http/index";
import moment from "moment/moment";
import jwt_decode from "jwt-decode";

export const MyModule = {
    state: () => ({
        currentUser: {},
        myVacations: [],
        wishes: [],
        total: 100,
    }),

    getters: {
        left(state) {
            let total = 0;
            let val = state.myVacations.filter(p => p.status !== 'Отказ' && p.status !== 'Удалено');
            val.forEach(p => {
                total += moment(p.end, 'DD.MM.YYYY').diff(moment(p.start, 'DD.MM.YYYY'), 'days') + 1;
            });
            return state.total - total;
        },

        last(state) {
            return state.myVacations.length + 1;
        }
    },

    mutations: {
            setCurrentUser(state, currentUser) {
            state.currentUser = currentUser;
        },


        clearJWT(state) {
            state.jwt = '';
        },

        setVacations(state, vacations) {
            vacations.forEach(p => {
                p.start = moment(p.start, 'YYYY-MM-DD').format('DD.MM.YYYY');
                p.end = moment(p.end, 'YYYY-MM-DD').format('DD.MM.YYYY');
            })
            state.myVacations = vacations
        },

        setWishes(state, wishes) {
            wishes.forEach(p => {
                p.start = moment(p.start, 'YYYY-MM-DD').format('DD.MM.YYYY');
                p.end = p.end.split('T')[0];
                p.end = moment(p.end, 'YYYY-MM-DD').format('DD.MM.YYYY');
            })
            state.wishes = wishes
        },

        addWish(state, {wish, data}) {
            wish.start = moment(wish.start, 'YYYY-MM-DD').format('DD.MM.YYYY');
            wish.end = moment(wish.end, 'YYYY-MM-DD').format('DD.MM.YYYY');
            wish.id = data.id;
            state.wishes.push(wish);
        },

        delWish(state, id) {
            let delIndex = state.wishes.indexOf(state.wishes.find(p => p.id === id));
            state.wishes.splice(delIndex, 1);
        },

        addVacation(state, {record, data}) {
            record.start = moment(record.start, 'YYYY-MM-DD').format('DD.MM.YYYY');
            record.end = moment(record.end, 'YYYY-MM-DD').format('DD.MM.YYYY');
            record.id = data.id;
            state.myVacations.push(record);
        },

        delVac(state, id) {
            let delIndex = state.myVacations.indexOf(state.myVacations.find(p => p.id === id));
            state.myVacations.splice(delIndex, 1);
        },
    },

    actions: {
        async login({commit}, {login, password}) {
            const {data} = await host.post('user/login', {
                login: login,
                password: password,
            });
            localStorage.setItem('token', data.token);
            commit('setCurrentUser', jwt_decode(data.token));
        },

        async auth({commit}) {
            const {data} = await host('user/auth');
            commit('setCurrentUser', jwt_decode(data.token));
        },

        async getVacations({commit}) {
            let {data} = await host('vacation/getList');
            commit('setVacations', data);
        },

        async addWish({commit},wish) {
            const {data} = await host.post('wishes/create', wish);
            commit('addWish', {wish, data});
        },

        async getWishes({commit}) {
            const response = await host('wishes/getList')
            response.data.forEach(p => console.log(p.start.split('T')))
            commit('setWishes', response.data)
        },

        async deleteWish({commit},id) {
            await host.post('wishes/del', {
                id: id,
            })
            console.log(id)
            commit('delWish', id);
        },

        async addVacation({commit}, record) {
            const {data} = await host.post('vacation/create', record);
            commit('addVacation', {record, data});
        },

        async deleteVacation({commit}, id) {
            await host.post('vacation/del', {
                id: id,
            })
            commit('delVac', id);
        },

        async changeLogin({commit}, login) {
            const {data} = await host.post('user/changeLogin', {
                login: login,
            })
            localStorage.setItem('token', data.token);
            commit('setCurrentUser', jwt_decode(data.token));
        },

        async changePassword({commit}, password) {
            const {data} = await host.post('user/changePassword', {
                password: password,
            })
            localStorage.setItem('token', data.token);
            commit('setCurrentUser', jwt_decode(data.token));
        },
    }
}