import Controller from "./controller";
import {Request, Response} from "express";

const PATH = '/notice'
export default class PublicNoticeController extends Controller {


    constructor() {
        super(PATH);
    }

    protected initializeRoutes(): void {
        this.router.get(this._path, this.getAllNotices)
        this.router.get(this._path + "/ping", this.ping)
    }


    getAllNotices(request: Request, response: Response) : void {
        response.send("Here will be notices");
    }
}