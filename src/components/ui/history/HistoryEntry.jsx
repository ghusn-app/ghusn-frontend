import { ArrowLeft, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'

const statusStyles = {
	medium: 'bg-[#f8e9bd] text-[#8a6a24]',
	healthy: 'bg-[#dcefd5] text-[#477450]',
	severe: 'bg-[#f8d9d1] text-[#ae4d35]',
}

function HistoryEntry({ scan, expanded = false }) {
	return (
		<article className={`rounded-2xl border border-[#e7e6dd] bg-white px-4 py-4 shadow-sm ${expanded ? 'sm:px-5 sm:py-5' : ''}`}>
			<div className="flex items-start gap-4">
				<span className="mt-1 text-[#94a18f]"><Circle size={13} fill="currentColor" /></span>
				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div><h3 className="text-sm font-bold text-[#344937]">{scan.name}</h3><p className="mt-1 text-[10px] text-gray-400">{scan.date}</p></div>
						<div className="flex items-center gap-2"><span className={`rounded-full px-3 py-1 text-[10px] font-bold ${statusStyles[scan.statusTone]}`}>{scan.status}</span><span className="rounded-full bg-[#eaf3e8] px-3 py-1 text-[10px] font-bold text-[#477450]">دقة {scan.confidence}%</span></div>
					</div>
					{expanded && <div className="mt-5 grid gap-5 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:grid-cols-2"><div><p className="font-bold text-[#344937]">الأعراض</p><p className="mt-2 leading-6">{scan.symptoms}</p></div><div><p className="font-bold text-[#344937]">العلاج المقترح</p><p className="mt-2 leading-6">{scan.treatment}</p></div></div>}
					{expanded && <div className="mt-5 flex flex-wrap items-center justify-center gap-3"><Link to="/dashboard/scan/result" className="inline-flex items-center gap-2 rounded-xl bg-[#214d2b] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#173d20]">تشخيص متابعة جديد <ArrowLeft size={15} /></Link><button type="button" className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50">عرض المقارنة الزمنية</button></div>}
				</div>
			</div>
			{expanded && <div className="mt-5 rounded-xl bg-[#f8e9bd] px-4 py-3 text-xs text-[#8a6a24]"><span className="font-bold">تنبيه:</span> تكررت ملاحظة الأعراض في آخر فحصين لهذه الشجرة.</div>}
		</article>
	)
}

export default HistoryEntry