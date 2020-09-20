import {Keyboard} from "../../payloads/vkBotPayloads";
import {VkMarkAsReadPayload, VkMessagePayload} from "../../payloads/vkApiPayloads";
import {VkApiMethod} from "../../enums/vkbotEnums";
import VkApiService from "../../services/vk/vkApiService"


class VkMessageService {

    sendGroupMessage(peer_id : number, group_id:number, message : string, keyboard? : Keyboard) : void {
        let payload : VkMessagePayload = {
            random_id : Math.random() * 10000000000000000,
            peer_id : peer_id,
            group_id : group_id,
            message : encodeURI(message),
            keyboard : keyboard
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
}

export default new VkMessageService();