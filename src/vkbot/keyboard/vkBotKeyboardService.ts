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
import Logger from "../../logger/logger"

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
        let messageId : number = -1;
        if (payload === ButtonPayload.INFO_EMERGENCY_PHONES){
            messageId = VK_EMERGENCY_PHONES;

        } else if (payload === ButtonPayload.INFO_APPLICATIONS){
            messageId = VK_APPLICATIONS

        } else if (payload === ButtonPayload.INFO_SALES_IN_SHOPS){
            messageId = VK_SALES_IN_SHOPS

        } else if (payload === ButtonPayload.INFO_RENT){
            messageId = VK_FLAT_AND_AUTO_RENTS

        } else if (payload === ButtonPayload.INFO_TICKETS){
            messageId = VK_BUS_TRAIN_TICKETS

        } else if (payload === ButtonPayload.INFO_TAXIS){
            messageId = VK_TAXIS_SERVICES

        } else if (payload === ButtonPayload.INFO_JOBS){
            messageId = VK_JOBS
        }


        UserMessageService.getMessage(messageId).then(message => {
            VkMessageService.sendGroupMessage(peerId, groupId, message.message)
        }).catch(reason => {
            Logger.logError(reason);
            VkMessageService.sendErrorMessage(peerId, groupId);
        })


    }

    private _getFormattedWord(word : CzechDictionaryWord) : string {
        return word.original + " - " + word.transcription + " - " + word.translated;
    }
}

export default new VkBotKeyboardService()