export const STATUS_APPROVED : string = "Decided – APPROVED";
export const STATUS_REJECTED : string = "Decided – REJECTED";
export const STATUS_IN_PROGRESS : string = "In Process";
export const STATUS_NOT_FOUND : string = "Not found";

export const FORM_URL : string = "https://frs.gov.cz/en/ioff/application-status";
export const FORM_NUMBER_SELECTOR_OAM : string = "#edit-ioff-application-number";
export const FORM_NUMBER_COUNT_SELECTOR_OAM : string = "#edit-ioff-application-number-fake";
export const FORM_CODE_SELECTOR_OAM : string = "#edit-ioff-application-code";
export const FORM_YEAR_SELECTOR_OAM : string = "#edit-ioff-application-year";


export const REGEX_STATUS_NUMBER_OAM : string = "(OAM-)(\\d*)(-(\\d+))?\\/([A-Z]+)-(\\d*)";
export const REGEX_GROUP_STATUS_NUMBER_OAM : number = 2;
export const REGEX_GROUP_STATUS_COUNT_NUMBER_OAM : number = 4;
export const REGEX_GROUP_STATUS_CODE_OAM : number = 5;
export const REGEX_GROUP_STATUS_YEAR_OAM : number = 6;

export const REGEX_STATUS_NUMBER_ZOV : string = "^[A-Z]{4}[0-9]{9,}$"
export const FORM_NUMBER_SELECTOR_ZOV : string = "#edit-ioff-zov";

export const FORM_SUBMIT_BUTTON : string = "#edit-submit-button";