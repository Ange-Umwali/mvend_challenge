import { Router } from "express";
import { createcomment, getcomment } from "../controller/commentcontroller.js";
const commentRoutes = Router();
commentRoutes.get("/", getcomment);
commentRoutes.post("/",createcomment);

export default commentRoutes;