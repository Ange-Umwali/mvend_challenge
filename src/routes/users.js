import { Router } from "express";
import {
  getUsers,
  createUser,
  userLogin,
} from "../controller/usersController.js";
const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.post("/login", userLogin);

export default userRoutes;
