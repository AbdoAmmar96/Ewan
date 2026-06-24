import { Link } from '@inertiajs/react';
import { Icon } from './Icon';
import { useContent } from '../useContent';

export function SecHead({ eyebrow, title, sub, center = false }) {
  const c = center ? ' center' : '';
  return (
    <div className={'sec-head' + c} data-reveal>
      <span className={'eyebrow' + c}>{eyebrow}</span>
      <h2 className="h-lg">{title}</h2>
      {sub && <p className="lead">{sub}</p>}
    </div>
  );
}

export function Marquee() {
  const { MARQUEE = [] } = useContent();
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((t, i) => <span className="item" key={i}>{t}</span>)}
      </div>
    </div>
  );
}

function StatNum({ s }) {
  if (s.text) return <div className="num gold-text">{s.text}</div>;
  return (
    <div className="num gold-text">
      <span data-count={s.n}>0</span>{s.suffix && <i>{s.suffix}</i>}
    </div>
  );
}

export function StatsBand() {
  const { STATS = [] } = useContent();
  return (
    <section className="sec-tight bg-ink">
      <div className="container">
        <div className="stats" data-stagger>
          {STATS.map((s, i) => (
            <div className="stat" key={i}>
              <StatNum s={s} />
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = 'هل أنت مستعد للارتقاء بمبناك؟',
  sub = 'تواصل معنا الآن واحصل على معاينة وعرض سعر مجاني دون أي التزام. فريق إيوان في خدمتك.',
  btn = 'اطلب عرض سعر مجاني',
}) {
  const { CONTACT = {} } = useContent();
  return (
    <section className="sec">
      <div className="container">
        <div className="cta-band" data-reveal>
          <div className="lines" />
          <div className="sheen" />
          <span className="eyebrow center" style={{ marginBottom: '18px' }}>ابدأ مشروعك</span>
          <h2 className="h-lg">{title}</h2>
          <p className="lead">{sub}</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-gold">{btn} <Icon name="arrow" /></Link>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><Icon name="wa" /> واتساب</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Fab() {
  const { CONTACT = {} } = useContent();
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <>
      <a className="fab-wa" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="واتساب"><Icon name="wa" /></a>
      <button className="to-top" aria-label="لأعلى" onClick={toTop}><Icon name="up" /></button>
    </>
  );
}

const DOOR_MARK = `<svg viewBox="0 0 48 56" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D8BE84"/><stop offset="1" stop-color="#8A6E32"/></linearGradient></defs><path d="M6 53 V20 C6 9 13.5 3 24 3 C34.5 3 42 9 42 20 V53" stroke="url(#dg)" stroke-width="2.6" stroke-linecap="round"/><path d="M19 27 l5 -5 l5 5" stroke="url(#dg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 37 l5 5 l5 -5" stroke="url(#dg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function ElevatorDoors() {
  return (
    <div id="doors" aria-hidden="true">
      <div className="panel left" />
      <div className="floor"><span className="dot" /><span className="lat">EWAN</span></div>
      <div className="seam">
        <div className="mark" dangerouslySetInnerHTML={{ __html: DOOR_MARK }} />
        <div className="nm">ELEVATORS</div>
      </div>
      <div className="panel right" />
    </div>
  );
}
