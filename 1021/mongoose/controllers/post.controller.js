import Post from "../models/post.model.js";
// dummy data
// let posts = [
//   { id: 1, title: "First Post", content: "Express is good." },
//   { id: 2, title: "Second Post", content: "Node.js is good." },
// ];

// 모든 게시글 조회
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
  // res.json({ success: true, data: posts });
};

// 특정 게시글 조회
export const getPostById = async (req, res, next) => {
  try {
    // const post = posts.find((p) => p.id === parseInt(req.params.id));
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.json({ success: false, message: "Post not found" });
    } else {
      res.json({ success: true, data: post });
    }
  } catch (error) {
    next(error);
  }
};

// 생성
export const createPost = async (req, res, next) => {
  try {
    // const { title, content } = req.body;
    // const newPost = { id: posts.length + 1, title, content };
    // posts.push(newPost);
    const newPost = await Post.create(req.body);
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};

// 수정
export const updatePost = async (req, res, next) => {
  try {
    // const id = parseInt(req.params.id);
    // const index = posts.findIndex((p) => p.id === id);
    // if (index === -1)
    //   return res.status(404).json({ success: false, message: "게시글 없음" });

    // posts[index] = { ...posts[index], ...req.body };
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// 삭제
export const deletePost = async (req, res, next) => {
  try {
    // const id = parseInt(req.params.id);
    // posts = posts.filter((p) => p.id !== id);
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "게시글 삭제 완료" });
  } catch (error) {
    next(error);
  }
};