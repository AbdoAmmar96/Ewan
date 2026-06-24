import { Link } from '@inertiajs/react';
import { Icon } from './Icon';
import { useContent } from '../useContent';

export function PageHero({ eyebrow, title, sub, current }) {
  return (
    <section className="phero">
      <div className="glow" />
      <div className="container">
        <span className="eyebrow center">{eyebrow}</span>
        <h1 className="h-xl">{title}</h1>
        <p className="lead">{sub}</p>
        <div className="crumbs">
          <Link href="/">الرئيسية</Link>
          <span className="sep">/</span>
          <span className="cur">{current}</span>
        </div>
      </div>
    </section>
  );
}

export function Packages() {
  const { PACKAGES = [] } = useContent();
  return (
    <div className="pkgs" data-stagger>
      {PACKAGES.map((p, i) => (
        <div className={'pkg' + (p.featured ? ' feat-pkg' : '')} key={i}>
          {p.featured && <span className="badge2">الأكثر طلباً</span>}
          <div className="pname">{p.name}</div>
          <div className="pamount">{p.amount}</div>
          <div className="pdesc">{p.desc}</div>
          <ul className="plist">
            {p.feats.map((f, j) => <li key={j}><Icon name="check" /><span>{f}</span></li>)}
          </ul>
          <Link href="/contact" className={'btn ' + (p.featured ? 'btn-gold' : 'btn-ghost')} style={{ width: '100%', justifyContent: 'center' }}>
            اطلب الباقة <Icon name="arrow" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export function ValuesCards() {
  const { VALUES = [] } = useContent();
  return (
    <div className="vals" data-stagger>
      {VALUES.map((v, i) => (
        <div className="val" key={i}>
          <div className="ic"><Icon name={v.icon} /></div>
          <h3>{v.title}</h3>
          <p>{v.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function TeamGrid() {
  const { TEAM = [] } = useContent();
  return (
    <div className="team" data-stagger>
      {TEAM.map((m, i) => (
        <div className="member" key={i}>
          <div className="av"><span className="ini">{m.ini}</span></div>
          <h3>عضو فريق إيوان</h3>
          <div className="role">{m.role}</div>
        </div>
      ))}
    </div>
  );
}

export function Checklist() {
  const { CHECKS = [] } = useContent();
  return (
    <ul className="checklist">
      {CHECKS.map((c, i) => (
        <li key={i}>
          <div className="ic"><Icon name="check" /></div>
          <div><b>{c.b}</b><span>{c.s}</span></div>
        </li>
      ))}
    </ul>
  );
}

export function ContactInfo() {
  const { CONTACT = {} } = useContent();
  const items = [
    { ic: 'pin', t: 'العنوان', v: <span>{CONTACT.address}</span> },
    { ic: 'phone', t: 'هاتف', v: <a href={`tel:${CONTACT.phoneTel}`} className="lat" style={{ direction: 'ltr', display: 'inline-block' }}>{CONTACT.phoneDisp}</a> },
    { ic: 'mail', t: 'البريد الإلكتروني', v: <a href={`mailto:${CONTACT.email}`} className="lat">{CONTACT.email}</a> },
    { ic: 'clock', t: 'ساعات العمل', v: <span>{CONTACT.hours}</span> },
  ];
  return (
    <div className="cinfo" data-stagger>
      {items.map((it, i) => (
        <div className="cinfo-item" key={i}>
          <div className="ic"><Icon name={it.ic} /></div>
          <div><h4>{it.t}</h4><p>{it.v}</p></div>
        </div>
      ))}
      <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ justifyContent: 'center', marginTop: '4px' }}>
        <Icon name="wa" /> تواصل معنا واتساب
      </a>
    </div>
  );
}

export function MapBlock() {
  const { CONTACT = {} } = useContent();
  return (
    <section className="sec-tight bg-cream">
      <div className="container">
        <div className="map-wrap" data-reveal>
          <div className="pin"><Icon name="pinFill" /></div>
          <div className="lbl">{CONTACT.address}</div>
        </div>
      </div>
    </section>
  );
}
