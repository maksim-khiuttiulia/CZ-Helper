import {Keyboard, KeyboardButton} from "./vkKeyboardDataModel";
import {ButtonPayload} from "./button/buttonPayloadType";
import {ButtonColor} from "./button/buttonColor";


class VkKeyboardBuilder {
    private _buttonsLines : KeyboardButton[][] = []
    private _currentLine : number = -1

    addTextButton(color : ButtonColor, label : string, payload : ButtonPayload) : void{
        let button : KeyboardButton = {
            color : color,
            action : {
                type : 'text',
                label : label,
                payload : {
                    button : payload
                }
            }
        }
        if (this._currentLine == -1){
            this._buttonsLines.push([]);
            this._currentLine = 0;
        }
        this._buttonsLines[this._currentLine].push(button);
    }

    addLine() : void {
        this._currentLine++;
        this._buttonsLines.push([]);
    }

    addButtonTextOnLine(color : ButtonColor, label : string, payload : ButtonPayload) : void {
        this.addLine();
        this.addTextButton(color, label, payload);
    }

    build(oneTime : boolean, inline : boolean) : Keyboard {
        return {one_time: oneTime, inline: inline, buttons: this._buttonsLines}
    }

}

export default VkKeyboardBuilder