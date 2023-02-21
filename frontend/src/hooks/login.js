import {computed, ref} from 'vue';
import router from "@/router/router";
import store from "@/store";

export function auth() {
    let login = ref('');
    let password = ref('');
    let error = computed(() => store.state.my.error);
    const check = async () => {
        await store.dispatch('login', {login: login.value, password: password.value});
        if (error.value === '') {
            const url = '/myVacations';
            await router.push(url);
        }

    }

    return {
        login,
        password,
        error,
        check
    }
}