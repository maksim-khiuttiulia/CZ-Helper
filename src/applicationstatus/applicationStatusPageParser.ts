import puppeteer, {Browser} from "puppeteer";
import {
    FORM_CODE_SELECTOR,
    FORM_NUMBER_COUNT_SELECTOR,
    FORM_NUMBER_SELECTOR,
    FORM_SUBMIT_BUTTON,
    FORM_URL,
    FORM_YEAR_SELECTOR,
    REGEX_GROUP_STATUS_CODE,
    REGEX_GROUP_STATUS_COUNT_NUMBER,
    REGEX_GROUP_STATUS_NUMBER,
    REGEX_GROUP_STATUS_YEAR,
    REGEX_STATUS_NUMBER,
    STATUS_APPROVED,
    STATUS_IN_PROGRESS,
    STATUS_NOT_FOUND,
    STATUS_REJECTED
} from "./applicationStatusConstants";
import {ApplicationStatusType} from "./applicationStatusType";

interface OAMStatusNumber {
    number: string,
    countNumber?: string,
    code: string,
    year: string
}

class ApplicationStatusPageParser {

    async getApplicationStatus(number: string): Promise<ApplicationStatusType> {
        if (this.isOAMNumber(number)) {
            let oamNumber: OAMStatusNumber = this.parseOAMNumber(number);
            return await this.getApplicationStatusOAM(oamNumber);
        }
        throw new Error("Unsuported");
    }

    private async getApplicationStatusOAM(oamNumber: OAMStatusNumber): Promise<ApplicationStatusType> {
        console.warn(oamNumber)
            const browser: Browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            await page.goto(FORM_URL)
            await page.type(FORM_NUMBER_SELECTOR, oamNumber.number)

            if (oamNumber.countNumber != null) {
                await page.type(FORM_NUMBER_COUNT_SELECTOR, oamNumber.countNumber)
            }

            await page.select(FORM_CODE_SELECTOR, oamNumber.code)
            await page.select(FORM_YEAR_SELECTOR, oamNumber.year)
            await page.click(FORM_SUBMIT_BUTTON, {delay: 4000});
            await page.waitForNavigation();

            let content: string = await page.content();

            await browser.close();

            return this.findStatusOnPage(content);
    }

    private findStatusOnPage(content: string): ApplicationStatusType {
        if (content.match(STATUS_APPROVED)) {
            return ApplicationStatusType.APPROVED;
        }
        if (content.match(STATUS_IN_PROGRESS)) {
            return ApplicationStatusType.IN_PROGRESS;
        }
        if (content.match(STATUS_NOT_FOUND)) {
            return ApplicationStatusType.NOT_FOUND;
        }
        if (content.match(STATUS_REJECTED)) {
            return ApplicationStatusType.REJECTED;
        }
        return ApplicationStatusType.UNKNOWN;
    }

    private isOAMNumber(number: string): boolean {
        return number.match(REGEX_STATUS_NUMBER) != null;
    }

    private parseOAMNumber(number: string): OAMStatusNumber {
        const regex: RegExpMatchArray | null = number.match(REGEX_STATUS_NUMBER);
        if (regex === null) {
            throw new Error("Is not OAM number");
        }
        let numberRes: string = regex[REGEX_GROUP_STATUS_NUMBER];
        let countNumberRes: string = regex[REGEX_GROUP_STATUS_COUNT_NUMBER];
        let codeRes: string = regex[REGEX_GROUP_STATUS_CODE];
        let yearRes: string = regex[REGEX_GROUP_STATUS_YEAR];
        return {number: numberRes, countNumber: countNumberRes, code: codeRes, year: yearRes}
    }

}

export default new ApplicationStatusPageParser();