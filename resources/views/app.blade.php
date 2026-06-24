<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#181715" />

    {{-- Default description for crawlers; the per-page <title> is managed by Inertia <Head>. --}}
    <meta name="description" content="إيوان: شركة مصاعد متخصصة في توريد وتركيب وصيانة مصاعد الركاب والبضائع والمنازل بمكوّنات أوروبية وفريق فني معتمد ودعم 24/7.">

    {{-- Icons --}}
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32.png') }}">
    <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">

    {{-- Social / Open Graph (per-page title & description come from <Head>) --}}
    <meta property="og:site_name" content="إيوان للمصاعد">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="ar_EG">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="إيوان للمصاعد — توريد وتركيب وصيانة المصاعد">
    <meta property="og:description" content="توريد وتركيب وصيانة مصاعد الركاب والبضائع والمنازل بمكوّنات أوروبية وفريق فني معتمد ودعم 24/7.">
    <meta property="og:image" content="{{ url('og-image.png') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="إيوان للمصاعد — توريد وتركيب وصيانة المصاعد">
    <meta name="twitter:description" content="توريد وتركيب وصيانة مصاعد بمكوّنات أوروبية ودعم 24/7.">
    <meta name="twitter:image" content="{{ url('og-image.png') }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body>
    {{-- Elevator-door transition overlay. Lives outside the Inertia root so it
         persists across page visits and can animate close -> open smoothly. --}}
    <div id="doors" aria-hidden="true">
        <div class="panel left"></div>
        <div class="floor"><span class="dot"></span><span class="lat">EWAN</span></div>
        <div class="seam">
            <div class="mark">
                <svg viewBox="0 0 48 56" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D8BE84"/><stop offset="1" stop-color="#8A6E32"/></linearGradient></defs><path d="M6 53 V20 C6 9 13.5 3 24 3 C34.5 3 42 9 42 20 V53" stroke="url(#dg)" stroke-width="2.6" stroke-linecap="round"/><path d="M19 27 l5 -5 l5 5" stroke="url(#dg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 37 l5 5 l5 -5" stroke="url(#dg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="nm">ELEVATOR</div>
        </div>
        <div class="panel right"></div>
    </div>
    @inertia
</body>
</html>
