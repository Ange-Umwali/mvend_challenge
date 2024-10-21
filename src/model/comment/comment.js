import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import articles from "../articles/articles.js";
import User from "../users/users.js";

const comment = db.define(
  "comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commenter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "articles",
        key: "article_id",
      },
    },
    comment: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
  },
  {
    tableName: "comment",
    timestamps: false,
  }
);

comment.belongsTo(articles, {
  foreignKey: "article_id",
});

articles.hasMany(comment, {
  foreignKey: "article_id",
  as: "comment",
});

User.hasMany(comment, {
  foreignKey: "commenter_id",
  as: "comment",
});

comment.belongsTo(User, {
  foreignKey: "commenter_id",
  as: "commenter",
});

export default comment;
