import { httpListener } from "@marblejs/core";
import { bodyParser$ } from "@marblejs/middleware-body";
import { logger$ } from "@marblejs/middleware-logger";
import { users$ } from "./users.routes";

const middlewares = [logger$(), bodyParser$()];

const effects = [users$];

export default httpListener({ middlewares, effects });
