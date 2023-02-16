import store from "@/store";
import {computed, ref} from "vue";

export function deluser() {
    let currentUser = computed(() => store.state.my.currentUser);
    let visibleDeleteUser = computed(() => store.state.admin.visibleDeleteUser);
    let users = computed(() => store.state.admin.users);
    let department = computed(() => store.state.admin.department);
    let visibleAdminWindow = computed(() => store.getters.visibleAdminWindow);
    let user = ref('');
    let searchUser = computed(() => new RegExp('^' + user.value + '.+'));

    let usersList = computed(() => {
        if (user.value === '')  return [];
        let list = users.value.filter(p => (searchUser.value.test(p.name) || p.name === user.value)
            && p.departmentId === department.value.name);
        list.splice(list.indexOf(list.find(p => p.id === currentUser.value.id)), 1);
        return list;
    })

    const changeVisibleDeleteUser = () => {
        store.commit('changeVisibleDeleteUser');
    }

    const deleteUser = (id) => {
        store.dispatch('deleteUser', id);
    }

    return {
        visibleDeleteUser,
        department,
        visibleAdminWindow,
        user,
        usersList,
        changeVisibleDeleteUser,
        deleteUser,
    }
}