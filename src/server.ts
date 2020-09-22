import App from './app'
import VkBotController from "./vkbot/api/vkApiController"
const app = new App([
        VkBotController
    ])

app.listen();