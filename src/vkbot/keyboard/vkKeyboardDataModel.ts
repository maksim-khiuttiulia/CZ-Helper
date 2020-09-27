import {Payload} from "../payloads/vkBotPayloads";
import {ButtonColor} from "./button/buttonColor";

export interface KeyboardButton {
    action: KeyboardButtonAction,
    color: ButtonColor
}

export interface KeyboardButtonAction {
    type: 'text' | 'callback',
    label: string,
    payload?: Payload
}

export interface Keyboard {
    one_time: boolean,
    buttons: KeyboardButton[][]
    inline: boolean
}