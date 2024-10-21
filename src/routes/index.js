import { Router } from "express";
import userRoutes from "./users.js";
import articlesRoutes from "./articles.js";
import commentRoutes from "./comment.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

router.use("/users", userRoutes); 
router.use("/articles",articlesRoutes); 
router.use("/comment",commentRoutes);


export default router;
