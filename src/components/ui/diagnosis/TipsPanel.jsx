import { Lightbulb } from 'lucide-react'

function TipsPanel() {
	return (
		<section className="relative overflow-hidden rounded-2xl bg-[#22652e] px-6 py-7 text-white shadow-sm sm:px-10">
			<div className="relative z-10">
				<div className="flex items-center gap-2 text-lg font-bold"><Lightbulb size={20} /> نصائح لنتيجة أفضل</div>
				<ol className="mt-5 grid gap-3 text-sm leading-7 text-white/85 sm:grid-cols-3">
					<li className="flex gap-2"><b className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/15 text-xs">1</b>تأكد من وجود إضاءة جيدة وطبيعية للحصول على ألوان دقيقة.</li>
					<li className="flex gap-2"><b className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/15 text-xs">2</b>ركّز الكاميرا جيدًا على الجزء المصاب من النبات.</li>
					<li className="flex gap-2"><b className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/15 text-xs">3</b>التقط صورة قريبة وواضحة للأوراق أو الساق المصابة.</li>
				</ol>
			</div>
			<div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-white/5" />
		</section>
	)
}

export default TipsPanel