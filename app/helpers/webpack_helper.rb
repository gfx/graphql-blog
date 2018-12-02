# frozen_string_literal: true

require 'net/http'

# FIXME: Read manifest.json from the filesystem on production.

module WebpackHelper
  WEBPACK_DEV_SERVER_PORT = 3808 # sync with config/webpac.config.json

  def asset_host
    "localhost:#{WEBPACK_DEV_SERVER_PORT}"
  end

  # @param [String] name
  def webpack_path(name)
    __webpack_manifest.fetch(name)
  end

  def __webpack_manifest
    @__webpack_manifest ||= JSON.parse(Net::HTTP.get('localhost', '/assets/manifest.json', WEBPACK_DEV_SERVER_PORT))
  end
end
