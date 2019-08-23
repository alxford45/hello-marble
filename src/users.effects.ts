import { r } from "@marblejs/core";
import { mapTo, map, tap } from "rxjs/operators";
import users from "./users";
import { asap } from "rxjs/internal/scheduler/asap";

type User = { name: string; id: number };

type Store = User[];

const store: Store = [...users];

export const getUsers$ = r.pipe(
  r.matchPath("/"),
  r.matchType("GET"),
  r.useEffect(req$ => req$.pipe(mapTo({ body: { ...store } })))
);
export const getUser$ = r.pipe(
  r.matchPath("/:id"),
  r.matchType("GET"),
  r.useEffect(req$ =>
    req$.pipe(
      map(req => req.params as { id: string }),
      map(param => param.id),
      map(id => parseInt(id)),
      map(id => store.find(user => user.id == id)),
      map(user =>
        user
          ? {
              body: user
            }
          : {
              body: `user does not exist`
            }
      )
    )
  )
);
export const postUser$ = r.pipe(
  r.matchPath("/"),
  r.matchType("POST"),
  r.useEffect(req$ =>
    req$.pipe(
      map(req => req.body as { name: string }),
      map(body => body.name),
      tap(name => store.push({ name: name, id: store.length })),
      map(name => ({ body: `User ${name} has been added!` }))
    )
  )
);
