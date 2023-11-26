const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

// const redis = require("redis");
// const redisUrl = "redis://127.0.0.1:6379";
// const client = redis.createClient(redisUrl);

const Blog = mongoose.model("Blog");

module.exports = (app) => {
  app.get("/api/blogs/:id", requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get("/api/blogs", requireLogin, async (req, res) => {
    const blogs = await Blog.find({ _user: req.user.id });

    res.send(blogs);
  });

  app.post("/api/blogs", requireLogin, async (req, res) => {
    const redis = require("redis");
    const redisUrl = "redis://127.0.0.1:6379";
    const client = redis.createClient(redisUrl);
    const util = require("util");

    // Is any cached data available?
    const cachedBlogs = client.get(req.user.id);

    // If yes, respond to the request right away and return

    // If no, respond to request and update cache to store data

    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
