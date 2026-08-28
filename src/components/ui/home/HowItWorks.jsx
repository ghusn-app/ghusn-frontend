import { Link } from 'react-router-dom'
import {
  UserPlus,
  IdCard,
  Camera,
  ScanSearch,
  Sparkles,
} from 'lucide-react'

import dashboardMockup from '../../../assets/laptop-mockup.png'
// =========================
// Steps Data
// =========================
// Order carries real information here (each step depends on the one
// before it), so numbering the steps is appropriate.

const steps = [
  {
    number: 1,
    title: 'إنشاء حساب',
    description:
      'سجّلي دخولك بسهولة بواسطة رقم جوالك أو بريدك الإلكتروني.',
    icon: UserPlus,
  },
  {
    number: 2,
    title: 'تعريف حسابك',
    description:
      'أضيفي المعلومات الأساسية عن مزرعتك وأشجار الزيتون الخاصة بك.',
    icon: IdCard,
  },
  {
    number: 3,
    title: 'تصوير الشجرة',
    description:
      'صوّري الجزء المتضرر من الشجرة عبر كاميرا جوالك مباشرة من موقع الحقل.',
    icon: Camera,
  },
  {
    number: 4,
    title: 'تحليل الصورة',
    description:
      'يقوم نظام الذكاء الاصطناعي بتحليل الصورة وكشف علامات المرض أو الإصابة.',
    icon: ScanSearch,
  },
  {
    number: 5,
    title: 'احصل على التشخيص',
    description:
      'تحصلين على نتيجة التشخيص مع توصيات عملية مناسبة لحالة الشجرة.',
    icon: Sparkles,
  },
]

function StepCard({ step, align }) {
  const Icon = step.icon

  return (
    <div
      className={`
        flex
        max-w-xs
        gap-4
        ${align === 'right' ? 'flex-row-reverse text-right' : 'flex-row text-right'}
      `}
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#5B961E]
          text-sm
          font-bold
          text-white
        "
      >
        {step.number}
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-base font-bold text-black">
          <Icon className="h-4 w-4 text-[#5B961E]" aria-hidden="true" />
          {step.title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          {step.description}
        </p>
      </div>
    </div>
  )
}

function HowItWorks() {
  const [step1, step2, step3, step4, step5] = steps

  return (
    <section
      dir="rtl"
      id="how-it-works"
      className="
        bg-white
        px-5
        py-16
        sm:py-20
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-black sm:text-3xl">
            كيف تعمل المنصة؟
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            رحلة بسيطة وموثّقة للحصول على استشارة إدارية احترافية في دقائق
            محدودة
          </p>
        </header>

        {/* Steps + mockup layout */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-[1fr_auto_1fr]
            lg:gap-6
          "
        >
          {/* Right column (steps 1-2 in RTL reading order) */}
          <div className="flex flex-col gap-10 lg:items-end">
            <StepCard step={step1} align="right" />
            <StepCard step={step2} align="right" />
          </div>

          {/* Center laptop mockup */}
          <div className="mx-auto flex flex-col items-center">
            <img
              src={dashboardMockup}
              alt="لوحة تحكم منصة غُصن"
              className="
                w-full
                max-w-[320px]
                object-contain
                sm:max-w-[360px]
              "
            />

            <p className="mt-4 text-sm font-bold text-black">
              احصل على التشخيص
            </p>
            <p className="mt-1 max-w-[220px] text-center text-xs leading-5 text-gray-500">
              حمّل صورة الشجرة واحصل على تشخيص مدعّم بالذكاء الاصطناعي خلال
              ثوانٍ قليلة
            </p>

            <Link
              to="/diagnose"
              className="
                mt-4
                rounded-full
                bg-[#5B961E]
                px-6
                py-2.5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-[#4c7f18]
              "
            >
              ابدأ التشخيص الآن
            </Link>
          </div>

          {/* Left column (steps 3-5) */}
          <div className="flex flex-col gap-10 lg:items-start">
            <StepCard step={step3} align="left" />
            <StepCard step={step4} align="left" />
            <StepCard step={step5} align="left" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks