import {createStore} from "vuex";
import {MyModule} from "./MyModule.js";
import {AdminModule} from "./AdminModule";
import jwt_decode from "jwt-decode";


export default createStore({
    state: () => ({
        isLoading: false,
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
    },

    actions: {
    },

    modules: {
        my: MyModule,
        admin: AdminModule,
    },
})
