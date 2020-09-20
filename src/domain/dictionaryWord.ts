import Domain from "./domain";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {WordCategory, WordType} from "../enums/dictionaryEnums";

@Entity('CZECH_DICTIONARY')
export default class DictionaryWord extends Domain {

    @PrimaryGeneratedColumn()
    id? : number;

    @Column({name : "original", nullable : false})
    original? : string

    @Column({name : "transcription"})
    transcription? : string

    @Column({name : "translated"})
    translated? : string

    @Column({name : "category", enum : WordCategory, type : "enum", nullable : false})
    category? : WordCategory

    @Column({name : "type", enum : WordType, type : "enum", nullable : false})
    type? : WordType


    equals(another: DictionaryWord): boolean {
        return another.original?.toUpperCase() === this.original?.toUpperCase();
    }

}