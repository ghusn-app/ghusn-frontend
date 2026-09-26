import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { readUsers, writeUsers } from '../utils/store.js'
import { generateOtp, isValidEmail, normalizeEmail } from '../utils/otp.js'

const JWT_SECRET = process.env.JWT_SECRET || 'ghosn-dev-secret'
const otpStore = new Map()

const createTokenPair = (user) => ({
  access_token: jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' },
  ),
  refresh_token: jwt.sign(
    { id: user.id, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: '30d' },
  ),
})

const toPublicUser = (user) => ({
  id: user.id,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  provider: user.provider || 'local',
})

const hashGoogleIdToken = (idToken = '') =>
  crypto.createHash('sha256').update(idToken).digest('hex').slice(0, 16)

export const registerUser = async (payload) => {
  const { first_name, last_name, email, password, confirm_password } = payload || {}

  if (!first_name?.trim() || !last_name?.trim()) {
    throw Object.assign(new Error('الاسم الأول والأخير مطلوبان'), { status: 422 })
  }

  if (!email || !isValidEmail(email)) {
    throw Object.assign(new Error('يرجى إدخال بريد إلكتروني صحيح'), { status: 422 })
  }

  if (!password || password.length < 8) {
    throw Object.assign(new Error('كلمة المرور يجب أن تكون 8 أحرف على الأقل'), { status: 422 })
  }

  if (password !== confirm_password) {
    throw Object.assign(new Error('كلمتا المرور غير متطابقتين'), { status: 422 })
  }

  const normalizedEmail = normalizeEmail(email)
  const users = await readUsers()

  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    throw Object.assign(new Error('هذا البريد الإلكتروني مسجل بالفعل'), { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    id: crypto.randomUUID(),
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    provider: 'local',
    created_at: new Date().toISOString(),
  }

  users.push(newUser)
  await writeUsers(users)

  return {
    message: 'تم إنشاء الحساب بنجاح',
    user: toPublicUser(newUser),
    ...createTokenPair(newUser),
  }
}

export const loginUser = async (payload) => {
  const { email, password } = payload || {}

  if (!email || !password) {
    throw Object.assign(new Error('يرجى إدخال البريد الإلكتروني وكلمة المرور'), { status: 422 })
  }

  const normalizedEmail = normalizeEmail(email)
  const users = await readUsers()
  const user = users.find((item) => normalizeEmail(item.email) === normalizedEmail)

  if (!user) {
    throw Object.assign(new Error('بيانات الدخول غير صحيحة'), { status: 401 })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw Object.assign(new Error('بيانات الدخول غير صحيحة'), { status: 401 })
  }

  return {
    message: 'تم تسجيل الدخول بنجاح',
    user: toPublicUser(user),
    ...createTokenPair(user),
  }
}

export const googleSignup = async (payload) => {
  const { id_token } = payload || {}

  if (!id_token) {
    throw Object.assign(new Error('مطلوب id_token'), { status: 422 })
  }

  const users = await readUsers()
  const derivedEmail = `${hashGoogleIdToken(id_token)}@google.local`
  const existingUser = users.find((user) => normalizeEmail(user.email) === normalizeEmail(derivedEmail))

  if (!existingUser) {
    const newUser = {
      id: crypto.randomUUID(),
      first_name: 'Google',
      last_name: 'User',
      email: derivedEmail,
      password: await bcrypt.hash(`google-${Date.now()}`, 10),
      provider: 'google',
      created_at: new Date().toISOString(),
    }

    users.push(newUser)
    await writeUsers(users)

    return {
      message: 'تم تسجيل الحساب عبر جوجل بنجاح',
      user: toPublicUser(newUser),
      ...createTokenPair(newUser),
    }
  }

  return {
    message: 'تم تسجيل الحساب عبر جوجل بنجاح',
    user: toPublicUser(existingUser),
    ...createTokenPair(existingUser),
  }
}

export const googleLogin = async (payload) => {
  const { id_token } = payload || {}

  if (!id_token) {
    throw Object.assign(new Error('مطلوب id_token'), { status: 422 })
  }

  const users = await readUsers()
  const derivedEmail = `${hashGoogleIdToken(id_token)}@google.local`
  const user = users.find((item) => normalizeEmail(item.email) === normalizeEmail(derivedEmail))

  if (!user) {
    throw Object.assign(new Error('هذا الحساب غير مسجل في النظام'), { status: 401 })
  }

  return {
    message: 'تم تسجيل الدخول عبر جوجل بنجاح',
    user: toPublicUser(user),
    ...createTokenPair(user),
  }
}

export const requestResetOtp = async (payload) => {
  const { email } = payload || {}

  if (!email || !isValidEmail(email)) {
    throw Object.assign(new Error('يرجى إدخال بريد إلكتروني صحيح'), { status: 422 })
  }

  const normalizedEmail = normalizeEmail(email)
  const otp = generateOtp()
  otpStore.set(normalizedEmail, otp)

  return {
    message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني',
    otp,
  }
}

export const verifyOtp = async (payload) => {
  const { email, otp } = payload || {}

  if (!email || !otp) {
    throw Object.assign(new Error('يرجى إدخال البريد الإلكتروني ورمز التحقق'), { status: 422 })
  }

  const normalizedEmail = normalizeEmail(email)
  const currentOtp = otpStore.get(normalizedEmail)

  if (!currentOtp || currentOtp !== String(otp).trim()) {
    throw Object.assign(new Error('رمز التحقق غير صحيح أو منتهي الصلاحية'), { status: 400 })
  }

  otpStore.delete(normalizedEmail)

  return {
    message: 'تم التحقق من الرمز بنجاح',
  }
}

export const resetPassword = async (payload) => {
  const { email, otp, password, confirm_password } = payload || {}

  if (!email || !otp || !password || !confirm_password) {
    throw Object.assign(new Error('البيانات غير مكتملة'), { status: 422 })
  }

  const normalizedEmail = normalizeEmail(email)
  const currentOtp = otpStore.get(normalizedEmail)

  if (!currentOtp || currentOtp !== String(otp).trim()) {
    throw Object.assign(new Error('رمز التحقق غير صحيح أو منتهي الصلاحية'), { status: 400 })
  }

  if (password.length < 8) {
    throw Object.assign(new Error('كلمة المرور يجب أن تكون 8 أحرف على الأقل'), { status: 422 })
  }

  if (password !== confirm_password) {
    throw Object.assign(new Error('كلمتا المرور غير متطابقتين'), { status: 422 })
  }

  const users = await readUsers()
  const userIndex = users.findIndex((user) => normalizeEmail(user.email) === normalizedEmail)

  if (userIndex !== -1) {
    users[userIndex].password = await bcrypt.hash(password, 10)
    await writeUsers(users)
  }

  otpStore.delete(normalizedEmail)

  return {
    message: 'تم تحديث كلمة المرور بنجاح',
  }
}
