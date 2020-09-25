import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import Domain from "../abstract/domain";
import {ApplicationStatusType} from "./applicationStatusType";

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

    @Column({name : "final_value"})
    finalValue : boolean = false


    constructor(applicationNumber: string, status: ApplicationStatusType) {
        super();
        this.applicationNumber = applicationNumber;
        this.status = status;
    }

    equals(another: ApplicationStatus): boolean {
        let o : ApplicationStatus = another as ApplicationStatus
        return this.applicationNumber === o.applicationNumber;

    }


}