import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import Domain from "../abstract/domain";
import {ApplicationStatusType} from "./applicationStatusType";
import User from "../user/user";

@Entity('application_status')
export default class ApplicationStatus extends Domain {


    @PrimaryGeneratedColumn()
    id? : number;

    @CreateDateColumn({name : "created_at",type : "timestamp"})
    createdAt? : string;

    @UpdateDateColumn({name : "updated_at", type : "timestamp"})
    updatedAt? : string;

    @Column({name : "application_number"})
    applicationNumber : string;

    @Column({name : "status", type : "enum", enum : ApplicationStatusType})
    status : ApplicationStatusType;

    @Column({name : "final_value", type : Boolean})
    finalValue : boolean = false

    @ManyToMany(type => User, user => user.applicationStatuses, {cascade : true})
    @JoinTable({
        name: "user_application",
        joinColumn: {name: "application_status_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "user_id", referencedColumnName: "id"}
    })
    private _owners? : User[]


    constructor(applicationNumber: string, status: ApplicationStatusType) {
        super();
        this.applicationNumber = applicationNumber;
        this.status = status;
    }

    equals(another: ApplicationStatus): boolean {
        let o : ApplicationStatus = another as ApplicationStatus
        return this.applicationNumber === o.applicationNumber;

    }

    get owners(): User[] {
        if (this._owners === undefined){
            this._owners = [];
        }
        return this._owners;
    }

    set owners(value: User[]) {
        this._owners = value;
    }

}