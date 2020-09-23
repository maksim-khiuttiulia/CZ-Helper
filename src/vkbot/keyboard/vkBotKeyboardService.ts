import {ButtonPayload} from "../vkbotEnums";
import CzechDictionaryService from "../../czechdictionary/czechDictionaryService";
import {WordCategory, WordType} from "../../czechdictionary/czechDictionaryEnums";
import VkMessageService from "../messages/vkMessageService";
import CzechDictionaryWord from "../../czechdictionary/czechDictionaryWord";
import {VK_OUT_CHOOSE_CATEGORY, VK_OUT_MVCR_FUNCTIONS, VK_OUT_UNKNOWN_COMMAND} from "../messages/vkBotStaticMessage";
import {Keyboard} from "./vkKeyboardDataModel";
import PreparedKeyboardService from "./preparedKeyboardService"

class VkBotKeyboardService {


    processKeyboardInput(payload : ButtonPayload, peerId : number, groupId : number) : void {
        let keyboard : Keyboard = PreparedKeyboardService.getBasicKeyboard();
        if (payload === ButtonPayload.WORD_RANDOM_WORD) {
            CzechDictionaryService.getRandomWord(WordType.WORD,WordCategory.FUNNY).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, undefined, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.PHRASE_RANDOM_BASIC) {
            CzechDictionaryService.getRandomWord(WordType.PHRASE, WordCategory.BASIC).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, undefined, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.PHRASE_RANDOM_IN_CITY) {
            CzechDictionaryService.getRandomWord(WordType.PHRASE, WordCategory.IN_CITY).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, undefined, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.PHRASE_RANDOM_IN_TRANSPORT) {
            CzechDictionaryService.getRandomWord(WordType.PHRASE, WordCategory.IN_TRANSPORT).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, undefined, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.PHRASE_RANDOM_IN_SHOP) {
            CzechDictionaryService.getRandomWord(WordType.PHRASE, WordCategory.IN_SHOP).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, undefined, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.GO_TO_PHRASES){
            keyboard = PreparedKeyboardService.getPhraseKeyboard();
            VkMessageService.sendGroupMessage(peerId, groupId, VK_OUT_CHOOSE_CATEGORY.message, undefined, keyboard)
            return;
        }
        if (payload === ButtonPayload.GO_TO_INFO){
            keyboard = PreparedKeyboardService.getInformationKeyboard()
            VkMessageService.sendGroupMessage(peerId, groupId, VK_OUT_CHOOSE_CATEGORY.message, undefined, keyboard)
            return;
        }

        if (payload === ButtonPayload.MVCR_FUNCTIONS){
            VkMessageService.sendGroupMessage(peerId, groupId, VK_OUT_MVCR_FUNCTIONS.message, undefined, keyboard);
            return;
        }

        keyboard = PreparedKeyboardService.getBasicKeyboard();
        VkMessageService.sendGroupMessage(peerId, groupId, VK_OUT_UNKNOWN_COMMAND.message, VK_OUT_UNKNOWN_COMMAND.attachment, keyboard)
    }

    private _getFormattedWord(word : CzechDictionaryWord) : string {
        return word.original + " - " + word.transcription + " - " + word.translated;
    }
}

export default new VkBotKeyboardService()