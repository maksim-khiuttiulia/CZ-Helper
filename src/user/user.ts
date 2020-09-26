import Domain from "../abstract/domain";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserContactMechanism} from "./userContactMechanism";
import {UserType} from "./userType";

@Entity("user")
export default class User extends Domain {
    @PrimaryGeneratedColumn()
    id? : number;

    @CreateDateColumn({name : "created_at",type : "timestamp"})
    createdAt? : string;

    @UpdateDateColumn({name : "updated_at", type : "timestamp"})
    updatedAt? : string;

    @Column({name : "first_name"})
    firstName : string

    @Column({name : "last_name"})
    lastName : string

    @Column({name : "lat_first_name"})
    latFirstName? : string

    @Column({name : "lat_last_name"})
    latLastName? : string

    @Column({name : "user_type", type : "enum", enum : UserType})
    type : UserType = UserType.NORMAL;

    @Column({name : "contact_mechanism", type : "enum", enum : UserContactMechanism})
    contactMechanism : UserContactMechanism

    @Column({name : "contact", unique : true})
    contact : string;


    constructor(firstName: string, lastName: string, contactMechanism: UserContactMechanism, contact: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactMechanism = contactMechanism;
        this.contact = contact;
    }

    equals(another: Domain): boolean {
        return false;
    }

}