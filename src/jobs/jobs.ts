import {schedule} from "node-cron";
import {UPDATE_NOTICES_SCHEDULE} from "./jobsSchedules";
import Logger from "../logger/logger"
import PublicNoticeService from "../publicnotice/publicNoticeService"

class Jobs {
    initUpdatePublicNotices() : void {
        Logger.logInfo("Initializing initUpdatePublicNotices")
        schedule(UPDATE_NOTICES_SCHEDULE, () => {
            PublicNoticeService.updateAllNotices().then(value => {
                Logger.logInfo("Public Notices was updated");
            }).catch(reason => {
                Logger.logError(reason);
            })
        })
    }
}

export default new Jobs();