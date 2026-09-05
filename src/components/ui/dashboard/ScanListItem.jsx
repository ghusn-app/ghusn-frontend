function ScanListItem({ title, date, status, tone = 'green' }) {
	const toneClasses = {
		red: { badge: 'bg-[#fce9e2] text-[#b9623e]', dot: 'bg-[#b9623e]' },
		amber: { badge: 'bg-[#fff5db] text-[#a57b26]', dot: 'bg-[#a57b26]' },
		green: { badge: 'bg-[#eef6e8] text-[#578f28]', dot: 'bg-[#578f28]' },
	}
	const toneClass = toneClasses[tone] || toneClasses.green

	return <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-0"><div className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${toneClass.dot}`} /><div><p className="text-sm font-bold text-gray-700">{title}</p><p className="mt-1 text-[11px] text-gray-400">{date}</p></div></div><span className={`rounded-full px-3 py-1 text-[11px] font-bold ${toneClass.badge}`}>{status}</span></div>
}

export default ScanListItem
