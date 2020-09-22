import {ButtonPayload} from "../vkbotEnums";
import CzechDictionaryService from "../../czechdictionary/czechDictionaryService";
import {WordCategory, WordType} from "../../czechdictionary/czechDictionaryEnums";
import VkMessageService from "../messages/vkMessageService";
import CzechDictionaryWord from "../../czechdictionary/czechDictionaryWord";
import VkKeyboardBuilder from "./vkKeyboardBuilder";
import {VK_CHOOSE_CATEGORY, VK_UNKNOWN_COMMAND} from "../messages/staticMessage";
import {ButtonColor} from "./vkKeyboardEnums";
import {Keyboard} from "./vkKeyboardDataModel";

class VkBotKeyboardService {


    processKeyboardInput(payload : ButtonPayload, peerId : number, groupId : number) : void {
        let keyboard : Keyboard = this.getBasicKeyboard();
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
            keyboard = this.getPhraseKeyboard();
            VkMessageService.sendGroupMessage(peerId, groupId, VK_CHOOSE_CATEGORY.message, undefined, keyboard)
            return;
        }
        if (payload === ButtonPayload.GO_TO_INFO){
            keyboard = this.getInformationKeyboard()
            VkMessageService.sendGroupMessage(peerId, groupId, VK_CHOOSE_CATEGORY.message, undefined, keyboard)
            return;
        }



        keyboard = this.getBasicKeyboard();
        VkMessageService.sendGroupMessage(peerId, groupId, VK_UNKNOWN_COMMAND.message, VK_UNKNOWN_COMMAND.attachment, keyboard)
    }

    private _getFormattedWord(word : CzechDictionaryWord) : string {
        return word.original + " - " + word.transcription + " - " + word.translated;
    }

    getBasicKeyboard() : Keyboard {
        let builder : VkKeyboardBuilder = new VkKeyboardBuilder();
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Слово", ButtonPayload.WORD_RANDOM_WORD)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Фразы", ButtonPayload.GO_TO_PHRASES)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Полезные контакты", ButtonPayload.GO_TO_INFO)
        return builder.build(false, false);
    }

    getPhraseKeyboard() : Keyboard {
        let builder : VkKeyboardBuilder = new VkKeyboardBuilder();
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Базовые", ButtonPayload.PHRASE_RANDOM_BASIC)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "В магазине", ButtonPayload.PHRASE_RANDOM_IN_SHOP)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "В транспорте", ButtonPayload.PHRASE_RANDOM_IN_TRANSPORT)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "В городе", ButtonPayload.PHRASE_RANDOM_IN_CITY)
        return builder.build(false, true);
    }

    getInformationKeyboard() : Keyboard {
        let builder : VkKeyboardBuilder = new VkKeyboardBuilder();
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Экстренные телефоны", ButtonPayload.INFO_EMERGENCY_PHONES)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Скидки и цены", ButtonPayload.INFO_SALES_IN_SHOPS)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Аренда жилья и авто", ButtonPayload.INFO_RENT)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Билеты на автобусы и поезда", ButtonPayload.INFO_TICKETS)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Службы такси", ButtonPayload.INFO_TAXIS)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Поиск работы", ButtonPayload.INFO_JOBS)
        return builder.build(false, true);
    }
}

export default new VkBotKeyboardService()