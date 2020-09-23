import Logger from "../logger/logger";
import {getConnection, Repository} from "typeorm";
import ApplicationStatus from "./applicationStatus"
import ApplicationStatusPageParser from "./applicationStatusPageParser"
import {ApplicationStatusType} from "./applicationStatusType";

class ApplicationStatusService {

    async updateAllApplicationStatuses() : Promise<void> {
        Logger.logInfo("Start updating application status");
        let repository : Repository<ApplicationStatus> = getConnection().getRepository(ApplicationStatus);
        let fromDbStatuses : ApplicationStatus[] = await repository.find({finalValue : false})

        for (let status of fromDbStatuses){
            let statusFromWeb : ApplicationStatusType =  await ApplicationStatusPageParser.getApplicationStatus(status.applicationNumber);
            if (statusFromWeb == ApplicationStatusType.APPROVED || statusFromWeb == ApplicationStatusType.REJECTED){
                status.finalValue = true;
            }
            await repository.save(status);
            await this._notifyUser(status);
        }
    }

    async getVisaStatus(visaNumber : string) : Promise<ApplicationStatusType> {
        return await ApplicationStatusPageParser.getApplicationStatus(visaNumber);
    }

    private async _notifyUser(status : ApplicationStatus) : Promise<void> {

    }
}

export default new ApplicationStatusService()