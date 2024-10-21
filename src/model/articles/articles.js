import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import User from "../users/users.js";

const articles = db.define(
  "articles",
  {
    article_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
  },
  {
    tableName: "articles",
    timestamps: false,
  }
);

User.hasMany(articles, {
  foreignKey: "author_id",
  as: "author",
});

articles.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});

export default articles;
