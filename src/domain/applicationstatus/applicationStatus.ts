import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import Domain from "../domain";
import {StatusType} from "./statusType";

@Entity('PUBLIC_NOTICE')
export class ApplicationStatus extends Domain {

    @PrimaryGeneratedColumn()
    id? : number;

    @CreateDateColumn({name : "created_at",type : "timestamp"})
    createdAt? : string;

    @UpdateDateColumn({name : "updated_at", type : "timestamp"})
    updatedAt? : string;

    @Column({name : "application_number"})
    applicationNumber : string;

    @Column({name : "status", type : "enum", enum : StatusType})
    status : StatusType;

    @Column({name : "final_value"})
    finalValue : boolean = false


    constructor(applicationNumber: string, status: StatusType) {
        super();
        this.applicationNumber = applicationNumber;
        this.status = status;
    }

    equals(another: ApplicationStatus): boolean {
        let o : ApplicationStatus = another as ApplicationStatus
        if (this.applicationNumber === o.applicationNumber){
            return true;
        }
        return false;
    }


}