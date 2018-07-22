defmodule NotesMagoatsWeb.Router do
  use NotesMagoatsWeb, :router

  alias NotesMagoats.Guardian

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :jwt_authenticated do
    plug(Guardian.AuthPipeline)
  end

  scope "/api/v1", NotesMagoatsWeb do
    pipe_through(:api)

    # resources("/users", UserController, only: [:create, :show])
    post("/sign_up", UserController, :create)
    post("/sign_in", UserController, :sign_in)
  end

  scope "/api/v1", NotesMagoatsWeb do
    pipe_through([:api, :jwt_authenticated])

    # get("/my_user", UserController, :show)
    get("/profile", UserController, :show)
  end
end
