import App from './app'
import PublicNoticeController from "./controllers/publicNoticeController";
import {
    DB_PASSWORD_DEV, DB_PASSWORD_PRODUCTION,
    DB_URI_DEV,
    DB_URI_PRODUCTION,
    DB_USER_DEV, DB_USER_PRODUCTION,
    PORT_DEV,
    PORT_PRODUCTION
} from "./config/enviromentConstants";

let environment : string = process.env.NODE_ENV || "DEV"
environment = environment.toLocaleUpperCase();
console.warn('Run on', environment, "environment")

let PORT : number = PORT_DEV;
let DB_URL : string = DB_URI_DEV;
let DB_USER : string = DB_USER_DEV;
let DB_PASSWORD : string = DB_PASSWORD_DEV;

if (environment === "PRODUCTION") {
    PORT = PORT_PRODUCTION
    DB_URL = DB_URI_PRODUCTION;
    DB_USER = DB_USER_PRODUCTION;
    DB_PASSWORD = DB_PASSWORD_PRODUCTION;
}

const app = new App([
    new PublicNoticeController()
],
    PORT)

app.listen();