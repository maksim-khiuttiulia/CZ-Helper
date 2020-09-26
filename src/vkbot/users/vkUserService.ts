import {VkUser, VkUsersResponse} from "./vkUserDataModel";
import VkApiService from "../api/vkApiService"
import {VkUsersPayload} from "../payloads/vkApiPayloads";
import {VkApiMethod} from "../vkbotEnums";
import UserService from "../../user/userService";
import User from "../../user/user";
import {UserContactMechanism} from "../../user/userContactMechanism";


class VkUserService {

    async getUser(id : number) : Promise<VkUser | undefined> {
        let payload : VkUsersPayload = {user_ids : String(id), fields: "id,first_name,last_name"}
        let data : VkUsersResponse = await VkApiService.callVkApiWithResponse(VkApiMethod.GET_USER, payload)
        if (data.response.length === 0){
            return undefined;
        }
        return data.response[0];
    }

    async saveUserById(id : number) : Promise<VkUser> {
        let vkUser : VkUser | undefined = await this.getUser(id);
        if (vkUser){
            await this.saveUserToDbIfNotExists(vkUser, undefined, undefined);
        }
        throw Error("Vk user with id " + id + "not exists");
    }

    async saveUserToDbIfNotExists(vkUser : VkUser, latFirstName? : string, latLastName? : string) : Promise<User> {
        let vkUserId : string = String(vkUser.id);
        let user : User | undefined = await UserService.getUserByContact(vkUserId, UserContactMechanism.VK);
        if (!user){
            let newUser : User = new User(vkUser.first_name, vkUser.last_name, UserContactMechanism.VK, vkUserId);
            newUser.latLastName = latLastName;
            newUser.latFirstName = latFirstName
            await UserService.saveUser(newUser);
            return newUser;
        }
        return user;
    }

    async getUserFromDb(id : number) : Promise<VkUser | undefined> {
        let vkUserId : string = String(id);
        let user : User | undefined = await UserService.getUserByContact(vkUserId, UserContactMechanism.VK);
        if (user){
            return {id: id, first_name: user.firstName, last_name: user.lastName};
        }
        return undefined;
    }
}

export default new VkUserService()