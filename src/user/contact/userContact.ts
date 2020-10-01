import Domain from "../../abstract/domain";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "../user";
import {UserContactType} from "./userContactType";

@Entity("user_contact")
export default class UserContact extends Domain{

    @PrimaryGeneratedColumn()
    id? : number;

    @Column({name : "contact_type", type : "enum", enum : UserContactType})
    contactType : UserContactType

    @Column({name : "contact", unique : true})
    contact : string;

    @ManyToOne(type => User, user => user.contacts)
    @JoinColumn({name : "user_id", referencedColumnName : "id"})
    user : User;


    constructor(contactType: UserContactType, contact: string, user: User) {
        super();
        this.contactType = contactType;
        this.contact = contact;
        this.user = user;
    }

    equals(another: UserContact): boolean {
        return this.id === another.id;
    }
}