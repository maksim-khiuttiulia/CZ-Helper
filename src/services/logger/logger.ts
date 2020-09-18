import winston, {createLogger, format, Logger as WinstonLogger, transports} from "winston";

class Logger {
    private _infoLogger : WinstonLogger
    private _errorLogger : WinstonLogger

    constructor() {
        this._infoLogger = createLogger({
            level : 'info',
            format : format.combine(
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.printf(info => `"{ timestamp" : "${info.timestamp}", "message" : "${info.message}", "stack" : "${info.stack} }"`.replace("\n", " "))
            ),
            transports: [
                new transports.Console(),
                new transports.File({filename : 'logs/info.log'})
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
                new transports.File({filename : 'logs/errors.log'})
            ]
        });
    }

    logInfo(info : string) : void {
        this._infoLogger.info(info);
    }

    logError(error : any) : void {
        this._errorLogger.error(error)
    }


    get infoLogger(): winston.Logger {
        return this._infoLogger;
    }

    get errorLogger(): winston.Logger {
        return this._errorLogger;
    }
}

export default new Logger();