import Controller from "./controller";
import {Request, Response} from "express";
import PublicNoticeService from "../services/publicnotice/publicNoticeService"

const PATH = '/notice'
class PublicNoticeController extends Controller {


    constructor() {
        super(PATH);
    }

    protected initializeRoutes(): void {
        this.router.get(this._path, this.update)
    }


    update(request: Request, response: Response) : void {
        PublicNoticeService.updateAllNotices().then(data => {
            response.send("OK");
        }).catch(reason => {
            response.send(reason)
        })
    }
}

export default new PublicNoticeController();