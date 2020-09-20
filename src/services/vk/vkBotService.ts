import {InputMessage, Keyboard, Payload, VkBotPayload} from "../../payloads/vkBotPayloads";
import Logger from "../logger/logger"
import VkMessageService from "../../services/vk/vkMessageService"
import CzechDictionaryService from "../../services/czechdictionary/czechDictionaryService"
import {WordCategory, WordType} from "../../enums/dictionaryEnums";
import KeyboardBuilder from "./KeyboardBuilder";
import {ButtonColor, ButtonPayload} from "../../enums/vkbotEnums";
import DictionaryWord from "../../domain/dictionaryWord";

const VK_SERVER_CONFIRMATION : string = String(process.env.VK_SERVER_CONFIRMATION);

class VkBotService {

    processInputMessage(botPayload : VkBotPayload) : string {
        this.processMainScreen(botPayload);

        if (botPayload.type === "confirmation"){
            return VK_SERVER_CONFIRMATION;
        } else {
            return "ok";
        }
    }

    private processMainScreen(botPayload : VkBotPayload) : void {
        const peerId : number | undefined = botPayload.object?.peer_id
        const groupId : number | undefined = botPayload.group_id

        if (!peerId || !groupId){
            Logger.logError("Peer_id or group_id not exists")
            return;
        }
        if (botPayload.object?.payload){
            this._markAsRead(botPayload.object)
            this._processMessagePayload(botPayload.object);
            return;
        }
    }

    private _processMessagePayload(inputMessage : InputMessage) : void {
        Logger.logInfo(inputMessage);
        let payload : Payload = JSON.parse(inputMessage.payload);
        let keyboard : Keyboard = this._getBasicKeyboard();
        let peerId : number = inputMessage.peer_id;
        let groupId : number =inputMessage.group_id;

        if (payload.button) {
            this._processKeyboardInput(payload.button, peerId, groupId);
            return;
        }

        if (payload.command === "start"){
            let message = "Добрый день, я бот! Я соблюдаю первый закон робототехники (иногда)"
            VkMessageService.sendGroupMessage(inputMessage.peer_id, inputMessage.group_id, message, keyboard)
            return;
        }

        VkMessageService.sendGroupMessage(inputMessage.peer_id, inputMessage.group_id, "Упс, неизвестная команда", keyboard)
    }

    private _markAsRead(message : InputMessage) : void {
        VkMessageService.markAsRead(message.peer_id, message.group_id);
    }


    private _processKeyboardInput(payload : ButtonPayload, peerId : number, groupId : number) : void {
        let keyboard : Keyboard = this._getBasicKeyboard();
        if (payload === ButtonPayload.RANDOM_WORD) {
            CzechDictionaryService.getRandomWord(WordType.WORD,WordCategory.FUNNY).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.RANDOM_BASIC_PHRASE) {
            CzechDictionaryService.getRandomWord(WordType.PHRASE, WordCategory.BASIC).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.RANDOM_IN_CITY_PHRASE) {
            CzechDictionaryService.getRandomWord(WordType.PHRASE, WordCategory.IN_CITY).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.RANDOM_IN_TRANSPORT_PHRASE) {
            CzechDictionaryService.getRandomWord(WordType.PHRASE, WordCategory.IN_TRANSPORT).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.RANDOM_IN_SHOP_PHRASE) {
            CzechDictionaryService.getRandomWord(WordType.PHRASE, WordCategory.IN_SHOP).then(word => {
                let message = this._getFormattedWord(word);
                VkMessageService.sendGroupMessage(peerId, groupId, message, keyboard)
            })
            return;
        }

        if (payload === ButtonPayload.GO_TO_PHRASES){
            keyboard = this._getPhraseKeyboard();
            VkMessageService.sendGroupMessage(peerId, groupId, "Выберите категорию", keyboard)
            return;
        }


        keyboard = this._getBasicKeyboard();
        VkMessageService.sendGroupMessage(peerId, groupId, "Упс, неизвестная команда", keyboard)
    }

    private _getFormattedWord(word : DictionaryWord) : string {
        return word.original + " - " + word.transcription + " - " + word.translated;
    }

    private _getBasicKeyboard() : Keyboard {
        let builder : KeyboardBuilder = new KeyboardBuilder();
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Слово", ButtonPayload.RANDOM_WORD)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Фразы", ButtonPayload.GO_TO_PHRASES)
        return builder.build(false, false);
    }

    private _getPhraseKeyboard() : Keyboard {
        let builder : KeyboardBuilder = new KeyboardBuilder();
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Базовые", ButtonPayload.RANDOM_BASIC_PHRASE)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "В магазине", ButtonPayload.RANDOM_IN_SHOP_PHRASE)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "В транспорте", ButtonPayload.RANDOM_IN_TRANSPORT_PHRASE)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "В городе", ButtonPayload.RANDOM_IN_CITY_PHRASE)
        return builder.build(false, true);
    }

}

export default new VkBotService();