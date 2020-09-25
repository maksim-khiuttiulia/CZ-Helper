import {schedule} from "node-cron";
import {UPDATE_APPLICATION_STATUSES, UPDATE_NOTICES_SCHEDULE} from "./jobsSchedules";
import Logger from "../logger/logger"
import PublicNoticeService from "../publicnotice/publicNoticeService"

class Jobs {
    initUpdatePublicNotices() : void {
        Logger.logInfo("Initializing initUpdatePublicNotices")
        schedule(UPDATE_NOTICES_SCHEDULE, () => {
            Logger.logInfo("Public Notices will updated")
            PublicNoticeService.updateAllNotices().then(value => {
                Logger.logInfo("Public Notices were updated");
            }).catch(reason => {
                Logger.logError(reason);
            })
        })
    }

    initUpdateApplicationStatuses() : void {
        Logger.logInfo("Initializing initUpdateApplicationStatuses")
        schedule(UPDATE_APPLICATION_STATUSES, () => {
            Logger.logInfo("Application statuses will updated")
            PublicNoticeService.updateAllNotices().then(value => {
                Logger.logInfo("Application statuses were updated");
            }).catch(reason => {
                Logger.logError(reason);
            })
        })
    }
}

export default new Jobs();