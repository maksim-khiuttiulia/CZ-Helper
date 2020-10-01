import {createLogger, format, Logger as WinstonLogger, transports} from "winston";
import * as fs from "fs";

const LOGS_PATH : string = "./logs"

class Logger {
    private  _mainLogger : WinstonLogger
    private  _jobsLogger : WinstonLogger

    constructor() {
        if (!fs.existsSync(LOGS_PATH)){
            fs.mkdirSync(LOGS_PATH);
        }

        this._mainLogger = createLogger({
            level : 'info',
            format : format.combine(
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.prettyPrint()
            ),
            transports: [
                new transports.Console(),
                new transports.File({filename : LOGS_PATH +'/info.log'})
            ]
        });

        this._jobsLogger = createLogger({
            handleExceptions : true,
            level : 'info',
            format : format.combine(
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.json()
            ),
            transports: [
                new transports.Console(),
                new transports.File({filename : LOGS_PATH +'/jobs.log'})
            ]
        });
    }

    logInfo(info : any) : void {
        this._mainLogger.info(info);
    }

    logError(error : any, ...meta: any[]) : void {
        this._mainLogger.error(error, error.stack, meta)
    }

    logRequest(request : any) : void {
        this._mainLogger.info(request);
    }

    logJob(info : any) : void {
        this._jobsLogger.info(info);
    }

}

export default new Logger();