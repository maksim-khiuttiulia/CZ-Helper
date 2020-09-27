import {ButtonPayload} from "./buttonPayloadType";

export const DICTIONARY_PAYLOADS: ButtonPayload[] = [
    ButtonPayload.WORD_RANDOM_WORD,
    ButtonPayload.PHRASE_RANDOM_BASIC,
    ButtonPayload.PHRASE_RANDOM_IN_CITY,
    ButtonPayload.PHRASE_RANDOM_IN_SHOP,
    ButtonPayload.PHRASE_RANDOM_IN_TRANSPORT
]
export const INFORMATION_PAYLOADS: ButtonPayload[] = [
    ButtonPayload.INFO_JOBS,
    ButtonPayload.INFO_TAXIS,
    ButtonPayload.INFO_TICKETS,
    ButtonPayload.INFO_RENT,
    ButtonPayload.INFO_SALES_IN_SHOPS,
    ButtonPayload.INFO_APPLICATIONS,
    ButtonPayload.INFO_EMERGENCY_PHONES,
]