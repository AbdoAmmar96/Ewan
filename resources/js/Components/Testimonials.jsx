import { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon';
import { SecHead } from './Bits';
import { useContent } from '../useContent';

export default function Testimonials({ bg = 'bg-cream2' }) {
  const { TESTIMONIALS = [] } = useContent();
  const [idx, setIdx] = useState(0);
  const n = TESTIMONIALS.length;
  const timer = useRef(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduce) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % n), 5500);
    return () => clearInterval(timer.current);
  }, [n, reduce]);

  const go = (i) => {
    setIdx(i);
    if (timer.current) { clearInterval(timer.current); if (!reduce) timer.current = setInterval(() => setIdx((p) => (p + 1) % n), 5500); }
  };

  return (
    <section className={'sec ' + bg}>
      <div className="container">
        <SecHead eyebrow="آراء عملائنا" title="عملاء جرّبوا إيوان" sub="ليس نحن من نقول، بل هؤلاء عملاؤنا." center />
        <div className="quotes" data-reveal>
          <div className="quote-track" style={{ transform: `translateX(${idx * 100}%)` }}>
            {TESTIMONIALS.map((t, i) => (
              <div className="quote" key={i}>
                <div className="card2">
                  <div className="qm">&#8221;</div>
                  <div className="stars">{Array.from({ length: 5 }, (_, j) => <Icon name="star" key={j} />)}</div>
                  <p className="txt">{t.quote}</p>
                  <div className="who">
                    <div className="av">{t.ini}</div>
                    <div className="nm"><b>{t.name}</b><span>{t.role}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="q-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={i === idx ? 'active' : ''} aria-label={'رأي ' + (i + 1)} onClick={() => go(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
