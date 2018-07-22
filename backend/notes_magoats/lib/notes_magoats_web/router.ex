defmodule NotesMagoatsWeb.Router do
  use NotesMagoatsWeb, :router

  alias NotesMagoats.Guardian

  pipeline :api do
    plug(:accepts, ["json"])
  end

  # pipeline :jwt_authenticated do
  #   plug(Guardian.AuthPipeline)
  # end

  scope "/api/v1", NotesMagoatsWeb do
    pipe_through(:api)
    # pipe_through([:api, :jwt_authenticated])

    # resources("/users", UserController, only: [:create, :show])
    post("/sign_up", UserController, :create)
  end
end
