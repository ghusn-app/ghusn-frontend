import { ArrowLeft, RotateCcw, WifiOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import DiagnosisPageShell from '../../components/ui/diagnosis/DiagnosisPageShell'

function Offline() {
	const navigate = useNavigate()
	return (
		<DiagnosisPageShell title="لا يوجد اتصال بالإنترنت" backTo="/dashboard">
			<div className="flex min-h-[620px] flex-col items-center justify-center text-center">
				<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f8ecd8] text-[#c59349]"><WifiOff size={37} /></div>
				<h1 className="mt-6 text-2xl font-bold text-[#28362d] sm:text-3xl">لا يوجد اتصال بالإنترنت</h1>
				<p className="mt-3 max-w-md text-sm leading-7 text-gray-400">تحقق من شبكتك. تشخيصاتك المحفوظة سابقًا لسا متاحة للعرض من السجل.</p>
				<div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row"><Link to="/dashboard/history" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-400 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50">عرض السجل المحفوظ <ArrowLeft size={17} /></Link><button type="button" onClick={() => navigate(0)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5b9f1d] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#4f8d18]">إعادة المحاولة <RotateCcw size={17} /></button></div>
			</div>
		</DiagnosisPageShell>
	)
}

export default Offline