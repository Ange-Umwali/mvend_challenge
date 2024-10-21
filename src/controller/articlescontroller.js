import {
  createarticleService,
  deletearticleService,
  getarticleService,
  getarticlesService,
  updatearticleService,
} from "../services/articlesService.js";

export const getarticles = (req, res) => {
  return getarticlesService(req, res);
};
export const getarticle = (req, res) => {
  return getarticleService(req, res);
};

export const createarticle = (req, res) => {
  return createarticleService(req, res);
};
export const updatearticle = (req, res) => {
  return updatearticleService(req, res);
};
export const deletearticle = (req, res) => {
  return deletearticleService(req, res);
};
