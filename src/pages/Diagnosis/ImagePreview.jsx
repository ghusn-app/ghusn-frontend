import { useEffect } from 'react'
import { RotateCcw, ScanLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DiagnosisPageShell from '../../components/ui/diagnosis/DiagnosisPageShell'
import DiagnosisStepHeader from '../../components/ui/diagnosis/DiagnosisStepHeader'

function ImagePreview() {
	const navigate = useNavigate()
	const image = sessionStorage.getItem('diagnosis-image')

	useEffect(() => {
		if (!image) navigate('/dashboard/scan', { replace: true })
	}, [image, navigate])

	if (!image) {
		return (
			<DiagnosisPageShell title="معاينة الصورة">
				<div className="flex min-h-[420px] flex-col items-center justify-center text-center">
					<h2 className="text-2xl font-bold text-[#184d23]">لا توجد صورة للمعاينة</h2>
					<p className="mt-3 text-sm text-gray-500">سيتم إعادتك لاختيار صورة للتشخيص.</p>
				</div>
			</DiagnosisPageShell>
		)
	}

	return (
		<DiagnosisPageShell title="معاينة الصورة">
			<DiagnosisStepHeader title="هل الصورة واضحة؟" description="تأكد من أن الأوراق المصابة ظاهرة بوضوح لضمان دقة التحليل الذكي." />
			<div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200">
				<img src={image} alt="الصورة المختارة للتشخيص" className="aspect-[4/5] w-full object-cover" />
			</div>
			<div className="mx-auto mt-8 flex max-w-md flex-col-reverse gap-3 sm:flex-row">
				<button type="button" onClick={() => navigate('/dashboard/scan')} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e1eee4] px-5 py-3 text-sm font-bold text-[#557260] transition hover:bg-[#d4e6d8]"><RotateCcw size={17} /> إعادة التصوير</button>
				<button type="button" onClick={() => navigate('/dashboard/scan/processing')} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5b9f1d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4f8d18]">تحليل الصورة <ScanLine size={17} /></button>
			</div>
		</DiagnosisPageShell>
	)
}

export default ImagePreview