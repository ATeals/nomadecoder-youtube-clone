import express from "express";
import {watch, getEdit, posetEdit} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(posetEdit)



export default videoRouter;


