import { getUsersService, createUserService, loginService } from "../services/usersService.js";

export const getUsers = (req, res) => {
  return getUsersService(req, res);
};

export const createUser = (req, res) => {
  return createUserService(req, res);
};

export const userLogin= (req, res) => {
  return loginService(req, res);
};
