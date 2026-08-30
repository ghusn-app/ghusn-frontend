import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import PasswordInput from '../../components/ui/PasswordInput'

import {
  EmailIcon,
  LockIcon,
} from '../../components/ui/Icons'

import ghusnLogo from '../../assets/branch.png'
import oliveBackground from '../../assets/olive-background.png'


function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')


  // =========================
  // Handle Input Changes
  // =========================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))

    setServerError('')
  }


  // =========================
  // Form Validation
  // =========================

  const validateForm = () => {
    const newErrors = {}

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'يرجى إدخال البريد الإلكتروني'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح'
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'يرجى إدخال كلمة المرور'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }


  // =========================
  // Submit
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setServerError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setServerError(
          data.detail ||
            data.message ||
            'حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى'
        )
        return
      }

      console.log('Login success:', data)

      if (data.access_token) {
        localStorage.setItem('ghosn_token', data.access_token)
      }

      // التوجيه للصفحة الرئيسية بعد النجاح
      // navigate('/dashboard')
    } catch (error) {
      console.error('Login request failed:', error)
      setServerError(
        'تعذر الاتصال بالسيرفر، تحقق من اتصالك بالإنترنت'
      )
    } finally {
      setIsSubmitting(false)
    }
  }


  // =========================
  // Google Login (real integration)
  // =========================
  // نفس منطق Register.jsx: الباك إند يتوقع "id_token"
  // لذلك نستخدم مكوّن <GoogleLogin> الرسمي بدل useGoogleLogin

  const handleGoogleSuccess = async (credentialResponse) => {
    setServerError('')
    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_token: credentialResponse.credential,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          const firstError = data.detail[0]
          setServerError(firstError?.msg || 'تعذر تسجيل الدخول عبر Google')
        } else {
          setServerError(
            data.detail ||
              data.message ||
              'تعذر تسجيل الدخول عبر Google، حاول مرة أخرى'
          )
        }
        return
      }

      console.log('Google login success:', data)

      if (data.access_token) {
        localStorage.setItem('ghosn_token', data.access_token)
      }

      if (data.refresh_token) {
        localStorage.setItem('ghosn_refresh_token', data.refresh_token)
      }

      // التوجيه للصفحة الرئيسية بعد النجاح
      // navigate('/dashboard')
    } catch (error) {
      console.error('Google login request failed:', error)
      setServerError(
        'تعذر الاتصال بالسيرفر، تحقق من اتصالك بالإنترنت'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleError = () => {
    setServerError('تعذر تسجيل الدخول عبر Google، حاول مرة أخرى')
  }


  return (
    <main
      dir="rtl"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: `url(${oliveBackground})`,
      }}
    >

      {/* =========================
          Background Overlay
      ========================= */}

      <div
        className="
          absolute
          inset-0
          bg-black/10
        "
      />


      {/* =========================
          Main Container
      ========================= */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-center
          justify-center
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >


        {/* =========================
            Login Card
        ========================= */}

        <section
          className="
            w-full
            max-w-[465px]
            rounded-[28px]
            bg-white
            px-7
            py-8
            shadow-2xl
            sm:px-10
            sm:py-9
            lg:px-10
            lg:py-8
          "
        >


          {/* =========================
              Logo
          ========================= */}

          <div
            className="
              mb-6
              flex
              justify-center
            "
          >
            <img
              src={ghusnLogo}
              alt="شعار غصن"
              className="
                h-[95px]
                w-[86px]
                object-contain
              "
            />
          </div>


          {/* =========================
              Header
          ========================= */}

          <header className="mb-7 text-right">

            <h1
              className="
                text-[23px]
                font-bold
                leading-8
                text-[#5B961E]
              "
            >
              أهلًا بك، خَلّي زيتونتك بأمان
            </h1>

            <p
              className="
                mt-2
                text-[14px]
                leading-6
                text-gray-400
              "
            >
              سجل دخولك لحفظ تشخيصاتك ومتابعة
              أشجارك بمرور الوقت.
            </p>

          </header>


          {/* =========================
              Login Form
          ========================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >


            {/* =========================
                Email
            ========================= */}

            <Input
              id="email"
              name="email"
              type="email"
              label="البريد الإلكتروني"
              placeholder="أدخل البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<EmailIcon />}
            />


            {/* =========================
                Password
            ========================= */}

            <PasswordInput
              id="password"
              name="password"
              label="كلمة المرور"
              placeholder="أدخل كلمة المرور"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<LockIcon />}
            />


            {/* =========================
                Remember + Forgot
            ========================= */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
                pt-0
              "
            >

              {/* Forgot Password */}

              <Link
                to="/forgot-password"
                className="
                  text-sm
                  font-medium
                  text-[#5B961E]
                  transition
                  hover:underline
                "
              >
                هل نسيت كلمة المرور؟
              </Link>


              {/* Remember Me */}

              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  text-sm
                  text-gray-500
                "
              >

                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="
                    h-4
                    w-4
                    cursor-pointer
                    rounded
                    border-gray-300
                    accent-[#5B961E]
                  "
                />

                <span>
                  تذكرني
                </span>

              </label>

            </div>


            {/* =========================
                Server Error
            ========================= */}

            {serverError && (
              <p
                className="
                  text-sm
                  font-medium
                  text-red-500
                "
              >
                {serverError}
              </p>
            )}


            {/* =========================
                Login Button
            ========================= */}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                mt-2
                w-full
              "
            >
              {isSubmitting ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>

          </form>


          {/* =========================
              Divider
          ========================= */}

          <div
            className="
              my-6
              flex
              items-center
              gap-3
            "
          >

            <span
              className="
                h-px
                flex-1
                bg-gray-300
              "
            />

            <span
              className="
                text-sm
                text-gray-400
              "
            >
              أو
            </span>

            <span
              className="
                h-px
                flex-1
                bg-gray-300
              "
            />

          </div>


          {/* =========================
              Google Login
          ========================= */}

          <div className="flex justify-center">

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              shape="pill"
              size="large"
              width="100%"
              text="continue_with"
              locale="ar"
            />

          </div>


          {/* =========================
              Register
          ========================= */}

          <p
            className="
              mt-10
              text-center
              text-sm
              text-gray-500
            "
          >

            ليس لديك حساب؟

            <Link
              to="/register"
              className="
                mr-1
                font-bold
                text-[#5B961E]
                transition
                hover:underline
              "
            >
              إنشاء حساب
            </Link>

          </p>


        </section>

      </div>

    </main>
  )
}

export default Login