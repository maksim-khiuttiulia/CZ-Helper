
export interface VkBotPayload {
    type : 'message_new' | 'message' | 'confirmation',
    secret? : string,
    object? : InputMessage,
    payload? : Payload,
    keyboard? : Keyboard
    group_id? : number,
}

export interface Payload {
    command? : 'start',
    button? : string
}

export interface InputMessage {
    id : number,
    date : number,
    out : number,
    user_id? : number,
    peer_id? : number,
    group_id? : number,
    read_state : number,
    title : string,
    body : string,
    text : string,
    payload : string // Fucking VK API
}

export interface Keyboard {
    one_time : boolean,
    buttons : KeyboardButton[][]
    inline : boolean
}

export interface KeyboardButton {
    action : KeyboardButtonAction,
    color : 'primary' | 'secondary' | 'negative' | 'positive'
}

export interface KeyboardButtonAction {
    type : 'text',
    label : string,
    payload? : Payload
}
