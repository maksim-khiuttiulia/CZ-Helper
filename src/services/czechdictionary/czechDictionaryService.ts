import DictionaryWord from "../../domain/dictionaryWord";
import {getConnection, Repository} from "typeorm";
import {WordCategory, WordType} from "../../enums/dictionaryEnums";
import {getRandomElement} from "../../utils/collectionUtils";

class CzechDictionaryService {

    async getAllWords(category : WordCategory) : Promise<DictionaryWord[]> {
        let repository : Repository<DictionaryWord> = getConnection().getRepository(DictionaryWord);
        return await repository.find({where: {category: category}})
    }

    async getRandomWord(type: WordType, category : WordCategory) : Promise<DictionaryWord> {
        let repository : Repository<DictionaryWord> = getConnection().getRepository(DictionaryWord);
        let words : DictionaryWord[] = await repository.find({where: {category: category, type : type}})
        return getRandomElement(words);
    }
}

export default new CzechDictionaryService()