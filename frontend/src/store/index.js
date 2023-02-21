import {createStore} from "vuex";
import {MyModule} from "@/store/MyModule";
import {AdminModule} from "@/store/AdminModule";
import {host} from "@/http";
import jwt_decode from "jwt-decode";
import moment from "moment/moment";


export default createStore({

    mutations: {
        setCurrentUser(state, data) {
            if (data.token) {
                console.log(data)
                state.my.errorMsg = '';
                state.my.percent = jwt_decode(data.token).percent;
                state.my.currentUser = jwt_decode(data.token);
                state.my.notes = data.history;
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
                    console.log(data)
                    state.my.currentUser.notes = parseInt(data.notes.length);
                    state.my.noteName = data.name;
                    state.my.notes = data.notes;
                    console.log(data.vac)
                    let vac = data.vac;
                    vac.surname = state.admin.users.find(q => q.id === data.vac.userId).surname;
                    vac.first_name = state.admin.users.find(q => q.id === data.vac.userId).first_name;
                    vac.last_name = state.admin.users.find(q => q.id === data.vac.userId).last_name;
                    vac.start = moment(data.vac.start, 'YYYY-MM-DD').format('DD.MM.YYYY');
                    vac.end = moment(data.vac.end, 'YYYY-MM-DD').format('DD.MM.YYYY');
                    console.log(vac)
                    state.admin.vacations.push(vac);
                }
            }
        },
    },

    actions: {
        async createSocket({commit}) {
            const {data} = await host('user/auth');
            commit('setCurrentUser', data);
            commit('setSocket');
        },
    },

    modules: {
        my: MyModule,
        admin: AdminModule,
    },
})
