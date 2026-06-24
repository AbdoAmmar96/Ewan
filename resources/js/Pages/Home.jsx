import SiteLayout from '../Layouts/SiteLayout';
import Hero from '../Components/Hero';
import { Marquee, StatsBand, SecHead, CtaBand } from '../Components/Bits';
import ServiceCards from '../Components/ServiceCards';
import { Process, WhyGrid } from '../Components/Process';
import Projects from '../Components/Projects';
import Testimonials from '../Components/Testimonials';

export default function Home() {
  return (
    <SiteLayout
      title="إيوان للمصاعد — توريد وتركيب وصيانة المصاعد"
      description="إيوان: شركة مصاعد متخصصة في توريد وتركيب وصيانة مصاعد الركاب والبضائع والمنازل بمكوّنات أوروبية وفريق فني معتمد ودعم 24/7."
    >
      <Hero />
      <Marquee />
      <section className="sec bg-cream">
        <div className="container">
          <SecHead eyebrow="خدماتنا" title="كل ما يحتاجه مبناك من مصاعد" sub="من التوريد والتركيب إلى الصيانة والتحديث — حلول كاملة تحت سقف واحد." />
          <ServiceCards />
        </div>
      </section>
      <StatsBand />
      <section className="sec bg-cream2">
        <div className="container">
          <SecHead eyebrow="لماذا إيوان" title="أسباب تجعلك تختارنا" sub="لا نركّب مصعداً فحسب، بل نركّب راحة بال تدوم سنين." />
          <WhyGrid />
        </div>
      </section>
      <Process bg="bg-cream" />
      <Projects limit={6} bg="bg-cream2" />
      <Testimonials bg="bg-cream" />
      <CtaBand />
    </SiteLayout>
  );
}
