import CzechDictionaryService from "../../czechdictionary/czechDictionaryService";
import {WordCategory, WordType} from "../../czechdictionary/czechDictionaryEnums";
import VkMessageService from "../messages/vkMessageService";
import CzechDictionaryWord from "../../czechdictionary/czechDictionaryWord";
import {VK_OUT_CHOOSE_CATEGORY, VK_OUT_MVCR_FUNCTIONS} from "../messages/vkBotStaticMessage";
import {Keyboard} from "./vkKeyboardDataModel";
import PreparedKeyboardService from "./preparedKeyboardService"
import {ButtonPayload} from "./button/buttonPayloadType";
import {isIn} from "../../utils/collectionUtils";
import {DICTIONARY_PAYLOADS, INFORMATION_PAYLOADS} from "./button/buttonPayloadCategory";
import UserMessageService from "../../usermessage/userMessageService";
import {
    VK_APPLICATIONS,
    VK_BUS_TRAIN_TICKETS,
    VK_EMERGENCY_PHONES,
    VK_FLAT_AND_AUTO_RENTS, VK_JOBS,
    VK_SALES_IN_SHOPS, VK_TAXIS_SERVICES
} from "../../usermessage/userMessageIds";

class VkBotKeyboardService {


    processKeyboardInput(payload : ButtonPayload, peerId : number, groupId : number) : void {
        let keyboard : Keyboard = PreparedKeyboardService.getBasicKeyboard();

        if (isIn(payload, DICTIONARY_PAYLOADS)){
            this._processDictionaryPayload(payload, peerId, groupId);
            return;
        }

        if (isIn(payload, INFORMATION_PAYLOADS)){
            this._processHelpContactPayload(payload, peerId, groupId);
            return;
        }

        if (payload === ButtonPayload.MVCR_FUNCTIONS){
            VkMessageService.sendGroupMessage(peerId, groupId, VK_OUT_MVCR_FUNCTIONS.message, undefined, keyboard);
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

        VkMessageService.sendUnknownCommandMessage(peerId, groupId)
    }

    private _processDictionaryPayload(payload : ButtonPayload, peerId : number, groupId : number) : void {
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

        VkMessageService.sendUnknownCommandMessage(peerId, groupId)
    }

    private _processHelpContactPayload(payload : ButtonPayload, peerId : number, groupId : number) : void {
        let contactText : string | undefined;
        if (payload === ButtonPayload.INFO_EMERGENCY_PHONES){
            UserMessageService.getMessage(VK_EMERGENCY_PHONES)
                .then(message =>{ contactText = message?.message; })

        } else if (payload === ButtonPayload.INFO_APPLICATIONS){
            UserMessageService.getMessage(VK_APPLICATIONS)
                .then(message =>{ contactText = message?.message; })

        } else if (payload === ButtonPayload.INFO_SALES_IN_SHOPS){
            UserMessageService.getMessage(VK_SALES_IN_SHOPS)
                .then(message =>{ contactText = message?.message; })

        } else if (payload === ButtonPayload.INFO_RENT){
            UserMessageService.getMessage(VK_FLAT_AND_AUTO_RENTS)
                .then(message =>{ contactText = message?.message; })

        } else if (payload === ButtonPayload.INFO_TICKETS){
            UserMessageService.getMessage(VK_BUS_TRAIN_TICKETS)
                .then(message =>{ contactText = message?.message; })

        } else if (payload === ButtonPayload.INFO_TAXIS){
            UserMessageService.getMessage(VK_TAXIS_SERVICES)
                .then(message =>{ contactText = message?.message; })

        } else if (payload === ButtonPayload.INFO_JOBS){
            UserMessageService.getMessage(VK_JOBS)
                .then(message =>{ contactText = message?.message; })
        }

        if (contactText === undefined){
            VkMessageService.sendErrorMessage(peerId, groupId);
        } else {
            VkMessageService.sendGroupMessage(peerId, groupId, contactText)
        }
    }

    private _getFormattedWord(word : CzechDictionaryWord) : string {
        return word.original + " - " + word.transcription + " - " + word.translated;
    }
}

export default new VkBotKeyboardService()