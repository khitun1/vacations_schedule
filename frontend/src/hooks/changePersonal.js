import {computed, ref} from "vue";
import jwt_decode from "jwt-decode";
import {useStore} from "vuex";

export function changePersonal() {
    const store = useStore();
    const currentUser = computed(() => store.state.my.currentUser);
    const newLogin = ref(jwt_decode(localStorage.getItem('token')).login);
    const newPassword = ref(jwt_decode(localStorage.getItem('token')).password);
    //let newLogin = computed(() => currentUser.value.login);
    //let newLogin = ref(currentUser.value.login);
    const changePassword = ref(true) ;
    const typePassword = ref('text');
    const changeLogin = ref(true);
    const textLogBtn = ref('Изменить логин');
    const textPasBtn = ref('Изменить пароль');

    const changeLog = () => {
        document.getElementsByClassName('inputLogin')[0].focus();
        if(changeLogin.value === true)  textLogBtn.value = 'Подтвердить';
        else
        {
            store.dispatch('changeLogin', newLogin.value);
            textLogBtn.value = 'Изменить логин';
        }
        changeLogin.value = !changeLogin.value;
    }
    const changePas = () => {
        document.getElementsByClassName('inputPassword')[0].focus();
        if(changePassword.value === true) textPasBtn.value = 'Подтвердить';
        else{
            store.dispatch('changePassword', newPassword.value);
            textPasBtn.value = 'Изменить пароль';
        }
        changePassword.value = !changePassword.value;
    }
    
    return {
        currentUser,
        newPassword,
        newLogin,
        typePassword,
        changePassword,
        changeLogin,
        textLogBtn,
        textPasBtn,
        changePas,
        changeLog
    }
}