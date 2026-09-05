import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Sidebar from '../components/ui/dashboard/Sidebar'
import Topbar from '../components/ui/dashboard/Topbar'
import NotificationsDropdown from '../components/ui/dashboard/NotificationsDropdown'


function DashboardLayout() {

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const location = useLocation()
  const isDiagnosisRoute = location.pathname.startsWith('/dashboard/scan')
  const isFullscreenDiagnosis = location.pathname.includes('/preview') || location.pathname.includes('/processing')
  const isResultRoute = location.pathname.includes('/scan/result')
  const isHistoryRoute = location.pathname.startsWith('/dashboard/history')
  const isProcessingError = location.pathname.includes('/scan/error')

  return (
    <div
      dir="rtl"
      className="flex min-h-screen bg-gray-50"
    >

      {!isFullscreenDiagnosis && !isProcessingError && <Sidebar />}

      <div className="flex min-h-screen flex-1 flex-col">

        {(!isDiagnosisRoute || isResultRoute) && <Topbar pageTitle={isHistoryRoute ? 'سجل الفحوصات' : undefined} onBellClick={() => setIsNotificationsOpen((prev) => !prev)} />}

        {(!isDiagnosisRoute || isResultRoute) && isNotificationsOpen && <NotificationsDropdown />}

        <main className={isDiagnosisRoute ? 'flex-1' : 'flex-1 px-6 pb-10 lg:px-10'}>
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout