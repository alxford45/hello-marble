import { combineRoutes } from "@marblejs/core";
import { getUser$, getUsers$, postUser$ } from "./users.effects";

export const users$ = combineRoutes("/users", [getUser$, getUsers$, postUser$]);
