import Hero from '../components/Hero/Hero';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import Feature from '../components/Feature/Feature';
import DoctorSection from '../components/Doctor/DoctorSection';
import FAQ from '../components/FAQ/FAQ';
import Testimonials from '../components/Testimonials/Testimonials';

function Home() {
  return (
    <main>
      <Hero/>
      <HowItWorks/>
      <About/>
      <Services/>
      <Feature/>
      <DoctorSection/>
      <FAQ/>
      <Testimonials/>
    </main>
  )
}

export default Home