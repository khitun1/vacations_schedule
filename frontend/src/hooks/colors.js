export function colors() {
    const setColor = (status) => {
        switch (status){
            case 'Утверждено':
                return '#b6faba';
            case 'Ожидание':
                return '#ffd7a6';
            case 'Использовано':
                return '#b2b0ff';
            case 'Отказ':
                return '#ffc4b9';
            case 'Отменено':
                return '#c0c0c0';
        }
    }

    const setBorder = (status) => {
        switch (status){
            case 'Утверждено':
                return '#01b026';
            case 'Ожидание':
                return '#d07100';
            case 'Использовано':
                return '#5b30b7';
            case 'Отказ':
                return '#d70000';
            case 'Отменено':
                return '#606060';
        }
    }

    return {
        setColor,
        setBorder
    }
}