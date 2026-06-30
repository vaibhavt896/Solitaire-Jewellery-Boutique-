'use client';

/*  BoutiqueReels — "A look inside."
    A row of equal reel cards (≈5 visible on desktop) that loops
    infinitely. Clone first/last so the wrap never shows blank.
    GSAP expo.out for silky deceleration. Each card autoplays a
    muted reel with a play badge and a caption, matching the
    boutique's editorial design.
*/

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SITE } from '@/lib/site';

gsap.config({ force3D: true });

/* ─── Data ───────────────────────────────────────────────── */
const REELS = [
  { src: '/Reels/web/navratna-polki.mp4', caption: 'The sparkle of every detail.' },
  { src: '/Reels/web/1.mp4',              caption: 'Crafted with heritage, worn with pride.' },
  { src: '/Reels/web/emerald-ruby.mp4',   caption: 'Emerald greens, ruby pinks. Timeless you.' },
  { src: '/Reels/web/bird-inspired.mp4',  caption: 'A legacy of grace in every piece.' },
  { src: '/Reels/web/2.mp4',              caption: 'Tradition that touches your soul.' },
  { src: '/Reels/web/3.mp4',              caption: 'Set by hand, in gold.' },
  { src: '/Reels/web/4.mp4',              caption: 'For the bride, for her day.' },
  { src: '/Reels/web/5.mp4',              caption: 'A stone worth seeing.' },
] as const;

const N        = REELS.length;
/* EXT = [clone-last, real 0…N-1, clone-first]; visual index 1…N maps to real. */
const EXT      = [REELS[N - 1], ...REELS, REELS[0]] as const;
const GAP      = 16;
const INTERVAL = 4500;

function getOffset(vi: number, cardW: number, containerW: number): number {
  return containerW / 2 - cardW / 2 - vi * (cardW + GAP);
}

/* ─── Play badge ─────────────────────────────────────────── */
function PlayBadge() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 grid place-items-center pointer-events-none"
    >
      <span
        className="grid place-items-center transition-transform duration-500 group-hover:scale-110"
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(244,239,227,0.90)',
          color: 'var(--mahogany)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      </span>
    </span>
  );
}

/* ─── Player icons ───────────────────────────────────────── */
const IPlay    = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M7 4.5v15l13-7.5z" /></svg>);
const IPause   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="6" y="5" width="3.6" height="14" rx="1.2" /><rect x="14.4" y="5" width="3.6" height="14" rx="1.2" /></svg>);
const IReplay  = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 12a9 9 0 1 0 2.6-6.3" /><polyline points="3 3 3 8 8 8" /></svg>);
const IVolOn   = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M19 5a10 10 0 0 1 0 14" /></svg>);
const IVolOff  = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" /></svg>);
const IExpand  = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M16 21h3a2 2 0 0 0 2-2v-3M8 21H5a2 2 0 0 1-2-2v-3" /></svg>);
const IClose   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>);
const IChevron = ({ d }: { d: 'l' | 'r' }) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points={d === 'l' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} /></svg>);

const sideBtn: React.CSSProperties = {
  position: 'fixed', top: '50%', transform: 'translateY(-50%)',
  width: 48, height: 48, borderRadius: '50%',
  border: '1px solid rgba(244,239,227,0.18)', background: 'rgba(244,239,227,0.06)',
  color: 'rgba(244,239,227,0.85)', cursor: 'pointer', placeItems: 'center', zIndex: 2,
};

/* ─── Immersive player ───────────────────────────────────────
   Tap a card → this opens. Sound on, full controls, prev/next,
   keyboard (Space play/pause · M mute · ←/→ switch · Esc close).
   Auto-plays with sound; if the browser blocks it, falls back to
   muted and shows the unmute control.                            */
