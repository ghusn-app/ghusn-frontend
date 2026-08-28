import { Link } from 'react-router-dom'

import farmerHero from '../../../assets/farmer-hero.png'

function Hero() {
  return (
    <section
      dir="rtl"
      id="home"
      className="
        relative
        overflow-hidden
        bg-white
        px-6
        py-16
        lg:px-10
        lg:py-24
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col-reverse
          items-center
          gap-12
          lg:flex-row
        "
      >


        {/* =========================
            Text Content
        ========================= */}

        <div
          className="
            flex-1
            text-center
            lg:text-right
          "
        >

          <h1
            className="
              text-3xl
              font-extrabold
              leading-tight
              text-[#5B961E]
              sm:text-4xl
              lg:text-5xl
            "
          >
            اكتشف صحة زيتونك بالذكاء
            <br />
            الاصطناعي
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              text-base
              leading-8
              text-gray-500
              lg:mx-0
            "
          >
            صوّر نباتك، ودع الذكاء الاصطناعي يحلل حالته
            ويكشف الأمراض المحتملة، مع نصائح واضحة
            تساعدك على العلاج والعناية به.
          </p>

          <div
            className="
              mt-8
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
              lg:justify-start
            "
          >

            <Link
              to="/register"
              className="
                w-full
                rounded-full
                bg-[#5B961E]
                px-8
                py-3.5
                text-center
                text-sm
                font-bold
                text-white
                shadow-md
                transition
                hover:bg-[#4f851b]
                active:scale-[0.98]
                sm:w-auto
              "
            >
              ابدأ التشخيص مجانًا
            </Link>

            <a
              href="#how-it-works"
              className="
                w-full
                rounded-full
                border
                border-gray-300
                px-8
                py-3.5
                text-center
                text-sm
                font-bold
                text-gray-700
                transition
                hover:border-[#5B961E]
                hover:text-[#5B961E]
                sm:w-auto
              "
            >
              كيف يعمل؟
            </a>

          </div>

        </div>


        {/* =========================
            Farmer Image
        ========================= */}

        <div
          className="
            relative
            flex
            flex-1
            items-center
            justify-center
          "
        >

          {/* Decorative background circle */}

          <div
            className="
              absolute
              h-72
              w-72
              rounded-full
              bg-[#F4EFE4]
              sm:h-96
              sm:w-96
            "
          />

          <img
            src={farmerHero}
            alt="مزارع يحمل غصن زيتون"
            className="
              relative
              h-auto
              w-full
              max-w-sm
              object-contain
              sm:max-w-md
            "
          />

        </div>

      </div>

    </section>
  )
}

export default Hero