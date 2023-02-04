import axios from "axios";
import moment from "moment/moment";

export const MyModule = {
    state: () => ({
        currentUser: {},
        myVacations: [],
        wishes: [],
        total: 100,
        jwt: '',
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
        setCurrentUser(state, res) {
            state.jwt = 'Bearer ' + res.token;
            state.currentUser = res.currentUser;
        },


        clearJWT(state) {
            state.jwt = '';
        },

        setVacations(state, vacations) {
            vacations.forEach(p => {
                p.start = p.start.split('T')[0];
                p.start = moment(p.start, 'YYYY-MM-DD').format('DD.MM.YYYY');
                p.end = p.end.split('T')[0];
                p.end = moment(p.end, 'YYYY-MM-DD').format('DD.MM.YYYY');
            })
            state.myVacations = vacations
        },

        setWishes(state, wishes) {
            wishes.forEach(p => {
                p.start = p.start.split('T')[0];
                p.start = moment(p.start, 'YYYY-MM-DD').format('DD.MM.YYYY');
                p.end = p.end.split('T')[0];
                p.end = moment(p.end, 'YYYY-MM-DD').format('DD.MM.YYYY');
            })
            state.wishes = wishes
        }
    },

    actions: {
        async login({commit}, {login, password}) {
            const response = await axios.post('http://localhost:7000/api/user/login', {
                login: login,
                password: password,
            });
            commit('setCurrentUser', response.data)
        },

        async auth({state, commit}) {
            const response = await axios('http://localhost:7000/api/user/auth', {
                headers: {
                    Authorization: state.jwt,
                }
            });
            commit('setCurrentUser', response.data);
        },

        async getVacations({state, commit}) {
            let response = await axios('http://localhost:7000/api/vacation/getList', {
                headers: {
                    Authorization: state.jwt,
                }
            });
            commit('setVacations', response.data)
        },

        async addWish({state}, wish) {
            await axios.post('http://localhost:7000/api/wishes/create', wish,{
                headers: {
                    Authorization: state.jwt,
                }
            })
        },

        async getWishes({state, commit}) {
            const response = await axios('http://localhost:7000/api/wishes/getList', {
                headers: {
                    Authorization: state.jwt,
                }
            })
            response.data.forEach(p => console.log(p.start.split('T')))
            commit('setWishes', response.data)
        },

        async deleteWish({state}, id) {
            await axios.post('http://localhost:7000/api/wishes/del', {
                id: id,
            }, {
                headers: {
                    Authorization: state.jwt,
                }
            })
        },

        async addVacation({state}, record) {
            await axios.post('http://localhost:7000/api/vacation/create', record, {
                headers: {
                    Authorization: state.jwt,
                }
            })
        },

        async deleteVacation({state}, id) {
            await axios.post('http://localhost:7000/api/vacation/del', {
                id: id,
            }, {
                headers: {
                    Authorization: state.jwt,
                }
            })
        },

        async changeLogin({state}, login) {
            await axios.post('http://localhost:7000/api/user/changeLogin', {
                login: login,
            }, {
                headers: {
                    Authorization: state.jwt,
                }
            })
        },

        async changePassword({state}, password) {
            await axios.post('http://localhost:7000/api/user/changePassword', {
                password: password,
            }, {
                headers: {
                    Authorization: state.jwt,
                }
            })
        },
    }
}