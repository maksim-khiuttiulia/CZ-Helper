import App from './app'
import VkBotController from "./vkbot/api/vkApiController"
import JobController from "./jobs/jobController"
const app = new App([
        VkBotController,
        JobController
    ])

app.listen();