import express from 'express';
import * as bodyParser from 'body-parser';
import Controller from "./controllers/controller";
import dotenv from "dotenv";
import {createConnection} from "typeorm";
import Logger from "./services/logger/logger"
import winston from "winston";

dotenv.config();
let PORT: number = Number(process.env.SERVER_PORT);
let DB_TYPE: "mysql" | "mariadb" = "mysql"
let DB_HOST: string = String(process.env.DB_HOST);
let DB_PORT: number = Number(process.env.DB_PORT);
let DB_NAME: string = String(process.env.DB_NAME)
let DB_USER: string = String(process.env.DB_USER);
let DB_PASSWORD: string = String(process.env.DB_PASSWORD);

export default class App {
    private _app : express.Application
    private readonly _port : number;

    constructor(controllers : Controller[]) {
        this._app = express();
        this._port = PORT;
        this.initializeMiddlewares();
        this.initializeDBConnection();
        this.initializeControllers(controllers);
    }

    public listen() : void {
        this._app.listen(this._port, () => {
            console.log(`App listening on the port ${this._port}`);
        });
    }

    private initializeMiddlewares() : void {
        this._app.use(bodyParser.json());
    }

    private initializeDBConnection() : void {
        console.warn(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)
        createConnection({
            type : "mysql",
            host : DB_HOST,
            port : DB_PORT,
            username : DB_USER,
            password : DB_PASSWORD,
            database : DB_NAME,
            entities : [
                __dirname + "/domain/*.js"
            ]

        }).then(connection => {
            console.log("Connected to DB")
        }).catch(e => {
            console.error("Failed to connect to DB")
            console.error(e)
        })
    }

    private initializeControllers(controllers : Controller[]) : void {
        controllers.forEach((controller) => {
            this._app.use('/', controller.router);
        });
    }
}