import {InputMessage, Payload, VkBotPayload} from "../../payloads/vkBotPayloads";
import Logger from "../logger/logger"
import VkMessageService from "../../services/vk/vkMessageService"
import VkBotKeyboardService from "./vkBotKeyboardService";
import {VK_WAKE_UP_PHRASE_MESSAGE_RU} from "../../constants/staticMessageContants";


class VkBotService {

    processInputMessage(botPayload : VkBotPayload) : void {

        let inputMessage : InputMessage = botPayload.object;

        if (inputMessage.payload){
            this._processMessagePayload(botPayload.object);
        }

        if (inputMessage.text){
            this._processMessageText(inputMessage)
        }
    }

    private _processMessageText(inputMessage : InputMessage) : void {
        if (inputMessage.text.toUpperCase().trim() === VK_WAKE_UP_PHRASE_MESSAGE_RU.message.toUpperCase()){
            VkMessageService.sendWakeupMessage(inputMessage.peer_id, inputMessage.group_id);
        }
    }

    private _processMessagePayload(inputMessage : InputMessage) : void {
        Logger.logInfo(inputMessage);
        this._markAsRead(inputMessage)

        let payload : Payload = JSON.parse(inputMessage.payload);

        let peerId : number = inputMessage.peer_id;
        let groupId : number = inputMessage.group_id;

        if (payload.button) {
            VkBotKeyboardService.processKeyboardInput(payload.button, peerId, groupId);
            return;
        }

        if (payload.command === "start"){
            VkMessageService.sendWelcomeMessage(peerId, groupId);
            return;
        }
    }

    private _markAsRead(message : InputMessage) : void {
        VkMessageService.markAsRead(message.peer_id, message.group_id);
    }
}

export default new VkBotService();