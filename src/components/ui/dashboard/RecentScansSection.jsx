import { Link } from 'react-router-dom'
import ScanListItem from './ScanListItem'

function RecentScansSection() {
	return <section className="rounded-2xl border border-gray-200 bg-white px-5 py-2 shadow-sm"><div className="flex items-center justify-between border-b border-gray-100 py-4"><h2 className="text-xl font-bold text-[#5b961e]">آخر الفحوصات</h2><Link to="/dashboard/history" className="text-sm font-bold text-[#6b9d36] hover:underline">عرض الكل</Link></div><ScanListItem title="الحشرة القشرية السوداء" date="اليوم، 11:50 ص" status="شائع وخفيف" tone="amber" /><ScanListItem title="تبقع عين الطاووس في الزيتون" date="أمس، 11:50 ص" status="شديد الخطورة" tone="red" /><ScanListItem title="حلم العُصا" date="قبل 3 أيام، 11:50 ص" status="يمكن الوقاية منه" /></section>
}

export default RecentScansSection
