import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'

import otpImage from '../../assets/otp-verification.png'

function OtpVerification() {
  const navigate = useNavigate()

  // =========================
  // OTP State
  // =========================

  const [otp, setOtp] = useState(['', '', '', '', ''])

  const [error, setError] = useState('')

  const [timeLeft, setTimeLeft] = useState(59)

  const inputRefs = useRef([])


  // =========================
  // Countdown
  // =========================

  useEffect(() => {
    if (timeLeft <= 0) {
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])


  // =========================
  // Handle OTP Change
  // =========================

  const handleChange = (index, event) => {
    const value = event.target.value

    // Allow only numbers
    if (!/^\d*$/.test(value)) {
      return
    }

    const newOtp = [...otp]

    // Keep only one digit
    newOtp[index] = value.slice(-1)

    setOtp(newOtp)
    setError('')

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }


  // =========================
  // Handle Backspace
  // =========================

  const handleKeyDown = (index, event) => {
    if (
      event.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus()
    }
  }


  // =========================
  // Handle Paste
  // =========================

  const handlePaste = (event) => {
    event.preventDefault()

    const pastedData = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 5)

    if (!pastedData) {
      return
    }

    const newOtp = ['', '', '', '', '']

    pastedData
      .split('')
      .forEach((digit, index) => {
        newOtp[index] = digit
      })

    setOtp(newOtp)
    setError('')

    const nextIndex = Math.min(
      pastedData.length,
      otp.length - 1
    )

    inputRefs.current[nextIndex]?.focus()
  }


  // =========================
  // Validate OTP
  // =========================

  const validateOtp = () => {
    const otpValue = otp.join('')

    if (otpValue.length !== 5) {
      setError('يرجى إدخال رمز التحقق كاملًا')
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

    // Temporary
    // سيتم استبداله لاحقًا بطلب API
    console.log('OTP:', otpValue)

    // الانتقال مؤقتًا إلى الصفحة التالية
    // غيّر المسار لاحقًا حسب صفحة المشروع
    navigate('/reset-password')
  }


  // =========================
  // Resend OTP
  // =========================

  const handleResend = () => {
    if (timeLeft > 0) {
      return
    }

    console.log('Resend OTP')

    setOtp(['', '', '', '', ''])
    setError('')
    setTimeLeft(59)

    inputRefs.current[0]?.focus()
  }


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
          max-w-[480px]
          flex-col
          items-center
          justify-center
        "
      >

        {/* =========================
            Illustration
        ========================= */}

        <div className="mb-6 flex justify-center">

          <img
            src={otpImage}
            alt="التحقق من رمز التحقق"
            className="
              h-auto
              w-[330px]
              max-w-full
              object-contain
            "
          />

        </div>


        {/* =========================
            Header
        ========================= */}

        <header className="mb-7 w-full text-center">

          <h1
            className="
              text-2xl
              font-bold
              text-black
            "
          >
            أدخل رمز التحقق الخاص بك
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-gray-600
            "
          >
            يرجى التحقق من بريدك الإلكتروني للاطلاع على رمز
            <br />
            التحقق الذي أرسلناه ثم إدخاله هنا
          </p>

        </header>


        {/* =========================
            OTP Form
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="w-full"
          noValidate
        >

          {/* OTP Inputs */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              direction-ltr
            "
            dir="ltr"
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
                maxLength={1}
                value={digit}
                onChange={(event) =>
                  handleChange(index, event)
                }
                onKeyDown={(event) =>
                  handleKeyDown(index, event)
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
                  ${
                    error
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }
                  focus:border-[#5B961E]
                  focus:ring-1
                  focus:ring-[#5B961E]
                `}
              />
            ))}

          </div>


          {/* Error */}

          {error && (
            <p
              className="
                mt-3
                text-center
                text-sm
                text-red-500
              "
            >
              {error}
            </p>
          )}


          {/* =========================
              Resend
          ========================= */}

          <div className="mt-4 text-center">

            <span className="text-sm text-gray-500">
              لم يصلك الرمز؟
            </span>

            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0}
              className={`
                mr-1
                text-sm
                font-semibold
                transition
                ${
                  timeLeft > 0
                    ? 'cursor-default text-gray-400'
                    : 'text-[#5B961E] hover:underline'
                }
              `}
            >
              إعادة الإرسال
            </button>

            {timeLeft > 0 && (
              <span className="text-sm font-semibold text-gray-400">
                ({timeLeft} ثانية)
              </span>
            )}

          </div>


          {/* =========================
              Continue Button
          ========================= */}

          <Button
            type="submit"
            className="mt-7"
          >
            متابعة
          </Button>

        </form>

      </div>

    </main>
  )
}

export default OtpVerification