GDS::SSO.config do |config|
  config.user_model   = 'User'
  config.oauth_id     = 'oauth_id_defined_on_rollout'
  config.oauth_secret = 'secret'
  config.oauth_root_url = Plek.current.find("signon")
  config.basic_auth_user = 'api'
  config.basic_auth_password = 'defined_on_rollout_not'
end