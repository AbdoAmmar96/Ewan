import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const EyeIcon = ({ on }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    {on ? (
      <>
        <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M9.9 4.2A10.4 10.4 0 0 1 12 4c7 0 10.5 8 10.5 8a18.5 18.5 0 0 1-2.3 3.2M6.2 6.2A18.2 18.2 0 0 0 1.5 12S5 20 12 20a10.2 10.2 0 0 0 4-.8" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        <line x1="3" y1="3" x2="21" y2="21" />
      </>
    )}
  </svg>
);

function blank(fields, count) {
  const d = {};
  fields.forEach((f) => {
    d[f.name] = f.type === 'boolean' ? true
      : f.type === 'tags' ? []
      : f.type === 'image' ? null
      : f.type === 'number' ? (count + 1) * 10
      : f.type === 'select' ? (f.options?.[0] ?? '')
      : '';
  });
  return d;
}

function ImageField({ value, onChange }) {
  const isFile = typeof File !== 'undefined' && value instanceof File;
  const src = isFile ? URL.createObjectURL(value) : (typeof value === 'string' ? value : '');
  return (
    <div className="a-image-field">
      {src ? <img src={src} alt="" className="a-image-prev" /> : <div className="a-image-prev empty">لا توجد صورة</div>}
      <input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0] || value)} />
      {isFile && <span className="a-muted" style={{ fontSize: '.82rem' }}>ستُرفع الصورة الجديدة عند الحفظ</span>}
    </div>
  );
}

function Tags({ value, onChange }) {
  const upd = (i, v) => { const c = [...value]; c[i] = v; onChange(c); };
  return (
    <div className="a-tags">
      {value.map((t, i) => (
        <div className="a-tag" key={i}>
          <input className="a-input" value={t} onChange={(e) => upd(i, e.target.value)} />
          <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))}>×</button>
        </div>
      ))}
      <span className="a-add-tag" onClick={() => onChange([...value, ''])}>+ إضافة عنصر</span>
    </div>
  );
}

