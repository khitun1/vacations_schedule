import * as ru from "../locales/ru.json"
import * as en from "../locales/en.json"
export const localize = str => {
    return localStorage.getItem('lang') === '🌍 Русский' ? ru[str] : en[str]
}