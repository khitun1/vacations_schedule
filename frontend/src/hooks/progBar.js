import {computed} from "vue";
import store from "@/store";

export function progBar() {
    let left = computed(() => store.getters.left);
    let total = computed(() => store.state.my.total);
    let width = computed(() => 100 - left.value / total.value * 100 + '%');

    return {
        width,
        left,
    }

}