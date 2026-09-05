import DiseaseCard from './DiseaseCard'
import blackScaleInsectBackground from '../../../assets/Background-on-the-black-scale-insect.png'
import peacockSpotBackground from '../../../assets/Background-Peacock-spot-disease-in-olives .png'
import rustBackground from '../../../assets/Background-Dreaming-of-Rust.png'

const diseases = [
	{ image: blackScaleInsectBackground, title: 'الحشرة القشرية السوداء', severity: 'شائع وخفيف', tone: 'amber', description: 'تظهر الحشرات على الأوراق والأغصان وتضعف نمو الشجرة، ويمكن السيطرة عليها بالعناية المناسبة.' },
	{ image: peacockSpotBackground, title: 'تبقع عين الطاووس في الزيتون', severity: 'شديد الخطورة', tone: 'red', description: 'مرض فطري يسبب بقعًا دائرية على الأوراق وقد يؤدي إلى تساقطها، لذا يحتاج إلى متابعة مستمرة.' },
	{ image: rustBackground, title: 'حلم العُصا', severity: 'يمكن الوقاية منه', tone: 'green', description: 'يظهر على الأوراق والأفرع ويسبب تشوهات بسيطة، وتساعد المراقبة المبكرة على الحد من انتشاره.' },
]

function CommonDiseasesSection() {
	return (
		<section>
			<div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold text-[#5b961e]">تعرّف على الأمراض الشائعة</h2><button type="button" className="text-sm font-bold text-[#6b9d36] hover:underline">عرض الكل</button></div>
			<div className="grid gap-5 md:grid-cols-3">{diseases.map((disease) => <DiseaseCard key={disease.title} {...disease} />)}</div>
		</section>
	)
}

export default CommonDiseasesSection
