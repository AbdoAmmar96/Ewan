import { Link } from '@inertiajs/react';
import { ICONS } from '../icons';

export function Icon({ name, className = '' }) {
  const svg = ICONS[name] || '';
  return <span className={'ico ' + className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export function Logo() {
  return (
    <svg className="logo" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D8BE84" />
          <stop offset=".5" stopColor="#C5A55C" />
          <stop offset="1" stopColor="#8A6E32" />
        </linearGradient>
      </defs>
      <path d="M6 53 V20 C6 9 13.5 3 24 3 C34.5 3 42 9 42 20 V53" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 53 V21.5 C12 13.5 17 9 24 9 C31 9 36 13.5 36 21.5 V53" stroke="url(#lg)" strokeWidth="1.4" opacity=".55" />
      <line x1="24" y1="15" x2="24" y2="53" stroke="url(#lg)" strokeWidth="1.6" opacity=".8" />
      <path d="M19 27 l5 -5 l5 5" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 37 l5 5 l5 -5" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Brand({ dark = false }) {
  return (
    <Link href="/" className="brand brand-logo" aria-label="إيوان للمصاعد">
      <img
        src={dark ? '/uploads/brand/logo-light.png' : '/uploads/brand/logo.png'}
        alt="إيوان للمصاعد — EWAN ELEVATOR"
      />
    </Link>
  );
}
