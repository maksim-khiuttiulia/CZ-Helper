import Controller from "../../abstract/controller";
import {Request, Response} from "express";
import Logger from "../../logger/logger"
import VkBotService from "../vkBotService"
import {VkBotPayload} from "../payloads/vkBotPayloads";

const PATH = "/vkbot"
const VK_SERVER_CONFIRMATION : string = String(process.env.VK_SERVER_CONFIRMATION);
const VK_SERVER_RESPONSE : string = "ok";
class VkApiController extends Controller{


    constructor() {
        super(PATH);
    }

    protected initializeRoutes(): void {
        this.router.post(PATH, this.serverConfirmation);
    }

    serverConfirmation(request: Request, response: Response) : void {
        Logger.logRequest(request.body)
        let botPayload : VkBotPayload = request.body;
        if (botPayload.type === 'confirmation'){
            response.send(VK_SERVER_CONFIRMATION)
            return;
        }
        VkBotService.processInputMessage(request.body)
        response.send(VK_SERVER_RESPONSE)
    }
}

export default new VkApiController();