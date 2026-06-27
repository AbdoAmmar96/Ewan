import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Brand, Icon } from './Icon';
import { NAV } from '../site';
import { useContent } from '../useContent';

export default function Header() {
  const { url } = usePage();
  const { CONTACT } = useContent();
  const [open, setOpen] = useState(false);
  const here = (h) => (h === '/' ? url === '/' : url.startsWith(h));

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    document.body.classList.toggle('no-scroll', open);
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open', 'no-scroll');
    };
  }, [open]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Brand />
            <nav className="nav">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className={here(n.href) ? 'active' : ''}>{n.label}</Link>
              ))}
            </nav>
            <div className="header-cta">
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="phone" aria-label="تواصل معنا عبر واتساب"><Icon name="wa" /><span className="lat">{CONTACT.phoneDisp}</span></a>
              <Link href="/contact" className="btn btn-gold">طلب عرض سعر <Icon name="arrow" /></Link>
              <button className="burger" aria-label="القائمة" onClick={() => setOpen((v) => !v)}>
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="drawer">
        <div className="drawer-bg" onClick={() => setOpen(false)} />
        <button className="drawer-close" aria-label="إغلاق القائمة" onClick={() => setOpen(false)}>
          <span /><span />
        </button>
        <nav>
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href} className={here(n.href) ? 'active' : ''} onClick={() => setOpen(false)}>
              {n.label}<span>{'0' + (i + 1)}</span>
            </Link>
          ))}
        </nav>
        <div className="drawer-foot">
          <a href={`tel:${CONTACT.phoneTel}`} className="ph">{CONTACT.phoneDisp}</a>
          <Link href="/contact" className="btn btn-gold" onClick={() => setOpen(false)}>اطلب عرض سعر مجاني <Icon name="arrow" /></Link>
        </div>
      </div>
    </>
  );
}
