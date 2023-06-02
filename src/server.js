//server
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

//router
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

//middleware
import { localsMiddleware } from "./middlewares";
import flash from "express-flash";

const app = express();

//middleware
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** session */
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false, //세션을 수정할 때만 DB에 세션을 수정하고 쿠키를 브라우저에 보냄
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use(flash());
app.use(localsMiddleware);

//route
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));

export default app;
