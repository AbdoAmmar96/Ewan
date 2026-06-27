import { Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { statusLabel } from '../../Admin/status';

export default function Dashboard({ stats, recentLeads }) {
  const cards = [
    { v: stats.newLeads, l: 'طلبات جديدة', hot: true, href: '/admin/leads?status=new' },
    { v: stats.leads, l: 'إجمالي الطلبات', href: '/admin/leads' },
    { v: stats.services, l: 'الخدمات', href: '/admin/services' },
    { v: stats.projects, l: 'المشاريع', href: '/admin/projects' },
    { v: stats.packages, l: 'الباقات', href: '/admin/packages' },
    { v: stats.testimonials, l: 'آراء العملاء', href: '/admin/testimonials' },
  ];

  return (
    <AdminLayout title="لوحة التحكم">
      <div className="stat-grid">
        {cards.map((c, i) => (
          <Link key={i} href={c.href} className={'stat-card' + (c.hot ? ' hot' : '')}>
            <div className="v">{c.v}</div>
            <div className="l">{c.l}</div>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <h2>أحدث الطلبات</h2>
        {recentLeads.length === 0 ? (
          <div className="a-empty">لا توجد طلبات بعد. سيظهر هنا أول طلب يصل من نموذج الموقع.</div>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>الاسم</th><th>الخدمة</th><th>الهاتف</th><th>الحالة</th><th></th></tr></thead>
              <tbody>
                {recentLeads.map((l) => (
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td className="a-muted">{l.service}</td>
                    <td dir="ltr" style={{ textAlign: 'right' }}>{l.phone}</td>
                    <td><span className={'a-badge ' + l.status}>{statusLabel(l.status)}</span></td>
                    <td className="row-actions"><Link href={`/admin/leads/${l.id}`} className="a-btn a-btn-ghost a-btn-sm">فتح</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
