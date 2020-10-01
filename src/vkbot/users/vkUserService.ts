import {VkUser, VkUsersResponse} from "./vkUserDataModel";
import VkApiService from "../api/vkApiService"
import {VkUsersPayload} from "../payloads/vkApiPayloads";
import {VkApiMethod} from "../vkbotEnums";
import UserService from "../../user/userService";
import User from "../../user/user";
import {UserContactType} from "../../user/contact/userContactType";
import Logger from "../../logger/logger"
import UserContact from "../../user/contact/userContact";


class VkUserService {

    async readUserFromVk(id : number) : Promise<VkUser> {
        let payload : VkUsersPayload = {user_ids : String(id), fields: "id,first_name,last_name"}
        let data : VkUsersResponse = await VkApiService.callVkApiWithResponse(VkApiMethod.GET_USER, payload)
        return data.response[0];
    }

    async getOrCreateUserById(id : number) : Promise<User> {
        let vkUser : VkUser = await this.readUserFromVk(id);
        return await this._getOrCreateUser(vkUser, undefined, undefined);
    }

    private async _getOrCreateUser(vkUser : VkUser, latFirstName? : string, latLastName? : string) : Promise<User> {
        let vkUserId : string = String(vkUser.id);
        let user : User | undefined = await UserService.getUserByContact(vkUserId, UserContactType.VK);
        if (!user){
            let newUser : User = new User(vkUser.first_name, vkUser.last_name);
            newUser.latLastName = latLastName || "";
            newUser.latFirstName = latFirstName || "";
            newUser.contacts = [new UserContact(UserContactType.VK, vkUserId, newUser)]
            newUser = await UserService.saveUser(newUser);
            Logger.logInfo("Save new user from VK to DB");
            return newUser;
        }
        return user;
    }
}

export default new VkUserService()