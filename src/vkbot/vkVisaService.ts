import PublicNotice from "../publicnotice/publicNotice";
import VkMessageService from "./messages/vkMessageService";
import PublicNoticeService from "../publicnotice/publicNoticeService";
import ApplicationStatusVisa from "../applicationstatus/applicationStatusService"
import UserService from "../user/userService"
import Logger from "../logger/logger"


import {NewMessage} from "./payloads/vkBotPayloads";
import {
    VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP,
    VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP,
    VK_IN_CHECK_PUBLIC_NOTICE_REGEX,
    VK_IN_CHECK_VISA_NUMBER_GROUP,
    VK_IN_CHECK_VISA_REGEX
} from "./vkInputMessagePatterns";

import {
    VK_OUT_CHANGE_NAME,
    VK_OUT_ERROR,
    VK_OUT_MVCR_EXISTS_PUBLIC_NOTICE,
    VK_OUT_MVCR_NO_EXISTS_PUBLIC_NOTICE,
    VK_OUT_MVCR_VISA_APPROVED,
    VK_OUT_MVCR_VISA_IN_PROGRESS,
    VK_OUT_MVCR_VISA_NOT_FOUND,
    VK_OUT_MVCR_VISA_REJECTED,
    VkBotStaticMessage
} from "./messages/vkBotStaticMessage";
import {ApplicationStatusType} from "../applicationstatus/applicationStatusType";
import User from "../user/user";
import {fillString} from "../utils/stringUtils";


class VkVisaService {


    processGetPublicNoticeMessage(inputMessage : NewMessage, user : User) : void {
        let message = inputMessage.text.trim().toUpperCase()
        const regex: RegExpMatchArray | null = message.match(VK_IN_CHECK_PUBLIC_NOTICE_REGEX);
        if (regex === null) {
            VkMessageService.sendWrongFormatMessage(inputMessage.peer_id, inputMessage.group_id);
            return;
        }
        let firstName: string = regex[VK_IN_CHECK_PUBLIC_NOTICE_FIRST_NAME_GROUP];
        let lastName : string = regex[VK_IN_CHECK_PUBLIC_NOTICE_LAST_NAME_NAME_GROUP];

        if (user.latLastName !== lastName && user.latFirstName != lastName) {
            user.latLastName = lastName;
            user.latFirstName = firstName;
            UserService.saveUser(user).then(user => {
                let message = VK_OUT_CHANGE_NAME.message;
                message = fillString(message, user.latFirstName ,user.latLastName)
                VkMessageService.sendMessage(inputMessage.peer_id, inputMessage.group_id, message);
            }).catch(reason => {
                Logger.logError(reason);
            })
        }

        PublicNoticeService.getActivePublicNotices(firstName, lastName).then(notices => {
            let message : VkBotStaticMessage = this._getFormattedMessagePublicNotice(notices);
            VkMessageService.sendMessage(inputMessage.peer_id, inputMessage.group_id, message.message, message.attachment);
        }).catch(reason => {
            Logger.logError(reason);
            VkMessageService.sendMessage(inputMessage.peer_id, inputMessage.group_id, VK_OUT_ERROR.message, VK_OUT_ERROR.attachment)
        })
    }

    processGetVisaStatus(inputMessage : NewMessage, user : User) : void {
        let message = inputMessage.text.trim().toUpperCase()
        const regex: RegExpMatchArray | null = message.match(VK_IN_CHECK_VISA_REGEX);
        if (regex === null) {
            VkMessageService.sendWrongFormatMessage(inputMessage.peer_id, inputMessage.group_id);
            return;
        }
        let visaNumber : string = regex[VK_IN_CHECK_VISA_NUMBER_GROUP];

        VkMessageService.sendWaitMessage(inputMessage.peer_id, inputMessage.group_id);

        ApplicationStatusVisa.getApplicationStatus(visaNumber, user).then(status => {
            let message = this._getFormattedMessageVisaStatus(status.status);
            VkMessageService.sendMessage(inputMessage.peer_id, inputMessage.group_id, message.message, message.attachment)
        }).catch(reason => {
            Logger.logError(reason);
            VkMessageService.sendMessage(inputMessage.peer_id, inputMessage.group_id, VK_OUT_ERROR.message, VK_OUT_ERROR.attachment)
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