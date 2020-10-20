export interface VkBotStaticMessage {
    message: string,
    messages?: string[]
    attachment?: string
}

export const VK_OUT_WELCOME_MESSAGE: VkBotStaticMessage = {
    message: "Привет! Я домашний эльф Добби. Я много чего умею. Если я буду нужен, напиши \"Добби\" и я приду :)",
    attachment: "photo-78133639_457241056"
}

export const VK_OUT_WAKE_UP_MESSAGE: VkBotStaticMessage = {
    message: "Добби пришел, чтобы помочь",
    attachment: "photo-78133639_457241057"
}

export const VK_OUT_WAIT: VkBotStaticMessage = {
    message: "",
    attachment : "photo-78133639_457241063"
}

export const VK_OUT_ERROR: VkBotStaticMessage = {
    message: "Упс, что то случилось, что то очень темное, сообщи об ошибке моему хозяину",
    attachment: "photo-78133639_457241055"
}

export const VK_OUT_UNKNOWN_COMMAND: VkBotStaticMessage = {
    message: "",
    attachment: "photo-78133639_457241061"
}

export const VK_OUT_WRONG_FORMAT: VkBotStaticMessage = {
    message: "",
    attachment: "photo-78133639_457241062"
}

export const VK_OUT_CHOOSE_CATEGORY: VkBotStaticMessage = {
    message: "Выберите категорию",
    attachment : "photo-78133639_457241069"
}

export const VK_OUT_MVCR_FUNCTIONS: VkBotStaticMessage = {
    message: "Добби сова: ИМЯ ФАМИЛИЯ\" ( Латиницей ) - проверка писем из минестерства магии\n" +
        "\"Добби Хогвартс: ABCD123456789\" или \n \"Добби хогвартс: OAM-12345/CC-YYYY\" \n - состояние билета в Хогвартс\n" +
        "Добби еще учится и может ошибаться",
    attachment: "photo-78133639_457241060"
}

export const VK_OUT_CHANGE_NAME: VkBotStaticMessage = {
    message: "Я сменил твои имя и фамилию на: {0} {1}"
}

export const VK_OUT_MVCR_EXISTS_PUBLIC_NOTICE: VkBotStaticMessage = {
    message: "Для тебя письмо!",
    attachment: "photo-78133639_457241066"
}

export const VK_OUT_MVCR_NO_EXISTS_PUBLIC_NOTICE: VkBotStaticMessage = {
    message: "",
    attachment: "photo-78133639_457241065"
}

export const VK_OUT_MVCR_VISA_APPROVED: VkBotStaticMessage = {
    message: "",
    attachment: "photo-78133639_457241068"
}

export const VK_OUT_MVCR_VISA_REJECTED: VkBotStaticMessage = {
    message: "",
    attachment: "photo-78133639_457241059"
}

export const VK_OUT_MVCR_VISA_IN_PROGRESS: VkBotStaticMessage = {
    message: "",
    attachment: "photo-78133639_457241070"
}

export const VK_OUT_MVCR_VISA_NOT_FOUND: VkBotStaticMessage = {
    message: "",
    attachment: "photo-78133639_457241064"
}