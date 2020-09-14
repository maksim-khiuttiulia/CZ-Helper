import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Table} from "typeorm";

@Entity('PUBLIC_NOTICE')
export class PublicNotice {

    @PrimaryGeneratedColumn()
    id : number | undefined;

    @CreateDateColumn({name : "created_at",type : "timestamp"})
    createdAt : string | undefined;

    @UpdateDateColumn({name : "updated_at", type : "timestamp"})
    updatedAt : string | undefined;

    @Column({name : "full_name"})
    fullName : string;

    @Column({name : "notice_number"})
    noticeNumber : string;

    @Column()
    valid : boolean = true;

    @Column()
    expired : boolean = false


    constructor(fullName: string, noticeNumber: string) {
        this.fullName = fullName;
        this.noticeNumber = noticeNumber;
    }
}