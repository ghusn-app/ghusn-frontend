import { useState } from 'react'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Settings() {
	const navigate = useNavigate()
	const [scanNotifications, setScanNotifications] = useState(true)

	const handleLogout = () => {
		localStorage.removeItem('ghosn_token')
		localStorage.removeItem('ghosn_refresh_token')
		navigate('/login')
	}

	return (
		<div dir="rtl" className="min-h-full bg-[#f8f9f8] px-5 py-8 text-[#2f3831] sm:px-10 lg:px-14">
			<div className="mx-auto max-w-5xl">
				<section className="flex items-center justify-between border-b border-gray-200 pb-6">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#244b38] text-lg font-bold text-white">ل خ</div>
						<div><h1 className="text-base font-bold">ليلى حمدان</h1><p className="mt-1 text-xs text-gray-400">layla@email.com</p></div>
					</div>
					<button type="button" className="rounded-lg border border-gray-400 px-5 py-2 text-sm text-gray-600 transition hover:bg-white">تعديل</button>
				</section>

				<section className="mt-6">
					<h2 className="mb-2 text-sm font-bold">عام</h2>
					<SettingRow label="اللغة" value="العربية" icon={<ChevronDown size={17} />} />
					<SettingRow label="إشعارات الفحص" description="تنبيه عند اكتمال أي تشخيص" value={<Toggle checked={scanNotifications} onChange={() => setScanNotifications((value) => !value)} />} />
					<SettingRow label="الخصوصية" icon={<ChevronLeft size={18} />} onClick={() => undefined} />
				</section>

				<button type="button" onClick={handleLogout} className="mt-9 rounded-lg border border-red-300 px-6 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50">تسجيل الخروج</button>
			</div>
		</div>
	)
}

function SettingRow({ label, description, value, icon, onClick }) {
	return <div role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onClick={onClick} className="flex min-h-[64px] w-full items-center justify-between border-b border-gray-200 text-right transition hover:bg-white/70"><span><span className="block text-sm font-medium">{label}</span>{description && <span className="mt-1 block text-xs text-gray-400">{description}</span>}</span><span className="flex items-center gap-2 text-xs text-gray-500">{value}{icon}</span></div>
}

function Toggle({ checked, onChange }) {
	return <button type="button" role="switch" aria-checked={checked} aria-label="إشعارات الفحص" onClick={onChange} className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-[#244b38]' : 'bg-gray-300'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${checked ? 'right-1' : 'right-6'}`} /></button>
}

export default Settings