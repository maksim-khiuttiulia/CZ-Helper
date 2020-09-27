import {Keyboard} from "./vkKeyboardDataModel";
import VkKeyboardBuilder from "./vkKeyboardBuilder";
import {ButtonPayload} from "./button/buttonPayloadType";
import {ButtonColor} from "./button/buttonColor";


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
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Аренда жилья и авто", ButtonPayload.INFO_RENT)
        builder.addLine()
        builder.addTextButton(ButtonColor.GREEN, "Билеты", ButtonPayload.INFO_TICKETS)
        builder.addTextButton(ButtonColor.GREEN, "Скидки", ButtonPayload.INFO_SALES_IN_SHOPS)
        builder.addLine()
        builder.addTextButton(ButtonColor.GREEN, "Tакси", ButtonPayload.INFO_TAXIS)
        builder.addTextButton(ButtonColor.GREEN, "Работа", ButtonPayload.INFO_JOBS)
        builder.addButtonTextOnLine(ButtonColor.GREEN, "Полезные приложения", ButtonPayload.INFO_APPLICATIONS)
        return builder.build(false, true);
    }

}

export default new PreparedKeyboardService();