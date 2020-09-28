import {
    FORM_CODE_SELECTOR_OAM,
    FORM_NUMBER_COUNT_SELECTOR_OAM,
    FORM_NUMBER_SELECTOR_OAM, FORM_NUMBER_SELECTOR_ZOV,
    FORM_SUBMIT_BUTTON,
    FORM_URL,
    FORM_YEAR_SELECTOR_OAM,
    REGEX_GROUP_STATUS_CODE_OAM,
    REGEX_GROUP_STATUS_COUNT_NUMBER_OAM,
    REGEX_GROUP_STATUS_NUMBER_OAM,
    REGEX_GROUP_STATUS_YEAR_OAM,
    REGEX_STATUS_NUMBER_OAM, REGEX_STATUS_NUMBER_ZOV,
    STATUS_APPROVED,
    STATUS_IN_PROGRESS,
    STATUS_NOT_FOUND,
    STATUS_REJECTED
} from "./applicationStatusConstants";
import {ApplicationStatusType} from "./applicationStatusType";
import {isMatch} from "../utils/regexUtils";
import PQueue from "p-queue";

const puppeteer = require('puppeteer');

interface OAMStatusNumber {
    number: string,
    countNumber?: string,
    code: string,
    year: string
}

class ApplicationStatusPageParser {

    private readonly queue : PQueue;

    constructor() {
        this.queue = new PQueue({concurrency : 1});
    }

    async getApplicationStatus(number: string): Promise<ApplicationStatusType> {
        if (this.isOAMNumber(number)) {
            let oamNumber: OAMStatusNumber = this.parseOAMNumber(number);
            return await this.queue.add(() => this.getApplicationStatusOAM(oamNumber));
        }
        if (this.isZovNumber(number)) {
            return await this.queue.add(() => this.getApplicationStatusZov(number));
        }
        throw new Error("Unsuported");
    }

    private async getApplicationStatusOAM(oamNumber: OAMStatusNumber): Promise<ApplicationStatusType> {
        const browser = await puppeteer.launch({headless : true, args: [
                '--single-process', // <- this one doesn't works in Windows
            ]})

        try {
            const page = await browser.newPage();
            await page.goto(FORM_URL)
            await page.type(FORM_NUMBER_SELECTOR_OAM, oamNumber.number)

            if (oamNumber.countNumber != null) {
                await page.type(FORM_NUMBER_COUNT_SELECTOR_OAM, oamNumber.countNumber)
            }

            await page.select(FORM_CODE_SELECTOR_OAM, oamNumber.code)
            await page.select(FORM_YEAR_SELECTOR_OAM, oamNumber.year)

            await page.click(FORM_SUBMIT_BUTTON, {delay: 3500});
            await page.waitForNavigation();

            let content: string = await page.content();

            await page.close();
            await browser.close()

            return this.findStatusOnPage(content);
        } catch (e) {
            if (browser) {
                await browser.close()
            }
            throw e;
        }
    }

    private async getApplicationStatusZov(zovNumber: string): Promise<ApplicationStatusType> {
        const browser = await puppeteer.launch({headless : true, args: [
                '--single-process', // <- this one doesn't works in Windows
            ]})

        try {
            const page = await browser.newPage();
            await page.goto(FORM_URL)
            await page.type(FORM_NUMBER_SELECTOR_ZOV, zovNumber)
            await page.click(FORM_SUBMIT_BUTTON, {delay: 3500});
            await page.waitForNavigation();

            let content: string = await page.content();
            await page.close();
            await browser.close()

            return this.findStatusOnPage(content);
        } catch (e) {
            if (browser) {
                await browser.close()
            }
            throw e;
        }
    }

    private findStatusOnPage(content: string): ApplicationStatusType {
        if (isMatch(content, STATUS_APPROVED)) {
            return ApplicationStatusType.APPROVED;
        }
        if (isMatch(content, STATUS_IN_PROGRESS)) {
            return ApplicationStatusType.IN_PROGRESS;
        }
        if (isMatch(content, STATUS_NOT_FOUND)) {
            return ApplicationStatusType.NOT_FOUND;
        }
        if (isMatch(content, STATUS_REJECTED)) {
            return ApplicationStatusType.REJECTED;
        }
        return ApplicationStatusType.UNKNOWN;
    }

    private isOAMNumber(number: string): boolean {
        return isMatch(number, REGEX_STATUS_NUMBER_OAM);
    }

    private isZovNumber(number: string): boolean {
        return isMatch(number, REGEX_STATUS_NUMBER_ZOV);
    }

    private parseOAMNumber(number: string): OAMStatusNumber {
        const regex: RegExpMatchArray | null = number.match(REGEX_STATUS_NUMBER_OAM);
        if (regex === null) {
            throw new Error("Is not OAM number");
        }
        let numberRes: string = regex[REGEX_GROUP_STATUS_NUMBER_OAM];
        let countNumberRes: string = regex[REGEX_GROUP_STATUS_COUNT_NUMBER_OAM];
        let codeRes: string = regex[REGEX_GROUP_STATUS_CODE_OAM];
        let yearRes: string = regex[REGEX_GROUP_STATUS_YEAR_OAM];
        return {number: numberRes, countNumber: countNumberRes, code: codeRes, year: yearRes}
    }
}

export default new ApplicationStatusPageParser();