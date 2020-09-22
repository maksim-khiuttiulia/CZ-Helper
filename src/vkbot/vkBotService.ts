import {Message, Payload, VkBotPayload} from "./payloads/vkBotPayloads";
import Logger from "../logger/logger"
import VkMessageService from "./messages/vkMessageService"
import VkBotKeyboardService from "./keyboard/vkBotKeyboardService";
import {
    VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP, VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP,
    VK_IN_CHECK_PUBLIC_NOTICE_REGEX,
    VK_IN_WAKE_UP_REGEX
} from "./vkInputMessagePatterns";
import {isFullMatch, isNotFullMatchInUpperCase} from "../utils/regexUtils";
import PublicNoticeService from "../publicnotice/publicNoticeService"
import {PublicNotice} from "../publicnotice/publicNotice";
import {
    VK_OUT_MVCR_EXISTS_PUBLIC_NOTICE,
    VK_OUT_MVCR_NO_EXISTS_PUBLIC_NOTICE,
    VkBotStaticMessage
} from "./messages/vkBotStaticMessage";


class VkBotService {

    processInputMessage(botPayload : VkBotPayload) : void {

        let inputMessage : Message = botPayload.object;

        if (inputMessage.payload){
            this._processMessagePayload(botPayload.object);
        }

        if (inputMessage.text){
            this._processMessageText(inputMessage)
        }
    }

    private _processMessageText(inputMessage : Message) : void {
        if (isFullMatch(inputMessage.text, VK_IN_WAKE_UP_REGEX)){
            VkMessageService.sendWakeupMessage(inputMessage.peer_id, inputMessage.group_id);
            return
        }
        if (isFullMatch(inputMessage.text, VK_IN_CHECK_PUBLIC_NOTICE_REGEX)) {
            this._checkPublicNoticeMessage(inputMessage);
        }
    }

    private _processMessagePayload(inputMessage : Message) : void {
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

    private _checkPublicNoticeMessage(inputMessage : Message) : void {
        if (isNotFullMatchInUpperCase(inputMessage.text, VK_IN_CHECK_PUBLIC_NOTICE_REGEX)){
            VkMessageService.sendWrongFormatMessage(inputMessage.peer_id, inputMessage.group_id);
            return;
        }
        let message = inputMessage.text
        const regex: RegExpMatchArray | null = message.match(VK_IN_CHECK_PUBLIC_NOTICE_REGEX);
        if (regex === null) {
            VkMessageService.sendWrongFormatMessage(inputMessage.peer_id, inputMessage.group_id);
            return;
        }
        let firstName: string = regex[VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP];
        let lastName : string = regex[VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP];

        PublicNoticeService.getPublicNotices(firstName, lastName).then(notices => {
            let message : VkBotStaticMessage = this._getFormattedMessagePublicNotice(notices);
            VkMessageService.sendGroupMessage(inputMessage.peer_id, inputMessage.group_id, message.message, message.attachment);
        })

    }

    private _getFormattedMessagePublicNotice(notices : PublicNotice[]) : VkBotStaticMessage{
        if (notices.length === 0) {
            return VK_OUT_MVCR_NO_EXISTS_PUBLIC_NOTICE;
        }

        let message : VkBotStaticMessage = VK_OUT_MVCR_EXISTS_PUBLIC_NOTICE;
        for (let notice of notices){
            message.message += notice.url + "\n";
        }
        return message;
    }

    private _markAsRead(message : Message) : void {
        VkMessageService.markAsRead(message.peer_id, message.group_id);
    }
}

export default new VkBotService();