import {computed, ref} from "vue";
import store from "@/store";

export function changePersonal() {
    let currentUser = computed(() => store.state.my.currentUser);
    let newLogin = ref(currentUser.value.login);
    //let newLogin = computed(() => currentUser.value.login)
    let newPassword = ref(currentUser.value.password);
    let changePassword = ref(true) ;
    let typePassword = ref('text');
    let changeLogin = ref(true);
    let textLogBtn = ref('Изменить логин');
    let textPasBtn = ref('Изменить пароль');

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