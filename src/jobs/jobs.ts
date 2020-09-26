import {schedule} from "node-cron";
import {UPDATE_APPLICATION_STATUSES, UPDATE_NOTICES_SCHEDULE} from "./jobsSchedules";
import Logger from "../logger/logger"
import PublicNoticeService from "../publicnotice/publicNoticeService"
import ApplicationStatusService from "../applicationstatus/applicationStatusService"

class Jobs {
    initUpdatePublicNotices() : void {
        Logger.logJob("Initializing initUpdatePublicNotices")
        schedule(UPDATE_NOTICES_SCHEDULE, () => {
            Logger.logJob("Public Notices will updated")
            PublicNoticeService.updateAllNotices().then(value => {
                Logger.logJob("Public Notices were updated");
            }).catch(reason => {
                Logger.logJob(reason);
            })
        })
    }

    initUpdateApplicationStatuses() : void {
        Logger.logJob("Initializing initUpdateApplicationStatuses")
        schedule(UPDATE_APPLICATION_STATUSES, () => {
            Logger.logJob("Application statuses will updated")
            ApplicationStatusService.updateAllApplicationStatuses().then(value => {
                Logger.logJob("Application statuses were updated");
            }).catch(reason => {
                Logger.logJob(reason);
            })
        })
    }
}

export default new Jobs();