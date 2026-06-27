import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from './Icon';
import { SecHead } from './Bits';
import { scene } from '../site';
import { useContent } from '../useContent';
import Modal from './Modal';

const bgOf = (p) => (p.image
  ? { backgroundImage: `url("${p.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
  : scene(p.motif, p.tint));

export default function Projects({ limit = null, withFilters = false, hideHead = false, bg = 'bg-cream' }) {
  const { PROJECTS = [], FILTERS = [], CONTACT = {} } = useContent();
  const [cat, setCat] = useState('all');
  const [active, setActive] = useState(null);
  const data = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  // The grid remounts on filter change (key={cat}); the global reveal observer
  // only runs once, so force the re-mounted grid visible whenever the filter changes.
  const gridRef = useRef(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const g = gridRef.current;
    if (g) requestAnimationFrame(() => g.classList.add('in'));
  }, [cat]);

  return (
    <section className={'sec ' + bg}>
      <div className="container">
        {!hideHead && <SecHead eyebrow="أعمالنا" title="مشاريع سلّمناها ونفخر بها" sub="من أبراج سكنية إلى مولات وفنادق ومستشفيات — اضغط على أي مشروع لعرض تفاصيله." center />}

        {withFilters && (
          <div className="filters" data-reveal>
            {FILTERS.map((f) => (
              <button key={f.cat} className={cat === f.cat ? 'active' : ''} onClick={() => setCat(f.cat)}>{f.label}</button>
            ))}
          </div>
        )}

        <div className="proj-grid" data-stagger key={cat} ref={gridRef}>
          {data.filter((p) => cat === 'all' || p.cat === cat).map((p, i) => (
            <article
              className="proj" key={i} role="button" tabIndex={0}
              onClick={() => setActive(p)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(p); } }}
            >
              <div className="ph" style={bgOf(p)} />
              <div className="body">
                <span className="tag">{p.catL}</span>
                <h3>{p.title}</h3>
                <p className="proj-desc">{p.detail}</p>
              </div>
            </article>
          ))}
        </div>

        {limit && (
          <div className="center" data-reveal style={{ marginTop: '48px' }}>
            <Link href="/projects" className="btn">كل المشاريع <Icon name="arrow" /></Link>
          </div>
        )}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} className="dlg-project">
        {active && (
          <>
            <div className="dlg-img" style={bgOf(active)} />
            <div className="dlg-pcontent">
              <span className="tag">{active.catL}</span>
              <h3>{active.title}</h3>
              <div className="dlg-pmeta"><Icon name="pin" /><span>{active.loc}</span></div>
              <p className="dlg-lead">{active.detail}</p>
              {active.body && <p className="dlg-body">{active.body}</p>}
              <div className="dlg-cta">
                <Link href="/contact" className="btn btn-gold">اطلب مشروع مشابه <Icon name="arrow" /></Link>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Icon name="wa" /> واتساب</a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
