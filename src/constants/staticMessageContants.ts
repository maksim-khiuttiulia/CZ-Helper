export interface StaticMessage {
    message : string,
    messages? : string[]
    attachment? : string
}

export const VK_WELCOME_MESSAGE_RU : StaticMessage = {
    message : "Привет! Я домашний эльф Добби. Я много чего умею. Если я буду нужен, напиши \"Добби помоги\" и я приду :)",
    attachment : "photo-78133639_457241049"
}

export const VK_WAKE_UP_PHRASE_MESSAGE_RU : StaticMessage = {
    message : "Добби"
}

export const VK_WAKE_UP_MESSAGE_RU : StaticMessage = {
    message : "Добби пришел, чтобы помочь",
    attachment : "photo-78133639_457241049"
}

export const VK_UNKNOWN_COMMAND : StaticMessage = {
    message : "Упс, неизвестное заклинание",
    attachment : "photo-78133639_457241050"
}

export const VK_CHOOSE_CATEGORY : StaticMessage = {
    message : "Выберите категорию"
}

