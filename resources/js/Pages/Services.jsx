import SiteLayout from '../Layouts/SiteLayout';
import { SecHead, CtaBand } from '../Components/Bits';
import ServiceCards from '../Components/ServiceCards';
import { Process, WhyGrid } from '../Components/Process';
import { PageHero } from '../Components/Pieces';

export default function Services() {
  return (
    <SiteLayout
      title="خدماتنا — إيوان للمصاعد"
      description="مصاعد ركاب وبضائع ومنازل وسلالم كهربائية، صيانة وعقود سنوية وتحديث المصاعد القديمة. حلول متكاملة من إيوان."
    >
      <PageHero eyebrow="خدماتنا" title="حلول مصاعد متكاملة" sub="نورّد ونركّب ونصون كل أنواع المصاعد بأعلى معايير الأمان والجودة، ونفصّلها وفق احتياج مبناك." current="خدماتنا" />

      <section className="sec bg-cream">
        <div className="container">
          <SecHead eyebrow="ما نقدّمه" title="6 خدمات تغطّي كل احتياجاتك" sub="اختر الخدمة التي تناسب مشروعك، وفريقنا يكمّل الباقي." />
          <ServiceCards />
        </div>
      </section>

      <Process bg="bg-cream" />

      <section className="sec bg-cream2">
        <div className="container">
          <SecHead eyebrow="لماذا إيوان" title="ماذا تكسب حين تتعامل معنا" />
          <WhyGrid />
        </div>
      </section>

      <CtaBand title="هل تحتاج استشارة بشأن مصعد مبناك؟" sub="تواصل معنا وصِف لنا مشروعك، وسنرشّح لك الحل الأنسب وعرض سعر واضح." />
    </SiteLayout>
  );
}
