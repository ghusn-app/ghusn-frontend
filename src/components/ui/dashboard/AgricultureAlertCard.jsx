import { AlarmClock, CloudSun, Droplets, Sun } from 'lucide-react'
import alertsBackground from '../../../assets/alerts-background.png'

function AgricultureAlertCard() {
	return (
		<section
			className="relative min-h-[285px] overflow-hidden rounded-[22px] bg-[#354629] px-6 py-6 text-white shadow-sm sm:px-8"
			style={{
				backgroundImage: `linear-gradient(180deg, rgba(22, 31, 17, .45), rgba(15, 23, 12, .78)), url(${alertsBackground})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}}
		>
			<div className="relative z-10 flex h-full flex-col">
				<div className="relative">
					<span className="absolute right-0 top-0 rounded-full bg-amber-300 p-2 text-amber-700 shadow-lg" aria-label="طقس مشمس">
						<Sun size={28} fill="currentColor" />
					</span>
					<div className="pr-14">
						<p className="text-sm font-medium text-white/80">اليوم مناسب للرش الوقائي</p>
						<h2 className="mt-2 text-2xl font-bold leading-relaxed">رطوبة الجو عالية جدًا هذا الأسبوع</h2>
					</div>
				</div>

				<p className="mt-4 text-sm leading-7 text-white/90">
					خطر عين الطاووس يرتفع بالأمطار، افحص أوراق زيتونك حتى بدون أعراض واضحة.
				</p>

				<div className="my-5 h-px bg-white/35" />

				<div className="flex items-center gap-3">
					<span className="rounded-full bg-white/90 p-2 text-[#5b961e]"><AlarmClock size={25} /></span>
					<div>
						<p className="text-xs text-white/75">تذكير متابعة</p>
						<p className="mt-1 text-lg font-bold">زيتونة الحوش - متابعة الفحص بعد ثلاثة أيام</p>
					</div>
				</div>

				<div className="mt-auto flex items-center gap-4 pt-5 text-xs text-white/75">
					<span className="inline-flex items-center gap-1"><Droplets size={15} /> رطوبة مرتفعة</span>
					<span className="inline-flex items-center gap-1"><CloudSun size={15} /> متابعة يومية</span>
				</div>
			</div>
		</section>
	)
}

export default AgricultureAlertCard