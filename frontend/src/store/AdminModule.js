import axios from "axios";

export const AdminModule = {
    state: () => ({
        all : [],
        departments: [],
        types: [],
        users: [],
        year: String(new Date().getFullYear()),
        selectedID: Number,
        selectedDep: '',
        visibleAddUser: false,
        visibleDeleteUser: false,
        visibleAddDep: false,
        visibleAddType: false,
        visibleChangeCon: false,
    }),

    getters: {
        intersInUsersDep(state) {
            return state.all.filter(p => p.department === state.currentUser.department);
        },

        vacations(state) {
            let vacs = state.all.filter(p => p.department === state.selectedDep);
            state.users.forEach(p => {
                const userName = p.surname + ' ' + p.name + ' ' + p.lastname;
                vacs.forEach((q, index, arr) => {
                    const nameInVacs = q.surname + ' ' + q.name + ' ' + q.lastname;
                    if (userName === nameInVacs) {
                        return true
                    }
                    const newRec = {
                        id: new Date(),
                        surname: p.surname,
                        name: p.name,
                        lastname: p.lastname,
                        status: 'none',
                        number: 1,
                    }
                    arr.push(newRec);
                })
            })
            return vacs;
        },

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

        changeDepName(state, change) {
            state.departments.find(p => p.id === change.id).name = change.name;
        },

        changeTypeName(state, change) {
            state.types.find(p => p.id === change.id).name = change.name;
        },

        addDep(state, newDep) {
            state.departments.push(newDep);
        },

        addType(state, newType) {
            state.types.push(newType);
        },

        changeConditions(state, newCon) {
            state.departments[state.departments.findIndex(p => p.id === newCon.id)] = newCon;
        },

        reject(state, rej) {
            state.all.find(p => p.id === rej.id).explanation = rej.explanation;
            state.all.find(p => p.id === rej.id).status = 'Отказ';
        },

        accept(state, id) {
            state.all.find(p => p.id === id).status = 'Утверждено';
        },

        shift(state, con) {
            state.all.forEach(p => {
                if (p.surname === con.arr[0] && p.name === con.arr[1] && p.lastname === con.arr[2]) {
                    if (p.number === con.num) {
                        p.number = 0;
                    } else {
                        if (p.number > con.num) {
                            p.number -= 1
                        }
                    }
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

        setDepartments(state, deps) {
            state.departments = deps;
        }
    },

    actions: {
        async addUser({state}, user) {
            await axios.post('http://localhost:7000/api/users/create', user, {
                    headers: {
                        Authorization: state.jwt,
                    }
                })
        },

        async getDepartments({state, commit}) {
            const response = await axios('http://localhost:7000/api/department/getList', {
                headers: {
                    Authorization: state.jwt,
                }
            });
            commit('setDepartments', response.data);
        }
    }
}