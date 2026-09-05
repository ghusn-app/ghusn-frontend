import { Bell, CheckCircle2, CloudSun, Sprout } from 'lucide-react'

function NotificationsDropdown() {
	return <aside className="absolute left-8 top-20 z-30 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"><div className="flex items-center justify-between border-b border-gray-100 px-5 py-4"><h2 className="font-bold text-gray-800">الإشعارات</h2><span className="text-xs text-[#be7458]">تحديد الكل كمقروء</span></div><div className="divide-y divide-gray-100"><Notification icon={Sprout} title="النشرة عناية الزيتون بمنطقتك" text="احرص على متابعة أشجارك وفحص الأوراق باستمرار." /><Notification icon={Bell} title="موعد الرش الوقائي الموسمي" text="اقترب موعد الرش الوقائي لأشجار الزيتون." /><Notification icon={CloudSun} title="أمطار متوقعة الجمعة" text="احفظ وقت الفحص قبل هطول الأمطار المباشرة." /><Notification icon={CheckCircle2} title="تشخيص جديد اكتمل" text="نتيجة فحصك جاهزة ويمكنك مراجعة التفاصيل." /></div><button type="button" className="w-full py-4 text-sm font-bold text-[#5b961e] hover:bg-gray-50">عرض كل الإشعارات</button></aside>
}

function Notification({ icon: Icon, title, text }) {
	return <div className="flex gap-3 px-5 py-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f7ec] text-[#609c29]"><Icon size={17} /></span><div><p className="text-xs font-bold text-gray-700">{title}</p><p className="mt-1 text-[11px] leading-5 text-gray-400">{text}</p></div></div>
}

export default NotificationsDropdown
