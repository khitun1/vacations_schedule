import moment from "moment/moment";
import {computed, ref} from "vue";
import store from "@/store";

export function wishesAndVacations(currentUser, findIntersection, intersInUsersDep) {
    let date = ref(null);
    let paid = ref([]);
    let last = computed(() => store.getters.last);
    let wishes = computed(() => store.state.my.wishes);
    let left = computed(() => store.getters.left);
    
    const showWish = () => {
        if (date.value !== null){
            date.value =
                {
                    start: moment(date.value.start).format('YYYY-MM-DD'),
                    end: moment(date.value.end).format('YYYY-MM-DD'),
                    userId: currentUser.value.id,
                }
            store.dispatch('addWish', date.value);
            date.value = null;
        }
    }

    const del = async (id) => {
        await store.dispatch('deleteWish', id);
    }

    const send = async (wish) => {
        let flag = 0;
        let record = {
            start: moment(wish.start, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            end: moment(wish.end, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            number: last.value,
            requested_date: moment(),
            paid: paid.value[wishes.value.indexOf(wish)] ? 1 : 0,
            status: 'Ожидание',
            userId: currentUser.value.id,
        }
        intersInUsersDep.value.forEach(p => {
            if (findIntersection(record, p)) {
                flag = 1;
            }
        })
        if (flag === 1) alert('Выбранные даты вызовут пересечение');
        else if (totalDays(record.start, record.end) <= left.value){
            await store.dispatch('addVacation', record);
            del(wish.id);
        }
        else (alert('Выбрано больше дней, чем доступно!'));
    }

    const sendAll = () => {
        let record = {};
        let total = 0;
        wishes.value.forEach(p => {
            const start = moment(p.start, 'DD.MM.YYYY').format('YYYY-MM-DD');
            const end = moment(p.end, 'DD.MM.YYYY').format('YYYY-MM-DD');
            total += totalDays(start, end);
        });
        if (total <= left.value){
            wishes.value.forEach(async (p, index) => {
                record = {
                    start: moment(p.start, 'DD.MM.YYYY').format('YYYY-MM-DD'),
                    end: moment(p.end, 'DD.MM.YYYY').format('YYYY-MM-DD'),
                    requested_date: moment(),
                    paid: paid.value[wishes.value.indexOf(p)] ? 1 : 0,
                    status: 'Ожидание',
                    userId: currentUser.value.id,
                    number: last.value + index,
                }
                await store.dispatch('addVacation', record);
                del(p.id);
            })
        }
        else (alert('Выбрано больше дней, чем доступно!'));
    }

    const totalDays = (start,end) => {
        return moment(end, 'YYYY-MM-DD').diff(moment(start, 'YYYY-MM-DD'), 'days') + 1;
    }

    return {
        date,
        paid,
        wishes,
        left,
        send,
        sendAll,
        showWish,
        del,
    }
}