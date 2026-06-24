import { Icon } from './Icon';
import { SecHead } from './Bits';
import { useContent } from '../useContent';

export function Process({ bg = 'bg-cream2' }) {
  const { PROCESS = [] } = useContent();
  return (
    <section className={'sec ' + bg}>
      <div className="container">
        <SecHead eyebrow="كيف نعمل" title="من أول مكالمة حتى التشغيل" sub="خطوات واضحة ومحسوبة، تعرف في كل مرحلة أين أنت وما الذي يأتي بعد ذلك." center />
        <div className="process">
          <div className="proc-line">
            <svg viewBox="0 0 1000 4" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pgrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#C5A55C" />
                  <stop offset="1" stopColor="#8A6E32" />
                </linearGradient>
              </defs>
              <path d="M0 2 H1000" />
            </svg>
          </div>
          <div className="proc-steps">
            {PROCESS.map((p, i) => (
              <div className="pstep" data-reveal key={i}>
                <div className="node"><Icon name={p.icon} /><span className="n lat">{i + 1}</span></div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyGrid() {
  const { WHY = [] } = useContent();
  return (
    <div className="feat-grid" data-stagger>
      {WHY.map((w, i) => (
        <div className="feat" key={i}>
          <div className="ic"><Icon name={w.icon} /></div>
          <h3>{w.title}</h3>
          <p>{w.desc}</p>
        </div>
      ))}
    </div>
  );
}
