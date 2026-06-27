import { Link, usePage, router, Head } from '@inertiajs/react';

const CMS = [
  { key: 'services', label: 'الخدمات' },
  { key: 'projects', label: 'المشاريع' },
  { key: 'packages', label: 'الباقات' },
  { key: 'faqs', label: 'الأسئلة الشائعة' },
  { key: 'testimonials', label: 'آراء العملاء' },
  { key: 'why', label: 'لماذا إيوان' },
  { key: 'process', label: 'خطوات العمل' },
  { key: 'values', label: 'الرسالة والرؤية' },
  { key: 'team', label: 'الفريق' },
  { key: 'advantages', label: 'لماذا تتعامل معنا' },
];

export default function AdminLayout({ title, children, actions = null }) {
  const page = usePage();
  const url = page.url;
  const user = page.props.auth?.user;
  const flash = page.props.flash || {};
  const newLeads = page.props.adminNewLeads || 0;
  const is = (href) => url === href || url.startsWith(href + '/') || url.startsWith(href + '?');
  const logout = () => router.post('/logout');

  return (
    <div className="admin">
      <Head title={(title ? title + ' — ' : '') + 'لوحة إيوان'} />
      <aside className="admin-side">
        <div className="brandline">
          <img src="/uploads/brand/logo-light.png" alt="إيوان للمصاعد" className="admin-logo" />
        </div>

        <nav className="admin-nav">
          <div className="grp">عام</div>
          <Link href="/admin" className={url === '/admin' ? 'active' : ''}>لوحة التحكم</Link>
          <Link href="/admin/leads" className={is('/admin/leads') ? 'active' : ''}>
            الطلبات{newLeads > 0 && <span className="badge">{newLeads}</span>}
          </Link>

          <div className="grp">المحتوى</div>
          {CMS.map((c) => (
            <Link key={c.key} href={`/admin/${c.key}`} className={is(`/admin/${c.key}`) ? 'active' : ''}>{c.label}</Link>
          ))}

          <div className="grp">الإعدادات</div>
          <Link href="/admin/settings" className={is('/admin/settings') ? 'active' : ''}>إعدادات الموقع</Link>
          <a href="/" target="_blank" rel="noopener noreferrer">عرض الموقع ↗</a>
        </nav>
      </aside>

      <div className="admin-main">
        <div className="admin-top">
          <h1>{title}</h1>
          <div className="who">
            {actions}
            <span>{user?.name}</span>
            <button className="a-btn a-btn-ghost a-btn-sm" onClick={logout}>خروج</button>
          </div>
        </div>
        <div className="admin-body">
          {flash.success && <div className="admin-flash">{flash.success}</div>}
          {children}
        </div>
      </div>
    </div>
  );
}
