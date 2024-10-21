import { Router } from "express";
import {
  createarticle,
  deletearticle,
  getarticles,
  updatearticle,
  getarticle
} from "../controller/articlescontroller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { createcomment } from "../controller/commentcontroller.js";
const articlesRoutes = Router();

articlesRoutes.get("/", getarticles);
articlesRoutes.get("/:article_id", getarticle);

articlesRoutes.use(verifyToken);
articlesRoutes.post("/", createarticle);
articlesRoutes.post("/:article_id/comment", createcomment);
articlesRoutes.put("/:article_id", updatearticle);
articlesRoutes.delete("/:article_id", deletearticle);

export default articlesRoutes;
