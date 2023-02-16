import {computed, ref} from "vue";
import store from "@/store";

export function addUser() {
    let users = computed(() => store.state.admin.users);
    const changeVisibleAddUser = () => {
        store.commit('changeVisibleAddUser');
    }
    let visibleAdminWindow = computed(() => store.getters.visibleAdminWindow);
    let visibleAddUser = computed(() => store.state.admin.visibleAddUser);

    const rights = ['Обычный сотрудник', 'Админ'];
    const color = 'inset 0px 0px 5px red';
    let user = ref({
        surname: '',
            first_name: '',
            last_name: '',
            login: '',
            password: '',
            is_admin: '',
    });
    let surname = ref('Фамилия');
    let name = ref('Имя');
    let lastname = ref('Отчество');
    let log = ref('Логин');
    let pas = ref('Пароль');
    let dep = ref('Отдел');
    let error = ref(false);
    let visible = ref(true);
    let errorMsg = ref('');
    let typePassword = ref('text');
    let flag = ref(false);
    let visibleForm = ref(false);
    const createUser = () => {
        error.value = false;
        errorMsg.value = '';
        if(!user.value.surname && !user.value.name && !user.value.lastname
            && !user.value.login && !user.value.password && !user.value.is_admin)  return;
        if(!user.value.surname)  {
            error.value = true;
            surname.value = 'Введите фамилию!';
        }
        flag.value = true;
        if(!user.value.first_name)  {
            error.value = true;
            name.value = 'Введите имя!';
        }
        if(!user.value.last_name)  {
            error.value = true;
            lastname.value = 'Введите отчество!';
        }
        if(!user.value.login)  {
            error.value = true;
            log.value = 'Введите логин!';
        }
        if(!user.value.password)  {
            error.value = true;
            pas.value = 'Введите пароль!';
        }
        if(!user.value.is_admin)  {
            error.value = true;
            dep.value = 'Укажите права!';
        }
        if(users.value.find(p => p.login === user.value.login))
        {
            errorMsg.value = 'Пользователь с таким логином уже есть!';
            error.value = true;
        }
        if (error.value === false) {
            store.dispatch('addUser', user);
            clear();
        }
    }

    const clear = () => {
        user.value = {
            surname: '',
            name: '',
            lastname: '',
            login: '',
            password: '',
            department: '',
        };
        surname.value = 'Фамилия';
        name.value = 'Имя';
        lastname.value = 'Отчество';
        log.value = 'Логин';
        pas.value = 'Пароль';
        dep.value = 'Отдел';
        error.value = false;
        flag.value = false;
        store.commit('changeVisibleAddUser');
    }

    return {
        rights,
        color,
        user,
        surname,
        name,
        lastname,
        log,
        pas,
        dep,
        error,
        visible,
        errorMsg,
        typePassword,
        flag,
        visibleForm,
        visibleAdminWindow,
        visibleAddUser,
        changeVisibleAddUser,
        clear,
        createUser,
    }
}