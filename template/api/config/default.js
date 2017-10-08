const clientConfig = require('../../config')

module.exports = {
  "client": clientConfig,
  "host": "localhost",
  "port": 3030,
  "public": "../../tmp/",
  "dist": "../../dist/",
  "ssr": "../ssr/",
  "paginate": {
    "default": 10,
    "max": 50
  }
}