function ReelPlayer({ reels, index, onClose, onSelect }: {
  reels:   readonly { src: string; caption: string }[];
  index:   number;
  onClose: () => void;
  onSelect: (i: number) => void;
}) {
  const vref      = useRef<HTMLVideoElement>(null);
  const stageRef  = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [playing,  setPlaying]  = useState(true);
  const [muted,    setMuted]    = useState(false);
  const [progress, setProgress] = useState(0);
  const [ended,    setEnded]    = useState(false);
  const [ui,       setUi]       = useState(true);

  const n    = reels.length;
  const reel = reels[index];

  const toggle = () => { const v = vref.current; if (!v) return; v.paused ? v.play() : v.pause(); };
  const replay = () => { const v = vref.current; if (!v) return; v.currentTime = 0; setEnded(false); v.play(); };
  const toggleMute = () => { const v = vref.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); };
  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = vref.current; if (!v || !v.duration) return;
    const f = Number(e.target.value) / 1000;
    v.currentTime = f * v.duration; setProgress(f);
  };
  const fullscreen = () => {
    const el = stageRef.current; if (!el) return;
    document.fullscreenElement ? document.exitFullscreen?.() : el.requestFullscreen?.();
  };
  const poke = () => {
    setUi(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => { if (!vref.current?.paused) setUi(false); }, 2600);
  };

  /* (re)start playback whenever the reel changes — sound-first */
  useEffect(() => {
    const v = vref.current; if (!v) return;
    setEnded(false); setProgress(0); v.currentTime = 0;
    v.muted = false; setMuted(false);
    v.play().then(() => setPlaying(true)).catch(() => {
      v.muted = true; setMuted(true);
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    });
    poke();
  }, [index]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if      (e.key === 'Escape')     onClose();
      else if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
      else if (e.key === 'ArrowRight') onSelect((index + 1) % n);
      else if (e.key === 'ArrowLeft')  onSelect((index - 1 + n) % n);
      else if (e.key === 'm')          toggleMute();
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(hideTimer.current); };
  }, [index, n, onClose, onSelect]);

  const controlsVisible = ui || !playing || ended;
  const ctrlBtn: React.CSSProperties = { background: 'transparent', border: 'none', color: 'rgba(244,239,227,0.92)', cursor: 'pointer', display: 'grid', placeItems: 'center', padding: 4 };

  return (
    <div
      role="dialog" aria-modal="true" aria-label={`${reel.caption} — video`}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 130, background: 'rgba(6,4,2,0.92)', backdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center', padding: 'clamp(12px,3vw,28px)', animation: 'reelPlayerFade 0.28s ease both' }}
    >
      <style>{`
        @keyframes reelPlayerFade { from { opacity: 0 } to { opacity: 1 } }
        .reel-scrub { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 3px; background: rgba(244,239,227,0.22); cursor: pointer; }
        .reel-scrub::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%; background: var(--aged-gold); box-shadow: 0 0 0 3px rgba(189,154,69,0.25); cursor: pointer; }
        .reel-scrub::-moz-range-thumb { width: 13px; height: 13px; border: none; border-radius: 50%; background: var(--aged-gold); cursor: pointer; }
      `}</style>

      {/* close */}
      <button onClick={onClose} aria-label="Close" style={{ position: 'fixed', top: 'clamp(14px,3vw,26px)', right: 'clamp(14px,3vw,26px)', width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(244,239,227,0.18)', background: 'rgba(244,239,227,0.06)', color: 'rgba(244,239,227,0.85)', display: 'grid', placeItems: 'center', cursor: 'pointer', zIndex: 2 }}>
        <IClose />
      </button>

      {/* prev / next (≥ sm) */}
      <button onClick={(e) => { e.stopPropagation(); onSelect((index - 1 + n) % n); }} aria-label="Previous video" className="hidden sm:grid" style={{ ...sideBtn, left: 'clamp(10px,3vw,32px)' }}><IChevron d="l" /></button>
      <button onClick={(e) => { e.stopPropagation(); onSelect((index + 1) % n); }} aria-label="Next video" className="hidden sm:grid" style={{ ...sideBtn, right: 'clamp(10px,3vw,32px)' }}><IChevron d="r" /></button>

      {/* stage */}
      <div
        ref={stageRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={poke}
        onTouchStart={poke}
        style={{ position: 'relative', height: 'min(86vh, 760px)', aspectRatio: '9 / 16', maxWidth: '94vw', borderRadius: 18, overflow: 'hidden', background: '#0c0a08', boxShadow: '0 40px 120px -30px rgba(0,0,0,0.9)' }}
      >
        <video
          ref={vref}
          src={reel.src}
          playsInline
          autoPlay
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => { setEnded(true); setPlaying(false); setUi(true); }}
          onTimeUpdate={() => { const v = vref.current; if (v && v.duration) setProgress(v.currentTime / v.duration); }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer', background: '#0c0a08' }}
        />

        {/* centre play / replay */}
        {(!playing || ended) && (
          <button onClick={ended ? replay : toggle} aria-label={ended ? 'Replay' : 'Play'}
            style={{ position: 'absolute', inset: 0, margin: 'auto', width: 74, height: 74, borderRadius: '50%', border: '1px solid rgba(244,239,227,0.3)', background: 'rgba(20,15,10,0.42)', backdropFilter: 'blur(4px)', color: '#F4EFE3', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            {ended ? <IReplay /> : <span style={{ marginLeft: 3 }}><IPlay /></span>}
          </button>
        )}

        {/* controls */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '36px 16px 16px', background: 'linear-gradient(to top, rgba(6,4,2,0.88), transparent)', opacity: controlsVisible ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: controlsVisible ? 'auto' : 'none' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ivory)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
            {reel.caption}
          </p>
          <input type="range" min={0} max={1000} value={Math.round(progress * 1000)} onChange={onSeek} aria-label="Seek" className="reel-scrub" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
            <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} style={ctrlBtn}>{playing ? <IPause /> : <IPlay />}</button>
            <button onClick={replay} aria-label="Replay" style={ctrlBtn}><IReplay /></button>
            <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} style={ctrlBtn}>{muted ? <IVolOff /> : <IVolOn />}</button>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(244,239,227,0.5)' }}>
              {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </span>
            <button onClick={fullscreen} aria-label="Fullscreen" style={ctrlBtn}><IExpand /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export function BoutiqueReels() {
  const [active,  setActive]  = useState(0);   // real index 0…N-1
  const [vActive, setVActive] = useState(1);   // visual index 0…N+1
  const [playerIdx, setPlayerIdx] = useState<number | null>(null); // open reel in player

  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs    = useRef<(HTMLVideoElement | null)[]>([]);

  const activeRef  = useRef(0);
  const vActiveRef = useRef(1);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const playerWasOpen = useRef(false);
  const ptrStartX  = useRef(0);
  const ptrMoved   = useRef(false);
  const touchStartX = useRef(0);

  /* ── Slide track so EXT[vi] is centred ─────────────────── */
  const slideTo = (vi: number, instant = false, onDone?: () => void) => {
    const track = trackRef.current;
    const card  = cardRefs.current[1];
    if (!track || !card) { onDone?.(); return; }
    const x = getOffset(vi, card.offsetWidth, containerRef.current?.offsetWidth ?? window.innerWidth);
    if (instant) { gsap.set(track, { x }); onDone?.(); }
    else gsap.to(track, { x, duration: 0.82, ease: 'expo.out', overwrite: 'auto', onComplete: onDone });
  };

  /* ── Navigate to a visual index, wrapping via clones ───── */
  const goToV = (nextV: number, nextReal: number) => {
    activeRef.current  = nextReal;
    vActiveRef.current = nextV;
    setActive(nextReal);
    setVActive(nextV);

    const isWrapFwd = nextV === N + 1;
    const isWrapBwd = nextV === 0;

    slideTo(nextV, false, (isWrapFwd || isWrapBwd) ? () => {
      const snapV = isWrapFwd ? 1 : N;
      vActiveRef.current = snapV;
      setVActive(snapV);
      slideTo(snapV, true);
    } : undefined);
  };

  const goNext = () => goToV(vActiveRef.current + 1, (activeRef.current + 1) % N);
  const goPrev = () => goToV(vActiveRef.current - 1, (activeRef.current - 1 + N) % N);

  /* ── Auto-advance ───────────────────────────────────────── */
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, INTERVAL);
  };

  /* ── Mount ─────────────────────────────────────────────── */
  useEffect(() => {
    requestAnimationFrame(() => slideTo(1, true));

    /* Play videos nearest the active card first, then the rest */
    const playAll = () => {
      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        const delay = Math.abs(i - vActiveRef.current) * 120;
        setTimeout(() => v.play().catch(() => {}), delay);
      });
    };
    playAll();

    startTimer();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => requestAnimationFrame(() => slideTo(vActiveRef.current, true)), 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      timerRef.current && clearInterval(timerRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      videoRefs.current.forEach(v => v?.pause());
      gsap.killTweensOf(trackRef.current);
      gsap.killTweensOf(sectionRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Player open: pause carousel + previews; resume on close ── */
  useEffect(() => {
    if (playerIdx !== null) {
      playerWasOpen.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
      videoRefs.current.forEach(v => v?.pause());
      document.body.style.overflow = 'hidden';
    } else if (playerWasOpen.current) {
      playerWasOpen.current = false;
      document.body.style.overflow = '';
      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        const delay = Math.abs(i - vActiveRef.current) * 120;
        setTimeout(() => v.play().catch(() => {}), delay);
      });
      startTimer();
    }
    return () => { document.body.style.overflow = ''; };
  }, [playerIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Pointer drag (desktop) ─────────────────────────────── */
  const onPtrDown = (e: React.PointerEvent) => { ptrStartX.current = e.clientX; ptrMoved.current = false; };
  const onPtrMove = (e: React.PointerEvent) => { if (Math.abs(e.clientX - ptrStartX.current) > 5) ptrMoved.current = true; };
  const onPtrUp   = (e: React.PointerEvent) => {
    if (!ptrMoved.current) return;
    if (Math.abs(e.clientX - ptrStartX.current) > 50) {
      e.clientX - ptrStartX.current < 0 ? goNext() : goPrev();
      startTimer();
    }
  };

  /* ── Touch swipe (mobile) ───────────────────────────────── */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) { dx < 0 ? goNext() : goPrev(); startTimer(); }
  };

  const arrowBtn: React.CSSProperties = {
    width: 44, height: 44, borderRadius: '50%',
    border: '1px solid rgba(26,20,16,0.14)',
    background: 'rgba(251,247,238,0.92)',
    backdropFilter: 'blur(6px)',
    color: 'var(--ink-soft)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.1rem',
    boxShadow: '0 6px 20px rgba(26,20,16,0.12)',
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--ivory)', padding: 'clamp(3rem,6vh,5.5rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="container-wide" style={{ position: 'relative', marginBottom: 'clamp(1.6rem,3.5vh,2.6rem)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(189,154,69,0.8)', margin: '0 0 0.7rem' }}>
            02 — Inside
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem,3.8vw,3rem)', lineHeight: 1, letterSpacing: '-0.022em', color: 'var(--obsidian)', margin: 0 }}>
            A look{' '}<span style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>inside.</span>
          </h2>
        </div>

        <Link
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1.5 group/var"
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 600, color: 'var(--aged-gold)',
          }}
        >
          View All Reels
          <span aria-hidden className="transition-transform duration-300 group-hover/var:translate-x-1">→</span>
        </Link>
      </div>

      {/* ── Carousel ───────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{ overflow: 'hidden', position: 'relative', cursor: 'grab' }}
        onPointerDown={onPtrDown}
        onPointerMove={onPtrMove}
        onPointerUp={onPtrUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => { if (playerIdx === null && timerRef.current) clearInterval(timerRef.current); }}
        onMouseLeave={() => { if (playerIdx === null) startTimer(); }}
      >
        {/* Edge fades */}
        <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6%', background: 'linear-gradient(to right, var(--ivory) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '6%', background: 'linear-gradient(to left, var(--ivory) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />

        {/* Edge arrows */}
        <button
          onClick={() => { goPrev(); startTimer(); }}
          aria-label="Previous reel"
          style={{ ...arrowBtn, position: 'absolute', left: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.18, ease: 'power2.out' })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,   duration: 0.22, ease: 'power2.out' })}
        >‹</button>
        <button
          onClick={() => { goNext(); startTimer(); }}
          aria-label="Next reel"
          style={{ ...arrowBtn, position: 'absolute', right: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.18, ease: 'power2.out' })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,   duration: 0.22, ease: 'power2.out' })}
        >›</button>

        {/* Track */}
        <div ref={trackRef} style={{ display: 'flex', gap: GAP, alignItems: 'center', willChange: 'transform' }}>
          {EXT.map((reel, i) => {
            const isClone = i === 0 || i === N + 1;
            return (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                onClick={() => {
                  if (ptrMoved.current) return;
                  setPlayerIdx(i === 0 ? N - 1 : i === N + 1 ? 0 : i - 1);
                }}
                className="group"
                style={{
                  flexShrink:   0,
                  width:        'clamp(190px, 17.5vw, 250px)',
                  aspectRatio:  '9/16',
                  borderRadius: 16,
                  overflow:     'hidden',
                  position:     'relative',
                  cursor:       'pointer',
                  boxShadow:    '0 18px 44px -12px rgba(26,20,16,0.34)',
                }}
              >
                <video
                  ref={el => { videoRefs.current[i] = el; }}
                  src={reel.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload={Math.abs(i - vActive) <= 1 ? 'auto' : 'metadata'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#1a1410' }}
                />

                {!isClone && (
                  <>
                    <PlayBadge />
                    <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 52%, rgba(4,2,8,0.82) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 1rem 1.1rem', pointerEvents: 'none' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--ivory)', margin: 0, lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                        {reel.caption}
                      </p>
                    </div>
                    <div aria-hidden style={{ position: 'absolute', inset: 0, border: '0.5px solid rgba(184,146,58,0.22)', borderRadius: 16, pointerEvents: 'none' }} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {playerIdx !== null && (
        <ReelPlayer
          reels={REELS}
          index={playerIdx}
          onClose={() => setPlayerIdx(null)}
          onSelect={setPlayerIdx}
        />
      )}
    </section>
  );
}
