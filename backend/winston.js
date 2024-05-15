const winston = require('winston');

winston.configure({
    transports: [
        new (winston.transports.File)({
            filename: 'logger.log',})
    ]
})

module.exports = winston;