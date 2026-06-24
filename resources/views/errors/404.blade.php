<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>الصفحة غير موجودة — إيوان للمصاعد</title>
    <meta name="theme-color" content="#181715" />
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@500;600;700&family=Tajawal:wght@400;500;700&family=Cormorant+Garamond:wght@600&display=swap" rel="stylesheet">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;
            font-family:'Tajawal',sans-serif;color:#F7F1E7;padding:40px;
            background:radial-gradient(900px 600px at 80% -10%,#2a251d 0%,#181715 50%,#100f0d 100%)}
        .box{max-width:600px;display:flex;flex-direction:column;align-items:center;gap:22px}
        svg.mark{width:84px;height:98px}
        .code{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:120px;line-height:1;
            background:linear-gradient(135deg,#D8BE84,#C5A55C 40%,#8A6E32);-webkit-background-clip:text;background-clip:text;color:transparent}
        h1{font-family:'El Messiri',serif;font-weight:600;font-size:clamp(1.6rem,4vw,2.3rem)}
        p{color:#CFC6B8;font-size:1.1rem;line-height:1.8;max-width:460px}
        .row{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:8px}
        a{text-decoration:none;font-family:'El Messiri',serif;font-weight:600;font-size:1rem;
            padding:14px 30px;border-radius:40px;transition:.3s}
        .gold{background:linear-gradient(135deg,#D8BE84,#C5A55C 40%,#8A6E32);color:#1c1710}
        .gold:hover{filter:brightness(1.07);transform:translateY(-2px)}
        .ghost{color:#F7F1E7;box-shadow:inset 0 0 0 1.5px rgba(216,190,132,.55)}
        .ghost:hover{background:rgba(216,190,132,.12)}
    </style>
</head>
<body>
    <div class="box">
        <svg class="mark" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D8BE84"/><stop offset=".5" stop-color="#C5A55C"/><stop offset="1" stop-color="#8A6E32"/></linearGradient></defs>
            <path d="M6 53 V20 C6 9 13.5 3 24 3 C34.5 3 42 9 42 20 V53" stroke="url(#lg)" stroke-width="3" stroke-linecap="round"/>
            <line x1="24" y1="15" x2="24" y2="53" stroke="url(#lg)" stroke-width="1.6" opacity=".8"/>
            <path d="M19 27 l5 -5 l5 5" stroke="url(#lg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 37 l5 5 l5 -5" stroke="url(#lg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="code">404</div>
        <h1>يبدو أن هذه الصفحة صعدت إلى دور آخر</h1>
        <p>الصفحة التي تبحث عنها غير موجودة أو نُقلت. يمكنك العودة إلى الرئيسية أو التواصل معنا مباشرة.</p>
        <div class="row">
            <a class="gold" href="{{ url('/') }}">الرئيسية</a>
            <a class="ghost" href="{{ url('/contact') }}">تواصل معنا</a>
        </div>
    </div>
</body>
</html>
