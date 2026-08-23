import { useLocation, useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'

import verifyEmailIllustration from '../../assets/verify-email.png'


function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()

  // =========================
  // Get the email to display
  // =========================
  // أولوية القراءة:
  // 1) من الصفحة السابقة عبر navigate(..., { state: { email } })
  // 2) من localStorage (احتياطي، في حال تحديث الصفحة)
  // 3) نص افتراضي في حال عدم توفر أي منهما

  const email =
    location.state?.email ||
    localStorage.getItem('ghosn_email') ||
    'بريدك الإلكتروني'


  // =========================
  // Continue
  // =========================

  const handleContinue = () => {
    // التالي في التدفق هو صفحة إدخال رمز التحقق (OTP)
    navigate('/otp-verification', { state: { email } })
  }


  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white px-5 py-10 sm:px-8"
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
            src={verifyEmailIllustration}
            alt="تحقق من بريدك الإلكتروني"
            className="
              h-auto
              w-full
              max-w-[240px]
              object-contain
            "
          />

        </div>


        {/* =========================
            Header
        ========================= */}

        <header className="mb-6 text-center">

          <h1
            className="
              text-2xl
              font-extrabold
              text-black
            "
          >
            تحقق من بريدك الإلكتروني
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            "
          >
            لقد أرسلنا رسالة إلى بريدك الإلكتروني إلى العنوان
            المسجل
          </p>

        </header>


        {/* =========================
            Message with highlighted email
        ========================= */}

        <p
          className="
            mx-auto
            mb-8
            max-w-[320px]
            text-center
            text-sm
            leading-7
            text-gray-500
          "
        >
          تم إرسال رمز التحقق إلى{' '}
          <span
            dir="ltr"
            className="
              inline-block
              font-bold
              text-[#5B961E]
            "
          >
            {email}
          </span>
          <br />
          يرجى التحقق من صندوق الوارد أو مجلد الرسائل غير
          المرغوب فيها (Spam)
        </p>


        {/* =========================
            Continue Button
        ========================= */}

        <Button
          type="button"
          onClick={handleContinue}
        >
          متابعة
        </Button>

      </div>

    </main>
  )
}

export default VerifyEmail