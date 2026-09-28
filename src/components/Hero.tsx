
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
     SHOW ACHIEVEMENT CARD AFTER 4s
  ========================================================= */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowCard(true);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, []);

  /* =========================================================
     ESC CLOSES / COLLAPSES CARD
  ========================================================= */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setExpanded((wasExpanded) => {
        if (wasExpanded) {
          return false;
        }

        setShowCard(false);
        return false;
      });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        id="home"
        className="
          sticky top-0 z-0
          flex min-h-screen h-screen
          items-end
          overflow-hidden
          transition-colors duration-300
        "
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* ===================================================
            BACKGROUND
        =================================================== */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero.webp')",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "color-mix(in srgb, var(--background) 70%, transparent)",
            }}
          />

          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-[45%]"
            style={{
              background:
                "linear-gradient(to top, var(--background), transparent)",
            }}
          />
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}
        <div
          className="
            relative z-10
            mx-auto w-full max-w-[1400px]

            px-3
            pb-4
            pt-0

            sm:px-5
            sm:pb-7

            md:px-8
            md:pb-12

            lg:px-10
            lg:pb-16
          "
        >
          {/* =================================================
              TOP META
          ================================================= */}
          <div
            className="
              mb-2
              flex items-center justify-between
              text-[8px]
              uppercase
              tracking-[0.14em]

              sm:mb-4
              sm:text-[9px]
              sm:tracking-[0.2em]

              md:mb-6
              md:text-[10px]
              md:tracking-[0.25em]

              lg:text-xs
            "
            style={{
              color: "var(--muted)",
            }}
          >
            <span>Software Engineer</span>

            <span className="font-mono">
              ADDIS ABABA · {time}
            </span>
          </div>

          {/* =================================================
              NAME
          ================================================= */}
          <div className="max-w-6xl">
            <h1
              className="
                text-[15vw]
                font-bold
                leading-[0.82]
                tracking-[-0.075em]

                sm:text-[14vw]

                md:mt-16
                md:text-[10vw]

                lg:mt-20
                lg:text-[9.5vw]

                xl:text-[9vw]
              "
            >
              <span className="block">Tsehaynesh</span>

              <span className="mt-[0.04em] block">
                Biruh
                <span style={{ color: GREEN }}>.</span>
              </span>
            </h1>
          </div>

          {/* =================================================
              ROLE
          ================================================= */}
          <p
            className="
              mt-2
              flex items-center gap-1.5
              text-[8px]
              uppercase
              tracking-[0.18em]

              sm:mt-3
              sm:text-[10px]
              sm:tracking-[0.25em]

              md:mt-8
              md:gap-2
              md:text-xs
              md:tracking-[0.3em]

              lg:mt-10
              lg:text-sm
            "
            style={{
              color: GREEN,
            }}
          >
            <span
              className="
                h-1 w-1
                animate-pulse
                rounded-full

                sm:h-1.5 sm:w-1.5
              "
              style={{
                background: GREEN_BRIGHT,
                boxShadow: `0 0 10px ${GREEN_BRIGHT}`,
              }}
            />

            Full-Stack Developer
          </p>

          {/* =================================================
              BOTTOM ROW
          ================================================= */}
          <div
            className="
              mt-3
              flex
              flex-col
              gap-3

              sm:mt-4
              sm:gap-4

              md:mt-7
              md:flex-row
              md:items-end
              md:justify-between
              md:gap-8

              lg:mt-9
            "
          >
            {/* Description */}
            <p
              className="
                max-w-xl
                text-[11px]
                leading-4

                sm:text-xs
                sm:leading-5

                md:text-base
                md:leading-6

                lg:text-lg
                lg:leading-7
              "
              style={{
                color: "var(--muted)",
              }}
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
                flex
                flex-wrap
                items-center
                gap-2

                sm:gap-2.5

                md:gap-3

                lg:gap-4
              "
            >
              {/* Explore */}
              <a
                href="#work"
                className="
                  group
                  flex w-fit
                  items-center gap-1.5
                  border
                  px-2.5 py-2
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  transition-all duration-300

                  sm:gap-2
                  sm:px-3
                  sm:py-2.5
                  sm:text-[9px]

                  md:gap-3
                  md:px-4
                  md:py-3
                  md:text-[10px]

                  lg:px-5
                  lg:py-3.5
                  lg:text-xs

                  hover:border-emerald-600
                  hover:bg-emerald-600
                  hover:text-white
                "
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                Explore Work

                <ArrowUpRight
                  size={13}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                    group-hover:-translate-y-1

                    sm:w-[14px]
                    sm:h-[14px]

                    md:w-[15px]
                    md:h-[15px]
                  "
                />
              </a>

              {/* Download Resume */}
              <a
                href="/Tsehaynesh_Biruh_Resume.pdf"
                download="Tsehaynesh_Biruh_Resume.pdf"
                className="
                  group
                  relative
                  flex w-fit
                  items-center gap-1.5
                  overflow-hidden
                  border
                  px-2.5 py-2
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-white
                  transition-all duration-300

                  sm:gap-2
                  sm:px-3
                  sm:py-2.5
                  sm:text-[9px]

                  md:gap-3
                  md:px-4
                  md:py-3
                  md:text-[10px]

                  lg:px-5
                  lg:py-3.5
                  lg:text-xs

                  hover:shadow-[0_10px_40px_-10px_rgba(22,163,74,0.7)]
                "
                style={{
                  borderColor: GREEN,
                  background: `linear-gradient(120deg, ${GREEN}, ${GREEN_BRIGHT})`,
                }}
              >
                <span
                  aria-hidden
                  className="
                    pointer-events-none
                    absolute inset-y-0 -left-1/2
                    w-1/2
                    -translate-x-full
                    transition-transform duration-1000
                    group-hover:translate-x-[300%]
                  "
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                  }}
                />

                <Download
                  size={13}
                  className="
                    relative
                    transition-transform
                    duration-300
                    group-hover:translate-y-0.5

                    sm:w-[14px]
                    sm:h-[14px]

                    md:w-[15px]
                    md:h-[15px]
                  "
                />

                <span className="relative">
                  Download Resume
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FLOATING ACHIEVEMENT CARD
      ===================================================== */}
      <aside
        aria-hidden={!showCard}
        className={`
          fixed
          bottom-3
          right-3
          z-[200]

          w-[calc(100vw-1.5rem)]
          max-w-[360px]

          overflow-hidden
          rounded-xl
          border
          shadow-2xl

          transition-transform
          duration-500
          ease-out

          sm:bottom-5
          sm:right-5
          sm:w-[360px]
          sm:rounded-2xl

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

        {!expanded ? (
          /* =================================================
             COLLAPSED CARD
          ================================================= */
          <div className="relative h-full">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="
                group
                flex
                h-full
                w-full
                items-stretch
                gap-3
                p-3
                pr-9
                text-left

                sm:gap-4
                sm:p-4
                sm:pr-10
              "
            >
              <div
                className="
                  flex
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg

                  sm:w-14
                  sm:rounded-xl
                "
                style={{
                  background: `color-mix(in srgb, ${GREEN} 10%, transparent)`,
                  color: GREEN,
                }}
              >
                <Award size={20} className="sm:h-[22px] sm:w-[22px]" />
              </div>

              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full sm:h-2 sm:w-2"
                      style={{
                        background: GREEN_BRIGHT,
                        boxShadow: `0 0 10px ${GREEN_BRIGHT}`,
                      }}
                    />

                    <p
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.2em]

                        sm:text-[9px]
                        sm:tracking-[0.25em]
                      "
                      style={{
                        color: GREEN,
                      }}
                    >
                      Achievement · 2026
                    </p>
                  </div>

                  <p
                    className="
                      mt-1.5
                      text-xs
                      font-semibold
                      leading-tight

                      sm:mt-2
                      sm:text-sm
                    "
                    style={{
                      color: GREEN,
                    }}
                  >
                    1st Place · Jimma University
                  </p>

                  <p className="mt-1 text-[10px] leading-snug opacity-60 sm:text-[11px]">
                    AI-powered STEM learning platform.
                  </p>
                </div>

                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    group-hover:gap-2

                    sm:text-[10px]
                    sm:tracking-[0.2em]
                  "
                  style={{
                    color: GREEN,
                  }}
                >
                  View
                  <ChevronUp size={11} />
                </span>
              </div>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={() => setShowCard(false)}
              className="
                absolute
                right-2
                top-2
                rounded-full
                p-1
                opacity-50
                transition-all

                sm:right-3
                sm:top-3
                sm:p-1.5

                hover:rotate-90
                hover:opacity-100
              "
              style={{
                color: GREEN,
              }}
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          /* =================================================
             EXPANDED CARD
          ================================================= */
          <div className="flex h-full flex-col">
            <header
              className="
                flex
                items-start
                justify-between
                border-b
                p-3

                sm:p-4
              "
              style={{
                borderColor: "var(--border)",
              }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full sm:h-2 sm:w-2"
                    style={{
                      background: GREEN_BRIGHT,
                      boxShadow: `0 0 10px ${GREEN_BRIGHT}`,
                    }}
                  />

                  <p
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.2em]

                      sm:text-[9px]
                      sm:tracking-[0.25em]
                    "
                    style={{
                      color: GREEN,
                    }}
                  >
                    Achievement · 2026
                  </p>
                </div>

                <p
                  className="mt-1.5 text-xs font-semibold sm:mt-2 sm:text-sm"
                  style={{
                    color: GREEN,
                  }}
                >
                  1st Place · Jimma University
                </p>
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="
                    rounded-full
                    p-1
                    opacity-60
                    transition-opacity
                    hover:opacity-100

                    sm:p-1.5
                  "
                  style={{
                    color: GREEN,
                  }}
                  aria-label="Collapse"
                >
                  <ChevronDown size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowCard(false)}
                  className="
                    rounded-full
                    p-1
                    opacity-60
                    transition-opacity
                    hover:opacity-100

                    sm:p-1.5
                  "
                  style={{
                    color: GREEN,
                  }}
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
    </>
  );
}
