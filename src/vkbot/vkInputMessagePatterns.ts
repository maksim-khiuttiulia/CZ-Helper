
export const VK_IN_MESSAGE_PREFIX_REGEX = "^ДОББИ"

export const VK_IN_WAKE_UP_REGEX : string = "^ДОББИ$";
export const VK_IN_CHECK_PUBLIC_NOTICE_REGEX : string = "^(ДОББИ СОВА:)\\s*((([a-zA-ZÀ-ž]+\\s)+)(([a-zA-ZÀ-ž]+\\s?)+))$"
export const VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP : number = 3;
export const VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP : number = 6;

export const VK_IN_CHECK_VISA_REGEX : string = "^(ДОББИ ХОГВАРТС)\\s*(([A-Z]{4}[0-9]{9,})|((OAM|MV)-\\d*(-\\d*)?\\/[A-Z]+-\\d*))$";
export const VK_IN_CHECK_VISA_NUMBER_GROUP : number = 2;