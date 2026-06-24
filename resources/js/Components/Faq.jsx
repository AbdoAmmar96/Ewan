import { useState, useRef } from 'react';
import { SecHead } from './Bits';
import { useContent } from '../useContent';

function Item({ q, a, open, onToggle }) {
  const ref = useRef(null);
  return (
    <div className={'faq-item' + (open ? ' open' : '')}>
      <button className="faq-q" onClick={onToggle}>
        {q}<span className="ic" />
      </button>
      <div className="faq-a" ref={ref} style={{ maxHeight: open && ref.current ? ref.current.scrollHeight + 'px' : '0px' }}>
        <div className="inner">{a}</div>
      </div>
    </div>
  );
}

export default function Faq({ bg = 'bg-cream' }) {
  const { FAQS = [] } = useContent();
  const [open, setOpen] = useState(-1);
  return (
    <section className={'sec ' + bg}>
      <div className="container">
        <SecHead eyebrow="أسئلة شائعة" title="أسئلة تتكرر علينا" center />
        <div className="faq" data-stagger>
          {FAQS.map((f, i) => (
            <Item key={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
