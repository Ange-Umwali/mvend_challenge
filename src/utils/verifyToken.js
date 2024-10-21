import jwt from "jsonwebtoken";

const JWR_SECRET = "7787177827737173";

export const verifyToken = (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ message: "User Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, JWR_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "User Unauthorized" });
  }
};
