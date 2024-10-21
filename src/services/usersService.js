import User from "../model/users/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsersService = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log("Users:", users);

    res.status(200).json({ message: "users retreived successfully", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};
export const createUserService = async (req, res) => {
  const { first_name, last_name, user_name, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    console.log("Hashed password", hashedPassword);
    const userData = {
      first_name,
      last_name,
      user_name,
      password: hashedPassword,
    };
    const user = await User.create(userData);
    res.status(200).json({ message: "user created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create users", error });
  }
};

export const loginService = async (req, res) => {
  const { password, user_name } = req.body;

  try {
    const user = await User.findOne({ where: { user_name }, raw: true });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Your Password is incorrect" });
    }

    const JWR_SECRET = "7787177827737173";

    const token = jwt.sign(user, JWR_SECRET, {
      expiresIn: "2h",
    });

    const loggedInUser = {
      last_name: user.last_name,
      first_name: user.first_name,
      user_name: user.user_name,
      token,
    };

    return res
      .status(200)
      .json({ message: "user logged in  successfully", data: loggedInUser });
  } catch (error) {
    return res.status(500).json({ error: "Failed to login in", error });
  }
};
