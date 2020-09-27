import {getConnection, Repository} from "typeorm";
import UserMessage from "./userMessage";

class UserMessageService {
    async getMessage(id : number) : Promise<UserMessage | undefined> {
        let repository : Repository<UserMessage> = getConnection().getRepository(UserMessage);
        return await repository.findOne({id : id});
    }
}

export default new UserMessageService()