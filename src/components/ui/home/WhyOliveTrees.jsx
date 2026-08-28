import oliveHarvestTool from '../../../assets/gallery-1.png'
import oliveBranchHand from '../../../assets/gallery-2.png'
import oliveFruitCluster from '../../../assets/gallery-3.png'
import oliveFieldWide from '../../../assets/gallery-4.png'

// =========================
// Why Olive Trees
// =========================
// Four-photo grid, staggered so the middle two sit slightly lower than the
// outer two, matching the reference layout. Swap the imports for the real
// project photography.

const photos = [
  { src: oliveHarvestTool, alt: 'أداة حصاد الزيتون', offset: false },
  { src: oliveBranchHand, alt: 'يد تحمل غصن زيتون', offset: true },
  { src: oliveFruitCluster, alt: 'عنقود ثمار الزيتون', offset: true },
  { src: oliveFieldWide, alt: 'حقل أشجار الزيتون', offset: false },
]

function WhyOliveTrees() {
  return (
    <section
      dir="rtl"
      className="
        bg-[#F7F8F4]
        px-5
        py-16
        sm:py-20
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-6xl
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-2
          lg:gap-16
        "
      >
        {/* Text */}
        <div className="text-center lg:text-right">
          <h2 className="text-2xl font-extrabold text-black sm:text-3xl">
            ما أهمية شجر الزيتون؟
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            أشجار الزيتون جزء أساسي من الزراعة والاقتصاد في فلسطين، ومصدر
            رزق وتراث للمزارعين، وللعناية بها دور مهم في دعم اقتصاد
            المزارعين والهوية الفلسطينية.
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo) => (
            <div
              key={photo.alt}
              className={`
                overflow-hidden
                rounded-2xl
                ${photo.offset ? 'mt-6' : ''}
              `}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="
                  h-32
                  w-full
                  object-cover
                  sm:h-44
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyOliveTrees