import articles from "../model/articles/articles.js";
import comment from "../model/comment/comment.js";

export const getcommentService = async (req, res) => {
  try {
    const comments = await comment.findAll();
    console.log("comment:", comment);

    res
      .status(200)
      .json({ message: "comment retreived successfully", comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve comment" });
  }
};
export const createcommentService = async (req, res) => {
  const { article_id } = req.params;
  const { comment: comment_text } = req.body;
  try {
    const article = await articles.findOne({
      where: { article_id },
      raw: true,
    });

    if (!article) {
      return res
        .status(401)
        .json({ message: "article you want to post on isn't availabl" });
    }
    const commenter_id = req.user?.user_id;

    const commentData = {
      article_id: article.article_id,
      commenter_id,
      comment: comment_text,
    };

    console.log("Articel", commentData);

    const comments = await comment.create(commentData);

    return res
      .status(200)
      .json({ message: "comment created successfully", comments });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create comment", error });
  }
};
