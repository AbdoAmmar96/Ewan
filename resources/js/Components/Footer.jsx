import { Link } from '@inertiajs/react';
import { Brand, Icon } from './Icon';
import { useContent } from '../useContent';

export default function Footer() {
  const { CONTACT = {} } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="fglow" />
      <div className="container">
        <div className="f-top">
          <div className="f-col f-brand">
            <Brand dark />
            <p style={{ marginTop: '22px' }}>
              شركة متخصصة في توريد وتركيب وصيانة المصاعد بأنواعها. نرتقي بمستوى مبانيك بحلول حركة عمودية آمنة وبمكوّنات أوروبية وفريق فني معتمد.
            </p>
            <div className="f-social">
              <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك"><Icon name="facebook" /></a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="انستجرام"><Icon name="instagram" /></a>
              <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="لينكدإن"><Icon name="linkedin" /></a>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="واتساب"><Icon name="wa" /></a>
            </div>
          </div>

          <div className="f-col">
            <h4>روابط سريعة</h4>
            <ul>
              <li><Link href="/">الرئيسية</Link></li>
              <li><Link href="/about">من نحن</Link></li>
              <li><Link href="/services">خدماتنا</Link></li>
              <li><Link href="/projects">أعمالنا</Link></li>
              <li><Link href="/contact">تواصل معنا</Link></li>
            </ul>
          </div>

          <div className="f-col">
            <h4>خدماتنا</h4>
            <ul>
              <li><Link href="/services">مصاعد ركاب</Link></li>
              <li><Link href="/services">مصاعد بضائع</Link></li>
              <li><Link href="/services">مصاعد منازل وفيلات</Link></li>
              <li><Link href="/services">سلالم كهربائية</Link></li>
              <li><Link href="/services">صيانة وعقود سنوية</Link></li>
            </ul>
          </div>

          <div className="f-col">
            <h4>تواصل معنا</h4>
            <ul className="f-contact">
              <li><Icon name="pin" /><span>{CONTACT.address}</span></li>
              <li><Icon name="phone" /><a href={`tel:${CONTACT.phoneTel}`} className="lat" style={{ direction: 'ltr' }}>{CONTACT.phoneDisp}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${CONTACT.email}`} className="lat">{CONTACT.email}</a></li>
              <li><Icon name="clock" /><span>{CONTACT.hours}</span></li>
            </ul>
          </div>
        </div>

        <div className="f-bottom">
          <div className="copy">© {year} <a href="#">شركة شريك الأعمال لتقنية المعلومات</a>. جميع الحقوق محفوظة.</div>
          <div className="legal"><a href="#">سياسة الخصوصية</a><a href="#">الشروط والأحكام</a></div>
        </div>
      </div>
    </footer>
  );
}
