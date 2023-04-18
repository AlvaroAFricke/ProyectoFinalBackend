import log4js from "log4js";

log4js.configure({
    appenders: {
        console: {type: 'console'},

        loggerConsola: {
            type: 'logLevelFilter',
            appender: 'console',
            level: 'info'
        },

        loggerWarn: {
            type: 'logLevelFilter',
            appender: 'console',
            level: 'warn'
        },

        loggerError: {
            type: 'logLevelFilter',
            appender: 'console',
            level: 'error'
        }
    },

    categories: {
        default: {
            appenders: ['loggerConsola'],
            level: 'all'
        },
        prod: {
            appenders: ['loggerWarn', 'loggerError'],
            level: 'all'
        }
    }

})

let logger = log4js.getLogger()

export default logger 