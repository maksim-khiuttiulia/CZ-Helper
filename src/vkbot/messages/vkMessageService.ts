import {VkMarkAsReadPayload, VkMessagePayload} from "../payloads/vkApiPayloads";
import {VkApiMethod} from "../vkbotEnums";
import VkApiService from "../api/vkApiService"
import PreparedKeyboardService from "../keyboard/preparedKeyboardService"
import {
    VK_OUT_ERROR,
    VK_OUT_UNKNOWN_COMMAND, VK_OUT_WAIT,
    VK_OUT_WAKE_UP_MESSAGE,
    VK_OUT_WELCOME_MESSAGE,
    VK_OUT_WRONG_FORMAT
} from "./vkBotStaticMessage";
import {Keyboard} from "../keyboard/vkKeyboardDataModel";


class VkMessageService {

    sendMessage(peer_id : number, group_id:number, message : string, attachment? : string, keyboard? : Keyboard) : void {
        let payload : VkMessagePayload = {
            random_id : Math.random() * 10000000000000000,
            peer_id : peer_id,
            group_id : group_id,
            message : encodeURI(message),
            keyboard : keyboard,
            attachment : attachment,
        }
        if (!payload.keyboard){
            payload.keyboard = PreparedKeyboardService.getBasicKeyboard();
        }
        VkApiService.callVkApi(VkApiMethod.SEND_MESSAGE, payload);
        this._isStepaMode(peer_id, group_id)
    }


    markAsRead(peerId : number, groupId:number) : void {
        let payload : VkMarkAsReadPayload = {
            peer_id : peerId,
            group_id : groupId,
            mark_conversation_as_read : 1
        }
        VkApiService.callVkApi(VkApiMethod.MARK_AS_READ, payload);
    }

    sendWelcomeMessage(peerId : number, groupId : number) : void {
        let message : string = VK_OUT_WELCOME_MESSAGE.message
        let attachment : string | undefined = VK_OUT_WELCOME_MESSAGE.attachment
        this.sendMessage(peerId, groupId, message, attachment)
        return;
    }

    sendWakeupMessage(peerId : number, groupId : number) : void {
        this.markAsRead(peerId, groupId);
        let message : string = VK_OUT_WAKE_UP_MESSAGE.message
        let attachment : string | undefined = VK_OUT_WAKE_UP_MESSAGE.attachment;
        let keyboard : Keyboard = PreparedKeyboardService.getBasicKeyboard();
        keyboard.inline = true;

        this.sendMessage(peerId, groupId, message, attachment, keyboard)
        return;
    }

    sendUnknownCommandMessage(peerId : number, groupId : number) : void {
        this.markAsRead(peerId, groupId);
        let message : string = VK_OUT_UNKNOWN_COMMAND.message
        let attachment : string | undefined = VK_OUT_UNKNOWN_COMMAND.attachment;
        this.sendMessage(peerId, groupId, message, attachment)
        return;
    }

    sendWaitMessage(peerId : number, groupId : number) : void {
        this.markAsRead(peerId, groupId);
        let message : string = VK_OUT_WAIT.message
        let attachment : string | undefined = VK_OUT_WAIT.attachment;
        this.sendMessage(peerId, groupId, message, attachment)
        return;
    }

    sendErrorMessage(peerId : number, groupId : number) : void {
        this.markAsRead(peerId, groupId);
        let message : string = VK_OUT_ERROR.message
        let attachment : string | undefined = VK_OUT_ERROR.attachment;
        this.sendMessage(peerId, groupId, message, attachment)
        return;
    }

    sendWrongFormatMessage(peerId : number, groupId : number) : void {
        this.markAsRead(peerId, groupId);
        let message : string = VK_OUT_WRONG_FORMAT.message
        let attachment : string | undefined = VK_OUT_WRONG_FORMAT.attachment;

        this.sendMessage(peerId, groupId, message, attachment)
        return;
    }

    private _isStepaMode(peer_id : number, group_id : number) : void {
        let ids = [35470470]
        let isStepa : boolean = ids.find(e => peer_id === e) !== undefined;
        if (isStepa) {
            let payload : VkMessagePayload = {
                random_id : Math.random() * 10000000000000000,
                peer_id : peer_id,
                group_id : group_id,
                message : "",
                sticker_id : 6874
            }
            payload.keyboard = PreparedKeyboardService.getBasicKeyboard();
            VkApiService.callVkApi(VkApiMethod.SEND_MESSAGE, payload);
        }
    }
}

export default new VkMessageService();