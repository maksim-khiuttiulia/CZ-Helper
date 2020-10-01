import User from "./user";
import {getConnection, Repository} from "typeorm";
import {UserContactType} from "./contact/userContactType";
import UserContact from "./contact/userContact";
import ApplicationStatus from "../applicationstatus/applicationStatus";

class UserService {
    async saveUser(user : User) : Promise<User> {
        let repository : Repository<User> = getConnection().getRepository(User);
        user = await repository.save(user)
        for (let contact of user.contacts){
            await this.saveUserContact(contact);
        }
        return user;
    }

    async saveUserContact(contact : UserContact) : Promise<UserContact> {
        let repository : Repository<UserContact> = getConnection().getRepository(UserContact);
        return await repository.save(contact);
    }

    async getUserByContact(contact : string, contactType : UserContactType) : Promise<User | undefined> {
        let repository : Repository<User> = getConnection().getRepository(User);
        let user : User | undefined = await repository.createQueryBuilder("user")
            .innerJoin("user._contacts", "user_contact")
            .where("user_contact.contact = :cnt AND user_contact.contact_type = :type",
                {cnt : contact, type : contactType})
            .getOne();
        if (user === undefined) {
            return undefined;
        }
        return await this._initializeUser(user);
    }

    private async _initializeUser(user : User) : Promise<User> {
        let repository : Repository<UserContact> = getConnection().getRepository(UserContact);
        user.contacts = await repository.createQueryBuilder()
            .where("user_id = :userId", {userId: user.id})
            .getMany();

        let repositoryAppStatus : Repository<ApplicationStatus> = getConnection().getRepository(ApplicationStatus)
        user.applicationStatuses = await repositoryAppStatus
            .createQueryBuilder("status")
            .innerJoin("status._owners", "user")
            .where("user.id = :userId", {userId : user.id})
            .getMany();

        return user;
    }

}

export default new UserService();