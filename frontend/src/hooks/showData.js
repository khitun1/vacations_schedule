import {computed, ref} from "vue";
import store from "@/store";


export function showDataHook() {
    let visible = ref(false);
    let requested = computed(() => store.state.admin.vacations)
    let uniq = computed(() => {
        let u = new Set();
        requested.value.filter(p => p.status === "Ожидание").forEach(p => u.add(p.surname
            + ' ' + p.first_name + ' ' + p.last_name));
        u = Array.from(u);
        return u;
    })

    let index = ref([]);
    let prevPerson = ref(null);
    let prevRec = ref(null);
    const showData = (vac) => {
        let person;
        if (prevPerson.value !== null){
            person = document.getElementsByClassName('person')[prevPerson.value];
            person.getElementsByClassName('rec')[prevRec.value].style.filter = 'none';
        }
        prevPerson.value = uniq.value.indexOf(vac.surname + ' ' + vac.first_name + ' ' + vac.last_name);
        prevRec.value = vac.number - 1 - requested.value.filter(p => (p.userId === vac.userId)
            && (p.status === 'Использовано' || p.status === 'Утверждено')).length;
        person = document.getElementsByClassName('person')[prevPerson.value];
        person.getElementsByClassName('rec')[prevRec.value].style.filter = 'drop-shadow(0 2px 12px #7951f5)';
        index.value[0] = vac.surname + ' ' + vac.first_name + ' ' + vac.last_name;
        index.value[1] = vac.number - 1;
        index.value[2] = vac.start.split('.')[2];
    }



    return {
        uniq,
        index,
        prevPerson,
        prevRec,
        showData,
        requested,
        visible,
    }
}