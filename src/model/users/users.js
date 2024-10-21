import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const User = db.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
