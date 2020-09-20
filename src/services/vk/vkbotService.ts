import {Keyboard, KeyboardButton, VkBotPayload} from "../../payloads/vkBotPayloads";
import Logger from "../logger/logger"
import VkMessageService from "../../services/vk/vkMessageService"

const VK_SERVER_CONFIRMATION : string = String(process.env.VK_SERVER_CONFIRMATION);

class VkBotService {

    processInputMessage(botPayload : VkBotPayload) : string {
        Logger.logInfo(botPayload)
        this.processMainScreen(botPayload);

        return VK_SERVER_CONFIRMATION;
    }

    private processMainScreen(botPayload : VkBotPayload) : void {
        const peerId : number | undefined = botPayload.object?.peer_id
        const groupId : number | undefined = botPayload.group_id
        console.warn(botPayload.object?.payload)

        if (!peerId || !groupId){
            Logger.logError("Peer_id or group_id not exists", botPayload)
            return;
        }
        if (botPayload.object?.payload){
            VkMessageService.sendGroupMessage(peerId, groupId, "Неа!", this._getBasicKeyboard());
            return;
        }

        VkMessageService.sendGroupMessage(peerId, groupId, "Уже 3 ночи", this._getBasicKeyboard());
    }

    private _getBasicKeyboard() : Keyboard {
        const button : KeyboardButton = {color : "primary", action : {type : 'text', label : "Идти спать", payload : {button : "1"}}}
        return {one_time: false, inline: true, buttons: [[button]]};
    }




}

export default new VkBotService();