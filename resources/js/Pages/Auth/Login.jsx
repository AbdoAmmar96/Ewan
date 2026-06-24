import { useForm, Head } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: false });
  const submit = (e) => { e.preventDefault(); post('/login'); };

  return (
    <>
      <Head><title>دخول لوحة التحكم — إيوان</title></Head>
      <div className="login-wrap">
        <form className="login-card" onSubmit={submit}>
          <div className="lmark">
            <img src="/uploads/brand/logo.png" alt="إيوان للمصاعد" className="login-logo" />
            <span>لوحة التحكم — سجّل الدخول لإدارة الموقع</span>
          </div>

          <div className="a-field">
            <label>البريد الإلكتروني</label>
            <input className="a-input" type="email" dir="ltr" value={data.email} onChange={(e) => setData('email', e.target.value)} autoFocus />
            {errors.email && <div className="err-msg">{errors.email}</div>}
          </div>
          <div className="a-field">
            <label>كلمة المرور</label>
            <input className="a-input" type="password" dir="ltr" value={data.password} onChange={(e) => setData('password', e.target.value)} />
            {errors.password && <div className="err-msg">{errors.password}</div>}
          </div>
          <label className="a-toggle" style={{ marginBottom: '18px' }}>
            <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
            <span className="track" />
            <span style={{ fontSize: '.9rem' }}>تذكّرني</span>
          </label>

          <button type="submit" className="a-btn a-btn-gold" disabled={processing}>
            {processing ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </>
  );
}
