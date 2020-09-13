import express from 'express';
import * as bodyParser from 'body-parser';
import Controller from "./controllers/controller";


export default class App {
    private _app : express.Application
    private readonly _port : number;

    constructor(controllers : Controller[], port : number) {
        this._app = express();
        this._port = port;
        this.initializeMiddlewares();
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

    private initializeControllers(controllers : Controller[]) : void {
        controllers.forEach((controller) => {
            this._app.use('/', controller.router);
        });
    }
}