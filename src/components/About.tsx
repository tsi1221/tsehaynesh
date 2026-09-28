import { ArrowUpRight } from "lucide-react";
import {
  SiExpress,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import SectionLabel from "./SectionLabel";

const GREEN = "#16a34a";
const GREEN_BRIGHT = "#22c55e";

const FRAMEWORKS = [
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#ffffff",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "#ffffff",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 overflow-hidden border-b px-6 pb-28 pt-0 transition-colors duration-300 md:px-10 md:pb-40"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}
    >
      {/* =========================================
          TOP STRIP
      ========================================= */}
      <div
        className="mx-auto -mx-6 mb-20 flex items-center justify-between border-b px-6 py-5 text-[10px] uppercase tracking-[0.25em] md:-mx-10 md:px-10"
        style={{
          borderColor: "var(--border)",
          color: "var(--muted)",
        }}
      >
        <span>◆ (01)</span>
        <span>(About Me)</span>
        <span>© 2026</span>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="01" label="About" />

        {/* =========================================
            ABOUT CONTENT
        ========================================= */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* LEFT */}
          <div>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Building digital products with{" "}
              <span style={{ color: "var(--muted)" }}>
                engineering, design, and curiosity.
              </span>
            </h2>

            {/* Green underline */}
            <div
              className="mt-8 h-px w-24"
              style={{
                background: `linear-gradient(to right, ${GREEN}, transparent)`,
              }}
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            <p
              className="text-lg leading-8 md:text-xl"
              style={{
                color: "var(--muted)",
              }}
            >
              <span
                className="font-semibold"
                style={{
                  color: GREEN,
                }}
              >
                1st Place Award-Winner
              </span>{" "}
              at Jimma University for building an AI-powered STEM online lab
              for high school students.
            </p>

            <p
              className="text-lg leading-8 md:text-xl"
              style={{
                color: "var(--muted)",
              }}
            >
              Full-Stack Developer skilled in <span style={{ color: GREEN }}> React, Next.js, Node.js, and
              TypeScript.</span> Deliver scalable applications end-to-end with modern
              DevOps (
              Docker, CI/CD).
            </p>

            <p
              className="text-lg leading-8 md:text-xl"
              style={{
                color: "var(--muted)",
              }}
            >
              Proven ability to turn complex ideas into user-focused
              solutions.
            </p>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border-b pb-2 pt-2 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:border-emerald-500 hover:text-emerald-500"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              Let&apos;s work together

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* =========================================
          FULL-WIDTH FRAMEWORK MARQUEE
      ========================================= */}
      <div className="mt-24">
        {/* Framework heading */}
        <div className="mx-auto mb-6 flex max-w-[1400px] items-center gap-3 px-0">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{
                background: GREEN_BRIGHT,
              }}
            />

            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{
                background: GREEN_BRIGHT,
                boxShadow: `0 0 10px ${GREEN_BRIGHT}`,
              }}
            />
          </span>

          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{
              color: GREEN,
            }}
          >
            Frameworks & Technologies I use to build
          </span>
        </div>

        {/* Full browser-width marquee */}
        <div
          className="relative -mx-6 w-[calc(100%+3rem)] overflow-hidden md:-mx-10 md:w-[calc(100%+5rem)]"
        >
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20"
            style={{
              background:
                "linear-gradient(to right, var(--background), transparent)",
            }}
          />

          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20"
            style={{
              background:
                "linear-gradient(to left, var(--background), transparent)",
            }}
          />

          {/* Moving track */}
          <div className="flex w-max animate-[frameworkMarquee_20s_linear_infinite]">
            {/* FIRST SET */}
            <div className="flex shrink-0 items-center gap-4 px-2">
              {FRAMEWORKS.map(({ name, icon: Icon, color }) => (
                <div
                  key={`first-${name}`}
                  className="group flex shrink-0 items-center gap-3 rounded-full border px-6 py-3 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: `color-mix(in srgb, ${color} 40%, var(--border))`,
                    background: `color-mix(in srgb, ${color} 7%, transparent)`,
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color,
                    }}
                    className="transition-transform duration-300 group-hover:scale-125"
                  />

                  <span
                    className="whitespace-nowrap text-xs font-medium"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* SECOND SET */}
            <div
              className="flex shrink-0 items-center gap-4 px-2"
              aria-hidden="true"
            >
              {FRAMEWORKS.map(({ name, icon: Icon, color }) => (
                <div
                  key={`second-${name}`}
                  className="group flex shrink-0 items-center gap-3 rounded-full border px-6 py-3 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: `color-mix(in srgb, ${color} 40%, var(--border))`,
                    background: `color-mix(in srgb, ${color} 7%, transparent)`,
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color,
                    }}
                    className="transition-transform duration-300 group-hover:scale-125"
                  />

                  <span
                    className="whitespace-nowrap text-xs font-medium"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* THIRD SET */}
            <div
              className="flex shrink-0 items-center gap-4 px-2"
              aria-hidden="true"
            >
              {FRAMEWORKS.map(({ name, icon: Icon, color }) => (
                <div
                  key={`third-${name}`}
                  className="group flex shrink-0 items-center gap-3 rounded-full border px-6 py-3"
                  style={{
                    borderColor: `color-mix(in srgb, ${color} 40%, var(--border))`,
                    background: `color-mix(in srgb, ${color} 7%, transparent)`,
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color,
                    }}
                  />

                  <span
                    className="whitespace-nowrap text-xs font-medium"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          MARQUEE ANIMATION
      ========================================= */}
      <style>{`
        @keyframes frameworkMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333333%);
          }
        }
      `}</style>
    </section>
  );
}