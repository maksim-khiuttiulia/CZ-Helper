import PublicNotice from "../publicnotice/publicNotice";
import VkMessageService from "./messages/vkMessageService";
import PublicNoticeService from "../publicnotice/publicNoticeService";
import ApplicationStatusVisa from "../applicationstatus/applicationStatusService"

import {Message} from "./payloads/vkBotPayloads";
import {
    VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP,
    VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP,
    VK_IN_CHECK_PUBLIC_NOTICE_REGEX,
    VK_IN_CHECK_VISA_NUMBER_GROUP,
    VK_IN_CHECK_VISA_REGEX
} from "./vkInputMessagePatterns";

import {
    VK_OUT_ERROR,
    VK_OUT_MVCR_EXISTS_PUBLIC_NOTICE,
    VK_OUT_MVCR_NO_EXISTS_PUBLIC_NOTICE,
    VK_OUT_MVCR_VISA_APPROVED,
    VK_OUT_MVCR_VISA_IN_PROGRESS, VK_OUT_MVCR_VISA_NOT_FOUND,
    VK_OUT_MVCR_VISA_REJECTED, VK_OUT_WRONG_FORMAT,
    VkBotStaticMessage
} from "./messages/vkBotStaticMessage";
import {ApplicationStatusType} from "../applicationstatus/applicationStatusType";


class VkVisaService {


    processGetPublicNoticeMessage(inputMessage : Message) : void {
        let message = inputMessage.text.trim()
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

    processGetVisaStatus(inputMessage : Message) : void {
        let message = inputMessage.text.trim()
        const regex: RegExpMatchArray | null = message.match(VK_IN_CHECK_VISA_REGEX);
        if (regex === null) {
            VkMessageService.sendWrongFormatMessage(inputMessage.peer_id, inputMessage.group_id);
            return;
        }
        let visaNumber : string = regex[VK_IN_CHECK_VISA_NUMBER_GROUP];

        VkMessageService.sendWaitMessage(inputMessage.peer_id, inputMessage.group_id);

        ApplicationStatusVisa.getVisaStatus(visaNumber).then(status => {
            let message = this._getFormattedMessageVisaStatus(status);
            VkMessageService.sendGroupMessage(inputMessage.peer_id, inputMessage.group_id, message.message, message.attachment)
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

    private _getFormattedMessageVisaStatus(status : ApplicationStatusType) : VkBotStaticMessage {
        if (status == ApplicationStatusType.APPROVED){
            return VK_OUT_MVCR_VISA_APPROVED;
        }

        if (status == ApplicationStatusType.REJECTED){
            return VK_OUT_MVCR_VISA_REJECTED;
        }

        if (status == ApplicationStatusType.IN_PROGRESS){
            return VK_OUT_MVCR_VISA_IN_PROGRESS;
        }

        if (status == ApplicationStatusType.NOT_FOUND){
            return VK_OUT_MVCR_VISA_NOT_FOUND;
        }

        return VK_OUT_ERROR;
    }
}

export default new VkVisaService()