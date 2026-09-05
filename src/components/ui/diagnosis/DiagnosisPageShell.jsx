import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ghusnLogo from '../../../assets/ghusn-logo.svg'

function DiagnosisPageShell({ title, children, backTo = '/dashboard/scan' }) {
	return (
		<div dir="rtl" className="min-h-screen bg-[#f8faf8] text-[#173f20]">
			<header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6 lg:px-10">
				<Link to={backTo} aria-label="العودة" className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100">
					<ArrowRight size={22} />
				</Link>
				<h1 className="text-base font-bold text-[#4f8f1d]">{title}</h1>
				<img src={ghusnLogo} alt="غصن" className="h-10 w-16 object-contain" />
			</header>
			<main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:py-14">{children}</main>
		</div>
	)
}

export default DiagnosisPageShell