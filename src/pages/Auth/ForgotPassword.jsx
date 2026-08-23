import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import otpImage from '../../assets/otp-verification.png'

function OtpVerification() {
  const navigate = useNavigate()
  const location = useLocation()

  // =========================
  // Email coming from the previous screen
  // =========================
  // أولوية القراءة:
  // 1) من الصفحة السابقة عبر navigate(..., { state: { email } })
  // 2) من localStorage (احتياطي، في حال تحديث الصفحة)
  // 3) نص افتراضي في حال عدم توفر أي منهما

  const email =
    location.state?.email ||
    localStorage.getItem('ghosn_email') ||
    'بريدك الإلكتروني'


  const OTP_LENGTH = 5

  const [otp, setOtp] = useState(
    Array(OTP_LENGTH).fill('')
  )

  const [error, setError] = useState('')

  const inputRefs = useRef([])

  // =========================
  // Handle OTP Change
  // =========================

  const handleChange = (index, value) => {
    // السماح بالأرقام فقط
    const numericValue = value.replace(/\D/g, '')

    if (!numericValue) {
      setOtp((prev) => {
        const newOtp = [...prev]
        newOtp[index] = ''
        return newOtp
      })

      return
    }

    setOtp((prev) => {
      const newOtp = [...prev]
      newOtp[index] = numericValue.slice(-1)
      return newOtp
    })

    setError('')

    // الانتقال للخانة التالية
    if (
      index < OTP_LENGTH - 1 &&
      numericValue
    ) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // =========================
  // Handle Key Down
  // =========================

  const handleKeyDown = (index, event) => {
    if (
      event.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus()
    }

    if (
      event.key === 'ArrowLeft' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus()
    }

    if (
      event.key === 'ArrowRight' &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // =========================
  // Handle Paste
  // =========================

  const handlePaste = (event) => {
    event.preventDefault()

    const pastedValue = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH)

    if (!pastedValue) {
      return
    }

    const newOtp = Array(OTP_LENGTH).fill('')

    pastedValue
      .split('')
      .forEach((digit, index) => {
        newOtp[index] = digit
      })

    setOtp(newOtp)
    setError('')

    const nextIndex = Math.min(
      pastedValue.length,
      OTP_LENGTH - 1
    )

    inputRefs.current[nextIndex]?.focus()
  }

  // =========================
  // Validate OTP
  // =========================

  const validateOtp = () => {
    const otpValue = otp.join('')

    if (otpValue.length !== OTP_LENGTH) {
      setError('يرجى إدخال رمز التحقق كاملًا')
      return false
    }

    if (!/^\d+$/.test(otpValue)) {
      setError('رمز التحقق يجب أن يحتوي على أرقام فقط')
      return false
    }

    return true
  }

  // =========================
  // Submit
  // =========================

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateOtp()) {
      return
    }

    const otpValue = otp.join('')

    console.log('OTP:', otpValue)
    console.log('Verifying for email:', email)

    // الانتقال إلى صفحة إعادة تعيين كلمة المرور
    navigate('/reset-password', { state: { email } })
  }

  // =========================
  // Resend OTP
  // =========================

  const handleResend = () => {
    console.log('Resend OTP to:', email)

    setOtp(Array(OTP_LENGTH).fill(''))
    setError('')

    inputRefs.current[0]?.focus()

    // سيتم ربطها لاحقًا مع API
  }

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-white
        flex
        items-center
        justify-center
        px-5
        py-10
      "
    >

      <section
        className="
          w-full
          max-w-[520px]
          flex
          flex-col
          items-center
          text-center
        "
      >

        {/* =========================
            Illustration
        ========================= */}

        <div className="mb-7 flex justify-center">

          <img
            src={otpImage}
            alt="التحقق من رمز OTP"
            className="
              h-auto
              w-[280px]
              object-contain
              sm:w-[330px]
            "
          />

        </div>


        {/* =========================
            Title
        ========================= */}

        <h1
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-black
          "
        >
          أدخل رمز التحقق الخاص بك
        </h1>


        {/* =========================
            Subtitle (with the actual email)
        ========================= */}

        <p
          className="
            mt-3
            max-w-[390px]
            text-sm
            sm:text-base
            leading-7
            text-gray-500
          "
        >
          يرجى التحقق من بريدك الإلكتروني{' '}
          <span
            dir="ltr"
            className="
              inline-block
              font-bold
              text-[#5B961F]
            "
          >
            {email}
          </span>{' '}
          للاطلاع على رمز التحقق الذي أرسلناه ثم إدخاله هنا
        </p>


        {/* =========================
            OTP Form
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="
            mt-7
            w-full
            flex
            flex-col
            items-center
          "
        >

          {/* OTP Inputs */}

          <div
            dir="ltr"
            className="
              flex
              items-center
              justify-center
              gap-3
              sm:gap-4
            "
            onPaste={handlePaste}
          >

            {otp.map((digit, index) => (

              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(event) =>
                  handleChange(
                    index,
                    event.target.value
                  )
                }
                onKeyDown={(event) =>
                  handleKeyDown(
                    index,
                    event
                  )
                }
                aria-label={`رمز التحقق ${index + 1}`}
                className={`
                  h-14
                  w-14
                  rounded-lg
                  border
                  bg-white
                  text-center
                  text-xl
                  font-semibold
                  text-black
                  outline-none
                  transition
                  sm:h-14
                  sm:w-14
                  ${
                    error
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#5B961F] focus:ring-1 focus:ring-[#5B961F]'
                  }
                `}
              />

            ))}

          </div>


          {/* Error */}

          {error && (
            <p
              className="
                mt-3
                text-sm
                text-red-500
              "
            >
              {error}
            </p>
          )}


          {/* =========================
              Resend OTP
          ========================= */}

          <p
            className="
              mt-4
              text-sm
              text-gray-500
            "
          >
            لم يصلك الرمز؟

            <button
              type="button"
              onClick={handleResend}
              className="
                mr-1
                font-medium
                text-[#9AA3B2]
                transition
                hover:text-[#5B961F]
                hover:underline
              "
            >
              إعادة الإرسال خلال (59 ثانية)
            </button>
          </p>


          {/* =========================
              Continue Button
          ========================= */}

          <button
            type="submit"
            className="
              mt-7
              w-full
              max-w-[450px]
              rounded-lg
              bg-[#5B961F]
              py-4
              text-base
              font-bold
              text-white
              shadow-sm
              transition
              hover:bg-[#4f851b]
              active:scale-[0.99]
            "
          >
            متابعة
          </button>

        </form>

      </section>

    </main>
  )
}

export default OtpVerification