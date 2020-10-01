import Domain from "../abstract/domain";
import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("prepared_messages")
class UserMessage extends Domain {

    @PrimaryColumn()
    id? : number;

    @Column({name : "message"})
    message : string;

    @Column({name : "attachment"})
    attachment? : string


    constructor(message: string) {
        super();
        this.message = message;
    }

    equals(another: UserMessage): boolean {
        return this.id === another.id;
    }

}

export default UserMessage