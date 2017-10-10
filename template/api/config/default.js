const clientConfig = require('../../config')

module.exports = {
  "client": clientConfig,
  "host": "localhost",
  "port": 3030,
  "public": "../../dist/",
  "build": "../../build/",
  "ssr": "../ssr/",
  "src": "../../src/",
  "paginate": {
    "default": 10,
    "max": 50
  }
}
