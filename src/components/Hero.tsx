import {
  ArrowUpRight,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const GREEN = "#16a34a";
const GREEN_BRIGHT = "#22c55e";

export default function Hero() {
  const [time, setTime] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [expanded, setExpanded] = useState(false);

  /* Addis Ababa clock */
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

  /* Show achievement after 4s */
  useEffect(() => {
    const timer = window.setTimeout(() => setShowCard(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  /* Escape closes */
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

  return (
    <>
      {/* =====================================================
          STICKY HERO — pins to viewport, sections scroll over it
      ===================================================== */}
      <section
        id="home"
        className="sticky top-0 flex h-screen items-end overflow-hidden transition-colors duration-300"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero.webp')" }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "color-mix(in srgb, var(--background) 70%, transparent)",
            }}
          />

          {/* Bottom fade into next section */}
          <div
            className="absolute inset-x-0 bottom-0 h-[50%]"
            style={{
              background:
                "linear-gradient(to top, var(--background), transparent)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-40 md:px-10 md:pb-20">
          <div
            className="mb-8 flex items-center justify-between text-xs uppercase tracking-[0.25em]"
            style={{ color: "var(--muted)" }}
          >
            <span>Software Engineer</span>
            <span className="font-mono">ADDIS ABABA · {time}</span>
          </div>

          <div className="max-w-6xl">
            <p
              className="mb-8 mt-4 text-sm uppercase tracking-[0.3em] md:mb-10"
              style={{ color: GREEN }}
            >
              Full-Stack Developer
            </p>

            <h1 className="text-[15vw] font-bold leading-[0.82] tracking-[-0.07em] md:text-[10vw]">
              <span className="block">Tsehaynesh</span>
              <span className="mt-[0.10em] block">
                Biruh
                <span style={{ color: GREEN }}>.</span>
              </span>
            </h1>
          </div>

          <div className="mt-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p
              className="max-w-xl text-base leading-7 md:text-lg"
              style={{ color: "var(--muted)" }}
            >
              I build modern digital products across frontend, backend, and
              DevOps, turning ideas into reliable experiences that people
              can actually use.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group flex w-fit items-center gap-4 border px-6 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                Explore Work
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              {/* Download Resume */}
              <a
                href="/Tsehaynesh_Biruh_Resume.pdf"
                download="Tsehaynesh_Biruh_Resume.pdf"
                className="group relative flex w-fit items-center gap-3 overflow-hidden border px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(22,163,74,0.7)]"
                style={{
                  borderColor: GREEN,
                  background: `linear-gradient(120deg, ${GREEN}, ${GREEN_BRIGHT})`,
                }}
              >
                {/* Shimmer sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full transition-transform duration-1000 group-hover:translate-x-[300%]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                  }}
                />

                <Download
                  size={16}
                  className="relative transition-transform duration-300 group-hover:translate-y-0.5"
                />

                <span className="relative">Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACHIEVEMENT CARD
      ===================================================== */}
      <aside
        aria-hidden={!showCard}
        className={`fixed bottom-6 right-6 z-[200] w-[min(360px,calc(100vw-3rem))] overflow-hidden rounded-2xl border shadow-2xl transition-transform duration-500 ease-out ${
          showCard
            ? "translate-y-0"
            : "pointer-events-none translate-y-[140%]"
        }`}
        style={{
          height: expanded ? 560 : 168,
          maxHeight: "80vh",
          transition:
            "height 450ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 500ms ease-out",
          borderColor: `color-mix(in srgb, ${GREEN} 45%, var(--border))`,
          background: "var(--background)",
          color: "var(--foreground)",
          boxShadow: `0 20px 60px rgba(0,0,0,0.18), 0 0 30px rgba(22,163,74,0.10)`,
        }}
      >
        <div
          className="absolute left-0 top-0 h-full w-1"
          style={{
            background: `linear-gradient(to bottom, ${GREEN_BRIGHT}, ${GREEN})`,
          }}
        />

        {!expanded ? (
          <div className="relative h-full">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group flex h-full w-full items-stretch gap-4 p-4 pr-10 text-left"
            >
              <div
                className="flex w-14 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in srgb, ${GREEN} 10%, transparent)`,
                  color: GREEN,
                }}
              >
                <Award size={22} />
              </div>

              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 animate-pulse rounded-full"
                      style={{
                        background: GREEN_BRIGHT,
                        boxShadow: `0 0 10px ${GREEN_BRIGHT}`,
                      }}
                    />
                    <p
                      className="font-mono text-[9px] uppercase tracking-[0.25em]"
                      style={{ color: GREEN }}
                    >
                      Achievement · 2026
                    </p>
                  </div>

                  <p
                    className="mt-2 text-sm font-semibold leading-tight"
                    style={{ color: GREEN }}
                  >
                    1st Place · Jimma University
                  </p>

                  <p className="mt-1 text-[11px] leading-snug opacity-60">
                    AI-powered STEM learning platform.
                  </p>
                </div>

                <span
                  className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] transition-all group-hover:gap-2"
                  style={{ color: GREEN }}
                >
                  View
                  <ChevronUp size={12} />
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setShowCard(false)}
              className="absolute right-3 top-3 rounded-full p-1.5 opacity-50 transition-all hover:rotate-90 hover:opacity-100"
              style={{ color: GREEN }}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <header
              className="flex items-start justify-between border-b p-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 animate-pulse rounded-full"
                    style={{
                      background: GREEN_BRIGHT,
                      boxShadow: `0 0 10px ${GREEN_BRIGHT}`,
                    }}
                  />
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.25em]"
                    style={{ color: GREEN }}
                  >
                    Achievement · 2026
                  </p>
                </div>

                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: GREEN }}
                >
                  1st Place · Jimma University
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="rounded-full p-1.5 opacity-60 transition-opacity hover:opacity-100"
                  style={{ color: GREEN }}
                  aria-label="Collapse"
                >
                  <ChevronDown size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowCard(false)}
                  className="rounded-full p-1.5 opacity-60 transition-opacity hover:opacity-100"
                  style={{ color: GREEN }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
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
    </>
  );
}