import {createLogger, transports, format} from 'winston'

const logger = createLogger({
    level : 'info',
    format : format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level.toUpperCase()}] : ${message}`
        })
    ),
    transports : [
        new transports.Console()
    ]
})

export default logger