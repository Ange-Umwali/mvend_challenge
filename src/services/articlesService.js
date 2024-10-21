import articles from "../model/articles/articles.js";
import comment from "../model/comment/comment.js";
import User from "../model/users/users.js";

export const getarticlesService = async (req, res) => {
  try {
    const article = await articles.findAll({
      include: [
        {
          model: comment,
          as: "comment",
          include: [
            {
              model: User,
              as: "commenter",
              attributes: ["first_name", "last_name"],
            },
          ],
        },
        {
          model: User,
          as: "author",
          attributes: ["first_name", "last_name"],
        },
      ],
    });
    return res
      .status(200)
      .json({ message: "articles retreived successfully", article });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve articles" });
  }
};
export const getarticleService = async (req, res) => {
  const { article_id } = req.params;

  try {
    const article = await articles.findOne({
      where: { article_id },
      include: [
        {
          model: comment,
          as: "comment",
          include: [
            {
              model: User,
              as: "commenter",
              attributes: ["first_name", "last_name"],
            },
          ],
        },
        {
          model: User,
          as: "author",
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    if (!article) {
      return res.status(401).json({ message: "no article found" });
    }
    return res
      .status(200)
      .json({ message: "articles retreived successfully", article });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve articles" });
  }
};
export const createarticleService = async (req, res) => {
  const { description } = req.body;
  try {
    const author_id = req.user?.user_id;
    const articleData = {
      author_id,
      description,
    };
    const article = await articles.create(articleData);
    res.status(200).json({ message: "articles created successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Failed to create articles", error });
  }
};

export const updatearticleService = async (req, res) => {
  const { description } = req.body;
  const { article_id } = req.params;
  try {
    const articleExist = await articles.findOne({ where: { article_id } });

    if (!articleExist) {
      return res.status(401).json({ message: "no article found" });
    }

    const articleData = {
      description,
      last_updated:Date.now()
    };

    const article = await articles.update(articleData, {
      where: { article_id },
    });
    return res
      .status(200)
      .json({ message: "article updated successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Failed to create articles", error });
  }
};

export const deletearticleService = async (req, res) => {
  const { article_id } = req.params;
  try {
    const articleExist = await articles.findOne({ where: { article_id } });

    if (!articleExist) {
      return res.status(401).json({ message: "no article found" });
    }
    const article = await articles.destroy({ where: { article_id } });
    return res
      .status(200)
      .json({ message: "articles deleted successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Failed to create articles", error });
  }
};
