import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'
import PasswordInput from '../../components/ui/PasswordInput'

import { LockIcon } from '../../components/ui/Icons'

import resetPasswordIllustration from '../../assets/reset-password.jpg'


function ResetPassword() {
  const navigate = useNavigate()

  // =========================
  // Form State
  // =========================

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')


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

    setSuccessMessage('')
  }


  // =========================
  // Form Validation
  // =========================

  const validateForm = () => {
    const newErrors = {}

    // New Password
    if (!formData.password) {
      newErrors.password = 'يرجى إدخال كلمة المرور الجديدة'
    } else if (formData.password.length < 8) {
      newErrors.password =
        'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل'
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        'يرجى تأكيد كلمة المرور الجديدة'
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

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    // Temporary
    // سيتم استبدال هذا لاحقًا بطلب API فعلي لتغيير كلمة المرور
    console.log('Reset password:', formData)

    setSuccessMessage('تم تغيير كلمة المرور بنجاح')

    // بعد نجاح العملية يمكن توجيه المستخدم لصفحة تسجيل الدخول
    setTimeout(() => {
      navigate('/login')
    }, 1500)
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
            src={resetPasswordIllustration}
            alt="إعادة تعيين كلمة المرور"
            className="
              h-auto
              w-full
              max-w-[280px]
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
            إعادة تعيين كلمة المرور
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            "
          >
            أدخل كلمة المرور الجديدة لحسابك
          </p>

        </header>


        {/* =========================
            Reset Password Form
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
        >

          {/* New Password */}

          <PasswordInput
            id="password"
            name="password"
            label="كلمة المرور الجديدة"
            placeholder="كلمة المرور الجديدة"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={<LockIcon />}
          />


          {/* Confirm New Password */}

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="تأكيد كلمة المرور الجديدة"
            placeholder="تأكيد كلمة المرور الجديدة"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={<LockIcon />}
          />


          {/* Success Message */}

          {successMessage && (
            <p className="text-sm font-medium text-[#5B961E]">
              {successMessage}
            </p>
          )}


          {/* Submit Button */}

          <Button
            type="submit"
            className="mt-2"
          >
            حفظ كلمة المرور
          </Button>

        </form>

      </div>

    </main>
  )
}

export default ResetPassword