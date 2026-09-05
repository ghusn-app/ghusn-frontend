import { Camera, ImagePlus, Upload } from 'lucide-react'

function ImagePickerCard({ icon: Icon, label, description, action, onClick, variant = 'primary' }) {
	const isPrimary = variant === 'primary'
	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
			<div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${isPrimary ? 'bg-[#24642e] text-white' : 'bg-[#e1eee4] text-[#647a6a]'}`}>
				<Icon size={29} />
			</div>
			<h3 className="mt-5 text-lg font-bold text-[#24582c]">{label}</h3>
			<p className="mt-1 text-xs text-gray-400">{description}</p>
			<button type="button" onClick={onClick} className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${isPrimary ? 'bg-[#5b9f1d] text-white hover:bg-[#4f8d18]' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
				{action}
				{isPrimary ? <Camera size={17} /> : <Upload size={17} />}
			</button>
		</div>
	)
}

export function LiveScanCard(props) {
	return <ImagePickerCard icon={Camera} {...props} />
}

export function FileScanCard(props) {
	return <ImagePickerCard icon={ImagePlus} variant="secondary" {...props} />
}