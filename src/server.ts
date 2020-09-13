import App from './app'
import PublicNoticeController from "./controllers/publicNoticeController";
import {PORT} from "./config/serverContants";

const app = new App([
    new PublicNoticeController()
],
    PORT)

app.listen();