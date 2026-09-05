import { useEffect } from 'react'
import { Leaf } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DiagnosisPageShell from '../../components/ui/diagnosis/DiagnosisPageShell'

function Processing() {
	const navigate = useNavigate()

	useEffect(() => {
		const timer = window.setTimeout(() => navigate('/dashboard/scan/result', { replace: true }), 2600)
		return () => window.clearTimeout(timer)
	}, [navigate])

	return (
		<DiagnosisPageShell title="جاري المعالجة">
			<div className="mx-auto flex min-h-[560px] max-w-3xl flex-col items-center justify-center text-center">
				<div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#e6f5e3] text-[#22652e]">
					<span className="absolute inset-0 animate-ping rounded-full bg-[#bce2b8]/50" />
					<Leaf size={40} className="relative" />
				</div>
				<h2 className="mt-8 text-3xl font-bold text-[#184d23]">جاري تحليل الصورة</h2>
				<p className="mt-3 max-w-md text-sm leading-7 text-gray-500">يقوم الذكاء الاصطناعي بفحص أوراق نباتك لاكتشاف أي علامات مرضية وتحديد نوع النبات وحالته الصحية.</p>
				<div className="mt-10 h-2 w-64 overflow-hidden rounded-full bg-[#e2eee3]"><div className="h-full w-2/3 animate-pulse rounded-full bg-[#5b9f1d]" /></div>
				<p className="mt-4 text-xs text-gray-400">يتم تحليل الصورة بأمان وسرية</p>
			</div>
		</DiagnosisPageShell>
	)
}

export default Processing