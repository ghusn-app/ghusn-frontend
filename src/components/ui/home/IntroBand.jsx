import oliveBranchBg from '../../../assets/olive-trees-bg.png'

// =========================
// Intro Band
// =========================
// Bright band introducing the platform: a sunlit olive-branch photo shows
// through clearly, with a soft cream gradient (not a dark overlay) so the
// dark text stays readable — matching the Figma reference.

function IntroBand() {
  return (
    <section
      dir="rtl"
      className="
        relative
        overflow-hidden
        py-16
        sm:py-20
      "
    >
      {/* Background image */}
      <img
        src={oliveBranchBg}
        alt=""
        aria-hidden="true"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* Soft cream overlay so the photo stays bright and the text stays readable */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-white/80
          via-white/55
          to-white/80
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-3xl
          px-6
        "
      >
        <div
          className="
            rounded-3xl
            bg-white/70
            px-6
            py-8
            text-center
            shadow-sm
            backdrop-blur-sm
            sm:px-10
            sm:py-10
          "
        >
          <p
            className="
              text-base
              font-medium
              leading-8
              text-[#2E4A1A]
              sm:text-lg
              sm:leading-9
            "
          >
            غُصن موقع ذكي يساعد مزارعي الزيتون على اكتشاف الأمراض والآفات
            مبكرًا باستخدام الذكاء الاصطناعي. يتيح تصوير الجزء المتضرر من
            الشجرة وتحليله ثم يقدم تشخيصًا محتملًا وأعراض المرض وطرق العلاج
            ونصائح للوقاية باللغة العربية. وعند عدم كفاية دقة التشخيص، يوصي
            بالتواصل مع خبير زراعي، يهدف التطبيق إلى حماية أشجار الزيتون
            وتحسين الإنتاج.
          </p>
        </div>
      </div>
    </section>
  )
}

export default IntroBand