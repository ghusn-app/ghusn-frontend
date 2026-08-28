import Navbar from "../../components/ui/home/Navbar";
import Hero from "../../components/ui/home/Hero";
import IntroBand from "../../components/ui/home/IntroBand";
import HowItWorks from "../../components/ui/home/HowItWorks";
import WhyOliveTrees from "../../components/ui/home/WhyOliveTrees";
import AboutPlatform from "../../components/ui/home/AboutPlatform";
import Footer from "../../components/ui/home/Footer";

function Home() {
  return (
    <div dir="rtl">
      <Navbar />
      <Hero />
      <IntroBand />
      <HowItWorks />
      <WhyOliveTrees />
      <AboutPlatform />
      <Footer />
    </div>
  )
}

export default Home