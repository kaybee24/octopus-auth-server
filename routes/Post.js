import express from "express"
import PostController from "../controllers/Post"
import * as auth from "../utilities/auth"

const router = express.Router()

const {
    getAllPosts,
    createPost,
    getPost,
} = PostController

router.route("/").get(getAllPosts).post(auth.isLoggedIn, createPost)

router.route("/:id").get(getPost)

export default router