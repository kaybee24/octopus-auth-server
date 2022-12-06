import express from 'express'
import PostController from '../controllers/Post.mjs'
import * as auth from '../utilities/auth.mjs'

const router = express.Router()

const {
  getAllPosts,
  createPost,
  getPost
} = PostController

router.route('/').get(getAllPosts).post(auth.isLoggedIn, createPost)

router.route('/:id').get(getPost)

export default router
