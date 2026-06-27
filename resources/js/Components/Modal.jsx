import { useEffect } from 'react';

export default function Modal({ open, onClose, children, className = '' }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dlg-bg" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={'dlg ' + className} role="dialog" aria-modal="true">
        <button className="dlg-x" aria-label="إغلاق" onClick={onClose}><span /><span /></button>
        {children}
      </div>
    </div>
  );
}
