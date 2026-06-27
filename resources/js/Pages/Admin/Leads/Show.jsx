import { useForm, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { STATUS, fmtDate } from '../../../Admin/status';

export default function Show({ lead }) {
  const form = useForm({ status: lead.status, admin_note: lead.admin_note || '' });

  const save = (e) => { e.preventDefault(); form.put(`/admin/leads/${lead.id}`, { preserveScroll: true }); };
  const remove = () => { if (confirm('حذف الطلب نهائياً؟')) router.delete(`/admin/leads/${lead.id}`); };

  const rows = [
    ['الاسم', lead.name],
    ['الهاتف', <a key="p" href={`tel:${lead.phone}`} dir="ltr">{lead.phone}</a>],
    ['البريد الإلكتروني', lead.email ? <a key="e" href={`mailto:${lead.email}`} dir="ltr">{lead.email}</a> : '—'],
    ['الخدمة', lead.service],
    ['التاريخ', fmtDate(lead.created_at)],
  ];

  return (
    <AdminLayout title={'طلب من ' + lead.name} actions={<Link href="/admin/leads" className="a-btn a-btn-ghost a-btn-sm">رجوع للطلبات</Link>}>
      <div className="lead-grid">
        <div className="admin-card">
          <h2>تفاصيل الطلب</h2>
          <table className="a-kv"><tbody>{rows.map(([k, v], i) => <tr key={i}><th>{k}</th><td>{v}</td></tr>)}</tbody></table>

          <div className="a-field" style={{ marginTop: '18px' }}>
            <label>الرسالة</label>
            <div className="lead-msg">{lead.message}</div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a className="a-btn a-btn-gold a-btn-sm" href={`https://wa.me/${(lead.phone || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">واتساب</a>
            <a className="a-btn a-btn-ghost a-btn-sm" href={`tel:${lead.phone}`}>اتصال</a>
            {lead.email && <a className="a-btn a-btn-ghost a-btn-sm" href={`mailto:${lead.email}`}>بريد إلكتروني</a>}
          </div>
        </div>

        <form className="admin-card" onSubmit={save}>
          <h2>الإدارة</h2>
          <div className="a-field">
            <label>الحالة</label>
            <select className="a-select" value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
              {Object.entries(STATUS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </div>
          <div className="a-field">
            <label>ملاحظات داخلية</label>
            <textarea className="a-textarea" value={form.data.admin_note} onChange={(e) => form.setData('admin_note', e.target.value)} placeholder="ملاحظاتك عن الطلب (لا تظهر للعميل)" />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="a-btn a-btn-gold" disabled={form.processing}>{form.processing ? 'جارٍ الحفظ...' : 'حفظ'}</button>
            <button type="button" className="a-btn a-btn-danger" onClick={remove}>حذف</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
