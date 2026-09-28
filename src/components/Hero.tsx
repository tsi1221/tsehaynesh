import {
  ArrowUpRight,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  X,
} from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";

const GREEN = "#16a34a";
const GREEN_BRIGHT = "#22c55e";

export default function Hero() {
  const [time, setTime] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  /* =========================================================
     ADDIS ABABA CLOCK
  ========================================================= */
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Addis_Ababa",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  /* =========================================================
     MOUNT FLAG — drives entrance animation
  ========================================================= */
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  /* =========================================================
     SCROLL TRACKING
  ========================================================= */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================================================
     SHOW ACHIEVEMENT CARD AFTER 4s
  ========================================================= */
  useEffect(() => {
    const timer = window.setTimeout(() => setShowCard(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  /* =========================================================
     ESC CLOSES / COLLAPSES CARD
  ========================================================= */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setExpanded((wasExpanded) => {
        if (wasExpanded) return false;
        setShowCard(false);
        return false;
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* =========================================================
     SCROLL-DRIVEN VALUES
  ========================================================= */
  const backgroundDrift = scrollY * 0.25;
  const backgroundScale = 1 + Math.min(scrollY / 4000, 0.06);
  const contentFade = Math.max(1 - scrollY / 700, 0);
  const titleLift = -Math.min(scrollY * 0.2, 60);
  const bottomSlide = Math.min(scrollY * 0.5, 120);
  const orbDrift = scrollY * 0.15;
  const scrollCueFade = Math.max(1 - scrollY / 300, 0);

  /* =========================================================
     ENTRANCE HELPER
     - extra is merged FIRST, so any user-supplied opacity/transform wins
     - returns only opacity + transform + transition
  ========================================================= */
  const enter = (delay: number, extra: CSSProperties = {}): CSSProperties => ({
    ...extra,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  /* =========================================================
     ENTRANCE WITH CUSTOM OPACITY (used for scroll cue)
  ========================================================= */
  const enterWithOpacity = (
    delay: number,
    targetOpacity: number,
    extra: CSSProperties = {}
  ): CSSProperties => ({
    ...extra,
    opacity: mounted ? targetOpacity : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        id="home"
        className="
          sticky top-0 z-0
          flex h-screen min-h-screen
          items-center
          overflow-hidden
          transition-colors duration-300
          md:items-end
        "
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* ===================================================
            BACKGROUND LAYERS
        =================================================== */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(0, ${backgroundDrift}px, 0) scale(${backgroundScale})`,
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero.webp')" }}
          />

          {/* Soft dark veil */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "color-mix(in srgb, var(--background) 68%, transparent)",
            }}
          />

          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-[50%]"
            style={{
              background:
                "linear-gradient(to top, var(--background), transparent)",
            }}
          />

          {/* Green ambient glow — top right */}
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full blur-[160px]"
            style={{
              background: `color-mix(in srgb, ${GREEN} 22%, transparent)`,
              transform: `translate3d(0, ${orbDrift}px, 0)`,
              willChange: "transform",
            }}
          />

          {/* Green ambient glow — bottom left */}
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full blur-[160px]"
            style={{
              background: `color-mix(in srgb, ${GREEN} 18%, transparent)`,
              transform: `translate3d(0, ${-orbDrift}px, 0)`,
              willChange: "transform",
            }}
          />

          {/* Subtle grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse at 50% 60%, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 60%, black 20%, transparent 70%)",
            }}
          />

          {/* Top scan line */}
          <div
            className="pointer-events-none absolute left-0 top-[18%] h-px w-full animate-[heroScan_6s_ease-in-out_infinite]"
            style={{
              background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
              boxShadow: `0 0 16px ${GREEN_BRIGHT}`,
              opacity: 0.5,
            }}
          />
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}
        <div
          className="
            relative z-10 mx-auto w-full max-w-[1400px]

            -translate-y-8 px-4 pb-6
            sm:-translate-y-12 sm:px-6 sm:pb-8
            md:translate-y-0 md:px-8 md:pb-12
            lg:px-10 lg:pb-16
          "
          style={{
            opacity: contentFade,
            willChange: "opacity",
          }}
        >
          {/* =================================================
              TOP BLOCK
          ================================================= */}
          <div
            style={{
              transform: `translate3d(0, ${titleLift}px, 0)`,
              willChange: "transform",
            }}
          >
            {/* TOP META */}
            <div
              className="
                mb-3 flex items-center justify-between
                text-[9px] uppercase tracking-[0.15em]
                sm:mb-5 sm:text-[10px] sm:tracking-[0.2em]
                md:mb-6 md:text-[11px] md:tracking-[0.25em]
                lg:text-xs
              "
              style={enter(0, { color: "var(--muted)" })}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: GREEN_BRIGHT,
                    boxShadow: `0 0 8px ${GREEN_BRIGHT}`,
                  }}
                />
                Software Engineer
              </span>
              <span className="font-mono">ADDIS ABABA · {time}</span>
            </div>

            {/* NAME */}
            <div className="max-w-6xl">
              <h1
                className="
                  text-[16vw] font-bold leading-[0.82] tracking-[-0.075em]
                  sm:text-[14vw]
                  md:mt-10 md:text-[10vw]
                  lg:mt-14 lg:text-[9.5vw]
                  xl:text-[9vw]
                "
              >
                <span className="block" style={enter(120)}>
                  Tsehaynesh
                </span>

                <span className="mt-[0.04em] block" style={enter(240)}>
                  Biruh
                  <span
                    style={{
                      background: `linear-gradient(120deg, ${GREEN}, ${GREEN_BRIGHT})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    .
                  </span>
                </span>
              </h1>

              {/* Green underline that grows after entrance */}
              <div
                className="mt-4 h-px origin-left md:mt-6"
                style={{
                  width: mounted ? "120px" : "0px",
                  background: `linear-gradient(to right, ${GREEN}, ${GREEN_BRIGHT}, transparent)`,
                  boxShadow: `0 0 12px ${GREEN}80`,
                  transition: "width 1200ms cubic-bezier(0.16,1,0.3,1) 400ms",
                }}
              />
            </div>

            {/* ROLE */}
            <p
              className="
                mt-3 flex items-center gap-2
                text-[9px] uppercase tracking-[0.2em]
                sm:mt-4 sm:text-[10px] sm:tracking-[0.25em]
                md:mt-6 md:text-xs md:tracking-[0.3em]
                lg:mt-8 lg:text-sm
              "
              style={enter(360, { color: GREEN })}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{
                  background: GREEN_BRIGHT,
                  boxShadow: `0 0 10px ${GREEN_BRIGHT}, 0 0 20px ${GREEN_BRIGHT}80`,
                }}
              />
              Full-Stack Developer
            </p>
          </div>

          {/* =================================================
              BOTTOM ROW
          ================================================= */}
          <div
            className="
              mt-4 flex flex-col gap-4
              sm:mt-5 sm:gap-5
              md:mt-8 md:flex-row md:items-end md:justify-between md:gap-8
              lg:mt-10
            "
            style={{
              transform: `translate3d(0, ${bottomSlide}px, 0)`,
              opacity: Math.max(1 - scrollY / 500, 0),
              willChange: "transform, opacity",
            }}
          >
            {/* Description */}
            <p
              className="
                max-w-xl
                text-xs leading-5
                sm:text-sm sm:leading-6
                md:text-base md:leading-6
                lg:text-lg lg:leading-7
              "
              style={enter(480, { color: "var(--muted)" })}
            >
              I build modern digital products across frontend, backend, and
              DevOps, turning ideas into reliable experiences that people can
              actually use.
            </p>

            {/* =================================================
                ACTIONS
            ================================================= */}
            <div
              className="
                flex flex-wrap items-center gap-2
                sm:gap-2.5
                md:gap-3
                lg:gap-4
              "
              style={enter(600)}
            >
              {/* Explore */}
              <a
                href="#work"
                className="
                  group relative flex w-fit items-center gap-2
                  overflow-hidden border px-3 py-2.5
                  text-[9px] uppercase tracking-[0.14em]
                  transition-all duration-300
                  sm:px-4 sm:py-3 sm:text-[10px]
                  md:gap-3 md:px-5 md:py-3 md:text-[11px]
                  lg:px-6 lg:py-4 lg:text-xs lg:tracking-[0.2em]
                  hover:border-emerald-600 hover:text-white
                "
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"
                  style={{
                    background: `linear-gradient(120deg, ${GREEN}, ${GREEN_BRIGHT})`,
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Work
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </a>

              {/* Download Resume */}
              <a
                href="/Tsehaynesh_Biruh_Resume.pdf"
                download="Tsehaynesh_Biruh_Resume.pdf"
                className="
                  group relative flex w-fit items-center gap-2
                  overflow-hidden border px-3 py-2.5
                  text-[9px] uppercase tracking-[0.14em] text-white
                  transition-all duration-300
                  sm:px-4 sm:py-3 sm:text-[10px]
                  md:gap-3 md:px-5 md:py-3 md:text-[11px]
                  lg:px-6 lg:py-4 lg:text-xs lg:tracking-[0.2em]
                  hover:shadow-[0_10px_40px_-10px_rgba(22,163,74,0.7)]
                "
                style={{
                  borderColor: GREEN,
                  background: `linear-gradient(120deg, ${GREEN}, ${GREEN_BRIGHT})`,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full transition-transform duration-1000 group-hover:translate-x-[300%]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                  }}
                />

                <Download
                  size={14}
                  className="relative transition-transform duration-300 group-hover:translate-y-0.5"
                />

                <span className="relative">Download Resume</span>
              </a>
            </div>
          </div>

          {/* =================================================
              SCROLL CUE — scroll-driven opacity, no conflicts
          ================================================= */}
          <div
            className="
              mt-6 flex items-center gap-3
              text-[9px] uppercase tracking-[0.25em]
              md:mt-10
            "
            style={enterWithOpacity(750, scrollCueFade, {
              color: "var(--muted)",
            })}
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span
                className="absolute inset-0 rounded-full border opacity-40"
                style={{ borderColor: GREEN }}
              />
              <span
                className="h-1 w-1 animate-pulse rounded-full"
                style={{
                  background: GREEN_BRIGHT,
                  boxShadow: `0 0 8px ${GREEN_BRIGHT}`,
                }}
              />
            </span>
            Scroll to explore
          </div>
        </div>
      </section>

      {/* =====================================================
          FLOATING ACHIEVEMENT CARD
      ===================================================== */}
      <aside
        aria-hidden={!showCard}
        className={`
          fixed bottom-3 right-3 z-[200]
          w-[calc(100vw-1.5rem)] max-w-[360px]
          overflow-hidden rounded-xl border shadow-2xl
          transition-transform duration-500 ease-out
          sm:bottom-5 sm:right-5 sm:w-[360px] sm:rounded-2xl
          ${
            showCard
              ? "translate-y-0"
              : "pointer-events-none translate-y-[140%]"
          }
        `}
        style={{
          height: expanded ? 560 : 168,
          maxHeight: "80vh",
          transition:
            "height 450ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 500ms ease-out",
          borderColor: `color-mix(in srgb, ${GREEN} 45%, var(--border))`,
          background: "var(--background)",
          color: "var(--foreground)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.18), 0 0 30px rgba(22,163,74,0.10)",
        }}
      >
        {/* Green side line */}
        <div
          className="absolute left-0 top-0 h-full w-1"
          style={{
            background: `linear-gradient(to bottom, ${GREEN_BRIGHT}, ${GREEN})`,
          }}
        />

        {/* Green scan line */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-px w-full animate-[heroScan_4s_ease-in-out_infinite]"
          style={{
            background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
            boxShadow: `0 0 12px ${GREEN_BRIGHT}`,
          }}
        />

        {!expanded ? (
          <div className="relative h-full">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group flex h-full w-full items-stretch gap-3 p-3 pr-9 text-left sm:gap-4 sm:p-4 sm:pr-10"
            >
              <div
                className="relative flex w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:w-14 sm:rounded-xl"
                style={{
                  background: `color-mix(in srgb, ${GREEN} 12%, transparent)`,
                  color: GREEN,
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${GREEN}40, transparent 70%)`,
                  }}
                />
                <Award
                  size={20}
                  className="relative sm:h-[22px] sm:w-[22px]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                        style={{ background: GREEN_BRIGHT }}
                      />
                      <span
                        className="relative inline-flex h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                        style={{
                          background: GREEN_BRIGHT,
                          boxShadow: `0 0 10px ${GREEN_BRIGHT}`,
                        }}
                      />
                    </span>
                    <p
                      className="font-mono text-[8px] uppercase tracking-[0.2em] sm:text-[9px] sm:tracking-[0.25em]"
                      style={{ color: GREEN }}
                    >
                      Achievement · 2026
                    </p>
                  </div>

                  <p
                    className="mt-1.5 text-xs font-semibold leading-tight sm:mt-2 sm:text-sm"
                    style={{ color: GREEN }}
                  >
                    1st Place · Jimma University
                  </p>

                  <p className="mt-1 text-[10px] leading-snug opacity-60 sm:text-[11px]">
                    AI-powered STEM learning platform.
                  </p>
                </div>

                <span
                  className="flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] transition-all group-hover:gap-2 sm:text-[10px] sm:tracking-[0.2em]"
                  style={{ color: GREEN }}
                >
                  View
                  <ChevronUp size={11} />
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setShowCard(false)}
              className="absolute right-2 top-2 rounded-full p-1 opacity-50 transition-all hover:rotate-90 hover:opacity-100 sm:right-3 sm:top-3 sm:p-1.5"
              style={{ color: GREEN }}
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <header
              className="flex items-start justify-between border-b p-3 sm:p-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{ background: GREEN_BRIGHT }}
                    />
                    <span
                      className="relative h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                      style={{
                        background: GREEN_BRIGHT,
                        boxShadow: `0 0 10px ${GREEN_BRIGHT}`,
                      }}
                    />
                  </span>
                  <p
                    className="font-mono text-[8px] uppercase tracking-[0.2em] sm:text-[9px] sm:tracking-[0.25em]"
                    style={{ color: GREEN }}
                  >
                    Achievement · 2026
                  </p>
                </div>

                <p
                  className="mt-1.5 text-xs font-semibold sm:mt-2 sm:text-sm"
                  style={{ color: GREEN }}
                >
                  1st Place · Jimma University
                </p>
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="rounded-full p-1 opacity-60 transition-opacity hover:opacity-100 sm:p-1.5"
                  style={{ color: GREEN }}
                  aria-label="Collapse"
                >
                  <ChevronDown size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowCard(false)}
                  className="rounded-full p-1 opacity-60 transition-opacity hover:opacity-100 sm:p-1.5"
                  style={{ color: GREEN }}
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-3 sm:p-4">
              <figure
                className="overflow-hidden rounded-lg border"
                style={{
                  borderColor: `color-mix(in srgb, ${GREEN} 30%, var(--border))`,
                }}
              >
                <img
                  src="/images/ceritificate.png"
                  alt="Jimma University first place certificate"
                  className="block h-auto w-full"
                />
              </figure>

              <figure
                className="overflow-hidden rounded-lg border"
                style={{
                  borderColor: `color-mix(in srgb, ${GREEN} 30%, var(--border))`,
                }}
              >
                <img
                  src="/images/ceritificate1.png"
                  alt="Jimma University achievement certificate"
                  className="block h-auto w-full"
                />
              </figure>
            </div>
          </div>
        )}
      </aside>

      {/* =====================================================
          KEYFRAMES
      ===================================================== */}
      <style>{`
        @keyframes heroScan {
          0%   { transform: translateX(-100%); opacity: 0; }
          20%  { opacity: 1; }
          50%  { opacity: 1; }
          80%  { opacity: 0; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </>
  );
}