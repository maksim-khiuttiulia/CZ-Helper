import Controller from "../../abstract/controller";
import {Request, Response} from "express";
import Logger from "../../logger/logger"
import VkBotService from "../vkBotService"
import {VkBotPayload} from "../payloads/vkBotPayloads";
import ApplicationStatusService from "../../applicationstatus/applicationStatusService";

const PATH = "/vk"
const VK_SERVER_CONFIRMATION : string = String(process.env.VK_SERVER_CONFIRMATION);
const VK_SERVER_RESPONSE : string = "ok";

class VkApiController extends Controller{


    constructor() {
        super(PATH);
    }

    protected initializeRoutes(): void {
        this.router.post(PATH, this.apiCall);
        this.router.post(PATH + "/visa", this.getVisaStatus);
    }

    apiCall(request: Request, response: Response) : void {
        Logger.logRequest(request.body)
        let botPayload : VkBotPayload = request.body;
        if (botPayload.type === 'confirmation'){
            response.send(VK_SERVER_CONFIRMATION)
            return;
        }
        try {
            VkBotService.processInputMessage(request.body)
            response.send(VK_SERVER_RESPONSE)
        } catch (e) {
            Logger.logError(e);
        }
    }

    async getVisaStatus(request: Request, response: Response) : Promise<void> {
        let number : string = request.body["number"];
        let status = await ApplicationStatusService.createOrUpdateApplicationStatus(number);
        response.send(status);
    }
}

export default new VkApiController();