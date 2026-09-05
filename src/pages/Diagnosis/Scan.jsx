import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DiagnosisPageShell from '../../components/ui/diagnosis/DiagnosisPageShell'
import DiagnosisStepHeader from '../../components/ui/diagnosis/DiagnosisStepHeader'
import { FileScanCard, LiveScanCard } from '../../components/ui/diagnosis/ImagePickerCard'
import TipsPanel from '../../components/ui/diagnosis/TipsPanel'

function Scan() {
	const navigate = useNavigate()
	const fileInputRef = useRef(null)

	const handleFile = (event) => {
		const file = event.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = () => {
			sessionStorage.setItem('diagnosis-image', reader.result)
			navigate('/dashboard/scan/preview')
		}
		reader.readAsDataURL(file)
	}

	return (
		<DiagnosisPageShell title="تشخيص جديد">
			<DiagnosisStepHeader eyebrow="غصن" title="ماذا تريد أن تفعل؟" description="اختر طريقة إدخال صورة النبات للتشخيص" />
			<input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />
			<div className="grid gap-6 md:grid-cols-2">
				<LiveScanCard label="التقاط صورة" description="استخدم كاميرا جهازك مباشرة" action="فتح الكاميرا" onClick={() => fileInputRef.current?.click()} />
				<FileScanCard label="رفع صورة" description="اختر صورة من المعرض" action="رفع صورة" onClick={() => fileInputRef.current?.click()} />
			</div>
			<div className="mt-8"><TipsPanel /></div>
		</DiagnosisPageShell>
	)
}

export default Scan