function Field({ f, form }) {
  const v = form.data[f.name];
  const set = (val) => form.setData(f.name, val);
  return (
    <div className="a-field">
      <label>{f.label}{f.required ? ' *' : ''}</label>
      {f.type === 'textarea' ? (
        <textarea className="a-textarea" value={v || ''} onChange={(e) => set(e.target.value)} />
      ) : f.type === 'select' ? (
        <select className="a-select" value={v || ''} onChange={(e) => set(e.target.value)}>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : f.type === 'number' ? (
        <input className="a-input" type="number" dir="ltr" value={v ?? 0} onChange={(e) => set(parseInt(e.target.value || '0', 10))} />
      ) : f.type === 'tags' ? (
        <Tags value={Array.isArray(v) ? v : []} onChange={set} />
      ) : f.type === 'image' ? (
        <ImageField value={v} onChange={set} />
      ) : (
        <input className="a-input" type="text" value={v || ''} onChange={(e) => set(e.target.value)} />
      )}
      {form.errors[f.name] && <div className="err-msg">{form.errors[f.name]}</div>}
    </div>
  );
}

export default function Resource({ resource, meta, items }) {
  const [editing, setEditing] = useState(null); // null=closed | {}=new | item=edit
  const form = useForm(blank(meta.fields, items.length));

  const open = (item) => {
    const data = {};
    meta.fields.forEach((f) => {
      if (f.type === 'boolean') data[f.name] = item ? !!item[f.name] : true;
      else if (f.type === 'tags') data[f.name] = item && Array.isArray(item[f.name]) ? item[f.name] : [];
      else if (f.type === 'image') data[f.name] = item ? (item[f.name] || null) : null;
      else if (f.type === 'number') data[f.name] = item ? (item[f.name] ?? 0) : (items.length + 1) * 10;
      else data[f.name] = item ? (item[f.name] ?? '') : (f.type === 'select' ? (f.options?.[0] ?? '') : '');
    });
    form.clearErrors();
    form.setData(data);
    setEditing(item || {});
  };

  const submit = (e) => {
    e.preventDefault();
    const opts = { preserveScroll: true, onSuccess: () => setEditing(null) };
    const imgField = meta.fields.find((f) => f.type === 'image');
    const hasNewFile = imgField && form.data[imgField.name] instanceof File;

    if (editing && editing.id) {
      if (hasNewFile) {
        // PHP can't parse multipart PUT — POST with method spoofing so the upload arrives.
        form.transform((d) => ({ ...d, _method: 'put' }));
        form.post(`/admin/${resource}/${editing.id}`, { ...opts, forceFormData: true });
      } else {
        form.transform((d) => d);
        form.put(`/admin/${resource}/${editing.id}`, opts);
      }
    } else {
      form.transform((d) => d);
      form.post(`/admin/${resource}`, hasNewFile ? { ...opts, forceFormData: true } : opts);
    }
  };

  const remove = (item) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      router.delete(`/admin/${resource}/${item.id}`, { preserveScroll: true });
    }
  };

  const toggleVis = (item) => {
    router.patch(`/admin/${resource}/${item.id}/toggle`, {}, { preserveScroll: true });
  };

  const simpleFields = meta.fields.filter((f) => f.name !== 'sort' && f.type !== 'boolean');
  const sortField = meta.fields.find((f) => f.name === 'sort');
  const boolFields = meta.fields.filter((f) => f.type === 'boolean');

  return (
    <AdminLayout
      title={meta.label}
      actions={<button className="a-btn a-btn-gold a-btn-sm" onClick={() => open(null)}>+ {meta.singular} جديد</button>}
    >
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th style={{ width: '50px' }}>#</th><th>{meta.singular}</th><th style={{ width: '90px' }}>الحالة</th><th style={{ width: '170px' }} /></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={4} className="a-empty">لا توجد عناصر بعد. اضغط «{meta.singular} جديد» للإضافة.</td></tr>}
            {items.map((it, i) => (
              <tr key={it.id}>
                <td className="a-muted">{i + 1}</td>
                <td><b>{it[meta.title]}</b></td>
                <td>
                  <button
                    type="button"
                    className={'vis-btn ' + (it.active ? 'on' : 'off')}
                    onClick={() => toggleVis(it)}
                    title={it.active ? 'ظاهر في الموقع — اضغط للإخفاء' : 'مخفي — اضغط للإظهار'}
                  >
                    <EyeIcon on={it.active} />
                    <span>{it.active ? 'ظاهر' : 'مخفي'}</span>
                  </button>
                </td>
                <td className="row-actions">
                  <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => open(it)}>تعديل</button>
                  <button className="a-btn a-btn-danger a-btn-sm" onClick={() => remove(it)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <div className="a-modal-bg" onMouseDown={(e) => { if (e.target === e.currentTarget) setEditing(null); }}>
          <form className="a-modal" onSubmit={submit}>
            <div className="a-modal-head">
              <h3>{editing.id ? `تعديل ${meta.singular}` : `${meta.singular} جديد`}</h3>
              <button type="button" className="x" onClick={() => setEditing(null)}>×</button>
            </div>
            <div className="a-modal-body">
              {simpleFields.map((f) => <Field key={f.name} f={f} form={form} />)}
              <div className="a-row2">
                {sortField && <Field f={sortField} form={form} />}
                {boolFields.map((f) => {
                  const on = !!form.data[f.name];
                  const isVis = f.name === 'active';
                  return (
                    <div className="a-field" key={f.name}>
                      <label>{f.label}</label>
                      {isVis ? (
                        <button
                          type="button"
                          className={'vis-btn ' + (on ? 'on' : 'off')}
                          onClick={() => form.setData(f.name, !on)}
                          title={on ? 'ظاهر في الموقع — اضغط للإخفاء' : 'مخفي — اضغط للإظهار'}
                        >
                          <EyeIcon on={on} />
                          <span>{on ? 'ظاهر' : 'مخفي'}</span>
                        </button>
                      ) : (
                        <label className="a-toggle">
                          <input type="checkbox" checked={on} onChange={(e) => form.setData(f.name, e.target.checked)} />
                          <span className="track" />
                          <span style={{ fontSize: '.88rem' }}>{on ? 'نعم' : 'لا'}</span>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="a-modal-foot">
              <button type="submit" className="a-btn a-btn-gold" disabled={form.processing}>{form.processing ? 'جارٍ الحفظ...' : 'حفظ'}</button>
              <button type="button" className="a-btn a-btn-ghost" onClick={() => setEditing(null)}>إلغاء</button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
