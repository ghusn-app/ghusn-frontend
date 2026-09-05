function DiagnosisStepHeader({ eyebrow, title, description }) {
	return (
		<div className="mx-auto mb-10 max-w-2xl text-center">
			{eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#78a56a]">{eyebrow}</p>}
			<h2 className="text-3xl font-bold leading-relaxed text-[#184d23]">{title}</h2>
			{description && <p className="mt-2 text-sm leading-7 text-gray-500">{description}</p>}
		</div>
	)
}

export default DiagnosisStepHeader