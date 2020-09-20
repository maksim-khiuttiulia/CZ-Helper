export enum ButtonPayload {
    RANDOM_WORD= "randomWord",
    RANDOM_IN_SHOP_PHRASE = "randomInShopPhrase",
    RANDOM_IN_TRANSPORT_PHRASE = "randomInTransportPhrase",
    RANDOM_IN_CITY_PHRASE = "randomInCityPhrase",
    RANDOM_BASIC_PHRASE = "randomBasicPhrase",

    GO_TO_PHRASES = "goToPhases",
    GO_TO_MAIN_MENU = "goToMainMenu"
}

export enum VkApiMethod {
    SEND_MESSAGE= "messages.send",
    MARK_AS_READ = "messages.markAsRead"
}

export enum ButtonColor {
    GRAY = 'primary',
    SECONDARY = 'secondary',
    GREEN =  'positive',
    RED = 'negative'
}