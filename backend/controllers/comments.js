const commentsModel = require("../models/comments");
const postsModel = require("../models/posts");

const createComment = async (req, res) => {
  try {
    const { userID, postID, content } = req.body;
    const post = await postsModel.findOne({ _id: postID });

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    const newComment = await commentsModel.create({
      userID,
      postID,
      content,
    });

    post.commentsID.push(newComment._id);
    await post.save();

    res
      .status(201)
      .json({ newComment, post, message: "Comentario creado con exito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCommentbyID = async (req, res) => {
  try {
    const { commentID } = req.params;

    const deletedComment = await commentsModel.findByIdAndDelete({
      _id: commentID,
    });

    if (!deletedComment) {
      res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.status(200).json({ message: "Comentario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentsByPostID = async (req, res) => {
  try {
    const { postID } = req.body;

    const comments = await commentsModel.find({ postID });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPostID,
  deleteCommentbyID,
};
