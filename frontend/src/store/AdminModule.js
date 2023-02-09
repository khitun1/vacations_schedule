import {host} from "../http/index";
import moment from "moment";

export const AdminModule = {
    state: () => ({
        vacations: [],
        department: {},
        users: [],
        year: String(new Date().getFullYear()),
        selectedID: Number,
        visibleAddUser: false,
        visibleDeleteUser: false,
        visibleAddDep: false,
        visibleAddType: false,
        visibleChangeCon: false,
    }),

    getters: {
        visibleAdminWindow(state) {
            return state.visibleAddUser || state.visibleDeleteUser
                || state.visibleAddDep || state.visibleChangeCon || state.visibleAddType;
        },
    },

    mutations: {
        changeVisibleAddUser(state) {
            state.visibleAddUser = !state.visibleAddUser;
        },

        changeVisibleDeleteUser(state) {
            state.visibleDeleteUser = !state.visibleDeleteUser;
        },

        changeVisibleAddDep(state) {
            state.visibleAddDep = !state.visibleAddDep;
        },

        changeVisibleAddType(state) {
            state.visibleAddType = !state.visibleAddType;
        },

        changeVisibleChangeCon(state) {
            state.visibleChangeCon = !state.visibleChangeCon;
        },

        changeConditions(state, newCon) {
            state.department = newCon;
        },

        decision(state, {id, status}) {
            const {userId} = state.vacations.find(p => p.id === id);
            const user = state.users.find(p => p.id === userId);
            if (status === 'Утверждено'){
                state.vacations.find(p => p.id === id).status = 'Утверждено';
            }
            else {
                state.vacations.splice(state.vacations.indexOf(state.vacations.find(p => p.id === id)), 1);
                if (!state.vacations.find(p => p.userId === userId)) {
                    const zero = {
                        id: new Date(),
                        surname: user.surname,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        status: 'none',
                        number: 1,
                    }
                    state.vacations.push(zero);
                }
            }
            let num = 1;
            state.vacations.forEach(p => {
                if (p.userId === user.id) {
                    p.number = num++
                }
            })
        },

        changeYear(state, year) {
            state.year = year;
        },

        prevYear(state) {
            state.year--;
        },

        nextYear(state) {
            state.year++;
        },

        setUsers(state, users) {
            state.users = users;
        },

        setDepartment(state, dep) {
            state.department = dep;
        },

        addUser(state, user) {
          state.users.push(user);
        },

        delUser(state, id) {
            let delIndex = state.users.indexOf(state.users.find(p => p.id === id));
            state.users.splice(delIndex, 1);
        },

        setEmployeesVacations(state, data) {
            data.forEach(p => {
                p.surname = state.users.find(q => q.id === p.userId).surname;
                p.first_name = state.users.find(q => q.id === p.userId).first_name;
                p.last_name = state.users.find(q => q.id === p.userId).last_name;
                p.start = moment(p.start, 'YYYY-MM-DD').format('DD.MM.YYYY');
                p.end = moment(p.end, 'YYYY-MM-DD').format('DD.MM.YYYY');
            })
            let vacs = data;
            let namesInVacs = new Set();
            for (let i = 0; i < vacs.length; i++) {
                const userName = vacs[i].surname + ' ' + vacs[i].first_name
                    + ' ' + vacs[i].last_name;
                namesInVacs.add(userName)
            }
            for (let i = 0; i < state.users.length; i++) {
                const userName = state.users[i].surname + ' ' + state.users[i].first_name
                    + ' ' + state.users[i].last_name;
                if (!namesInVacs.has(userName)) {
                    namesInVacs.add(userName);
                    const newRec = {
                        id: new Date(),
                        surname: state.users[i].surname,
                        first_name: state.users[i].first_name,
                        last_name: state.users[i].last_name,
                        status: 'none',
                        number: 1,
                    }
                    vacs.push(newRec)
                }
            }
            state.vacations = vacs;
        }
    },

    actions: {
        async addUser({commit}, user) {
            user.is_admin = user.is_admin === 'Админ' ? 1 : 0;
            await host.post('users/create', user);
            commit('addUser', user);
        },

        async getDepartment({commit}) {
            const {data} = await host('department/getList');
            commit('setDepartment', data);
        },

        async getUsers({commit}) {
            const {data} = await host('users/getList');
            commit('setUsers', data);
        },

        async deleteUser({commit}, id) {
            await host.post('users/del', {id: id});
            commit('delUser', id);
        },

        async changeConditions({commit}, newCon) {
            await host.post('department/changeConditions', newCon);
            commit('changeConditions', newCon)
        },

        async getEmployeesVacations({commit}) {
            const {data} = await host('users/getVacations');
            commit('setEmployeesVacations', data.vacationsEmployees);
        },

        async decisionVacation({commit}, {id, status, explanation}) {
            await host.post('users/decision', {
                id: id,
                status: status,
                explanation: explanation
            })
            commit('decision', {id, status, explanation});
        },

        async clear({state}) {
            await host('users/clearNotes');
            console.log(state.users)
        }
    }
}