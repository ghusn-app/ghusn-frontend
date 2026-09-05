import { Link } from 'react-router-dom'
import { ArrowLeft, ScanLine } from 'lucide-react'
import plantDiagnosisBackground from '../../../assets/plant-diagnosis-bg.png'

function HeroBanner() {
	return (
		<section
			className="relative isolate overflow-hidden rounded-[22px] bg-[#35571d] px-7 py-8 text-white shadow-sm sm:px-10 sm:py-10"
			style={{ backgroundImage: `linear-gradient(90deg, rgba(23, 48, 12, .88), rgba(47, 82, 24, .28)), url(${plantDiagnosisBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
		>
			<div className="relative z-10 max-w-xl">
				<p className="mb-3 text-sm font-medium text-lime-100">من شجرة سليمة يبدأ موسم أفضل</p>
				<h1 className="text-2xl font-bold leading-relaxed sm:text-3xl">صوّر نباتك، واعرف تشخيصه</h1>
				<p className="mt-2 max-w-lg text-sm leading-7 text-white/80">صورة واحدة تكفي لفحص أي نبتة أو غصن مصاب وإعطائك التوصية المناسبة للحفاظ على محصولك.</p>
				<div className="mt-6 flex flex-wrap gap-3">
					<Link to="/dashboard/scan" className="inline-flex items-center gap-2 rounded-xl bg-[#62a51f] px-5 py-3 text-sm font-bold transition hover:bg-[#73b52e]"><ScanLine size={18} /> ابدأ التشخيص</Link>
					<Link to="/dashboard/history" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#456d25] transition hover:bg-lime-50">اكتشف أكثر <ArrowLeft size={17} /></Link>
				</div>
			</div>
		</section>
	)
}

export default HeroBanner
