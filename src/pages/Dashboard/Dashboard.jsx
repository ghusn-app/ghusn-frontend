import HeroBanner from '../../components/ui/dashboard/HeroBanner'
import AgricultureAlertCard from '../../components/ui/dashboard/AgricultureAlertCard'
import CommonDiseasesSection from '../../components/ui/dashboard/CommonDiseasesSection'
import RecentScansSection from '../../components/ui/dashboard/RecentScansSection'

function Dashboard() {
	return (
		<div className="mx-auto w-full max-w-7xl space-y-8 pt-3">
			<div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)] lg:items-stretch">
				<HeroBanner />
				<AgricultureAlertCard />
			</div>
			<CommonDiseasesSection />
			<RecentScansSection />
		</div>
	)
}

export default Dashboard
