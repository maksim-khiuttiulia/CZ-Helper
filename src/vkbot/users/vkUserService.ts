import {VkUser, VkUsersResponse} from "./vkUserDataModel";
import VkApiService from "../api/vkApiService"
import {VkUsersPayload} from "../payloads/vkApiPayloads";
import {VkApiMethod} from "../vkbotEnums";


class VkUserService {

    async getUser(id : number) : Promise<VkUser | undefined> {
        let payload : VkUsersPayload = {user_ids : String(id), fields: "id,first_name,last_name"}
        let data : VkUsersResponse = await VkApiService.callVkApiWithResponse(VkApiMethod.GET_USER, payload)
        if (data.response.length === 0){
            return undefined;
        }
        return data.response[0];
    }
}

export default new VkUserService()