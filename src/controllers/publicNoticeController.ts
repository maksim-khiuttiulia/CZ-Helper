import Controller from "./controller";
import {Request, Response} from "express";
import PublicNoticePageParser from "../services/publicnotice/publicNoticePageParser"
import PublicNoticeService from "../services/publicnotice/publicNoticeService";

const PATH = '/notice'
export default class PublicNoticeController extends Controller {


    constructor() {
        super(PATH);
    }

    protected initializeRoutes(): void {
        this.router.get(this._path, this.getAllNotices)
        this.router.get(this._path + "/ping", this.ping)
        this.router.get(this._path + "/save", this.saveAllNotices)
    }


    getAllNotices(request: Request, response: Response) : void {
        PublicNoticePageParser.readNotices().then(data => {
            response.send(data);
        }).catch(reason => {
            response.send(reason)
       })
    }

    saveAllNotices(request: Request, response: Response) : void {
        PublicNoticeService.saveNotices();
        response.send("OK")
    }

}