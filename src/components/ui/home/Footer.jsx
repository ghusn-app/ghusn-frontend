import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'

import logo from '../../../assets/ghusn-logo.svg'
// =========================
// Footer Link Columns
// =========================

const quickLinks = [
  { label: 'ابدأ التشخيص', to: '/diagnose' },
  { label: 'عن غُصن', to: '/#about' },
  { label: 'كيف يعمل', to: '/#how-it-works' },
  { label: 'الرئيسية', to: '/' },
]

const infoLinks = [
  { label: 'أسئلة شائعة', to: '/faq' },
  { label: 'شروط الاستخدام', to: '/terms' },
  { label: 'سياسة الخصوصية', to: '/privacy' },
]

function Footer() {
  return (
    <footer
      dir="rtl"
      className="
        bg-[#2E4A1A]
        px-5
        pb-8
        pt-14
        text-white
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-6xl
          grid-cols-1
          gap-10
          text-center
          sm:grid-cols-2
          sm:text-right
          lg:grid-cols-4
        "
      >
        {/* Logo + tagline */}
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <img src={logo} alt="غُصن" className="h-10 w-auto" />
          <p className="max-w-[220px] text-sm leading-6 text-white/70">
            منصة ذكية لحماية زيتونك، وتشخيص أمراضه بدقة عالية
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="روابط سريعة">
          <h3 className="mb-4 text-base font-bold">روابط سريعة</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Info links */}
        <nav aria-label="معلومات">
          <h3 className="mb-4 text-base font-bold">معلومات</h3>
          <ul className="space-y-3">
            {infoLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-base font-bold">تواصل معنا</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-center gap-2 text-sm text-white/70 sm:justify-end">
              <a
                href="mailto:info@ghusn.com"
                className="transition hover:text-white"
              >
                info@ghusn.com
              </a>
              <Mail className="h-4 w-4" aria-hidden="true" />
            </li>
            <li className="flex items-center justify-center gap-2 text-sm text-white/70 sm:justify-end">
              <a href="tel:0700000000" className="transition hover:text-white">
                0700 000 000
              </a>
              <Phone className="h-4 w-4" aria-hidden="true" />
            </li>
          </ul>
        </div>
      </div>

      <div
        className="
          mx-auto
          mt-12
          flex
          max-w-6xl
          flex-col-reverse
          items-center
          justify-between
          gap-4
          border-t
          border-white/10
          pt-6
          text-center
          text-xs
          text-white/60
          sm:flex-row
          sm:text-right
        "
      >
        <p>© غُصن {new Date().getFullYear()} — جميع الحقوق محفوظة</p>
        <p>صُمم بحب لحماية أشجار زيتوننا</p>
      </div>
    </footer>
  )
}

export default Footer