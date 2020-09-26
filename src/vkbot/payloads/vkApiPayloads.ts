import {Keyboard} from "../keyboard/vkKeyboardDataModel";

export interface VkApiPayload {
    access_token? : string,
    v? : string
}

export interface VkMessagePayload extends VkApiPayload {
    peer_id? : number,
    group_id? : number,
    random_id : number,
    message : string
    attachment? : string,
    sticker_id? : number,
    keyboard? : Keyboard
}

export interface VkMarkAsReadPayload extends VkApiPayload {
    peer_id? : number,
    group_id? : number,
    mark_conversation_as_read : number
}

export interface VkUsersPayload extends VkApiPayload {
    user_ids : string,
    fields : string
}