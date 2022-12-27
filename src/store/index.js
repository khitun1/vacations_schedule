import {createStore} from "vuex";


export default createStore({
    state: {
        currentUser: {
            id: 1, surname: 'Adams', name: 'John', lastname: 'Jack', login: 'Flash', password: 'qwerty',
            department: 'Developers', daysLeft: 10,
        },
        myVacations: [
            {id: 1, start: '02.01.2023', end: '09.01.2023', dateRequest: '01.06.2021', paid: 'Да', status: 'Утверждено',
                explanation: '',},
            {id: 2, start: '16.01.2023', end: '23.01.2023', dateRequest: '01.06.2021', paid: 'Нет', status: 'Ожидание',
                explanation: '',},
            {id: 3, start: '25.01.2023', end: '29.01.2023', dateRequest: '01.06.2021', paid: 'Да', status: 'Отказ',
                explanation: '',},
            {id: 4, start: '01.01.2022', end: '02.02.2022', dateRequest: '01.06.2021', paid: 'Нет', status: 'Удалено',
                explanation: '',},
            {id: 5, start: '01.01.2022', end: '03.05.2022', dateRequest: '01.06.2021', paid: 'Да', status: 'Отказ',
                explanation: '',},
            {id: 6, start: '01.01.2022', end: '02.02.2022', dateRequest: '01.06.2021', paid: 'Нет', status: 'Удалено',
                explanation: '',},
            {id: 7, start: '01.01.2022', end: '02.02.2022', dateRequest: '01.06.2021', paid: 'Нет', status: 'Ожидание',
                explanation: '',},
            {id: 10, start: '04.12.2022', end: '13.12.2022', dateRequest: '01.07.2021', paid: 'Да', status: 'Использовано',},
            {id: 20, start: '04.02.2022', end: '13.03.2022', dateRequest: '01.07.2021', paid: 'Да', status: 'Использовано',},
            {id: 301, start: '04.02.2022', end: '13.03.2022', dateRequest: '01.07.2021', paid: 'Да', status: 'Использовано',},
            {id: 220, start: '04.02.2022', end: '13.03.2022', dateRequest: '01.07.2021', paid: 'Да', status: 'Использовано',},
        ],

        all : [
            {id: 1111, surname: 'Хитун', name: 'Иван', lastname: 'Михайлович', start: '01.01.2023', end: '20.01.2023',
                paid: 'Да', department: 'first', number: 1,
                intersections: 'Нет', status: 'Ожидание',},
            {id: 22, surname: 'Хитун', name: 'Иван', lastname: 'Михайлович', start: '02.02.2022', end: '20.02.2022',
                paid: 'Нет', department: 'first', number: 2,
                intersections: 'Да', status: 'Ожидание',},
            {id: 12, surname: 'Алиев', name: 'Иван', lastname: 'Михайлович', start: '01.03.2022', end: '20.03.2022',
                paid: 'Да', department: 'first', number: 1,
                intersections: 'Нет', status: 'Принято',},
            {id: 12, surname: 'Алиев', name: 'Иван', lastname: 'Михайлович', start: '01.07.2022', end: '20.08.2022',
                paid: 'Да', department: 'first', number: 2,
                intersections: 'Нет', status: 'Принято',},
            {id: 220, surname: 'Ивановa', name: 'Владислав', lastname: 'Андреевич', start: '01.04.2022', end: '20.04.2022',
                paid: 'Нет', department: 'first', number: 1,
                intersections: 'Да', status: 'Ожидание',},
            {id: 120, surname: 'Алиевa', name: 'Иван', lastname: 'Михайлович', start: '01.05.2022', end: '20.05.2022',
                paid: 'Да', department: 'first', number: 1,
                intersections: 'Нет', status: 'Ожидание',},
            {id: 222, surname: 'Семеренко', name: 'Владислав', lastname: 'Андреевич', start: '01.06.2022', end: '20.06.2022',
                paid: 'Нет', department: 'first', number: 1,
                intersections: 'Да', status: 'Принято',},
            {id: 122, surname: 'Шарипов', name: 'Иван', lastname: 'Михайлович', start: '05.05.2022', end: '11.11.2022',
                paid: 'Да', type: '', dateRequest: '', department: 'sdgsg', number: 1,
                intersections: 'Нет', explanation: '', status: 'Ожидание', comment: '', countries: '',},
            {id: 2222, surname: 'Михайлов', name: 'Владислав', lastname: 'Андреевич', start: '01.01.2022', end: '02.02.2022',
                paid: 'Нет', department: 'sdgsg', number: 1,
                intersections: 'Нет', status: 'Ожидание',},
        ],

        departments: [
            {id: 1, name: 'airst', min: 8, max: 30, total: 49, percent: 30,},
            {id: 2, name: 'bdgsg', min: 7, max: 20, total: 55, percent: 25,},
            {id: 3, name: 'cirst', min: 8, max: 30, total: 49, percent: 30,},
            {id: 4, name: 'ddgsg', min: 7, max: 20, total: 55, percent: 25,},
            {id: 5, name: 'first', min: 8, max: 30, total: 49, percent: 30,},
            {id: 6, name: 'edgsg', min: 7, max: 20, total: 55, percent: 25,},
            {id: 7, name: 'virst', min: 8, max: 30, total: 49, percent: 30,},
            {id: 8, name: 'xdgsg', min: 7, max: 20, total: 55, percent: 25,},
            {id: 9, name: 'yirst', min: 8, max: 30, total: 49, percent: 30,},
            {id: 10, name: 'zdgsg', min: 7, max: 20, total: 55, percent: 25,},
        ],
        types: [
            {id: 1, name: 'first'},
            {id: 2, name: 'second'},
            {id: 3, name: 'third'},
        ],
        users: [],

        selectedID: Number,
        selectedDep: '',
        isAdmin: '',
        left: 20,
        total: 100,
        visibleAddUser: false,
        visibleAddDep: false,
        visibleChangeCon: false,
    },
    getters: {
        vacations(state) {
            return state.all.filter(p => p.status !== 'Отказ' && p.department === state.selectedDep);
        },
        visibleAdminWindow(state) {
            return state.visibleAddUser || state.visibleAddDep || state.visibleChangeCon;
        }
    },
    mutations: {
        delVac(state){
            console.log(state.selectedID);
            state.myVacations.find(p => p.id === state.selectedID).status = 'Удалено';
        },
    },
    actions: {

    },
    modules: {

    },
})
