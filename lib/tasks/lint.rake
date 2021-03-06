desc "Run govuk-lint with similar params to CI"
task :lint do
  next if ENV['JENKINS']

  sh "bundle exec govuk-lint-ruby --rails --diff --format clang app spec lib"
end
