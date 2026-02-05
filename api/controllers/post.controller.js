import prisma from '../lib/prisma.js'
import jwt from "jsonwebtoken";


export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({});
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get all posts' });
  }
}


export const getPosts = async (req, res) => {
    const query = req.query;
  
    try {
      const posts = await prisma.post.findMany({
        where: {
          city: query.city || undefined,
          type: query.type || undefined,
          property: query.property || undefined,
          bedroom: parseInt(query.bedroom) || undefined,
          price: {
            gte: parseInt(query.minPrice) || undefined,
            lte: parseInt(query.maxPrice) || undefined,
          },
        },
      }); 
       
            res.status(200).json(posts);
       
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to get posts' });
    }
  };


//single post:

export const getPost = async (req, res) => {
  const {id} = req.params.id;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post id" });
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            id:true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          return res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
        return res.status(200).json({ ...post, isSaved: false });
      });
    } else {
      res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

//addPost:
export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
  
    try {
      const newPost = await prisma.post.create({
        data: {
          ...body.postData,
          userId: tokenUserId,
          postDetail: {
            create: body.postDetail,
          },
        },
      });
      res.status(200).json(newPost);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to create post" });
    }
  };
  
  
export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { postDetail: true }
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...body.postData,
        postDetail: post.postDetail
          ? {
              update: body.postDetail,
            }
          : {
              create: body.postDetail,
            },
      },
      include: {
        postDetail: true,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("updatePost error:", error);
    res.status(500).json({ message: "Failed to update post!" });
  }
};

//Delete post:

export const deletePost = async(req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await prisma.post.findUnique({
            where: { id }
            
        });

        if(post.userId !== tokenUserId){
            return res.status(403).json({message: 'Not Authortized!'})
        }
        if (!post) return res.status(404).json({ message: "Post not found" });
  
        await prisma.post.delete({
            where: { id },
        })

        res.status(200).json({message: 'Post deleted!'})
       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Failed to delete post!'})
    }
}