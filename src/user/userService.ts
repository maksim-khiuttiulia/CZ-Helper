import User from "./user";
import {getConnection, Repository} from "typeorm";
import {UserContactMechanism} from "./userContactMechanism";

class UserService {
    async saveUser(user : User) : Promise<void> {
        let repository : Repository<User> = getConnection().getRepository(User);
        await repository.save(user)
    }

    async getUserByContact(contact : string, contactMechanism : UserContactMechanism) : Promise<User | undefined> {
        let repository : Repository<User> = getConnection().getRepository(User);
        return await repository.findOne({contact : contact, contactMechanism : contactMechanism})
    }

    async getUserByLatName(latFirstName : string, latLastName : string) : Promise<User | undefined> {
        let repository : Repository<User> = getConnection().getRepository(User);
        return await repository.findOne({latFirstName, latLastName})
    }
}

export default new UserService();