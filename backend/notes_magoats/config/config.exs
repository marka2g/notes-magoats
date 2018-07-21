# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :notes_magoats,
  ecto_repos: [NotesMagoats.Repo]

# Configures the endpoint
config :notes_magoats, NotesMagoatsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "8UDPA5CPq45u5uz6afzsHpqKoUeAQhrXMSGAhcLjwgLidD6qLbzRjtsW2W66DIgS",
  render_errors: [view: NotesMagoatsWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: NotesMagoats.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Guardian config
config :notes_magoats, NotesMagoats.Guardian,
  issuer: "notes_magoats",
  secret_key: "uiNGHRdb3aRmjU+cyh1ij8fevHO6IM9uAFtTMGMB+fS0Vp1OnGBKMmHWoQ2N9mQ/"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
