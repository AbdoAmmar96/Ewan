import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from './Icon';
import { useContent } from '../useContent';
import Modal from './Modal';

export default function ServiceCards() {
  const { SERVICES = [], CONTACT = {} } = useContent();
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="cards" data-stagger>
        {SERVICES.map((s, i) => (
          <article
            className="card" key={i} role="button" tabIndex={0}
            onClick={() => setActive(s)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(s); } }}
          >
            <div className="ic"><Icon name={s.icon} /></div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <ul className="feats">
              {s.feats.map((f, j) => <li key={j}><Icon name="check" /><span>{f}</span></li>)}
            </ul>
            <span className="link-gold">اعرف المزيد <Icon name="arrow" /></span>
          </article>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} className="dlg-service">
        {active && (
          <>
            <div className="dlg-head">
              <div className="dlg-ic"><Icon name={active.icon} /></div>
              <h3>{active.title}</h3>
            </div>
            <p className="dlg-lead">{active.desc}</p>
            {active.body && <p className="dlg-body">{active.body}</p>}
            {active.feats?.length > 0 && (
              <ul className="dlg-feats">
                {active.feats.map((f, j) => <li key={j}><Icon name="check" /><span>{f}</span></li>)}
              </ul>
            )}
            <div className="dlg-cta">
              <Link href="/contact" className="btn btn-gold">اطلب عرض سعر <Icon name="arrow" /></Link>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Icon name="wa" /> واتساب</a>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
