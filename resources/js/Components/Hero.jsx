import { Link } from '@inertiajs/react';
import { Icon } from './Icon';
import { useContent } from '../useContent';

function Digits() {
  return (
    <div className="digits">
      {Array.from({ length: 10 }, (_, i) => <span key={i}>{i + 1}</span>)}
    </div>
  );
}

function Car() {
  return (
    <div className="car2">
      <div className="disp"><Digits /></div>
      <div className="cdoors"><span /><span /></div>
      <div className="ar-i"><Icon name="up" /></div>
    </div>
  );
}

function Shaft({ dir }) {
  return (
    <div className={'shaftw ' + dir}>
      <div className="cable" />
      <div className="rail l" />
      <div className="rail r" />
      <Car />
    </div>
  );
}

export default function Hero() {
  const { HERO_STATS = [] } = useContent();
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">هندسة الحركة العمودية</span>
            <h1 className="h-xl">
              <span className="line"><span>مصاعد تعمل</span></span>
              <span className="line"><span>دون أن</span></span>
              <span className="line"><span className="gold-text">تقلق بشأنها</span></span>
            </h1>
            <p className="hero-sub lead">
              إيوان تورّد وتركّب وتصون مصاعد الركاب والبضائع والمنازل بمكوّنات أوروبية وفريق فني معتمد — ونصلك في أقل من ساعة وقت الطوارئ.
            </p>
            <div className="hero-cta btn-row">
              <Link href="/contact" className="btn btn-gold">اطلب عرض سعر مجاني <Icon name="arrow" /></Link>
              <Link href="/services" className="btn btn-ghost">تصفّح خدماتنا</Link>
            </div>
            <div className="hero-stats">
              {HERO_STATS.map((s, i) => (
                <div className="st" key={i}>
                  <div className="num">
                    {s.text ? s.text : <><span data-count={s.n}>0</span>{s.suffix && <i>{s.suffix}</i>}</>}
                  </div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <Shaft dir="up" />
            <Shaft dir="down" />
            <div className="hero-badge b1">
              <div className="ic"><Icon name="shield" /></div>
              <div><div>مطابق لكود السلامة</div><div className="sm">EN 81 الأوروبي</div></div>
            </div>
            <div className="hero-badge b2">
              <div className="ic"><Icon name="medal" /></div>
              <div><div>ضمان حتى 5 سنوات</div><div className="sm">على التركيب والمكوّنات</div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue"><div className="m" /><span>انزل للأسفل</span></div>
    </section>
  );
}
