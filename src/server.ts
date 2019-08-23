import {
  createServer,
  matchEvent,
  ServerEvent,
  HttpServerEffect
} from "@marblejs/core";
import httpListener from "./http.listener";
import { map, tap } from "rxjs/operators";
import { merge } from "rxjs";

const listening$: HttpServerEffect = (event$, server, meta) =>
  event$.pipe(
    matchEvent(ServerEvent.listening),
    map(event => event.payload),
    tap(({ port, host }) =>
      console.log(`server listening on http://${host}:${port}`)
    )
  );
const server = createServer({
  port: 8080,
  hostname: "localhost",
  httpListener,
  event$: (...args) => merge(listening$(...args))
});
export default server;
