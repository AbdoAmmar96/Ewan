import { useForm } from '@inertiajs/react';
import { Icon } from './Icon';
import { useContent } from '../useContent';

export default function ContactForm() {
  const { SERVICE_OPTS = [] } = useContent();
  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
    name: '', phone: '', email: '', service: SERVICE_OPTS[0] || '', message: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/contact', { preserveScroll: true, onSuccess: () => reset() });
  };

  if (wasSuccessful) {
    return (
      <div className="form-ok show">
        <div className="ic"><Icon name="check2" /></div>
        <h3>وصلنا طلبك ✓</h3>
        <p>شكراً لتواصلك مع إيوان. سيتواصل معك فريقنا في أقرب وقت لترتيب المعاينة وعرض السعر.</p>
        <a href="/" className="btn btn-ghost">العودة إلى الرئيسية</a>
      </div>
    );
  }

  const f = (k) => (errors[k] ? ' err' : '');

  return (
    <form className="form" onSubmit={submit} noValidate data-reveal="right">
      <div className="row">
        <div className={'field' + f('name')}>
          <label>الاسم <span className="req">*</span></label>
          <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="اسمك الكامل" />
          <div className="msg">{errors.name || 'من فضلك اكتب اسمك'}</div>
        </div>
        <div className={'field' + f('phone')}>
          <label>رقم الهاتف <span className="req">*</span></label>
          <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="01xxxxxxxxx" style={{ direction: 'ltr', textAlign: 'right' }} />
          <div className="msg">{errors.phone || 'رقم هاتف صحيح من فضلك'}</div>
        </div>
      </div>
      <div className={'field' + f('email')}>
        <label>البريد الإلكتروني</label>
        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="name@email.com" style={{ direction: 'ltr', textAlign: 'right' }} />
        <div className="msg">{errors.email || 'بريد إلكتروني صحيح من فضلك'}</div>
      </div>
      <div className={'field' + f('service')}>
        <label>نوع الخدمة <span className="req">*</span></label>
        <select value={data.service} onChange={(e) => setData('service', e.target.value)}>
          {SERVICE_OPTS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <div className="msg">{errors.service || 'اختر نوع الخدمة'}</div>
      </div>
      <div className={'field' + f('message')}>
        <label>تفاصيل مشروعك <span className="req">*</span></label>
        <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} placeholder="أخبرنا عن المبنى وعدد الأدوار والخدمة التي تحتاجها..." />
        <div className="msg">{errors.message || 'اكتب تفاصيل مشروعك'}</div>
      </div>
      <button type="submit" className="btn btn-gold" disabled={processing}>
        {processing ? 'جارٍ الإرسال...' : 'أرسل الطلب'} <Icon name="arrow" />
      </button>
    </form>
  );
}
