import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from './Icon';
import { useContent } from '../useContent';

const TOTAL_FLOORS = 10;
const PER_FLOOR = 300;  // ms of travel per floor
const DOOR_MS = 800;    // door slide duration (matches CSS)
const HOLD_MS = 1900;   // how long doors stay open
const GAP_MS = 650;     // pause between idle trips

// Cabin top position (%) for a given floor — floor 10 at top, floor 1 at bottom.
const topFor = (f) => 5 + ((TOTAL_FLOORS - f) / (TOTAL_FLOORS - 1)) * 58;

/* A self-driving, callable elevator controller.
   Serves the floor the user clicks; when idle it bounces 1 <-> 10. */
function useElevator(initial) {
  const [floor, setFloor] = useState(initial);
  const [open, setOpen] = useState(false);
  const [dur, setDur] = useState(0);
  const floorRef = useRef(initial);
  const openRef = useRef(false);
  const pendingRef = useRef(null);
  const wakeRef = useRef(null);

  useEffect(() => {
    let alive = true;
    const sleep = (ms) => new Promise((res) => {
      const id = setTimeout(() => { wakeRef.current = null; res(); }, ms);
      wakeRef.current = () => { clearTimeout(id); wakeRef.current = null; res(); };
    });
    const doors = (v) => { openRef.current = v; setOpen(v); };

    const moveTo = async (to) => {
      if (openRef.current) { doors(false); await sleep(DOOR_MS); if (!alive) return; }
      const from = floorRef.current;
      if (to === from) return;
      setDur(Math.abs(to - from) * PER_FLOOR);
      setFloor(to); floorRef.current = to;
      await sleep(Math.abs(to - from) * PER_FLOOR + 120);
    };

    const run = async () => {
      while (alive) {
        let next = pendingRef.current;
        if (next != null) pendingRef.current = null;
        else next = floorRef.current >= TOTAL_FLOORS ? 1 : TOTAL_FLOORS; // idle bounce
        await moveTo(next);
        if (!alive) return;
        doors(true);
        await sleep(HOLD_MS);
        if (!alive) return;
        doors(false);
        await sleep(DOOR_MS + GAP_MS);
      }
    };
    run();
    return () => { alive = false; if (wakeRef.current) wakeRef.current(); };
  }, []);

  const request = (n) => {
    if (n === floorRef.current && openRef.current) return;
    pendingRef.current = n;
    if (wakeRef.current) wakeRef.current();
  };

  return { floor, open, dur, request };
}

/* ------------------------------------------------------------------ *
 *  Hero elevator — the showcase elevator from mirogelevators.com,
 *  recoloured to the Ewan palette and made INTERACTIVE: the floor
 *  numbers on each side are buttons; clicking one calls that cabin
 *  to the chosen floor and opens its doors. Idle cabins counter-move.
 *    - left numbers  → left (up) cabin
 *    - right numbers → right (down) cabin
 * ------------------------------------------------------------------ */
function Elevator() {
  const up = useElevator(1);                 // left cabin
  const down = useElevator(TOTAL_FLOORS);    // right cabin
  const floors = Array.from({ length: TOTAL_FLOORS }, (_, k) => TOTAL_FLOORS - k); // 10..1

  const cabin = (
    <div className="cabin-interior">
      <div className="door door-left" />
      <div className="door door-right" />
      <div className="cabin-light" />
      <div className="cabin-ceiling" />
      <div className="cabin-floor" />
      <div className="cabin-panel"><div className="panel-display" /></div>
    </div>
  );

  const floorList = (el) => floors.map((n) => (
    <span
      key={n}
      data-floor={n}
      role="button"
      tabIndex={0}
      className={el.floor === n ? 'active' : ''}
      onClick={() => el.request(n)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.request(n); } }}
      aria-label={`اذهب إلى الدور ${n}`}
    >
      <i className="floor-indicator" />{n}
    </span>
  ));

  return (
    <div className="elevator-wrapper">
      <div className="elevator-shaft">
        <div className="building-lines" />
        <div className="cable-system cable-left"><div className="cable" /></div>
        <div className="cable-system cable-right"><div className="cable" /></div>

        <div className="floors floors-left">{floorList(up)}</div>

        <div
          className={'elevator-cabin elevator-up' + (up.open ? ' doors-opening' : '')}
          style={{ top: `${topFor(up.floor)}%`, transitionDuration: `${up.dur}ms` }}
        >{cabin}</div>

        <div
          className={'elevator-cabin elevator-down' + (down.open ? ' doors-opening' : '')}
          style={{ top: `${topFor(down.floor)}%`, transitionDuration: `${down.dur}ms` }}
        >{cabin}</div>

        <div className="floors floors-right">{floorList(down)}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { HERO_STATS = [] } = useContent();
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">هندسة الحركة العمودية</span>
            <h1 className="h-xl">
              <span className="line"><span>مصاعد تعمل دون أن</span></span>
              <span className="line"><span className="gold-text">تقلق بشأنها</span></span>
            </h1>
            <p className="hero-sub lead">
              إيوان تورّد وتركّب وتصون مصاعد الركاب والبضائع والمنازل بمكوّنات أوروبية وفريق فني معتمد — ونصلك في أقل من ساعة وقت الطوارئ.
            </p>
            <div className="hero-cta btn-row">
              <Link href="/contact" className="btn btn-gold">اطلب عرض سعر مجاني <Icon name="arrow" /></Link>
              <Link href="/services" className="btn btn-ghost">تصفّح خدماتنا</Link>
            </div>
            <div className="hero-stats">
              {HERO_STATS.map((s, i) => (
                <div className="st" key={i}>
                  <div className="num">
                    {s.text ? s.text : <><span data-count={s.n}>0</span>{s.suffix && <i>{s.suffix}</i>}</>}
                  </div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <Elevator />
          </div>
        </div>
      </div>
      <div className="scroll-cue"><div className="m" /><span>انزل للأسفل</span></div>
    </section>
  );
}
