export const normalizeEmail = (email = '') => email.trim().toLowerCase()

export const isValidEmail = (email = '') =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000)).slice(0, 5)
