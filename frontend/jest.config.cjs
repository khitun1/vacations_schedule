module.exports = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    clearMocks: true,
    globals: {
        localStorage: {
            lang: 'RU'
        }
    },
    // transform: {
    //     "\\.[jt]sx?$": "babel-jest"
    // },
}