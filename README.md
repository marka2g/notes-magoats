# Notes Ma🐐s (*notes magoats*)
Phoenix Backend/Reactjs Frontend


## curls
[curl json](https://tecadmin.net/post-json-data-with-curl-command/)
[and here at lobos notes](https://lobotuerto.com/blog/building-a-json-api-with-phoenix-and-elixir/)
`curl -H "Content-Type: application/json" -X POST -d '{"user":{"email":"some@email.com","password":"password", "password_confirmation": "password"}}' http://localhost:4000/api/v1/users`

```
[info] POST /api/v1/users
[debug] Processing with NotesMagoatsWeb.UserController.create/2
  Parameters: %{"user" => %{"email" => "someother@email.com", "password" => "[FILTERED]", "password_confirmation" => "[FILTERED]"}}
  Pipelines: [:api]
[debug] QUERY OK db=3.2ms
INSERT INTO "users" ("email","password_hash","inserted_at","updated_at") VALUES ($1,$2,$3,$4) RETURNING "id" ["someother@email.com", "$2b$12$BzAO6cykASM4.cEytTST..IlJaWHq37pFlS/3NCfdeOXNQT7SAa4i", {{2018, 7, 21}, {8, 22, 26, 562219}}, {{2018, 7, 21}, {8, 22, 26, 562265}}]
```
