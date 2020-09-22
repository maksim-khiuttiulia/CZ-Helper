import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import Domain from "../abstract/domain";

@Entity('PUBLIC_NOTICE')
export class PublicNotice extends Domain {

    @PrimaryGeneratedColumn()
    id? : number;

    @CreateDateColumn({name : "created_at",type : "timestamp"})
    createdAt? : string;

    @UpdateDateColumn({name : "updated_at", type : "timestamp"})
    updatedAt? : string;

    @Column({name : "full_name"})
    fullName : string;

    @Column({name : "first_name", nullable : true})
    firstName? : string

    @Column({name : "last_name"})
    lastName? : string

    @Column({name : "other_first_name"})
    otherFirstName? : string

    @Column({name : "other_last_name"})
    otherLastName? : string

    @Column({name : "notice_number"})
    noticeNumber : string;

    @Column({name : "url"})
    url? : string;

    @Column()
    valid : boolean = true;

    @Column()
    expired : boolean = false


    constructor(fullName: string, noticeNumber: string) {
        super();
        this.fullName = fullName;
        this.noticeNumber = noticeNumber;
    }

    equals(another: PublicNotice): boolean {
        let o : PublicNotice = another as PublicNotice
        return this.noticeNumber === o.noticeNumber;

    }


}