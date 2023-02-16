import moment from "moment/moment";
import store from "@/store";
import {ref} from "vue";

export function block() {
    let visible = ref(false);
    let visibleExplanation = ref(false);
    let explanation = ref('');
    const Del = (id) => {
        store.dispatch('deleteVacation', id);
    }

    const checkDel = (status, id) => {
        if(visible.value !== id) return false;
        if(status !== 'Утверждено' && status !== 'Использовано') return true;
    }

    const totalDays = (start,end) => {
        return moment(end, 'DD.MM.YYYY').diff(moment(start, 'DD.MM.YYYY'), 'days') + 1;
    }
    
    return {
        visible,
        visibleExplanation,
        explanation,
        Del,
        checkDel,
        totalDays,
    }
}