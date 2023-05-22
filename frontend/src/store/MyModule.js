import {host, firstHost} from "../http/index";
import moment from "moment/moment";
import {dateUsualFormat} from "@/hooks/generalMoment/dateUsualFormat";
import {dateReverseFormat} from "@/hooks/generalMoment/dateReverseFormat";

export const MyModule = {
    state: () => ({
        currentUser: {},
        myVacations: [],
        wishes: [],
        total: 100,
        dates: [],
        len: 0,
        percent: 0,
        errorMsg: '',
        year: String(new Date().getFullYear()),
        socket: null,
        noteName: '',
        notes: [],
    }),

    getters: {
        left(state) {
            let total = 0;
            state.wishes.forEach(p => {
                total += dateUsualFormat(p.end).diff(dateUsualFormat(p.start), 'days') + 1;
            });
            if (state.currentUser.allow && state.currentUser.acceptAll) {
                return (state.currentUser.left - total) + ' на ' + (parseInt(state.year) + 1) + ' год';
            }
            else if ((!state.currentUser.allow && !state.currentUser.acceptAll) ||
                (state.currentUser.allow && !state.currentUser.acceptAll)) {
                return (state.currentUser.actual_days - total) + ' на ' + (parseInt(state.year) + 1) + ' год';
            }
            else {
                return state.currentUser.left + ' на ' + (parseInt(state.year) + 2) + ' год';
            }

        },


        last(state) {
            return state.myVacations.length + 1;
        },

        intersInUsersDep(state) {
            return state.dates;
        },

        holidays(state) {
            const year = parseInt(state.year);
            let holidays = [];
            for (let i = -1; i < 2; i++) {
                holidays.push(moment(year + i + '-02-23')._d,);
                holidays.push(moment(year + i + '-03-08')._d,);
                holidays.push(moment(year + i + '-05-01')._d,);
                holidays.push(moment(year + i + '-05-09')._d,);
            }
            return holidays
        },

        daysOff(state) {
            const year = parseInt(state.year) + 1;
            let dates = [];
            for (let i = 6; i < 365; i += 7) {
                dates.push({
                    content: 'red',
                    dates: moment(year + '-01-01').weekday(i)._d,
                    status: 'Day off',
                })
                dates.push({
                    content: 'red',
                    dates: moment(year + '-01-01').weekday(i + 1)._d,
                    status: 'Day off',
                })
            }

            return dates;
        }
    },

    mutations: {

        setVacations(state, vacations) {
            vacations.forEach(p => {
                p.start = dateReverseFormat(p.start);
                p.end = dateReverseFormat(p.end);
            })
            state.myVacations = vacations
        },

        setWishes(state, wishes) {
            wishes.forEach(p => {
                p.start = dateReverseFormat(p.start);
                p.end = dateReverseFormat(p.end);
            })
            state.wishes = wishes
        },

        addWish(state, {wish, data}) {
            wish.start = dateReverseFormat(wish.start);
            wish.end = dateReverseFormat(wish.end);
            wish.id = data.id;
            state.wishes.push(wish);
        },

        delWish(state, id) {
            let delIndex = state.wishes.indexOf(state.wishes.find(p => p.id === id));
            state.wishes.splice(delIndex, 1);
        },

        delVac(state, id) {
            let delIndex = state.myVacations.indexOf(state.myVacations.find(p => p.id === id));
            state.myVacations.splice(delIndex, 1);
        },

        setDates(state, data) {
            data.dates.forEach(p => {
                p.start = dateReverseFormat(p.start);
                p.end = dateReverseFormat(p.end);
            })
            state.dates = data.dates;
            state.len = data.len;
        },

        setError(state, data) {
            state.errorMsg = data;
        },

        clearNoteName(state) {
            setTimeout(() => {
                state.noteName = '';
            }, 2000)
        },

        clearNotes(state) {
          state.notes = [];
        },

    },

    actions: {
        async login({commit}, {login, password}) {
            const {data} = await firstHost.post('user/login', {
                login: login,
                password: password,
            });
            if (!data.token) commit('setError', data);
            localStorage.setItem('token', data.token);
            commit('setCurrentUser', data);
        },

        async auth({commit}) {
            const {data} = await host('user/auth');
            commit('setCurrentUser', data);
        },

        async getVacations({commit}) {
            const {data} = await host('vacation/getList');
            commit('setVacations', data);
        },

        async addWish({commit},wish) {
            const {data} = await host.post('wishes/create', wish);
            commit('addWish', {wish, data});
        },

        async getWishes({commit}) {
            const response = await host('wishes/getList')
            commit('setWishes', response.data)
        },

        async deleteWish({commit},id) {
            await host.post('wishes/del', {
                id: id,
            })
            commit('delWish', id);
        },

        async addVacation({commit}, vacs) {
            await host.post('vacation/create', vacs);
            const {data} = await host('vacation/getList');
            commit('setVacations', data);
            const res = await host('user/auth');
            commit('setCurrentUser', res.data);

        },

        async deleteVacation({state, commit}, id) {
            commit('delVac', id);
            let num = 1;
            state.myVacations.forEach(p => {
                p.number = num++;
            })
            await host.post('vacation/del', {
                id: id,
            })

        },

        async changeLogin({commit}, login) {
            const {data} = await host.post('user/changeLogin', {
                login: login,
            })
            localStorage.setItem('token', data.token);
            commit('setCurrentUser', data);
        },

        async changePassword({commit}, password) {
            const {data} = await host.post('user/changePassword', {
                password: password,
            })
            localStorage.setItem('token', data.token);
            commit('setCurrentUser', data);
        },

        async changeMail({commit}, mail) {
            const {data} = await host.post('user/changeMail', {
                mail: mail,
            })
            localStorage.setItem('token', data.token);
            commit('setCurrentUser', data);
        },

        async getDates({commit}) {
            const {data} = await host('user/getDates');
            commit('setDates', data)
        },


        async clear({state, commit}) {
            if (!state.currentUser.director) {
                await host('users/clearNotes');
                commit('clearNotes');
            }
        },
    }
}