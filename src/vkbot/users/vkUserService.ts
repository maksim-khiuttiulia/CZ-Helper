import {VkUser, VkUsersResponse} from "./vkUserDataModel";
import VkApiService from "../api/vkApiService"
import {VkUsersPayload} from "../payloads/vkApiPayloads";
import {VkApiMethod} from "../vkbotEnums";
import UserService from "../../user/userService";
import User from "../../user/user";
import {UserContactMechanism} from "../../user/userContactMechanism";
import Logger from "../../logger/logger"


class VkUserService {

    async getUser(id : number) : Promise<VkUser | undefined> {
        let payload : VkUsersPayload = {user_ids : String(id), fields: "id,first_name,last_name"}
        let data : VkUsersResponse = await VkApiService.callVkApiWithResponse(VkApiMethod.GET_USER, payload)
        if (data.response.length === 0){
            return undefined;
        }
        return data.response[0];
    }

    async saveNewUserByIdIfNotExists(id : number) : Promise<void> {
        let vkUser : VkUser | undefined = await this.getUser(id);
        if (vkUser){
            await this._saveUserToDbIfNotExists(vkUser, undefined, undefined);
        }
    }

    private async _saveUserToDbIfNotExists(vkUser : VkUser, latFirstName? : string, latLastName? : string) : Promise<User> {
        let vkUserId : string = String(vkUser.id);
        let user : User | undefined = await UserService.getUserByContact(vkUserId, UserContactMechanism.VK);
        if (!user){
            let newUser : User = new User(vkUser.first_name, vkUser.last_name, UserContactMechanism.VK, vkUserId);
            newUser.latLastName = latLastName;
            newUser.latFirstName = latFirstName
            await UserService.saveUser(newUser);
            Logger.logInfo("Save new user from VK to DB");
            return newUser;
        }
        return user;
    }
}

export default new VkUserService()