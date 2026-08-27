import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { EmailIcon } from '../../components/ui/Icons'

import forgotPasswordIllustration from '../../assets/forget-password.png'

function ForgotPassword() {
  const navigate = useNavigate()

  // =========================
  // Form State
  // =========================

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // =========================
  // Handle Input Change
  // =========================

  const handleChange = (event) => {
    setEmail(event.target.value)

    setError('')
    setServerError('')
  }

  // =========================
  // Validation
  // =========================

  const validateForm = () => {
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setError('يرجى إدخال البريد الإلكتروني')
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('يرجى إدخال بريد إلكتروني صحيح')
      return false
    }

    return true
  }

  // =========================
  // Submit
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setServerError('')

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

      // Check API URL
      if (!apiBaseUrl) {
        throw new Error(
          'VITE_API_BASE_URL غير موجود في ملف .env'
        )
      }

      const response = await fetch(
        `${apiBaseUrl}/auth/forgot-password`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      )

      // Try to read JSON response
      let data = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      // =========================
      // Server Error
      // =========================

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          const firstError = data.detail[0]

          setServerError(
            firstError?.msg ||
              'يرجى التحقق من البريد الإلكتروني'
          )
        } else {
          setServerError(
            data.detail ||
              data.message ||
              'حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى'
          )
        }

        return
      }

      // =========================
      // Success
      // =========================

      console.log(
        'Forgot password success:',
        data
      )

      // Store email for the next steps
      localStorage.setItem(
        'ghosn_email',
        email.trim()
      )

      // Navigate to email verification page
      navigate('/verify-email', {
        state: {
          email: email.trim(),
        },
      })

    } catch (err) {
      console.error(
        'Forgot password request failed:',
        err
      )

      setServerError(
        'تعذر الاتصال بالسيرفر، تحقق من اتصالك بالإنترنت'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // =========================
  // UI
  // =========================

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-white
        px-5
        py-10
        sm:px-8
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-5rem)]
          w-full
          max-w-[420px]
          flex-col
          justify-center
        "
      >

        {/* =========================
            Illustration
        ========================= */}

        <div className="mb-6 flex justify-center">
          <img
            src={forgotPasswordIllustration}
            alt="نسيت كلمة المرور"
            className="
              h-auto
              w-full
              max-w-[260px]
              object-contain
            "
          />
        </div>


        {/* =========================
            Header
        ========================= */}

        <header className="mb-8 text-center">

          <h1
            className="
              text-2xl
              font-extrabold
              text-black
            "
          >
            نسيت كلمة المرور؟
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            "
          >
            أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق
            لإعادة تعيين كلمة المرور
          </p>

        </header>


        {/* =========================
            Forgot Password Form
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
        >

          {/* Email */}

          <Input
            id="email"
            name="email"
            type="email"
            label="البريد الإلكتروني"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={handleChange}
            error={error}
            icon={<EmailIcon />}
            autoComplete="email"
          />


          {/* =========================
              Server Error
          ========================= */}

          {serverError && (
            <p
              className="
                text-center
                text-sm
                font-medium
                text-red-500
              "
            >
              {serverError}
            </p>
          )}


          {/* =========================
              Submit Button
          ========================= */}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2"
          >
            {isSubmitting
              ? 'جارٍ الإرسال...'
              : 'إرسال رمز التحقق'}
          </Button>

        </form>


        {/* =========================
            Back to Login
        ========================= */}

        <p
          className="
            mt-8
            text-center
            text-sm
            text-gray-500
          "
        >
          تذكرت كلمة المرور؟

          <Link
            to="/login"
            className="
              mr-1
              font-bold
              text-[#5B961E]
              transition
              hover:underline
            "
          >
            تسجيل الدخول
          </Link>

        </p>

      </div>
    </main>
  )
}

export default ForgotPassword