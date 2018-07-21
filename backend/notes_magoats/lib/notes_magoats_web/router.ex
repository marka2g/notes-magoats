defmodule NotesMagoatsWeb.Router do
  use NotesMagoatsWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api/v1", NotesMagoatsWeb do
    pipe_through(:api)

    resources("/users", UserController, only: [:create, :show])
  end
end
