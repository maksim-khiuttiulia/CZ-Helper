import express, {NextFunction} from 'express';
import * as bodyParser from 'body-parser';
import Controller from "./abstract/controller";
import dotenv from "dotenv";
import {createConnection} from "typeorm";
import Logger from "./logger/logger";
import Jobs from "./jobs/jobs"

dotenv.config();
let PORT: number = Number(process.env.SERVER_PORT);
let DB_TYPE: "postgres" = "postgres"
let DB_HOST: string = String(process.env.DB_HOST);
let DB_PORT: number = Number(process.env.DB_PORT);
let DB_NAME: string = String(process.env.DB_NAME)
let DB_USER: string = String(process.env.DB_USER);
let DB_PASSWORD: string = String(process.env.DB_PASSWORD);

export default class App {
    private _app : express.Application
    private readonly _port : number;

    constructor(controllers : Controller[]) {
        Logger.logInfo("Start application")
        this._app = express();
        this._port = PORT;
        this.initializeMiddlewares();
        this.initializeDBConnection();
        this.initializeControllers(controllers);
        this.initializeJobs();
        this.initializeLogger();
    }

    public listen() : void {
        this._app.listen(this._port, () => {
            Logger.logInfo(`App listening on the port ${this._port}`);
        });
    }

    private initializeMiddlewares() : void {
        this._app.use(bodyParser.json());
    }

    private initializeDBConnection() : void {
        Logger.logInfo("Init DB Connection");
        createConnection({
            type : DB_TYPE,
            host : DB_HOST,
            port : DB_PORT,
            username : DB_USER,
            password : DB_PASSWORD,
            database : DB_NAME,
            entities : [
                __dirname + "/applicationstatus/applicationStatus.js",
                __dirname + "/czechdictionary/czechDictionaryWord.js",
                __dirname + "/publicnotice/publicNotice.js",
                __dirname + "/usermessage/userMessage.js",
                __dirname + "/user/user.js",
                __dirname + "/user/contact/userContact.js"
            ]
        }).then(() => {
            Logger.logInfo("Connected to DB")
        }).catch(e => {
            Logger.logError("Failed to connect to DB")
            Logger.logError(e)
        })
    }

    private initializeControllers(controllers : Controller[]) : void {
        controllers.forEach((controller) => {
            this._app.use('/', controller.router);
            this._app.use('/', controller.router);
        });
    }

    private initializeJobs() : void {
        Jobs.initUpdatePublicNotices();
        Jobs.initUpdateApplicationStatuses();
    }

    private initializeLogger() : void {
        process.on("uncaughtException", error => {
            Logger.logError(error)
        })
    }
}