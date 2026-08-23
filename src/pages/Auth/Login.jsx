import { useState } from 'react'
import { Link } from 'react-router-dom'

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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})


  // =========================
  // Handle Input Changes
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
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

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    // سيتم استبداله لاحقًا بطلب API
    console.log('Login:', formData)
  }


  // =========================
  // Google Login
  // =========================

  const handleGoogleLogin = () => {
    // سيتم استبداله لاحقًا بمنطق Google Authentication
    console.log('Google login clicked')
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
                Login Button
            ========================= */}

            <Button
              type="submit"
              className="
                mt-2
                w-full
              "
            >
              تسجيل الدخول
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

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-300
              bg-white
              py-3
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              active:scale-[0.99]
            "
          >

            {/* Google Icon */}

            <svg
              className="h-5 w-5"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >

              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"
              />

              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.5 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 15.9 3 8.9 7.6 6.3 14.7z"
              />

              <path
                fill="#4CAF50"
                d="M24 45c5.4 0 10.3-1.8 14-5l-6.5-5.5C29.5 36.4 26.9 37 24 37c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9 40.3 15.9 45 24 45z"
              />

              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.5 5.5c-.5.4 6.9-5 6.9-15.7 0-1.2-.1-2.3-.4-3.5z"
              />

            </svg>

            المتابعة من خلال Google

          </button>


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