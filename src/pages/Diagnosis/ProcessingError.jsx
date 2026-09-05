import { AlertTriangle, RotateCcw, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DiagnosisPageShell from '../../components/ui/diagnosis/DiagnosisPageShell'

function ProcessingError() {
	const navigate = useNavigate()
	return (
		<DiagnosisPageShell title="تعذّر تحليل الصورة">
			<div className="flex min-h-[620px] flex-col items-center justify-center text-center">
				<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f8ded4] text-[#b65632]"><AlertTriangle size={38} /></div>
				<h1 className="mt-6 text-3xl font-bold text-[#b65632]">تعذّر تحليل الصورة</h1>
				<p className="mt-3 max-w-md text-sm leading-7 text-gray-500">يرجى التحقق من الاتصال بالإنترنت والتأكد من وضوح الصورة، ثم المحاولة مرة أخرى.</p>
				<div className="mt-6 w-full max-w-md rounded-2xl border border-[#f2c9b8] bg-[#fff0e9] p-5 text-center"><h2 className="text-sm font-bold text-[#b65632]">سبب الخطأ</h2><p className="mt-3 text-xs leading-6 text-[#80665c]">انقطع الاتصال أثناء رفع الصورة. تأكد من الشبكة وحاول مرة ثانية.</p></div>
				<div className="mt-5 flex w-full max-w-md flex-col gap-3 sm:flex-row-reverse"><button type="button" onClick={() => navigate('/dashboard/scan/processing')} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5b9f1d] px-5 py-3 text-sm font-bold text-white hover:bg-[#4f8d18]"><RotateCcw size={17} /> إعادة المحاولة</button><button type="button" onClick={() => navigate('/dashboard/scan')} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"><Upload size={17} /> تغيير الصورة</button></div>
			</div>
		</DiagnosisPageShell>
	)
}

export default ProcessingError