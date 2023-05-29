"use strict";

require("regenerator-runtime");
require("dotenv/config");
require("./db");
require("./models/Video");
require("./models/User");
var _server = _interopRequireDefault(require("./server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = 4000;
_server["default"].listen(PORT, function () {
  return console.log("\u2705 server listening on http://localhost:4000/ \uD83D\uDC7B");
});