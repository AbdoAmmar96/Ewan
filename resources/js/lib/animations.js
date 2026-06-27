// EWAN — visual animations wired to the DOM after each page mount.
// React owns content; these only add/observe (never remove React nodes).

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function bindGlobalScroll() {
  if (window.__aywanScroll) return;
  window.__aywanScroll = true;
  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const prog = document.querySelector('#progress span');
    const header = document.querySelector('.header');
    const toTop = document.querySelector('.to-top');
    if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (header) header.classList.toggle('scrolled', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function revealAndCount() {
  const r = reduce();
  const reveals = document.querySelectorAll('[data-reveal]:not(.in),[data-stagger]:not(.in)');
  if ('IntersectionObserver' in window && !r) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  const counters = document.querySelectorAll('[data-count]:not([data-done])');
  const run = (el) => {
    el.setAttribute('data-done', '1');
    const target = parseFloat(el.getAttribute('data-count'));
    const dec = target % 1 !== 0 ? 1 : 0;
    const dur = 1900; let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = dec ? val.toFixed(1) : Math.floor(val).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = dec ? target.toFixed(1) : target.toLocaleString('en-US');
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !r) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => { const t = parseFloat(c.getAttribute('data-count')); c.textContent = (t % 1 !== 0) ? t.toFixed(1) : t.toLocaleString('en-US'); });
  }
}

function processLine() {
  const path = document.querySelector('.proc-line path:not([data-done])');
  if (!path) return;
  path.setAttribute('data-done', '1');
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  if (!reduce() && 'IntersectionObserver' in window) {
    const pio = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { path.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.22,1,.36,1)'; path.style.strokeDashoffset = '0'; pio.unobserve(en.target); } });
    }, { threshold: 0.3 });
    pio.observe(path);
  } else { path.style.strokeDashoffset = '0'; }
}

function pointerFx() {
  if (reduce() || !window.matchMedia('(pointer:fine)').matches) return;
  document.querySelectorAll('.btn:not([data-mag]),.fab-wa:not([data-mag])').forEach((btn) => {
    btn.setAttribute('data-mag', '1');
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + x * 0.18 + 'px,' + (y * 0.22 - 2) + 'px)';
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
  const hero = document.querySelector('.hero');
  const shaft = document.querySelector('.hero-visual');
  if (hero && shaft && !hero.hasAttribute('data-par')) {
    hero.setAttribute('data-par', '1');
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      shaft.style.transform = 'translate(' + x * -22 + 'px,' + y * -16 + 'px)';
      document.querySelectorAll('.hero-badge').forEach((b, i) => {
        const d = i === 0 ? 1 : -1;
        b.style.transform = 'translate(' + x * 22 * d + 'px,' + y * 18 * d + 'px)';
      });
    });
  }
  document.querySelectorAll('.proj:not([data-tilt])').forEach((c) => {
    c.setAttribute('data-tilt', '1');
    c.addEventListener('mousemove', (e) => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = 'translateY(-8px) perspective(900px) rotateY(' + x * 6 + 'deg) rotateX(' + (-y * 6) + 'deg)';
    });
    c.addEventListener('mouseleave', () => { c.style.transform = ''; });
  });
}

export function initSite() {
  bindGlobalScroll();
  revealAndCount();
  processLine();
  pointerFx();
}
