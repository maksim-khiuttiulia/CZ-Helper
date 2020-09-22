import {ButtonPayload} from "../vkbotEnums";
import {Keyboard} from "../keyboard/vkKeyboardDataModel";

export interface VkBotPayload {
    type : 'message_new' | 'message' | 'confirmation',
    secret? : string,
    object : Message,
    keyboard? : Keyboard
    group_id? : number,
}

export interface Payload {
    command? : 'start',
    button? : ButtonPayload
}

export interface Message {
    id : number,
    date : number,
    out : number,
    user_id? : number,
    peer_id : number,
    group_id : number,
    read_state : number,
    title : string,
    body : string,
    text : string,
    payload : string // Fucking VK API
}

