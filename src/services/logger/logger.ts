import {createLogger, format, Logger as WinstonLogger, transports} from "winston";
import * as fs from "fs";

const LOGS_PATH : string = "logs"

class Logger {
    private readonly _infoLogger : WinstonLogger
    private readonly _errorLogger : WinstonLogger

    constructor() {
        if (!fs.existsSync(LOGS_PATH)){
            fs.mkdirSync(LOGS_PATH);
        }

        this._infoLogger = createLogger({
            level : 'info',
            format : format.combine(
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.printf(info => `"{ timestamp" : "${info.timestamp}", "message" : "${info.message}" }`.replace("\n", " "))
            ),
            transports: [
                new transports.Console(),
                new transports.File({filename : LOGS_PATH +'/info.log'})
            ]
        });

        this._errorLogger = createLogger({
            handleExceptions : true,
            level : 'error',
            format : format.combine(
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.printf(info => `"{ timestamp" : "${info.timestamp}", "message" : "${info.message}", "stack" : "${info.stack}", "config" : "${info.config}" }`.replace("\n", " "))
            ),
            transports: [
                new transports.Console(),
                new transports.File({filename : LOGS_PATH +'/errors.log'})
            ]
        });
    }

    logInfo(info : string) : void {
        this._infoLogger.info(info);
    }

    logError(error : any) : void {
        this._errorLogger.error(error)
    }
}

export default new Logger();