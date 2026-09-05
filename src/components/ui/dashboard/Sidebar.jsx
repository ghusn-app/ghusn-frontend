import { NavLink } from 'react-router-dom'
import {
  Home,
  Camera,
  History,
  User,
  LogOut,
} from 'lucide-react'

import ghusnLogo from '../../../assets/branch.png'


const navItems = [
  { to: '/dashboard', icon: Home, label: 'الرئيسية' },
  { to: '/dashboard/scan', icon: Camera, label: 'تشخيص جديد' },
  { to: '/dashboard/history', icon: History, label: 'السجل' },
  { to: '/dashboard/settings', icon: User, label: 'الإعدادات' },
]


function Sidebar() {

  const handleLogout = () => {
    localStorage.removeItem('ghosn_token')
    localStorage.removeItem('ghosn_refresh_token')
    window.location.href = '/login'
  }

  return (
    <aside
      dir="rtl"
      className="
        sticky
        top-0
        flex
        h-screen
        w-20
        flex-col
        items-center
        border-l
        border-gray-100
        bg-white
        py-6
      "
    >

      {/* =========================
          Logo
      ========================= */}

      <img
        src={ghusnLogo}
        alt="غصن"
        className="h-10 w-10 object-contain"
      />


      {/* =========================
          Nav Icons
      ========================= */}

      <nav
        className="
          mt-10
          flex
          flex-1
          flex-col
          items-center
          gap-4
        "
      >

        {navItems.map(({ to, icon: Icon, label }) => (

          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            aria-label={label}
            className={({ isActive }) =>
              `
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                transition
                ${
                  isActive
                    ? 'bg-[#5B961E]/10 text-[#5B961E]'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }
              `
            }
          >
            <Icon
              size={22}
              strokeWidth={2}
            />
          </NavLink>

        ))}

      </nav>


      {/* =========================
          Logout
      ========================= */}

      <button
        type="button"
        onClick={handleLogout}
        aria-label="تسجيل الخروج"
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          text-gray-400
          transition
          hover:bg-red-50
          hover:text-red-500
        "
      >
        <LogOut
          size={22}
          strokeWidth={2}
        />
      </button>

    </aside>
  )
}

export default Sidebar