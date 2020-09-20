import {Keyboard} from "../../payloads/vkBotPayloads";
import {VkMessagePayload} from "../../payloads/vkApiPayloads";
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
}

export default new VkMessageService();