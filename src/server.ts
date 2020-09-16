import App from './app'
import PublicNoticeController from "./controllers/publicNoticeController";

const app = new App([
        PublicNoticeController,
    ])

app.listen();