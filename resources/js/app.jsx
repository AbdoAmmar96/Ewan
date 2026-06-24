import '../css/app.css';
import '../css/admin.css';
import { createInertiaApp, router } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

/* ------------------------------------------------------------------ *
 *  Elevator-door page transitions
 *  The #doors overlay (rendered by SiteLayout) is driven entirely from
 *  here so it survives Inertia navigations:
 *    - first load  : doors start closed, then open slowly (slow-motion)
 *    - navigate out : doors close over the screen (router 'start')
 *    - navigate in  : doors open slowly to reveal the new page ('finish')
 * ------------------------------------------------------------------ */
const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
const doorsEl = () => document.getElementById('doors');
let hideTimer = null;

const clearHide = () => { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } };
const scheduleHide = () => {
  clearHide();
  // Safety net: once the slow open has finished, take the (now off-screen)
  // overlay fully out of the way so it can never block the page.
  hideTimer = setTimeout(() => { const d = doorsEl(); if (d) d.style.display = 'none'; }, 2600);
};

const openDoors = () => {
  const d = doorsEl();
  if (d) d.style.display = '';
  document.body.classList.remove('doors-closing');
  // force reflow so a re-shown overlay transitions instead of snapping
  void document.body.offsetWidth;
  document.body.classList.add('doors-open');
  scheduleHide();
};

const closeDoors = () => {
  clearHide();
  const d = doorsEl();
  if (d) d.style.display = '';
  // reflow so a previously-hidden overlay animates closed instead of snapping
  void document.body.offsetWidth;
  document.body.classList.remove('doors-open');
  document.body.classList.add('doors-closing');
};

document.body.classList.add('js');
if (reduceMQ.matches) {
  document.body.classList.add('doors-open', 'no-doors');
} else {
  // intro reveal
  requestAnimationFrame(() => requestAnimationFrame(openDoors));
  setTimeout(openDoors, 700); // failsafe if rAF is throttled (e.g. background tab)
}

// Drive the doors on every Inertia navigation:
//   close fully (CLOSE_MS) -> hold shut (HOLD_MS) -> open slowly from the centre.
// The open is anchored to when navigation STARTED so a fast local visit can
// never cut the close short — the doors always meet in the middle first.
const CLOSE_MS = 600;
const HOLD_MS = 380;
const nowMs = () => (window.performance && performance.now ? performance.now() : 0);
let navStart = 0;
let openTimer = null;

router.on('start', () => {
  if (reduceMQ.matches) return;
  navStart = nowMs();
  if (openTimer) { clearTimeout(openTimer); openTimer = null; }
  closeDoors();
});
router.on('finish', () => {
  if (reduceMQ.matches) { document.body.classList.add('doors-open'); return; }
  const wait = Math.max(0, (navStart + CLOSE_MS + HOLD_MS) - nowMs());
  if (openTimer) clearTimeout(openTimer);
  openTimer = setTimeout(openDoors, wait);
});

createInertiaApp({
  title: (title) => (title ? title : 'إيوان للمصاعد'),
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: { color: '#AB8A43', showSpinner: false },
});
