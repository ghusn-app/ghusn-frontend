import { Router } from 'express'

import {
  signup,
  login,
  googleSignupController,
  googleLoginController,
  forgotPassword,
  verifyOtpController,
  resetPasswordController,
} from '../controllers/authController.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/google/signup', googleSignupController)
router.post('/google/login', googleLoginController)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtpController)
router.post('/reset-password', resetPasswordController)

export default router
