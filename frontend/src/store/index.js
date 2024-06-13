import {createStore} from "vuex";
import {MyModule} from "./MyModule.js";
import {AdminModule} from "./AdminModule";
import jwt_decode from "jwt-decode";
import {host} from "@/http/index.js";
import {dateReverseFormat} from "@/hooks/generalMoment/dateReverseFormat.js";


export default createStore({
    state: () => ({
        isLoading: false,
        lang: "ru",
    }),

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

        setLoading(state, val) {
          state.isLoading = val;
        },


        clear(state) {
            state.my.currentUser = {};
        },

        setSocket(state) {
            if (!state.my.socket) {
                state.my.socket = new WebSocket("ws://localhost:5175");
                const currentUser = state.my.currentUser;
                const info = {
                    userId: currentUser.id,
                    userDepartment: currentUser.department,
                    method: 'connection'
                }
                state.my.socket.onopen = () => {
                    state.my.socket.send(JSON.stringify(info));
                }

                state.my.socket.onmessage = msg => {
                    const data = JSON.parse(msg.data);
                    state.my.currentUser.notes = parseInt(data.notes.length);
                    state.my.noteName = data.name;
                    state.my.notes = data.notes;
                    let vacs = data.vacs;
                    vacs.forEach(p => {
                        p.start = dateReverseFormat(p.start);
                        p.end = dateReverseFormat(p.end);
                        const user = state.admin.users.find(user => user.id === p.userId);
                        p.surname = user.surname;
                        p.first_name = user.first_name;
                        p.last_name = user.last_name;
                    })
                    state.admin.vacations.push(...vacs);
                }
            }
        }
    },

    actions: {
        async createSocket({commit}) {
            const {data} = await host('user/auth');
            commit("setCurrentUser", data);
            commit("setSocket");
        }
    },

    modules: {
        my: MyModule,
        admin: AdminModule,
    },
})
