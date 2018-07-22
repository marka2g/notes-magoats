## Notes Ma🐐s Phoenix Backend with JWT Auth

## jwt tutorial
[phoenix with jwt auth](https://medium.com/@njwest/jwt-auth-with-an-elixir-on-phoenix-1-3-guardian-api-and-react-native-mobile-app-1bd00559ea51)
## curls
[curl json](https://tecadmin.net/post-json-data-with-curl-command/)
[and here at lobos notes](https://lobotuerto.com/blog/building-a-json-api-with-phoenix-and-elixir/)

### sign_up
> `curl -H "Content-Type: application/json" -X POST -d '{"user":{"email":"some_other@email.com","password":"password", "password_confirmation": "password"}}' http://localhost:4000/api/v1/sign_up`

### sign_in
> `curl -H "Content-Type: application/json" -X POST -d '{"email": "jwt+4@email.com","password": "password"}' http://localhost:4000/api/v1/sign_in`

### for JWT BEARER Token via `/api/v1/` i settled for using postman
