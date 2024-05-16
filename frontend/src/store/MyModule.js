import {host, firstHost} from "../http/index";
import moment from "moment/moment";
import {dateReverseFormat} from "@/hooks/generalMoment/dateReverseFormat";
import {totalDays} from "@/components/Options";

export const MyModule = {
    state: () => ({
        currentUser: {},
        myVacations: [],
        wishes: [],
        total: 0,
        dates: [],
        len: 0,
        percent: 0,
        errorMsg: '',
        year: String(new Date().getFullYear()),
        noteName: '',
        notes: [],
        holidays: [],
        socket: null,
    }),

    getters: {
        totalLeft(state) {
            let total = 0;
            state.wishes.forEach(p => {
                total += totalDays(p.start, p.end)
            });
            if (state.currentUser.allow && state.currentUser.acceptAll) {
                return (state.currentUser.left - total + state.total) + ' на ' + (parseInt(state.year) + 1) + ' год';
            }
            else if ((!state.currentUser.allow && !state.currentUser.acceptAll) ||
                (state.currentUser.allow && !state.currentUser.acceptAll)) {
                return state.currentUser.actual_days + state.currentUser.left -
                    total + state.total + ' на ' + (parseInt(state.year) + 1) + ' год';
            }
            else {
                return (state.currentUser.left + state.total) + ' на ' + (parseInt(state.year) + 2) + ' год';
            }
        },

        leftOnStartOfYear(state) {
            let total = state.currentUser.left + state.currentUser.actual_days;
            state.wishes.forEach(p => {
                total -= totalDays(p.start, p.end)
            })
            return total;
        },

        last(state) {
            return state.myVacations.length + 1;
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
            state.myVacations = vacations;
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

        delVac(state, {id, days}) {
            state.currentUser.actual_days += days;
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

        changeLogin(state, login) {
          state.currentUser.login = login;
        },

        changePassword(state, password) {
          state.currentUser.password = password;
        },

        changeMail(state, mail) {
            state.currentUser.mail = mail;
        },

        setHolidays(state, holidays) {
            state.holidays = holidays;
        }
    },

    actions: {
        async login({commit}, {login, password}) {
            const {data} = await firstHost.post('user/login', {
                login: login,
                password: password,
            })
            if (!data.token) {
                commit('setError', data);
            }
            localStorage.setItem('token', data.token);
            commit('setCurrentUser', data);
        },

        async auth({commit}) {
            try {
                const res = await host('user/auth');
                commit('setCurrentUser', res.data);
            } catch (e) {
                localStorage.removeItem('token');
            }
        },

        async getVacations({commit}) {
            const {data} = await host('vacation/getList');
            commit('setVacations', data);
        },

        async addWish({commit}, wish) {
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
            let vac = state.myVacations.find(p => p.id === id);
            let days = vac.status === 'Утверждено' ? totalDays(vac.start, vac.end): 0;
            commit('delVac', {id, days});
            let num = 1;
            state.myVacations.forEach(p => {
                p.number = num++;
            })
            await host.post('vacation/del', {id, days});
        },

        async changeLogin({commit}, login) {
            await host.post('user/changeLogin', {
                login: login,
            })
            commit('changeLogin', login);
        },

        async changePassword({commit}, password) {
            await host.post('user/changePassword', {
                password: password,
            })
            commit('changePassword', password);
        },

        async changeMail({commit}, mail) {
            await host.post('user/changeMail', {
                mail: mail,
            })
            commit('changeMail', mail);
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

        async getHolidays({commit}) {
          const {data} = await host('vacation/getHolidays');
          commit('setHolidays', data.holidays);
        },
    }
}