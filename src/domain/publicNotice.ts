import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class PublicNotice {

    @PrimaryGeneratedColumn()
    id : number | undefined;

    @CreateDateColumn({type : "timestamp"})
    createdAt : string | undefined;

    @UpdateDateColumn({type : "timestamp"})
    updatedAt : string | undefined;

    @Column()
    fullName : string | undefined;

    @Column()
    caseNumber : string | undefined;


}