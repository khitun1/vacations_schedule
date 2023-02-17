import {computed} from "vue";
import store from "@/store";

export function backNavBar(choice) {
    const currentUser =  computed(() => store.state.my.currentUser);
    const take = computed(() => choice === 'takeVacation' ? '#e2e2e2': 'none');
    const mine = computed(() => choice === 'myVacations' ? '#e2e2e2': 'none');
    const all = computed(() => choice === 'allVacations' ? '#e2e2e2': 'none');
    const admin = computed(() => choice === 'admin' ? '#e2e2e2': 'none');
    const settings = computed(() => choice === 'settings' ? '#e2e2e2': 'none');

    return {
        currentUser,
        take,
        mine,
        all,
        admin,
        settings,
    }
}