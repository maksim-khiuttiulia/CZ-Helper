import Logger from "../logger/logger";
import {getConnection, Repository} from "typeorm";
import ApplicationStatus from "./applicationStatus"
import ApplicationStatusPageParser from "./applicationStatusPageParser"
import {ApplicationStatusType} from "./applicationStatusType";
import ApplicationStatusRepository from "./applicationStatusRepository"
import User from "../user/user";
import {isNotInDomainsCollection} from "../utils/collectionUtils";

class ApplicationStatusService {

    async updateAllApplicationStatuses(): Promise<void> {
        Logger.logInfo("Start updating application status");
        let repository: Repository<ApplicationStatus> = getConnection().getRepository(ApplicationStatus);
        let fromDbStatuses: ApplicationStatus[] = await repository.find({finalValue: false})

        for (let status of fromDbStatuses) {
            Logger.logInfo("Updating application status " + status.applicationNumber)
            let statusFromWeb: ApplicationStatusType = await ApplicationStatusPageParser.getApplicationStatus(status.applicationNumber);
            status.status = statusFromWeb;
            status.finalValue = this._isFinalStatus(statusFromWeb);

            await ApplicationStatusRepository.saveApplicationStatus(status);
            Logger.logInfo("Application status updated " + status.applicationNumber)
        }
        Logger.logInfo("End updating application status");
    }

    async getApplicationStatus(number : string, user? : User) : Promise<ApplicationStatus> {
        let applicationStatus : ApplicationStatus | undefined = await ApplicationStatusRepository.readApplicationStatus(number);
        if (applicationStatus === undefined) {
            applicationStatus = await this._readNewApplicationStatus(number);
        }
        if (user !== undefined && isNotInDomainsCollection(user, applicationStatus.owners)) {
            applicationStatus.owners.push(user);
        }
        return await ApplicationStatusRepository.saveApplicationStatus(applicationStatus);
    }

    private async _readNewApplicationStatus(visaNumber: string) : Promise<ApplicationStatus> {
        let parsedApplicationStatus: ApplicationStatusType = await ApplicationStatusPageParser.getApplicationStatus(visaNumber);
        let applicationStatus: ApplicationStatus = new ApplicationStatus(visaNumber, parsedApplicationStatus);
        applicationStatus.finalValue = this._isFinalStatus(parsedApplicationStatus);
        return applicationStatus
    }



    private async _notifyUser(status: ApplicationStatus): Promise<void> {

    }

    private _isFinalStatus(status: ApplicationStatusType): boolean {
        return status == ApplicationStatusType.APPROVED || status == ApplicationStatusType.REJECTED || status === ApplicationStatusType.UNKNOWN;
    }

}

export default new ApplicationStatusService()