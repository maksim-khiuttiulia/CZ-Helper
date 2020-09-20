import Controller from "./controller";
import {Request, Response} from "express";
import Logger from "../services/logger/logger"
import VkBotService from "../services/vk/vkBotService"

const PATH = "/vk"
class VkBotController extends Controller{


    constructor() {
        super(PATH);
    }

    protected initializeRoutes(): void {
        this.router.post(PATH, this.serverConfirmation);
    }

    serverConfirmation(request: Request, response: Response) : void {
        Logger.logInfo(request.body)
        response.send(VkBotService.processInputMessage(request.body))
    }
}

export default new VkBotController();