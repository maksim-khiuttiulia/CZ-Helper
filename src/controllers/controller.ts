import {Router, Request, Response} from "express";


export default abstract class Controller {
    protected _path : string;
    private readonly _router : Router;

    protected constructor(path : string) {
        this._path = path
        this._router = Router();
        this.initializeRoutes();
    }

    protected abstract initializeRoutes() : void;

    get router() : Router {
        return this._router;
    }

    protected ping(request: Request, response: Response){
        response.send("Pong");
    }
}