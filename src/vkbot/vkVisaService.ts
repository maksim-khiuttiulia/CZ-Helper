import {Message} from "./payloads/vkBotPayloads";
import {isNotFullMatchInUpperCase} from "../utils/regexUtils";
import {
    VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP,
    VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP,
    VK_IN_CHECK_PUBLIC_NOTICE_REGEX
} from "./vkInputMessagePatterns";
import VkMessageService from "./messages/vkMessageService";
import PublicNoticeService from "../publicnotice/publicNoticeService";
import {
    VK_OUT_MVCR_EXISTS_PUBLIC_NOTICE,
    VK_OUT_MVCR_NO_EXISTS_PUBLIC_NOTICE,
    VkBotStaticMessage
} from "./messages/vkBotStaticMessage";
import {PublicNotice} from "../publicnotice/publicNotice";

class VkVisaService {


    processGetPublicNoticeMessage(inputMessage : Message) : void {
        if (isNotFullMatchInUpperCase(inputMessage.text, VK_IN_CHECK_PUBLIC_NOTICE_REGEX)){
            VkMessageService.sendWrongFormatMessage(inputMessage.peer_id, inputMessage.group_id);
            return;
        }
        let message = inputMessage.text
        const regex: RegExpMatchArray | null = message.match(VK_IN_CHECK_PUBLIC_NOTICE_REGEX);
        if (regex === null) {
            VkMessageService.sendWrongFormatMessage(inputMessage.peer_id, inputMessage.group_id);
            return;
        }
        let firstName: string = regex[VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP];
        let lastName : string = regex[VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP];

        PublicNoticeService.getActivePublicNotices(firstName, lastName).then(notices => {
            let message : VkBotStaticMessage = this._getFormattedMessagePublicNotice(notices);
            VkMessageService.sendGroupMessage(inputMessage.peer_id, inputMessage.group_id, message.message, message.attachment);
        })

    }

    private _getFormattedMessagePublicNotice(notices : PublicNotice[]) : VkBotStaticMessage{
        if (notices.length === 0) {
            return VK_OUT_MVCR_NO_EXISTS_PUBLIC_NOTICE;
        }

        let template : VkBotStaticMessage = VK_OUT_MVCR_EXISTS_PUBLIC_NOTICE;
        let message : string = template.message;
        let attachment : string | undefined = template.attachment;
        for (let notice of notices){
            message += "\n" + notice.url + "\n";
        }
        return {message: message, attachment : attachment};
    }
}

export default new VkVisaService()