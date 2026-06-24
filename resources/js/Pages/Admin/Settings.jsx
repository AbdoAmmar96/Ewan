import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

function StringList({ value, onChange, placeholder }) {
  const upd = (i, v) => { const c = [...value]; c[i] = v; onChange(c); };
  return (
    <div className="set-list">
      {value.map((t, i) => (
        <div className="set-row" style={{ gridTemplateColumns: '1fr 36px' }} key={i}>
          <input className="a-input" value={t} placeholder={placeholder} onChange={(e) => upd(i, e.target.value)} />
          <button type="button" className="rm" onClick={() => onChange(value.filter((_, j) => j !== i))}>×</button>
        </div>
      ))}
      <span className="a-add-tag" onClick={() => onChange([...value, ''])}>+ إضافة</span>
    </div>
  );
}

function StatList({ value, onChange }) {
  const upd = (i, key, v) => onChange(value.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  return (
    <div className="set-list">
      <div className="set-row" style={{ gridTemplateColumns: '1.4fr 80px 70px 90px 36px', background: 'transparent', paddingBottom: 0 }}>
        <span className="a-muted">الوصف</span><span className="a-muted">رقم</span><span className="a-muted">لاحقة</span><span className="a-muted">نص بديل</span><span />
      </div>
      {value.map((s, i) => (
        <div className="set-row" style={{ gridTemplateColumns: '1.4fr 80px 70px 90px 36px' }} key={i}>
          <input className="a-input" placeholder="سنة خبرة" value={s.label || ''} onChange={(e) => upd(i, 'label', e.target.value)} />
          <input className="a-input" type="number" dir="ltr" placeholder="15" value={s.n ?? ''} onChange={(e) => upd(i, 'n', e.target.value === '' ? null : parseInt(e.target.value, 10))} />
          <input className="a-input" dir="ltr" placeholder="+" value={s.suffix || ''} onChange={(e) => upd(i, 'suffix', e.target.value)} />
          <input className="a-input" dir="ltr" placeholder="24/7" value={s.text || ''} onChange={(e) => upd(i, 'text', e.target.value)} />
          <button type="button" className="rm" onClick={() => onChange(value.filter((_, j) => j !== i))}>×</button>
        </div>
      ))}
      <span className="a-add-tag" onClick={() => onChange([...value, { label: '', n: null, suffix: '', text: '' }])}>+ إضافة إحصائية</span>
    </div>
  );
}

function FilterList({ value, onChange }) {
  const upd = (i, key, v) => onChange(value.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  return (
    <div className="set-list">
      {value.map((f, i) => (
        <div className="set-row" style={{ gridTemplateColumns: '1fr 1fr 36px' }} key={i}>
          <input className="a-input" dir="ltr" placeholder="residential" value={f.cat || ''} onChange={(e) => upd(i, 'cat', e.target.value)} />
          <input className="a-input" placeholder="سكني" value={f.label || ''} onChange={(e) => upd(i, 'label', e.target.value)} />
          <button type="button" className="rm" onClick={() => onChange(value.filter((_, j) => j !== i))}>×</button>
        </div>
      ))}
      <span className="a-add-tag" onClick={() => onChange([...value, { cat: '', label: '' }])}>+ إضافة تصنيف</span>
    </div>
  );
}

export default function Settings({ settings }) {
  const form = useForm({
    contact: settings.contact || {},
    hero_stats: settings.hero_stats || [],
    stats: settings.stats || [],
    marquee: settings.marquee || [],
    service_opts: settings.service_opts || [],
    filters: settings.filters || [],
  });
  const c = form.data.contact;
  const setC = (k, v) => form.setData('contact', { ...c, [k]: v });
  const setSocial = (k, v) => form.setData('contact', { ...c, social: { ...(c.social || {}), [k]: v } });
  const save = (e) => { e.preventDefault(); form.put('/admin/settings', { preserveScroll: true }); };

  const saveBtn = <button type="submit" form="setForm" className="a-btn a-btn-gold a-btn-sm" disabled={form.processing}>{form.processing ? 'جارٍ الحفظ...' : 'حفظ الإعدادات'}</button>;

  return (
    <AdminLayout title="إعدادات الموقع" actions={saveBtn}>
      <form id="setForm" onSubmit={save}>
        <div className="admin-card set-section">
          <h3>بيانات التواصل</h3>
          <p>تظهر في رأس الصفحة وتذييلها وصفحة «تواصل معنا».</p>
          <div className="a-row2">
            <div className="a-field"><label>الهاتف (للعرض)</label><input className="a-input" dir="ltr" value={c.phoneDisp || ''} onChange={(e) => setC('phoneDisp', e.target.value)} /></div>
            <div className="a-field"><label>الهاتف (للاتصال)</label><input className="a-input" dir="ltr" value={c.phoneTel || ''} onChange={(e) => setC('phoneTel', e.target.value)} /></div>
          </div>
          <div className="a-row2">
            <div className="a-field"><label>رقم واتساب</label><input className="a-input" dir="ltr" placeholder="201001234567" value={c.whatsapp || ''} onChange={(e) => setC('whatsapp', e.target.value)} /></div>
            <div className="a-field"><label>البريد الإلكتروني</label><input className="a-input" dir="ltr" value={c.email || ''} onChange={(e) => setC('email', e.target.value)} /></div>
          </div>
          <div className="a-field"><label>العنوان</label><input className="a-input" value={c.address || ''} onChange={(e) => setC('address', e.target.value)} /></div>
          <div className="a-field"><label>ساعات العمل</label><input className="a-input" value={c.hours || ''} onChange={(e) => setC('hours', e.target.value)} /></div>
          <div className="a-row2">
            <div className="a-field"><label>فيسبوك</label><input className="a-input" dir="ltr" value={c.social?.facebook || ''} onChange={(e) => setSocial('facebook', e.target.value)} /></div>
            <div className="a-field"><label>انستجرام</label><input className="a-input" dir="ltr" value={c.social?.instagram || ''} onChange={(e) => setSocial('instagram', e.target.value)} /></div>
          </div>
          <div className="a-field"><label>لينكدإن</label><input className="a-input" dir="ltr" value={c.social?.linkedin || ''} onChange={(e) => setSocial('linkedin', e.target.value)} /></div>
        </div>

        <div className="admin-card set-section">
          <h3>إحصائيات الواجهة الرئيسية</h3>
          <p>الأرقام أسفل الواجهة الرئيسية في الصفحة الرئيسية. اترك «رقم» فارغاً واستخدم «نص بديل» للقيم مثل 24/7.</p>
          <StatList value={form.data.hero_stats} onChange={(v) => form.setData('hero_stats', v)} />
        </div>

        <div className="admin-card set-section">
          <h3>شريط الإحصائيات</h3>
          <p>قسم الأرقام (سنوات الخبرة، عدد المصاعد...).</p>
          <StatList value={form.data.stats} onChange={(v) => form.setData('stats', v)} />
        </div>

        <div className="admin-card set-section">
          <h3>الشريط المتحرك</h3>
          <p>الكلمات التي تمرّ أسفل الواجهة الرئيسية.</p>
          <StringList value={form.data.marquee} onChange={(v) => form.setData('marquee', v)} placeholder="مصاعد ركاب" />
        </div>

        <div className="admin-card set-section">
          <h3>خيارات الخدمة في النموذج</h3>
          <p>القائمة المنسدلة في نموذج طلب عرض السعر.</p>
          <StringList value={form.data.service_opts} onChange={(v) => form.setData('service_opts', v)} placeholder="مصاعد ركاب" />
        </div>

        <div className="admin-card set-section">
          <h3>تصنيفات المشاريع (الفلاتر)</h3>
          <p>الفلاتر في صفحة الأعمال. يجب أن يطابق الـ key «التصنيف» في المشاريع.</p>
          <FilterList value={form.data.filters} onChange={(v) => form.setData('filters', v)} />
        </div>

        <button type="submit" className="a-btn a-btn-gold" disabled={form.processing}>{form.processing ? 'جارٍ الحفظ...' : 'حفظ كل الإعدادات'}</button>
      </form>
    </AdminLayout>
  );
}
