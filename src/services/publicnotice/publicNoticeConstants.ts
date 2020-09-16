export const PUBLIC_NOTICE_URL : string = "https://www.mvcr.cz/verejne-vyhlasky-oamp.aspx";
export const PUBLIC_NOTICE_ARTICLE_URL_PREFIX : string = "https://www.mvcr.cz/";

export const NAME_LINE_REGEX : string = "(-\\s+)(([a-zA-ZÀ-ž]+\\s?)*)"; // Group 2
export const NAME_LINE_REGEX_GROUP : number = 2;
export const NOTICE_NUMBER_LINE_REGEX : string = "(OAM-)(\\d*)(-(\\d+))?\\/([A-Z]+)-(\\d*)"; // Full match
export const NOTICE_NUMBER_LINE_REGEX_GROUP : number = 0;

export const FIRST_AND_LAST_NAME_REGEX : string = "(([A-ZÀ-Ž][A-ZÀ-Ž]+\\s)+)(([A-ZÀ-Ž][a-zA-ZÀ-ž]+\\s?)+)"
export const FIRST_NAME_REGEX_GROUP : number = 1;
export const LAST_NAME_REGEX_GROUP : number = 3;