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
            if (this._isFinalStatus(statusFromWeb)){
                status.finalValue = true;
            }
            if (statusFromWeb == ApplicationStatusType.UNKNOWN){
                status.finalValue = true;
            }
            await repository.save(status);
            await this._notifyUser(status);
        }
    }

    async getVisaStatus(visaNumber : string) : Promise<ApplicationStatusType> {
        try {
            let visaNumberUpperCase : string = visaNumber.toUpperCase().trim();
            let repository : Repository<ApplicationStatus> = getConnection().getRepository(ApplicationStatus);
            let applicationStatus : ApplicationStatus | undefined = await repository.findOne({applicationNumber : visaNumberUpperCase})
            if (applicationStatus){
                return await this._updateApplicationStatus(applicationStatus);
            } else {
                return await this.readNewApplicationStatus(visaNumberUpperCase);
            }
        } catch (e){
            Logger.logError(e);
            throw e;
        }

    }

    private async readNewApplicationStatus(visaNumber: string) {
        let repository : Repository<ApplicationStatus> = getConnection().getRepository(ApplicationStatus);
        let parsedApplicationStatus: ApplicationStatusType = await ApplicationStatusPageParser.getApplicationStatus(visaNumber);
        let applicationStatus: ApplicationStatus = new ApplicationStatus(visaNumber, parsedApplicationStatus);
        applicationStatus.finalValue = this._isFinalStatus(parsedApplicationStatus);

        if (parsedApplicationStatus == ApplicationStatusType.UNKNOWN){
            applicationStatus.finalValue = true;
        }

        await repository.save(applicationStatus);
        return parsedApplicationStatus;
    }

    private async _updateApplicationStatus(applicationStatus: ApplicationStatus) {
        let repository : Repository<ApplicationStatus> = getConnection().getRepository(ApplicationStatus);
        if (applicationStatus.finalValue) {
            return applicationStatus.status;
        } else {
            let parsedApplicationStatus: ApplicationStatusType = await ApplicationStatusPageParser.getApplicationStatus(applicationStatus.applicationNumber);
            applicationStatus.status = parsedApplicationStatus;

            if (this._isFinalStatus(parsedApplicationStatus)) {
                applicationStatus.finalValue = true;
            } else {
                applicationStatus.status = parsedApplicationStatus;
            }

            await repository.save(applicationStatus);
            return parsedApplicationStatus;
        }
    }

    private _isFinalStatus(status : ApplicationStatusType) : boolean {
        return status == ApplicationStatusType.APPROVED || status == ApplicationStatusType.REJECTED;
    }

    private async _notifyUser(status : ApplicationStatus) : Promise<void> {

    }
}

export default new ApplicationStatusService()