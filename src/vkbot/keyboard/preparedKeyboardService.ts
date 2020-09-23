import {Keyboard} from "./vkKeyboardDataModel";
import VkKeyboardBuilder from "./vkKeyboardBuilder";
import {ButtonColor} from "./vkKeyboardEnums";
import {ButtonPayload} from "../vkbotEnums";


class PreparedKeyboardService {
    getBasicKeyboard() : Keyboard {
        let builder : VkKeyboardBuilder = new VkKeyboardBuilder();
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Слово", ButtonPayload.WORD_RANDOM_WORD)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Фразы", ButtonPayload.GO_TO_PHRASES)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Полезные контакты", ButtonPayload.GO_TO_INFO)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Виза и письма", ButtonPayload.MVCR_FUNCTIONS)
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

export default new PreparedKeyboardService();