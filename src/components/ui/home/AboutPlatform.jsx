import { ShieldCheck, ScanSearch, BrainCircuit, ClipboardList } from 'lucide-react'

import oliveTreeIllustration from '../../../assets/olive-tree.png'
// =========================
// Features Data
// =========================

const features = [
  {
    title: 'حماية محصولك',
    description:
      'اتخاذ إجراءات مبكرة للحفاظ على الأشجار، وتقليل خسائر الإنتاج الزراعي بشكل ملحوظ.',
    icon: ShieldCheck,
  },
  {
    title: 'اكتشاف مبكر',
    description:
      'يكتشف النظام الأمراض والآفات في مراحلها الأولى، قبل أن تنتشر وتؤثر على باقي الشجرة.',
    icon: ScanSearch,
  },
  {
    title: 'تشخيص ذكي',
    description:
      'نظام مدرّب على تمييز الأمراض المستوطنة في زيتون فلسطين، ويقدّم تحليلات ومعدلات دقة موثوقة.',
    icon: BrainCircuit,
  },
  {
    title: 'توصيات العلاج',
    description:
      'احصل على إرشادات علاجية عملية وواضحة تناسب حالة الشجرة المحددة.',
    icon: ClipboardList,
  },
]

function FeatureItem({ feature }) {
  const Icon = feature.icon

  return (
    <div className="flex flex-col items-center gap-3 text-center sm:items-end sm:text-right">
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-[#EAF1DF]
          text-[#5B961E]
        "
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-black">{feature.title}</h3>
      <p className="max-w-[220px] text-sm leading-6 text-gray-500">
        {feature.description}
      </p>
    </div>
  )
}

function AboutPlatform() {
  const [protectCrop, earlyDetection, smartDiagnosis, treatmentTips] = features

  return (
    <section
      dir="rtl"
      className="
        bg-white
        px-5
        py-16
        sm:py-20
      "
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-extrabold text-black sm:text-3xl">
          عن المنصة
        </h2>

        <div
          className="
            mt-14
            grid
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-[1fr_auto_1fr]
            lg:gap-8
          "
        >
          {/* Right pair */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:order-1">
            <FeatureItem feature={protectCrop} />
            <FeatureItem feature={earlyDetection} />
          </div>

          {/* Center tree illustration */}
          <div className="order-first mx-auto lg:order-2">
            <img
              src={oliveTreeIllustration}
              alt="شجرة زيتون"
              className="
                w-full
                max-w-[260px]
                object-contain
                sm:max-w-[300px]
              "
            />
          </div>

          {/* Left pair */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:order-3">
            <FeatureItem feature={smartDiagnosis} />
            <FeatureItem feature={treatmentTips} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPlatform