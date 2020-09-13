import {PUBLIC_NOTICE_URL} from "../config/urlConstants";
import BeautifulDom from 'beautiful-dom';
import Axios from "axios";

export class PublicNoticePageParser {

    loadPage = (url : string) : string => {
        let result : string = "";
        Axios.get(url).then(resp => {
            result = resp.data;
        })
        return result;
    }
}