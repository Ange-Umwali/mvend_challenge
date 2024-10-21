import { getcommentService, createcommentService } from "../services/commentservice.js";
export const getcomment = (req, res) => {
  return getcommentService(req, res);
};

export const createcomment = (req, res) => {
  return createcommentService(req, res);
};
