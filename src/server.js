import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

//middleware
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));

/** session */
app.use(
    session({
        secret: "Hello!!",
        resave: false,
        saveUninitialized: false, //세션을 수정할 때만 DB에 세션을 수정하고 쿠키를 브라우저에 보냄
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
    })
);

app.use(localsMiddleware);
//route
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
