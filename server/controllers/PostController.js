import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ viewsCount: -1 })
      .limit(5)
      .exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить тэги",
    });
  }
};

export const getOneTag = async (req, res) => {
  try {
    const sort = {};
    if (req.query.sortBy) {
      sort[req.query.sortBy] = -1;
    }
    console.log(req.params.name);
    const posts = await PostModel.find({ tags: { $all: [req.params.name] } })
      .sort(sort)
      .populate("user");
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const sort = {};
    const filter = {};
    if (req.query.sortBy) {
      sort[req.query.sortBy] = -1;
    }
    const posts = await PostModel.find().sort(sort).populate("user").exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to load posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Error loading the post",
          });
        }
        if (!doc) {
          console.log(error);
          return res.status(404).json({
            message: "Post not found",
          });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to load the post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create a post" });
  }
};

export const createComment = async (req, res) => {
  try {
    const comment = {
      user: {
        id: req.body.comment.userId,
        fullName: req.body.comment.fullName,
        avatarUrl: req.body.comment.avatarUrl && req.body.comment.avatarUrl,
      },
      text: req.body.comment.text,
    };
    console.log(req.body);
    const postId = req.params.id;
    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $push: { comments: comment },
      }
    );
    res.json(comment);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create a comment" });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      }
    );
    res.json({
      succcess: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update the post" });
  }
};

export const remove = async (req, res) => {
  const postId = req.params.id;
  PostModel.findByIdAndDelete(
    {
      _id: postId,
    },
    (err, doc) => {
      if (err) {
        console.log(error);
        return res.status(500).json({ message: "Failed deleting a post" });
      }
      if (!doc) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete a post" });
      }
      res.json({
        success: true,
      });
    }
  );
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete a post" });
  }
};
