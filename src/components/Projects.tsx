import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const GREEN = "#16a34a";
const GREEN_BRIGHT = "#22c55e";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Projects() {
  const count = projects.length;
  const padded = String(count).padStart(2, "0");

  /* Which project is currently spotlit */
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section
      id="work"
      className="relative z-20 overflow-hidden border-b px-6 pb-28 pt-0 transition-colors duration-500 md:px-10 md:pb-40"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}
    >
      {/* =====================================================
          CINEMATIC BACKGROUND
      ===================================================== */}

      {/* Green glow — top right */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.6 }}
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{
          background: `color-mix(in srgb, ${GREEN} 15%, transparent)`,
        }}
      />

      {/* Green glow — bottom left */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="pointer-events-none absolute -left-40 bottom-1/4 h-[460px] w-[460px] rounded-full blur-[140px]"
        style={{
          background: `color-mix(in srgb, ${GREEN} 12%, transparent)`,
        }}
      />

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* =====================================================
          THIN NUMBERED STRIP
      ===================================================== */}
      <div
        className="relative z-10 mx-auto -mx-6 mb-20 flex items-center justify-between border-b px-6 py-5 text-[10px] uppercase tracking-[0.25em] md:-mx-10 md:px-10"
        style={{
          borderColor: "var(--border)",
          color: "var(--muted)",
        }}
      >
        <span className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{
              background: GREEN_BRIGHT,
              boxShadow: `0 0 8px ${GREEN_BRIGHT}`,
            }}
          />
          ◆ (03)
        </span>
        <span>(Selected Work)</span>
        <span className="font-mono">
          {padded} Projects · 2024 — 2026
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* =====================================================
            HEADING — with giant faded index behind
        ===================================================== */}
        <div className="relative mb-24 max-w-4xl">
          {/* Giant ghost number */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="pointer-events-none absolute -left-6 -top-24 select-none text-[260px] font-bold leading-none tracking-tighter md:-top-32 md:text-[360px]"
            style={{ color: "var(--foreground)" }}
          >
            {padded}
          </motion.span>

          {/* Heading with green dot */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="relative flex items-start gap-5 text-5xl font-semibold tracking-tight md:text-7xl"
          >
            <span>
              Things I&apos;ve
              <br />
              <span style={{ color: "var(--muted)" }}>built</span>
              <span
                className="relative ml-4 inline-flex h-3 w-3 rounded-full align-middle md:h-4 md:w-4"
                style={{
                  background: GREEN_BRIGHT,
                  boxShadow: `0 0 16px ${GREEN_BRIGHT}, 0 0 32px ${GREEN_BRIGHT}80`,
                }}
              />
            </span>
          </motion.h2>

          {/* Green underline accent */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="relative mt-10 h-px w-24 origin-left"
            style={{
              background: `linear-gradient(to right, ${GREEN}, transparent)`,
            }}
          />
        </div>

        {/* =====================================================
            PROJECTS LIST — all visible, spotlight on click
        ===================================================== */}
        <div className="relative">
          {/* Vertical dashed rule running through the list */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-px md:block"
            style={{
              background: `repeating-linear-gradient(to bottom, var(--border) 0 6px, transparent 6px 14px)`,
            }}
          />

          <div className="md:pl-8">
            {projects.map((project, index) => {
              const side = index % 2 === 0 ? "left" : "right";
              const isActive = activeId === project.id;

              return (
                <div key={project.id} className="relative">
                  {/* Alternating glow — brightens when active, never hides */}
                  <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 0.4 : 0.15 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`pointer-events-none absolute top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-[130px] ${
                      side === "left" ? "-left-40" : "-right-40"
                    }`}
                    style={{
                      background: `color-mix(in srgb, ${GREEN} 22%, transparent)`,
                    }}
                  />

                  <div className="relative z-10 pb-6">
                    {/* Entrance reveal */}
                    <motion.div
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.8,
                        ease: EASE,
                        delay: index * 0.05,
                      }}
                    >
                      {/* Card wrapper — click to spotlight */}
                      <motion.div
                        onClick={() =>
                          setActiveId(isActive ? null : project.id)
                        }
                        animate={{ scale: isActive ? 1.015 : 1 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="relative cursor-pointer"
                      >
                        <ProjectCard project={project} />

                        {/* Green top-line when active */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              key="topline"
                              initial={{ opacity: 0, scaleX: 0 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              exit={{ opacity: 0, scaleX: 0 }}
                              transition={{ duration: 0.5, ease: EASE }}
                              className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left"
                              style={{
                                background: `linear-gradient(to right, ${GREEN}, ${GREEN_BRIGHT}, transparent)`,
                                boxShadow: `0 0 12px ${GREEN_BRIGHT}`,
                              }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Spotlight side-dot */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              key="sidedot"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className={`pointer-events-none absolute top-8 hidden h-3 w-3 rounded-full md:block ${
                                side === "left" ? "-left-4" : "-right-4"
                              }`}
                              style={{
                                background: GREEN_BRIGHT,
                                boxShadow: `0 0 14px ${GREEN_BRIGHT}`,
                              }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Close button */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.button
                              key="close"
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveId(null);
                              }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              whileHover={{ rotate: 90 }}
                              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md"
                              style={{
                                borderColor: `color-mix(in srgb, ${GREEN} 55%, transparent)`,
                                background: `color-mix(in srgb, ${GREEN} 18%, transparent)`,
                                color: GREEN_BRIGHT,
                              }}
                              aria-label="Close project"
                            >
                              <X size={15} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM STATUS BAR
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto mt-24 flex max-w-[1400px] items-center justify-between border-t pt-6 text-[10px] uppercase tracking-[0.25em]"
        style={{
          borderColor: "var(--border)",
          color: "var(--muted)",
        }}
      >
        <span className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{
              background: GREEN_BRIGHT,
              boxShadow: `0 0 8px ${GREEN_BRIGHT}`,
            }}
          />
          End of portfolio
        </span>

        <span className="font-mono">More coming soon</span>
      </motion.div>
    </section>
  );
}