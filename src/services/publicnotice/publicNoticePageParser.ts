import {PublicNotice} from "../../domain/publicNotice";
import PageLoader from "../../utils/pageLoader";
import BeautifulDom from "beautiful-dom";
import HTMLElementData from "beautiful-dom/dist/htmlelement";
import {NAME_LINE_SPLIT_CHAR, NOTICE_NUMBER_LINE_SPLIT_CHAR, PUBLIC_NOTICE_URL} from "./publicNoticeConstants";


class PublicNoticePageParser {

    public async readNotices() : Promise<PublicNotice[]> {
        let noticeArray : PublicNotice[] = [];

        let page : string = await PageLoader.loadPage(PUBLIC_NOTICE_URL);
        let dom : BeautifulDom = new BeautifulDom(page);
        let nextUrl : string = this.parseNextUrl(dom);

        while (nextUrl){
            let notices : PublicNotice[] = await this.parseNoticesOnPage(dom);
            noticeArray = noticeArray.concat(notices);
            page = await PageLoader.loadPage(nextUrl);
            dom = new BeautifulDom(page);
            nextUrl = this.parseNextUrl(dom);
        }

        let notices : PublicNotice[] = await this.parseNoticesOnPage(dom);
        noticeArray = noticeArray.concat(notices);

        return noticeArray;
    }

    public async parseNoticesOnPage(dom : BeautifulDom) : Promise<PublicNotice[]> {
        let noticeArray : PublicNotice[] = [];
        let articles : HTMLElementData[] = dom.getElementsByClassName('article');
        for (const article of articles){
            let name = this.parseNameLine(article);
            let noticeNumber = this.parseNoticeNumberLine(article);
            let notice : PublicNotice = new PublicNotice(name, noticeNumber);
            if (!name || !noticeNumber) {
                notice.valid = false;
            }

            noticeArray.push(notice);
        }
        return noticeArray;
    }

    private parseNameLine(element : HTMLElementData) : string {
        let name = '';
        let nameLine : HTMLElementData[] = element.getElementsByTagName('a');
        if (nameLine.length === 1) {
            let nameLineText : string = nameLine[0].innerText;
            let split : string[] = nameLineText.split(NAME_LINE_SPLIT_CHAR);
            if (split.length === 2){
                name = split[1].trim();
            }
        }
        return name;
    }

    private parseNoticeNumberLine(element : HTMLElementData) : string {
        let noticeNumber = '';
        let noticeNumberLine = element.getElementsByTagName('p');
        if (noticeNumberLine.length === 1) {
            let noticeNumberText : string = noticeNumberLine[0].innerText;
            let split : string[] = noticeNumberText.split(NOTICE_NUMBER_LINE_SPLIT_CHAR);
            if (split.length === 2){
                noticeNumber = NOTICE_NUMBER_LINE_SPLIT_CHAR + split[1].trim();
            }
            if (split.length > 2) {
                split = split.splice(0, 1);
                noticeNumber = NOTICE_NUMBER_LINE_SPLIT_CHAR + split.join('');
            }
        }
        return noticeNumber;
    }

    private parseNextUrl(dom : BeautifulDom) : string {
        let elements : HTMLElementData[] = dom.getElementsByClassName('next');
        if (elements.length === 0){
            return '';
        }
        let urlPart : string | null = elements[0].getAttribute('href');
        if (urlPart === null) {
            return '';
        }
        let splitResult = urlPart.split("?");
        if (splitResult.length !== 2){
            return ''
        }
        return PUBLIC_NOTICE_URL + "?" + splitResult[1];
    }

}

export default new PublicNoticePageParser();