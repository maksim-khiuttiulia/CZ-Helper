export const STATUS_APPROVED : string = "Decided – APPROVED";
export const STATUS_REJECTED : string = "Decided – REJECTED";
export const STATUS_IN_PROGRESS : string = "In Process";
export const STATUS_NOT_FOUND : string = "Not found";

export const FORM_URL : string = "https://frs.gov.cz/en/ioff/application-status";
export const FORM_NUMBER_SELECTOR : string = "#edit-ioff-application-number";
export const FORM_NUMBER_COUNT_SELECTOR : string = "#edit-ioff-application-number-fake";
export const FORM_CODE_SELECTOR : string = "#edit-ioff-application-code";
export const FORM_YEAR_SELECTOR : string = "#edit-ioff-application-year";
export const FORM_SUBMIT_BUTTON : string = "#edit-submit-button";

export const REGEX_STATUS_NUMBER : string = "(OAM-)(\\d*)(-(\\d+))?\\/([A-Z]+)-(\\d*)";
export const REGEX_GROUP_STATUS_NUMBER : number = 2;
export const REGEX_GROUP_STATUS_COUNT_NUMBER : number = 4;
export const REGEX_GROUP_STATUS_CODE : number = 5;
export const REGEX_GROUP_STATUS_YEAR : number = 6;