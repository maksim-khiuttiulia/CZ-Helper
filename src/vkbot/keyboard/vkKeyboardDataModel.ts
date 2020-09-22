import {ButtonColor} from "./vkKeyboardEnums";
import {Payload} from "../payloads/vkBotPayloads";

export interface KeyboardButton {
    action: KeyboardButtonAction,
    color: ButtonColor
}

export interface KeyboardButtonAction {
    type: 'text',
    label: string,
    payload?: Payload
}

export interface Keyboard {
    one_time: boolean,
    buttons: KeyboardButton[][]
    inline: boolean
}