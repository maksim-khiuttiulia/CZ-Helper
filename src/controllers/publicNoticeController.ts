import Controller from "./controller";
import {Request, Response} from "express";
import PublicNoticePageParser from "../services/publicNoticePageParser"

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
        PublicNoticePageParser.readNotices().then(data => {
            response.send(data);
        }).catch(reason => {
            response.send(reason)
       })
    }


}