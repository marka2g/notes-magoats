# require IEx

defmodule NotesMagoatsWeb.UserController do
  use NotesMagoatsWeb, :controller

  alias NotesMagoats.Accounts
  alias NotesMagoats.Accounts.User
  alias NotesMagoats.Guardian

  action_fallback(NotesMagoatsWeb.FallbackController)

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  # def create(conn, %{"user" => user_params}) do
  #   # with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
  #   with {:ok, %User{} = user} <- Accounts.create_user(user_params),
  #        # conn
  #        # |> put_status(:created)
  #        # |> put_resp_header("location", user_path(conn, :show, user))
  #        # |> render("show.json", user: user)
  #        {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
  #     conn |> render("jwt.json", token)
  #   end
  # end

  # exlination of `with/else`: https://stackoverflow.com/questions/34210281/how-to-use-the-with-keyword-in-elixir-and-what-is-it-for

  # case Accounts.create_user(user_params) do
  #   {:ok, %User{} = user} ->
  #     case Guardian.encode_and_sign(user) do
  #       {:ok, token, _claims} ->
  #          conn |> render("jwt.json", jwt: token)
  #     end
  # end
  def create(conn, %{"user" => user_params}) do
    # IEx.pry()
    with {:ok, %User{} = user} <- Accounts.create_user(user_params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      conn |> render("jwt.json", jwt: token)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
