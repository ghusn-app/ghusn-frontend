import { useState } from 'react'
import { Bell, Search } from 'lucide-react'

import userAvatar from '../../../assets/ghusn-logo.png'


function Topbar({ userName = 'محمد', pageTitle, hasUnreadNotifications = true, onBellClick }) {

  const [searchValue, setSearchValue] = useState('')

  return (
    <header
      dir="rtl"
      className="
        flex
        items-center
        justify-between
        gap-6
        bg-white
        px-6
        py-5
        lg:px-10
      "
    >

      {/* =========================
          Greeting
      ========================= */}

      <p
        className="
          shrink-0
          text-lg
          font-bold
          text-[#5B961E]
        "
      >
        {pageTitle || <>اهلا فيك , <span className="text-gray-800">{userName}</span></>}
      </p>


      {/* =========================
          Search
      ========================= */}

      <div
        className="
          relative
          hidden
          w-full
          max-w-md
          sm:block
        "
      >

        <input
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="ابحث بالسجل"
          className="
            w-full
            rounded-full
            border
            border-gray-200
            bg-gray-50
            py-2.5
            pr-5
            pl-11
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-[#5B961E]
            focus:bg-white
            focus:ring-1
            focus:ring-[#5B961E]
          "
        />

        <Search
          size={18}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

      </div>


      {/* =========================
          Avatar + Notifications
      ========================= */}

      <div className="flex shrink-0 items-center gap-3">

        <button
          type="button"
          onClick={onBellClick}
          aria-label="الإشعارات"
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            text-gray-500
            transition
            hover:bg-gray-50
          "
        >

          <Bell size={19} />

          {hasUnreadNotifications && (
            <span
              className="
                absolute
                top-2
                left-2.5
                h-2
                w-2
                rounded-full
                bg-red-500
              "
            />
          )}

        </button>

        <img
          src={userAvatar}
          alt={userName}
          className="
            h-11
            w-11
            rounded-full
            border
            border-gray-200
            object-cover
          "
        />

      </div>

    </header>
  )
}

export default Topbar