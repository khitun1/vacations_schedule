module.exports = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    clearMocks: true,
    globals: {
        localStorage: {
            lang: 'RU',
            getItem: function (item) {
                return this[item];
            },
            setItem: function (key, value) {
                this[key] = value;
            },
            removeItem: function (item) {
                delete this[item]
            }
        }
    },
    // transform: {
    //     "\\.[jt]sx?$": "babel-jest"
    // },
}