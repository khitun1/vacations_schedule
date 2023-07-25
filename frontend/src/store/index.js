import {createStore} from "vuex";
import {MyModule} from "@/store/MyModule";
import {AdminModule} from "@/store/AdminModule";
import {host} from "@/http";
import jwt_decode from "jwt-decode";
import {dateReverseFormat} from "@/hooks/generalMoment/dateReverseFormat";


export default createStore({

    mutations: {
        setCurrentUser(state, data) {
            if (data.token) {
                state.my.errorMsg = '';
                state.my.percent = jwt_decode(data.token).percent;
                state.my.currentUser = jwt_decode(data.token);
                state.my.total = jwt_decode(data.token).total;
                state.my.notes = data.history;
                if (data.allDepartments) {
                    state.admin.departments = data.allDepartments;
                }
            }
        },

        setSocket(state) {
            if (state.my.socket === null) {
                state.my.socket = new WebSocket('ws://localhost:7000');
                const info = {
                    id: state.my.currentUser.id,
                    department: state.my.currentUser.department,
                    method: 'connection',
                }
                state.my.socket.onopen = () => {
                    state.my.socket.send(JSON.stringify(info))
                }

                state.my.socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    state.my.currentUser.notes = parseInt(data.notes.length);
                    state.my.noteName = data.name;
                    state.my.notes = data.notes;
                    let vac = data.vac;
                    vac.surname = state.admin.users.find(q => q.id === data.vac.userId).surname;
                    vac.first_name = state.admin.users.find(q => q.id === data.vac.userId).first_name;
                    vac.last_name = state.admin.users.find(q => q.id === data.vac.userId).last_name;
                    vac.start = dateReverseFormat(data.vac.start);
                    vac.end = dateReverseFormat(data.vac.end);
                    state.admin.vacations.push(vac);
                }
            }
        },

        clear(state) {
            state.my.currentUser = {};
        },
    },

    actions: {
        async createSocket({state, commit}) {
            if (!state.my.currentUser.director) {
                const {data} = await host('user/auth');
                commit('setCurrentUser', data);
                commit('setSocket');
            }
        },
    },

    modules: {
        my: MyModule,
        admin: AdminModule,
    },
})
