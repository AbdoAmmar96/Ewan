import { Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { statusLabel, fmtDate } from '../../../Admin/status';

export default function Index({ leads, filter, counts }) {
  const tabs = [
    { k: '', l: 'الكل', c: counts.all },
    { k: 'new', l: 'جديد', c: counts.new },
    { k: 'read', l: 'مقروء', c: counts.read },
    { k: 'replied', l: 'تم الرد', c: counts.replied },
    { k: 'archived', l: 'مؤرشف', c: counts.archived },
  ];

  return (
    <AdminLayout title="طلبات عروض الأسعار">
      <div className="a-tabs">
        {tabs.map((t) => (
          <Link key={t.k} href={'/admin/leads' + (t.k ? '?status=' + t.k : '')} className={(filter || '') === t.k ? 'active' : ''}>
            {t.l} <span className="c">({t.c})</span>
          </Link>
        ))}
      </div>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>الاسم</th><th>الهاتف</th><th>الخدمة</th><th>التاريخ</th><th style={{ width: '90px' }}>الحالة</th><th style={{ width: '90px' }} /></tr></thead>
          <tbody>
            {leads.length === 0 && <tr><td colSpan={6} className="a-empty">لا توجد طلبات في هذا القسم.</td></tr>}
            {leads.map((l) => (
              <tr key={l.id}>
                <td><b>{l.name}</b></td>
                <td dir="ltr" style={{ textAlign: 'right' }}>{l.phone}</td>
                <td className="a-muted">{l.service}</td>
                <td className="a-muted" style={{ whiteSpace: 'nowrap' }}>{fmtDate(l.created_at)}</td>
                <td><span className={'a-badge ' + l.status}>{statusLabel(l.status)}</span></td>
                <td className="row-actions"><Link href={`/admin/leads/${l.id}`} className="a-btn a-btn-ghost a-btn-sm">فتح</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
