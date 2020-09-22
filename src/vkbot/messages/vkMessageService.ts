import {VkMarkAsReadPayload, VkMessagePayload} from "../payloads/vkApiPayloads";
import {VkApiMethod} from "../vkbotEnums";
import VkApiService from "../api/vkApiService"
import VkBotKeyboardService from "../keyboard/vkBotKeyboardService";
import {
    VK_OUT_UNKNOWN_COMMAND,
    VK_OUT_WAKE_UP_MESSAGE_RU,
    VK_OUT_WELCOME_MESSAGE_RU,
    VK_OUT_WRONG_FORMAT
} from "./vkBotStaticMessage";
import {Keyboard} from "../keyboard/vkKeyboardDataModel";


class VkMessageService {

    sendGroupMessage(peer_id : number, group_id:number, message : string, attachment? : string, keyboard? : Keyboard) : void {
        let payload : VkMessagePayload = {
            random_id : Math.random() * 10000000000000000,
            peer_id : peer_id,
            group_id : group_id,
            message : encodeURI(message),
            keyboard : keyboard,
            attachment : attachment
        }
        VkApiService.callVkApi(VkApiMethod.SEND_MESSAGE, payload);
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
        let message : string = VK_OUT_WELCOME_MESSAGE_RU.message
        let attachment : string | undefined = VK_OUT_WELCOME_MESSAGE_RU.attachment
        let keyboard : Keyboard = VkBotKeyboardService.getBasicKeyboard();
        this.sendGroupMessage(peerId, groupId, message, attachment, keyboard)
        return;
    }

    sendWakeupMessage(peerId : number, groupId : number) : void {
        this.markAsRead(peerId, groupId);
        let message : string = VK_OUT_WAKE_UP_MESSAGE_RU.message
        let attachment : string | undefined = VK_OUT_WAKE_UP_MESSAGE_RU.attachment;
        let keyboard : Keyboard = VkBotKeyboardService.getBasicKeyboard();
        keyboard.inline = true;

        this.sendGroupMessage(peerId, groupId, message, attachment, keyboard)
        return;
    }

    sendUnknownCommandMessage(peerId : number, groupId : number) : void {
        this.markAsRead(peerId, groupId);
        let message : string = VK_OUT_UNKNOWN_COMMAND.message
        let attachment : string | undefined = VK_OUT_UNKNOWN_COMMAND.attachment;
        let keyboard : Keyboard = VkBotKeyboardService.getBasicKeyboard();

        this.sendGroupMessage(peerId, groupId, message, attachment, keyboard)
        return;
    }

    sendWrongFormatMessage(peerId : number, groupId : number) : void {
        this.markAsRead(peerId, groupId);
        let message : string = VK_OUT_WRONG_FORMAT.message
        let attachment : string | undefined = VK_OUT_WRONG_FORMAT.attachment;
        let keyboard : Keyboard = VkBotKeyboardService.getBasicKeyboard();

        this.sendGroupMessage(peerId, groupId, message, attachment, keyboard)
        return;
    }
}

export default new VkMessageService();