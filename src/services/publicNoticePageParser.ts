import {PublicNotice} from "../domain/publicNotice";
import PageLoader from "../services/pageLoader";
import BeautifulDom from "beautiful-dom";
import HTMLElementData from "beautiful-dom/dist/htmlelement";


class PublicNoticePageParser {

    public async readNoticesOnPage(url : string) : Promise<PublicNotice[]> {
        let page : string = await PageLoader.loadPage(url);
        const dom : BeautifulDom = new BeautifulDom(page);
        let articles : HTMLElementData[] = dom.getElementsByClassName('article');
        for (const article of articles){
            let name = this.parseNameLine(article);
            let noticeNumber = this.parseNoticeNumberLine(article);
            console.warn(name, " ", noticeNumber)
        }
        return [];
    }

    private parseNameLine(element : HTMLElementData) : string {
        let name = '';
        let nameLine = element.getElementsByTagName('a');
        if (nameLine.length === 1) {
            let nameLineText : string = nameLine[0].innerText;
            let splitResult = nameLineText.split('- ');
            if (splitResult.length === 2){
                name = splitResult[1].trim();
            }
        }
        return name;
    }

    private parseNoticeNumberLine(element : HTMLElementData) : string {
        let noticeNumber = '';
        let noticeNumberLine = element.getElementsByTagName('p');
        if (noticeNumberLine.length === 1) {
            let noticeNumberText : string = noticeNumberLine[0].innerText;
            let splitResult = noticeNumberText.split(': ');
            if (splitResult.length === 2){
                noticeNumber = splitResult[1].trim();
            }
        }
        return noticeNumber;
    }

}

export default new PublicNoticePageParser();