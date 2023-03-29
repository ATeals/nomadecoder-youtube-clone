import express from "express";
import morgan from "morgan";
import {edit, remove} from "../controllers/userController"


const userRouter = express.Router();

const handleEdit = (req, res) => res.send("Edit User");
const handleDelete = (req, res) => res.send("Delete User");


userRouter.get("/edit", handleEdit);
userRouter.get("/edit", handleDelete);


export default userRouter;