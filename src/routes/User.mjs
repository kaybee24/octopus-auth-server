import express from 'express'
import {
  getAllUsers,
  createUser,
  login,
  logout,
  me
} from '../controllers/User'

const router = express.Router()

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router.post('/login', login)
router.get('/me', me)
router.get('/logout', logout)

export default router
