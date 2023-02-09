import {createStore} from "vuex";
import {MyModule} from "@/store/MyModule";
import {AdminModule} from "@/store/AdminModule";


export default createStore({
    modules: {
        my: MyModule,
        admin: AdminModule,
    },
})
