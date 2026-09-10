import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import PasswordInput from '../../components/ui/PasswordInput'

import {
  UserIcon,
  EmailIcon,
  LockIcon,
} from '../../components/ui/Icons'

import ghusnLogo from '../../assets/branch.png'
import registerBg from '../../assets/register-bg.png'


function Register() {
  const navigate = useNavigate()

  // =========================
  // Form State
  // =========================

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')


  // =========================
  // Handle Input Changes
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Remove error when user starts typing
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

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'يرجى إدخال الاسم الأول'
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'يرجى إدخال الاسم الأخير'
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password =
        'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل'
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        'يرجى تأكيد كلمة المرور'
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        'كلمتا المرور غير متطابقتين'
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
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        // 422: أخطاء تحقق مفصّلة قادمة من السيرفر (detail[].msg)
        if (Array.isArray(data.detail)) {
          const firstError = data.detail[0]
          setServerError(firstError?.msg || 'يرجى التحقق من البيانات المدخلة')
        } else {
          setServerError(
            data.detail ||
              data.message ||
              'حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى'
          )
        }
        return
      }

      // نجاح إنشاء الحساب (201)
      console.log('Register success:', data)

      // تخزين التوكن (المستخدم يصبح مسجّل دخول تلقائيًا بعد التسجيل)
      if (data.access_token) {
        localStorage.setItem('ghosn_token', data.access_token)
      }

      if (data.refresh_token) {
        localStorage.setItem('ghosn_refresh_token', data.refresh_token)
      }

      // التوجيه للصفحة الرئيسية بعد النجاح
      navigate('/login')
    } catch (error) {
      console.error('Register request failed:', error)
      setServerError(
        'تعذر الاتصال بالسيرفر، تحقق من اتصالك بالإنترنت'
      )
    } finally {
      setIsSubmitting(false)
    }
  }


  // =========================
  // Google Sign-Up (real integration)
  // =========================
  // الباك إند يتوقع "id_token" (JWT من Google) وليس access_token،
  // لذلك نستخدم مكوّن <GoogleLogin> الرسمي الذي يُرجع credential = id_token

  const handleGoogleSuccess = async (credentialResponse) => {
    setServerError('')
    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google/signup`,
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
          setServerError(firstError?.msg || 'تعذر إنشاء الحساب عبر Google')
        } else {
          setServerError(
            data.detail ||
              data.message ||
              'تعذر إنشاء الحساب عبر Google، حاول مرة أخرى'
          )
        }
        return
      }

      console.log('Google signup success:', data)

      if (data.access_token) {
        localStorage.setItem('ghosn_token', data.access_token)
      }

      if (data.refresh_token) {
        localStorage.setItem('ghosn_refresh_token', data.refresh_token)
      }

      navigate('/login')
    } catch (error) {
      console.error('Google signup request failed:', error)
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
      className="min-h-screen bg-white"
    >

      <div
        className="
          flex
          min-h-screen
          w-full
          flex-col
          lg:flex-row
        "
      >


        {/* =====================================================
            RIGHT SIDE
            Background Image + Overlay Content
        ===================================================== */}

        <section
          className="
            relative
            hidden
            min-h-screen
            w-1/2
            overflow-hidden
            lg:block
          "
        >

          <img
            src={registerBg}
            alt="غصن"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* Dark gradient so text stays readable over the photo */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-1/2
              bg-gradient-to-t
              from-black/70
              via-black/20
              to-transparent
            "
          />

          {/* Logo + Marketing copy, stacked together, bottom-right of the image */}

          <div
            className="
              absolute
              inset-x-0
              bottom-8
              flex
              flex-col
              items-start
              px-8
              text-right
            "
          >

            {/* Logo badge */}

            <div
              className="
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-2xl
                bg-white
                shadow-lg
              "
            >

              <img
                src={ghusnLogo}
                alt="شعار غصن"
                className="
                  h-12
                  w-12
                  object-contain
                "
              />

            </div>

            <h2
              className="
                text-3xl
                font-bold
                leading-snug
                text-white
              "
            >
              نبتة سليمة, قرار اسرع
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-white/90
              "
            >
              مصمم لكل مزارع يهتم في تفاصيل ارضه.
              <br />
              غصن يمنحك الوضوح الي بستانك يستحقه
            </p>

          </div>

        </section>


        {/* =====================================================
            LEFT SIDE
            Register Form
        ===================================================== */}

        <section
          className="
            flex
            min-h-screen
            w-full
            items-center
            justify-center
            bg-gray-50
            px-5
            py-10
            sm:px-8
            lg:w-1/2
          "
        >

          <div
            className="
              w-full
              max-w-[480px]
              rounded-3xl
              bg-white
              p-6
              shadow-xl
              shadow-black/5
              sm:p-10
            "
          >


            {/* =================================================
                Header
            ================================================= */}

            <header className="mb-8">


              {/* Back Button */}

              <div className="mb-5 flex justify-start">

                <Link
                  to="/login"
                  aria-label="العودة إلى تسجيل الدخول"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-[#5B961E]
                    transition
                    duration-200
                    hover:bg-[#5B961E]/10
                  "
                >

                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    <path d="M5 12h14" />

                    <path d="M13 6l6 6-6 6" />

                  </svg>

                </Link>

              </div>


              {/* Title */}

              <div className="text-right">

                <h1
                  className="
                    text-2xl
                    font-bold
                    text-[#5B961E]
                  "
                >
                  حساب جديد
                </h1>


                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-400
                  "
                >
                  عبئ بياناتك عشان نجهزلك تشخيصات ونصائح
                  مناسبة لمنطقتك
                </p>

              </div>

            </header>


            {/* =================================================
                Register Form
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >


              {/* =========================
                  First Name + Last Name
              ========================= */}

              <div className="grid grid-cols-2 gap-4">

                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  label="الاسم الأول"
                  placeholder="الاسم الأول"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  icon={<UserIcon />}
                />

                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="الاسم الأخير"
                  placeholder="الاسم الأخير"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  icon={<UserIcon />}
                />

              </div>


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
                  Confirm Password
              ========================= */}

              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="تأكيد كلمة المرور"
                placeholder="تأكيد كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={<LockIcon />}
              />


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
                  Submit Button
              ========================= */}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2"
              >
                {isSubmitting ? 'جارٍ إنشاء الحساب...' : 'انشاء حساب'}
              </Button>

            </form>


            {/* =================================================
                Divider
            ================================================= */}

            <div
              className="
                my-6
                flex
                items-center
                gap-3
              "
            >

              <span className="h-px flex-1 bg-gray-200" />

              <span className="text-sm text-gray-400">
                أو
              </span>

              <span className="h-px flex-1 bg-gray-200" />

            </div>


            {/* =================================================
                Google Sign-Up
            ================================================= */}

            <div className="flex justify-center">

              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                shape="pill"
                size="large"
                width="400"
                text="continue_with"
                locale="ar"
              />

            </div>


            {/* =================================================
                Login Link
            ================================================= */}

            <p
              className="
                mt-10
                text-center
                text-sm
                text-gray-500
              "
            >

              لديك حساب بالفعل؟

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
                تسجيل دخول
              </Link>

            </p>


          </div>

        </section>


      </div>

    </main>
  )
}


export default Register