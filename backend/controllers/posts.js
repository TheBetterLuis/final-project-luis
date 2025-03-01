const postModel = require("../models/posts");
const userModel = require("../models/users");
const ticketModel = require("../models/tickets");

const getPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("ticketID")
      .populate({
        path: "userID",
        model: "users",
        select: "name lastName profilePicture",
      })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostsByUserID = async (req, res) => {
  try {
    const { userID } = req.body;

    const posts = await postModel
      .find({ userID })
      .populate({
        path: "commentsID",
        populate: {
          path: "userID",
          model: "users",
          select: "name lastName profilePicture",
        },
      })
      .populate("ticketID")
      .populate({
        path: "userID",
        model: "users",
        select: "name lastName profilePicture",
      })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostByTicketID = async (req, res) => {
  try {
    const { _id } = req.params;

    const post = await postModel
      .find({ ticketID: _id })
      .populate({
        path: "commentsID",
        populate: {
          path: "userID",
          model: "users",
          select: "name lastName profilePicture",
        },
      })
      .populate("ticketID")
      .populate({
        path: "userID",
        model: "users",
        select: "name lastName profilePicture",
      })
      .exec();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicPostsByUserID = async (req, res) => {
  try {
    const { userID } = req.body;
    const posts = await postModel.find({ userID: userID, status: "public" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrivatePostsByUserID = async (req, res) => {
  try {
    const { userID } = req.body;
    const posts = await postModel.find({ userID: userID, status: "private" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { userID, ticketID, commentsID, likes, status } = req.body;
    const post = await postModel.create({
      userID,
      ticketID,
      commentsID,
      likes,
      status,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post no encontrado" });
    }

    //const deletedPost = await postModel.findByIdAndDelete(id);

    const ticketID = post.ticketID._id;
    const deletedTicket = await ticketModel.findByIdAndDelete(ticketID);

    if (!deletedTicket) {
      res.status(404).json({ message: "Ticket no encontrado" });
    }

    await postModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Post eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.body;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.body.userID) post.userID = req.body.userID;
    if (req.body.ticketID) post.ticketID = req.body.ticketID;
    if (req.body.commentsID) post.commentsID = req.body.commentsID;
    if (req.body.likes) post.likes = req.body.likes;
    if (req.body.status) post.status = req.body.status;

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchPublicPostsAndTickets = async (req, res) => {
  try {
    const posts = await postModel
      .find({ status: "public" })
      .populate("ticketID")
      .populate({
        path: "userID",
        model: "users",
        select: "name lastName profilePicture",
      })
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchPrivatePostsAndTickets = async (req, res) => {
  try {
    const posts = await postModel
      .find({ status: "private" })
      .populate("ticketID")
      .populate({
        path: "userID",
        model: "users",
        select: "name lastName profilePicture",
      })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicPostsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await postModel
      .find({ status: "public" })
      //remove if not working, to sort from new to old
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "commentsID",
        populate: {
          path: "userID",
          model: "users",
          select: "name lastName profilePicture",
        },
      })
      .populate("ticketID")
      .populate({
        path: "userID",
        model: "users",
        select: "name lastName profilePicture role postCount totalLikes",
      })
      .exec();

    const total = await postModel.countDocuments();

    const totalPages = Math.ceil(total / limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    res.status(200).json({
      posts,
      total,
      totalPages,
      currentPage: page,
      nextPage,
      previousPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPersonalProfilePostsPaginatedByUserID = async (req, res) => {
  try {
    const { userID } = req.body;

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const user = await userModel
      .findById(userID)
      .select("name lastName profilePicture role");

    const userPostCount = await postModel.countDocuments({ userID });
    const userTotalLikes = await postModel.countDocuments({
      likes: {
        $elemMatch: { $eq: userID },
      },
    });

    const posts = await postModel
      .find({ userID })
      //remove if not working, to sort from new to old
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "commentsID",
        populate: {
          path: "userID",
          model: "users",
          select: "name lastName profilePicture",
        },
      })
      .populate("ticketID")
      .populate({
        path: "userID",
        model: "users",
        select: "name lastName profilePicture",
      })
      .exec();

    const total = await postModel.countDocuments({ status: "public", userID });

    const totalPages = Math.ceil(total / limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    res.status(200).json({
      user,
      posts,
      total,
      totalPages,
      currentPage: page,
      nextPage,
      userPostCount,
      userTotalLikes,
      previousPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicProfilePostsPaginatedByUserID = async (req, res) => {
  try {
    const { userID } = req.body;

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const user = await userModel
      .findById(userID)
      .select("name lastName profilePicture role");

    const userPostCount = await postModel.countDocuments({ userID });
    const userTotalLikes = await postModel.countDocuments({
      likes: {
        $elemMatch: { $eq: userID },
      },
    });

    const posts = await postModel
      .find({ status: "public", userID, isAnonymous: false })
      //remove if not working, to sort from new to old
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "commentsID",
        populate: {
          path: "userID",
          model: "users",
          select: "name lastName profilePicture role postCount totalLikes",
        },
      })
      .populate("ticketID")
      .populate({
        path: "userID",
        model: "users",
        select: "name lastName profilePicture",
      })
      .exec();

    const total = await postModel.countDocuments({
      status: "public",
      userID,
      isAnonymous: false,
    });

    const totalPages = Math.ceil(total / limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    res.status(200).json({
      user,
      posts,
      total,
      totalPages,
      currentPage: page,
      nextPage,
      previousPage,
      userPostCount,
      userTotalLikes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userID } = req.body;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const hasLiked = post.likes.includes(userID);

    if (hasLiked) {
      // Unlike the post
      post.likes.pull(userID);
    } else {
      // Like the post
      post.likes.push(userID);
    }

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllPosts = async (req, res) => {
  try {
    // Find all posts
    const posts = await postModel.find();
    if (posts.length === 0) {
      return res.status(404).json({ message: "No se encontraron posts" });
    }

    // Delete corresponding tickets for each post
    const ticketIds = posts.map((post) => post.ticketID);
    await ticketModel.deleteMany({ _id: { $in: ticketIds } });

    // Delete all posts
    await postModel.deleteMany();

    res.status(200).json({
      message:
        "Todos los posts y sus tickets correspondientes han sido eliminados",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  getPostsByUserID,
  getPostByTicketID,
  getPublicPostsByUserID,
  getPublicPostsPaginated,
  getPrivatePostsByUserID,
  getPersonalProfilePostsPaginatedByUserID,
  getPublicProfilePostsPaginatedByUserID,
  createPost,
  deletePost,
  deleteAllPosts,
  updatePost,
  fetchPublicPostsAndTickets,
  fetchPrivatePostsAndTickets,
  likePost,
};
