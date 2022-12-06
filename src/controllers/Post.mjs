import Post from '../models/Post.mjs'

async function getAllPosts (request, response) {
  try {
    if (request.token?.id) {
      const posts = await Post.find({
        message: new RegExp(request.query.search, 'i')
      })
        .skip((request.query.offset - 1) * 10)
        .limit(10)
      response.json({
        message: 'got all your messages',
        data: posts,
        success: true
      })
    } else {
      response.status(401).send({
        message: 'You must be logged in to get messages',
        success: false,
        data: null
      })
    }
  } catch (error) {
    response.status(400).send({
      message: error.message,
      success: false,
      data: error
    })
  }
}

async function createPost (request, response) {
  const postmsg = {
    from: request.token.id,
    to: request.body.to,
    message: request.body.message,
    user: request.token.id
  }
  try {
    const res = await Post.create(postmsg)
    response.send({ success: true, newDoc: res })
  } catch (error) {
    // TODO check kind of error

    response.status(400).send({
      success: false, error: error.message
    })
  }
}

async function getPost (request, response) {
  const post = await Post.find({ _id: request.params.id })
  response.json(post)
}

const PostController = {
  getAllPosts,
  createPost,
  getPost
}

export default PostController
