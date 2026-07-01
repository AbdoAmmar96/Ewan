import SiteLayout from '../Layouts/SiteLayout';
import { SecHead, CtaBand } from '../Components/Bits';
import Faq from '../Components/Faq';
import { PageHero, Packages } from '../Components/Pieces';

export default function PackagesPage() {
  return (
    <SiteLayout
      title="باقات الصيانة — إيوان للمصاعد"
      description="عقود صيانة سنوية مرنة لكل مبنى — زيارات دورية، طوارئ 24/7، وقطع غيار أصلية. اختر الباقة التي تناسب مصعدك."
    >
      <PageHero
        eyebrow="عقود الصيانة"
        title="باقات صيانة تناسب كل مبنى"
        sub="صيانة تطيل عمر مصعدك وتقلّل الأعطال المفاجئة — اختر الباقة الأنسب لمبناك واترك الباقي علينا."
        current="باقات الصيانة"
      />

      <section className="sec bg-ink">
        <div className="container">
          <SecHead eyebrow="اختر باقتك" title="باقات صيانة مرنة" sub="كل الباقات تشمل فريقاً معتمداً وقطع غيار أصلية ودعم طوارئ." center />
          <Packages />
        </div>
      </section>

      <Faq bg="bg-cream" />

      <CtaBand title="مش متأكد من الباقة المناسبة؟" sub="تواصل معنا وصِف لنا مصعدك ومبناك، وسنرشّح لك الباقة الأنسب وعرض سعر واضح." />
    </SiteLayout>
  );
}
