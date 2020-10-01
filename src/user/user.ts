import Domain from "../abstract/domain";
import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserContactType} from "./contact/userContactType";
import {UserType} from "./userType";
import UserContact from "./contact/userContact";
import ApplicationStatus from "../applicationstatus/applicationStatus";

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

    @OneToMany(type1 => UserContact, contact => contact.user)
    private _contacts? : UserContact[];

    @ManyToMany(type1 => ApplicationStatus, status => status.owners)
    @JoinTable({
        name: "user_application",
        joinColumn: {name: "user_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "application_status_id", referencedColumnName: "id"}
    }) private _applicationStatuses?: ApplicationStatus[];

    constructor(firstName: string, lastName: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
    }

    equals(another: Domain): boolean {
        return false;
    }

    get applicationStatuses(): ApplicationStatus[] {
        if (this._applicationStatuses === undefined) {
            this._applicationStatuses = [];
        }
        return this._applicationStatuses;
    }

    set applicationStatuses(value: ApplicationStatus[]) {
        this._applicationStatuses = value;
    }

    get contacts(): UserContact[] {
        if (this._contacts === undefined){
            this._contacts = []
        }
        return this._contacts;
    }

    set contacts(value: UserContact[]) {
        this._contacts = value;
    }
}