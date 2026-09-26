import {
  registerUser,
  loginUser,
  googleSignup,
  googleLogin,
  requestResetOtp,
  verifyOtp,
  resetPassword,
} from '../services/authService.js'

export const signup = async (req, res) => {
  try {
    const result = await registerUser(req.body)
    return res.status(201).json(result)
  } catch (error) {
    const status = Number(error.status) || 400
    return res.status(status).json({
      detail: error.message || 'حدث خطأ أثناء إنشاء الحساب',
    })
  }
}

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body)
    return res.status(200).json(result)
  } catch (error) {
    const status = Number(error.status) || 400
    return res.status(status).json({
      detail: error.message || 'حدث خطأ أثناء تسجيل الدخول',
    })
  }
}

export const googleSignupController = async (req, res) => {
  try {
    const result = await googleSignup(req.body)
    return res.status(201).json(result)
  } catch (error) {
    const status = Number(error.status) || 400
    return res.status(status).json({
      detail: error.message || 'تعذر إنشاء الحساب عبر Google',
    })
  }
}

export const googleLoginController = async (req, res) => {
  try {
    const result = await googleLogin(req.body)
    return res.status(200).json(result)
  } catch (error) {
    const status = Number(error.status) || 400
    return res.status(status).json({
      detail: error.message || 'تعذر تسجيل الدخول عبر Google',
    })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const result = await requestResetOtp(req.body)
    return res.status(200).json(result)
  } catch (error) {
    const status = Number(error.status) || 400
    return res.status(status).json({
      detail: error.message || 'حدث خطأ أثناء إرسال الطلب',
    })
  }
}

export const verifyOtpController = async (req, res) => {
  try {
    const result = await verifyOtp(req.body)
    return res.status(200).json(result)
  } catch (error) {
    const status = Number(error.status) || 400
    return res.status(status).json({
      detail: error.message || 'حدث خطأ أثناء التحقق من الرمز',
    })
  }
}

export const resetPasswordController = async (req, res) => {
  try {
    const result = await resetPassword(req.body)
    return res.status(200).json(result)
  } catch (error) {
    const status = Number(error.status) || 400
    return res.status(status).json({
      detail: error.message || 'حدث خطأ أثناء تحديث كلمة المرور',
    })
  }
}
