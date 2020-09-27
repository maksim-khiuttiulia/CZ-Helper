import {getConnection, Repository} from "typeorm";
import UserMessage from "./userMessage";

class UserMessageService {
    async getMessage(id : number) : Promise<UserMessage> {
        let repository : Repository<UserMessage> = getConnection().getRepository(UserMessage);
        let message = await repository.findOne({id : id});
        if(message === undefined){
            throw new Error("UserMessage " + id + " doesnt exit");
        }
        return message
    }
}

export default new UserMessageService()