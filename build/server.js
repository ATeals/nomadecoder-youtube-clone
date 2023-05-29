"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));
var _middlewares = require("./middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

//middleware
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(_express["default"].urlencoded({
  extended: true
}));

/** session */
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  //세션을 수정할 때만 DB에 세션을 수정하고 쿠키를 브라우저에 보냄
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use(_middlewares.localsMiddleware);
//route
app.use("/", _rootRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/assets", _express["default"]["static"]("assets"));
var _default = app;
exports["default"] = _default;