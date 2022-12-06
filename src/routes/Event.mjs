import express from 'express'
import EventController from '../controllers/Event'
import * as auth from '../utilities/auth.mjs'

const router = express.Router()

const {
  getAllEvents,
  createEvent,
  getEvent
} = EventController

router.route('/').get(getAllEvents).post(auth.isLoggedIn, createEvent)

router.route('/:id').get(getEvent)

export default router
