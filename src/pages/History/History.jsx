import HistoryEntry from '../../components/ui/history/HistoryEntry'

const scans = [
	{ group: 'زيتونة الحوش', count: 0, name: 'فحص جديد', date: 'اليوم، 12:50 م', status: 'متوسط', statusTone: 'medium', confidence: 87, symptoms: 'بقع داكنة وانتفاخات على الأغصان وضعف في نمو الأوراق.', treatment: 'تقليل الأجزاء المصابة وبدء العلاج الوقائي.' },
	{ group: 'زيتونة الحوش', count: 0, name: 'فحص سابق', date: 'أمس', status: 'متوسط', statusTone: 'medium', confidence: 84, symptoms: 'انتفاخات على الأغصان وضعف في نمو الفروع.', treatment: 'تقليل الأجزاء المصابة بأداة معقمة.' },
	{ group: 'نعناع سليم', count: 1, name: 'لا أعراض', date: 'أمس، 4:20 م', status: 'سليم', statusTone: 'healthy', confidence: 94, symptoms: 'لا توجد علامات مرضية واضحة.', treatment: 'الاستمرار في الري والإضاءة المناسبة.' },
	{ group: 'زيتونة الحافة الشرقية', count: 2, name: 'عفن جذري', date: 'قبل 3 أيام', status: 'شديد', statusTone: 'severe', confidence: 91, symptoms: 'تغير لون الجذور وضعف واضح في الساق.', treatment: 'عزل الشجرة ومراجعة مختص زراعي.' },
]

function History() {
	return (
		<div dir="rtl" className="min-h-full bg-[#f8faf8] px-5 py-7 text-[#173f20] sm:px-8 lg:px-10">
			<div className="mx-auto max-w-6xl">
				<div className="mb-7 flex items-end justify-between"><div><h1 className="text-2xl font-bold text-[#4f991e]">سجل الفحوصات</h1><p className="mt-1 text-xs text-gray-400">راجع نتائج تشخيص نباتاتك وتابع تطورها</p></div><a href="#history" className="text-xs font-bold text-[#557260] underline underline-offset-4">عرض كامل لسجل هذه الشجرة (0)</a></div>
				<div id="history" className="space-y-3">
					{scans.map((scan, index) => <section key={`${scan.group}-${scan.name}`}><div className="mb-2 flex items-center justify-between px-2"><h2 className="text-sm font-bold text-[#46614b]">{scan.group}</h2>{index === 0 && <span className="text-[10px] text-gray-400">آخر تحديث</span>}</div><HistoryEntry scan={scan} expanded={index === 0} /></section>)}
				</div>
			</div>
		</div>
	)
}

export default History