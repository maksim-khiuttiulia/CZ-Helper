import Axios from "axios";

class PageLoader {
    public async loadPage(url : string) : Promise<string> {
        let response = await Axios.get(url);
        let data = await response.data;
        return data;
    }
}

export default new PageLoader();