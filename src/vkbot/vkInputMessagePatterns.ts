
export const VK_IN_WAKE_UP_REGEX : string = "^(Добби|ДОББИ|добби)$";
export const VK_IN_CHECK_PUBLIC_NOTICE_REGEX : string = "^(Добби сова:|ДОББИ СОВА:|добби сова:)\\s*((([a-zA-ZÀ-ž]+\\s)+)(([a-zA-ZÀ-ž]+\\s?)+))$"
export const VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP : number = 3;
export const VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP : number = 6;

export const VK_IN_CHECK_VISA_REGEX : string = "^(Добби Хогвартс:|ДОББИ ХОГВАРТС:|добби хогвартс:|Добби хогвартс:)\\s*(([A-Z]{4}[0-9]{9,})|((OAM|MV)-\\d*(-\\d*)?\\/[A-Z]+-\\d*))$";
export const VK_IN_CHECK_VISA_NUMBER_GROUP : number = 2;