import { CheckCircle2, ClipboardList, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import scaleInsectImage from '../../assets/Background-on-the-black-scale-insect.png'

function Result() {
	const navigate = useNavigate()
	return (
		<div dir="rtl" className="min-h-full bg-[#f8faf8] px-5 py-7 text-[#173f20] sm:px-8 lg:px-10">
			<div className="mx-auto max-w-6xl">
				<header className="mb-7 text-right"><h1 className="text-2xl font-bold text-[#4f991e]">نتيجة التشخيص</h1><p className="mt-1 text-xs text-gray-400">تم تحليل الصورة بنجاح بواسطة الذكاء الاصطناعي</p></header>
				<div className="grid gap-5 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.6fr)] lg:[direction:ltr]">
					<section dir="rtl" className="flex min-h-[255px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm"><h2 className="text-base font-bold text-gray-700">دقة التشخيص</h2><div className="my-7 flex h-28 w-28 items-center justify-center rounded-full border-[9px] border-[#174d20] border-l-[#dcebdd] text-2xl font-bold text-[#174d20]">87%</div><p className="text-[11px] leading-5 text-gray-400">تم تحليل الصورة وظهرت النتائج بدرجة ثقة مرتفعة، ويمكنك مراجعة التوصيات أدناه.</p></section>
					<section dir="rtl" className="rounded-xl border border-gray-200 border-t-2 border-t-[#438e25] bg-white p-5 text-right shadow-sm"><div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-[#eef6e8] px-3 py-1 text-[10px] font-bold text-[#578f28]">تم التعرف على التشخيص</span><p className="text-xs font-bold text-gray-500">المرض المكتشف</p></div><div className="flex flex-col gap-5 sm:flex-row-reverse"><img src={scaleInsectImage} alt="الحشرة القشرية السوداء" className="h-44 w-full rounded-xl object-cover sm:w-44" /><div className="flex-1 text-right"><h2 className="text-2xl font-bold text-[#24582c]">الحشرة القشرية السوداء</h2><p className="mt-3 text-xs leading-6 text-gray-500">مرض فطري شائع يصيب أشجار الزيتون، ويسبب ضعف نمو الأوراق وظهور بقع على سطحها، مما قد يؤدي إلى تساقطها إذا لم تتم معالجته مبكرًا.</p><p className="mt-4 text-xs font-bold text-gray-500">الأعراض المصورة:</p><div className="mt-2 flex flex-wrap gap-2"><span className="rounded-full bg-[#f2f8f2] px-3 py-1 text-[10px] text-[#477450]">بقع داكنة</span><span className="rounded-full bg-[#f2f8f2] px-3 py-1 text-[10px] text-[#477450]">تساقط الأوراق</span></div></div></div></section>
				</div>
				<section className="mt-6 rounded-xl bg-[#14561d] px-6 py-5 text-white shadow-sm"><h2 className="flex items-center justify-center gap-2 text-base font-bold"><ClipboardList size={18} /> خطوات العلاج والتوصيات</h2><div className="mt-4 grid gap-x-10 gap-y-4 border-t border-white/20 pt-4 text-right text-xs leading-5 md:grid-cols-2"><Recommendation number="1" text="إزالة الأوراق المصابة والتخلص منها بعيدًا عن الشجرة." /><Recommendation number="2" text="فحص الأشجار المجاورة للتأكد من عدم انتشار الإصابة." /><Recommendation number="3" text="الرش الوقائي والعلاجي باستخدام العلاج المناسب." /><Recommendation number="4" text="تحسين التهوية ومراقبة الشجرة خلال الأيام القادمة." /></div></section>
				<section className="mt-7 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"><h2 className="text-sm font-bold text-gray-600">نتائج بديلة محتملة</h2><p className="mt-2 text-[11px] text-gray-400">قد تتشابه بعض الأعراض مع أمراض أخرى أثناء التحليل.</p><AlternativeResult title="نقص البوتاسيوم" percentage="8%" /><AlternativeResult title="أضرار حشرية (حشرات قشرية)" percentage="5%" /></section>
				<div className="mt-6 flex justify-center"><button type="button" onClick={() => navigate('/dashboard')} className="rounded-xl bg-[#5b9f1d] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#4f8d18]">العودة إلى لوحة التحكم</button></div>
			</div>
		</div>
	)
}

function Recommendation({ number, text }) { return <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#b8e8ae] text-[#14561d] font-bold">{number}</span><span>{text}</span></div> }
function AlternativeResult({ title, percentage }) { return <div className="mt-3 flex items-center justify-between rounded-lg bg-[#f5f8f5] px-4 py-2 text-xs text-gray-600"><span>{title}</span><span className="font-bold text-gray-400">{percentage}</span></div> }

export default Result