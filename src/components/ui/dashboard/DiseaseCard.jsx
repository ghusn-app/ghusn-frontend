function DiseaseCard({ image, title, description, severity, tone = 'green' }) {
	const toneClasses = { green: 'bg-[#eef6e8] text-[#578f28]', amber: 'bg-[#fff5db] text-[#a57b26]', red: 'bg-[#fce9e2] text-[#b9623e]' }
	return (
		<article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
			<img src={image} alt="" className="h-44 w-full object-cover" />
			<div className="p-4 text-right">
				<h3 className="text-base font-bold text-[#4c8621]">{title}</h3>
				<p className="mt-2 min-h-14 text-xs leading-6 text-gray-500">{description}</p>
				<span className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${toneClasses[tone]}`}>{severity}</span>
			</div>
		</article>
	)
}

export default DiseaseCard
