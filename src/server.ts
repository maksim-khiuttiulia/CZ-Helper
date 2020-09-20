import App from './app'
import PublicNoticeController from "./controllers/publicNoticeController";
import VkBotController from "./controllers/vkBotController"
const app = new App([
        PublicNoticeController,
        VkBotController
    ])

app.listen();