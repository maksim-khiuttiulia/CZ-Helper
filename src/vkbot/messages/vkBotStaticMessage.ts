export interface VkBotStaticMessage {
    message : string,
    messages? : string[]
    attachment? : string
}

export const VK_OUT_WELCOME_MESSAGE_RU : VkBotStaticMessage = {
    message : "Привет! Я домашний эльф Добби. Я много чего умею. Если я буду нужен, напиши \"Добби помоги\" и я приду :)",
    attachment : "photo-78133639_457241049"
}

export const VK_OUT_WAKE_UP_MESSAGE_RU : VkBotStaticMessage = {
    message : "Добби пришел, чтобы помочь",
    attachment : "photo-78133639_457241049"
}

export const VK_OUT_UNKNOWN_COMMAND : VkBotStaticMessage = {
    message : "Упс, неизвестное заклинание",
    attachment : "photo-78133639_457241050"
}

export const VK_OUT_WRONG_FORMAT : VkBotStaticMessage = {
    message : "Упс, неверный формат",
    attachment : "photo-78133639_457241050"
}

export const VK_OUT_CHOOSE_CATEGORY : VkBotStaticMessage = {
    message : "Выберите категорию"
}

export const VK_OUT_MVCR_FUNCTIONS : VkBotStaticMessage = {
    message : "Вот что я умею:\n" +
        "\"Добби сова: ИМЯ ФАМИЛИЯ\" - проверка писем из минестерства магии\n" +
        "\"Добби хогвартс: ABCD123456789\" - состояние билета в Хогвартс\n" +
        "\"Добби хогсмит: OAM-12345/CC-YYYY\" - состояние билета в Хогсмит\n",
    attachment : "photo-78133639_457241051"
}

export const VK_OUT_MVCR_EXISTS_PUBLIC_NOTICE: VkBotStaticMessage = {
    message : "Для тебя письмо!",
    attachment : "photo-78133639_457241052"
}

export const VK_OUT_MVCR_NO_EXISTS_PUBLIC_NOTICE: VkBotStaticMessage = {
    message : "Для тебя писем нет!",
    attachment : "photo-78133639_457241050"
}

