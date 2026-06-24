import SiteLayout from '../Layouts/SiteLayout';
import { CtaBand } from '../Components/Bits';
import ContactForm from '../Components/ContactForm';
import Faq from '../Components/Faq';
import { PageHero, ContactInfo, MapBlock } from '../Components/Pieces';

export default function Contact() {
  return (
    <SiteLayout
      title="تواصل معنا — إيوان للمصاعد"
      description="تواصل مع إيوان للمصاعد واطلب معاينة وعرض سعر مجاني. هاتف، وواتساب، ونموذج طلب عرض سعر."
    >
      <PageHero eyebrow="تواصل معنا" title="لنبدأ مشروعك" sub="املأ النموذج أو تواصل معنا عبر واتساب، وسنرتّب معاينة مجانية ونرسل لك عرض سعر واضح دون أي التزام." current="تواصل معنا" />

      <section className="sec bg-cream">
        <div className="container">
          <div className="contact-grid">
            <ContactInfo />
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <MapBlock />
      <Faq bg="bg-cream2" />
      <CtaBand title="ما زلت متردداً؟" sub="المعاينة وعرض السعر مجانيان تماماً. اسأل ونحن في خدمتك." />
    </SiteLayout>
  );
}
