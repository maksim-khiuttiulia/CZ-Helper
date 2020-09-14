import {Connection, getConnection, Repository} from "typeorm";
import PublicNoticePageParser from "./publicNoticePageParser"
import {PublicNotice} from "../../domain/publicNotice";

class PublicNoticeService {

    saveNotices() : void {
        let repository : Repository<PublicNotice> = getConnection().getRepository(PublicNotice);
        PublicNoticePageParser.readNotices().then((notices : PublicNotice[]) => {
            repository.save(notices).then(v => {

            });
        })
    }
}

export default new PublicNoticeService();