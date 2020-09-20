import {Keyboard} from "./vkBotPayloads";

export interface VkApiPayload {
    access_token? : string,
    v? : string
}

export interface VkMessagePayload extends VkApiPayload {
    peer_id? : number,
    group_id? : number,
    random_id : number,
    message : string
    keyboard? : Keyboard
}