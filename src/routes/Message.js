import express from 'express'
import MessageController from '../controllers/Message'
import * as auth from '../utilities/auth'

const router = express.Router()

const {
  getAllMessages,
  createMessage,
  getMessage
} = MessageController

router.route('/').get(getAllMessages).post(auth.isLoggedIn, createMessage)

router.route('/:id').get(getMessage)

export default router
