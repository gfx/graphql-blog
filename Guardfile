#!ruby
# frozen_string_literal: true

clearing :off
interactor :off

ENV['NODE_ENV'] = 'development'

guard :rails, host: '0.0.0.0' do
  watch('Gemfile.lock')
  watch(%r{^config/.*\.rb$})
  watch(%r{^lib/middlewares/.*\.rb$})
  watch(%r{^config/[^/]\.yml$})
  ignore(%r{config/routes\.rb$})
end

guard :process, name: 'webpack',
                command: "npm run webpack-dev-server" do
  watch('config/webpack.config.js')
  watch('tsconfig.json')
end
