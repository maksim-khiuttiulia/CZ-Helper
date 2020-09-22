import CzechDictionaryWord from "./czechDictionaryWord";
import {getConnection, Repository} from "typeorm";
import {WordCategory, WordType} from "./czechDictionaryEnums";
import {getRandomElement} from "../utils/collectionUtils";

class CzechDictionaryService {

    async getAllWords(category : WordCategory) : Promise<CzechDictionaryWord[]> {
        let repository : Repository<CzechDictionaryWord> = getConnection().getRepository(CzechDictionaryWord);
        return await repository.find({where: {category: category}})
    }

    async getRandomWord(type: WordType, category : WordCategory) : Promise<CzechDictionaryWord> {
        let repository : Repository<CzechDictionaryWord> = getConnection().getRepository(CzechDictionaryWord);
        let words : CzechDictionaryWord[] = await repository.find({where: {category: category, type : type}})
        return getRandomElement(words);
    }
}

export default new CzechDictionaryService()