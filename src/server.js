import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express(); 

const globalRouter = express.Router();
const userRouter = express.Router();
const videoRouter = express.Router();

app.use("/", globalRouter);
app.use("/vidios", videoRouter);
app.use("/users", userRouter);




app.listen(PORT, ()=> console.log(`server listening on http://localhost:4000/ 👻`));

