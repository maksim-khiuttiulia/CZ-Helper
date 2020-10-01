import ApplicationStatus from "./applicationStatus";
import {getConnection, Repository} from "typeorm";
import User from "../user/user";

class ApplicationStatusRepository {
    async saveApplicationStatus(applicationStatus : ApplicationStatus) : Promise<ApplicationStatus> {
        let repository: Repository<ApplicationStatus> = getConnection().getRepository(ApplicationStatus);
        applicationStatus = await repository.save(applicationStatus);

        for (let user of applicationStatus.owners){
            await repository.createQueryBuilder().relation(User, "_owners").of(user).execute()
        }

        return applicationStatus;
    }


    async readApplicationStatus(visaNumber: string): Promise<ApplicationStatus | undefined> {
        let visaNumberUpperCase: string = visaNumber.toUpperCase().trim();
        let repository: Repository<ApplicationStatus> = getConnection().getRepository(ApplicationStatus);
        return await repository.findOne({applicationNumber: visaNumberUpperCase}, {relations : ["_owners"]})
    }

}

export default new ApplicationStatusRepository();