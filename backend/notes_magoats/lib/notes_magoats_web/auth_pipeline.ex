defmodule NotesMagoats.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :notes_magoats,
    module: NotesMagoats.Guardian,
    error_handler: NotesMagoats.AuthErrorHandler

  plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
  plug(Guardian.Plug.EnsureAuthenticated)
  plug(Guardian.Plug.LoadResource)
end
