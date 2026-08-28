import { Link } from 'react-router-dom'

import ghusnLogo from '../../../assets/branch.png'

function Navbar() {
  return (
    <nav
      dir="rtl"
      className="
        sticky
        top-0
        z-50
        w-full
        bg-white/95
        backdrop-blur
        shadow-sm
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
          lg:px-10
        "
      >


        {/* =========================
            Logo
        ========================= */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <img
            src={ghusnLogo}
            alt="غصن"
            className="h-10 w-auto object-contain"
          />
        </Link>


        {/* =========================
            Nav Links (desktop only)
        ========================= */}

        <div
          className="
            hidden
            items-center
            gap-8
            text-sm
            font-medium
            text-gray-700
            md:flex
          "
        >

          <a
            href="#home"
            className="transition hover:text-[#5B961E]"
          >
            الرئيسية
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-[#5B961E]"
          >
            كيف يعمل
          </a>

          <a
            href="#about"
            className="transition hover:text-[#5B961E]"
          >
            عن المنصة
          </a>

        </div>


        {/* =========================
            Auth Actions
        ========================= */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="
              hidden
              text-sm
              font-medium
              text-gray-700
              transition
              hover:text-[#5B961E]
              sm:block
            "
          >
            تسجيل الدخول
          </Link>

          <Link
            to="/register"
            className="
              rounded-full
              bg-[#5B961E]
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
              shadow-sm
              transition
              hover:bg-[#4f851b]
              active:scale-[0.98]
            "
          >
            أبدأ التشخيص
          </Link>

        </div>

      </div>

    </nav>
  )
}

export default Navbar