import {VkApiMethod} from "../vkbotEnums";
import Axios, {AxiosRequestConfig} from "axios";
import Logger from "../../logger/logger";
import {VkApiPayload} from "../payloads/vkApiPayloads";
import {buildUrl} from "../../utils/urlUtils";

const VK_API_ENDPOINT : string = "https://api.vk.com/method/";
const VK_API_VERSION : string = "5.92"
const VK_ACCESS_TOKEN : string = String(process.env.VK_TOKEN)

class VkApiService {


    callVkApi(method : VkApiMethod, payload : VkApiPayload) : void {
        const config : AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        payload.access_token = VK_ACCESS_TOKEN;
        payload.v = VK_API_VERSION;

        const url = buildUrl(VK_API_ENDPOINT + method, payload);
        Axios.post(url, config).then(response => {
            if (response.data.hasOwnProperty("error")){
                Logger.logError(response.data)
            }
        }).catch(reason => {
            Logger.logError(reason)
        })
    }

}

export default new VkApiService();