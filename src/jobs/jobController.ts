import Controller from "../abstract/controller";
import {Request, Response} from "express";
import PublicNoticeService from "../publicnotice/publicNoticeService"
import ApplicationStatusService from "../applicationstatus/applicationStatusService";

const PATH : string = "/jobs"
class JobController extends Controller {


    constructor() {
        super(PATH);
    }

    protected initializeRoutes(): void {
        this.router.get(PATH+"/updatePublicNotice", this._updatePublicNotices);
        this.router.get(PATH+"/updateApplicationStatuses", this._updateApplicationStatuses)
    }

    private async _updatePublicNotices(request : Request, response : Response) : Promise<void> {
        await PublicNoticeService.updateAllNotices()
        response.status(200).send();
    }

    private async _updateApplicationStatuses(request : Request, response : Response) : Promise<void> {
        await ApplicationStatusService.updateAllApplicationStatuses();
        response.status(200).send();
    }
}

export default new JobController()