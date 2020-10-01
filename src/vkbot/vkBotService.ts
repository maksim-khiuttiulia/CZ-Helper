import {NewMessage, Payload, VkBotPayload} from "./payloads/vkBotPayloads";
import Logger from "../logger/logger"
import VkMessageService from "./messages/vkMessageService"
import VkBotKeyboardService from "./keyboard/vkBotKeyboardService";
import VkUserService from "./users/vkUserService"
import {isMatchInUpperCase} from "../utils/stringUtils";
import VkVisaService from "./vkVisaService"
import {
    VK_IN_CHECK_PUBLIC_NOTICE_REGEX_PREFIX,
    VK_IN_CHECK_VISA_REGEX_PREFIX,
    VK_IN_MESSAGE_PREFIX_REGEX,
    VK_IN_WAKE_UP_REGEX
} from "./vkInputMessagePatterns";
import User from "../user/user";


class VkBotService {

    processInputMessage(botPayload : VkBotPayload) : void {
        let inputMessage : NewMessage = botPayload.object;
        Logger.logRequest(inputMessage);
        let userId = botPayload.object.from_id

        if (inputMessage.payload){
            VkUserService.getOrCreateUserById(userId).then(user => {
                this._processMessagePayload(botPayload.object, user);
            })
            return
        }

        if (inputMessage.text && isMatchInUpperCase(inputMessage.text, VK_IN_MESSAGE_PREFIX_REGEX)){
            VkUserService.getOrCreateUserById(userId).then(user => {
                this._processMessageText(botPayload.object, user);
            })
            return
        }
    }

    private _processMessageText(inputMessage : NewMessage, user : User) : void {
        inputMessage.text = inputMessage.text.toUpperCase();
        let text = inputMessage.text.toUpperCase();
        if (isMatchInUpperCase(text, VK_IN_MESSAGE_PREFIX_REGEX)){
            if (isMatchInUpperCase(text, VK_IN_WAKE_UP_REGEX)){
                this._markAsRead(inputMessage)
                VkMessageService.sendWakeupMessage(inputMessage.peer_id, inputMessage.group_id);
                return
            }
            if (isMatchInUpperCase(text, VK_IN_CHECK_PUBLIC_NOTICE_REGEX_PREFIX)) {
                this._markAsRead(inputMessage)
                VkVisaService.processGetPublicNoticeMessage(inputMessage, user);
                return;
            }
            if (isMatchInUpperCase(text, VK_IN_CHECK_VISA_REGEX_PREFIX)) {
                this._markAsRead(inputMessage)
                VkVisaService.processGetVisaStatus(inputMessage, user);
                return;
            }
        }
    }

    private _processMessagePayload(inputMessage : NewMessage, user : User) : void {
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

    private _markAsRead(message : NewMessage) : void {
        VkMessageService.markAsRead(message.peer_id, message.group_id);
    }
}

export default new VkBotService();