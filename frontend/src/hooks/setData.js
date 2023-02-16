import {computed, ref} from "vue";
import store from "@/store";

export function setData() {
    let changeMin =  ref(true);
    let changeMax =  ref(true);
    let changeTotal =  ref(true);
    let changePercent =  ref(true);
    let minText =  ref('Изменить');
    let maxText =  ref('Изменить');
    let totalText =  ref('Изменить');
    let percentText =  ref('Изменить');
    let errorNum =  ref(false);
    let errorMsg =  ref('');
    let visibleCon =  ref(false);
    let visibleChangeCon = computed(() => store.state.admin.visibleChangeCon);
    let visibleAdminWindow = computed(() => store.getters.visibleAdminWindow)
    let condition = computed(() => store.state.admin.department);
    const changeVisibleCon = () => store.commit('changeVisibleChangeCon');
    const setCon = (flag) => {
        let accept = false;
        switch (flag){
            case 1:
                if(changeMin.value === false)
                {
                    condition.value.min = parseInt(condition.value.min);
                    if (validate(condition.value.min)) {
                        if (condition.value.min > condition.value.max)
                        {
                            errorMsg.value = 'Максимальное кол-во дней не может быть меньше минимального';
                            errorNum.value = true;
                        }
                        else {
                            changeMin.value = true;
                            minText.value =  'Изменить';
                            accept = true;
                        }
                    }
                    else errorMsg.value = 'Минимальное количество дней должно быть целым и положительным числом!';
                }
                else
                {
                    changeMin.value = false;
                    document.getElementsByClassName('minDays')[0].focus();
                    minText.value =  'Подтвердить';
                }
                break;
            case 2:
                if(changeMax.value === false)
                {
                    condition.value.max = parseInt(condition.value.max);
                    if (validate(condition.value.max)) {
                        if (condition.value.min > condition.value.max)
                        {
                            errorMsg.value = 'Максимальное кол-во дней не может быть меньше минимального';
                            errorNum.value = true;
                        }
                        else{
                            changeMax.value = true;
                            maxText.value =  'Изменить';
                            accept = true;
                        }
                    }
                    else errorMsg.value = 'Максимальное количество дней должно быть целым и положительным числом!';
                }
                else
                {
                    changeMax.value = false;
                    document.getElementsByClassName('maxDays')[0].focus();
                    maxText.value =  'Подтвердить';
                }
                break;
            case 3:
                if(changeTotal.value === false)
                {
                    condition.value.total = parseInt(condition.value.total);
                    if(validate(condition.value.total)) {
                        changeTotal.value = true;
                        totalText.value = 'Изменить';
                        accept = true;
                    }
                    else errorMsg.value = 'Общее количество дней должно быть целым и положительным числом!';
                }
                else
                {
                    changeTotal.value = false;
                    document.getElementsByClassName('totalDays')[0].focus();
                    totalText.value =  'Подтвердить';
                }
                break;
            case 4:
                if(changePercent.value === false)
                {
                    condition.value.percents = parseInt(condition.value.percents);
                    if(validate(condition.value.percents) && condition.value.percents < 100) {
                        changePercent.value = true;
                        percentText.value = 'Изменить';
                        accept = true;
                    }
                    else errorMsg.value = '% пересечений должен быть целым, положительным и меньшем, чем 100, числом !';
                }
                else
                {
                    changePercent.value = false;
                    document.getElementsByClassName('percentsDays')[0].focus();
                    percentText.value =  'Подтвердить';
                }
                break;
        }

        if (accept){
            store.dispatch('changeConditions',condition.value);
            errorNum.value = false;
            errorMsg.value = '';
        }
        else errorNum.value = true;
    }
    const validate = (con) => con && con > 0 && con % 1 === 0;

    return {
        changeMin,
        changeMax,
        changeTotal,
        changePercent,
        minText,
        maxText,
        totalText,
        percentText,
        errorNum,
        errorMsg,
        visibleCon,
        visibleChangeCon,
        visibleAdminWindow,
        condition,
        changeVisibleCon,
        setCon,
    }
}