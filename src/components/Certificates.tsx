import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { certificates } from "../data/certificates";

const GREEN = "#16a34a";
const GREEN_BRIGHT = "#22c55e";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Certificates() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isOpen = openIndex !== null;
  const current = isOpen ? certificates[openIndex] : null;

  /* =========================================================
     KEYBOARD NAV (Esc / ← / →)
  ========================================================= */
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => ((i ?? 0) + 1) % certificates.length);
      if (e.key === "ArrowLeft")
        setOpenIndex(
          (i) => ((i ?? 0) - 1 + certificates.length) % certificates.length
        );
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <section
      id="certificates"
      className="relative z-20 overflow-hidden border-b px-6 pb-28 pt-0 transition-colors duration-500 md:px-10 md:pb-40"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.6 }}
        className="pointer-events-none absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full blur-[140px]"
        style={{ background: `color-mix(in srgb, ${GREEN} 14%, transparent)` }}
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

      {/* Numbered strip */}
      <div
        className="relative z-10 mx-auto -mx-6 mb-20 flex items-center justify-between border-b px-6 py-5 text-[10px] uppercase tracking-[0.25em] md:-mx-10 md:px-10"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        <span className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{
              background: GREEN_BRIGHT,
              boxShadow: `0 0 8px ${GREEN_BRIGHT}`,
            }}
          />
          ◆ (05)
        </span>
        <span>(Certificates)</span>
        <span className="font-mono">
          {String(certificates.length).padStart(2, "0")} Total
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-20 max-w-4xl"
        >
          <h2 className="flex items-start gap-5 text-5xl font-semibold tracking-tight md:text-7xl">
            <span className="relative mt-3 flex h-3 w-3 shrink-0 md:mt-5 md:h-4 md:w-4">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: GREEN_BRIGHT }}
              />
              <span
                className="relative inline-flex h-3 w-3 rounded-full md:h-4 md:w-4"
                style={{
                  background: GREEN_BRIGHT,
                  boxShadow: `0 0 16px ${GREEN_BRIGHT}, 0 0 32px ${GREEN_BRIGHT}80`,
                }}
              />
            </span>
            <span>
              Proof of
              <br />
              <span style={{ color: "var(--muted)" }}>the work.</span>
            </span>
          </h2>

          <div
            className="mt-10 h-px w-24"
            style={{
              background: `linear-gradient(to right, ${GREEN}, transparent)`,
            }}
          />
        </motion.div>

        {/* =====================================================
            GRID OF CERTIFICATE CARDS
        ===================================================== */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <motion.button
              key={cert.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: index * 0.06,
              }}
              className="group relative overflow-hidden rounded-2xl border text-left transition-colors duration-500 hover:border-emerald-500/50"
              style={{
                borderColor: "var(--border)",
                background: `color-mix(in srgb, var(--foreground) 2%, transparent)`,
              }}
            >
              {/* Green glow behind on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${GREEN}30, transparent 70%)`,
                }}
              />

              {/* Image */}
              <div
                className="relative aspect-[4/3] overflow-hidden border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                {/* Green scanline */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-px w-full -translate-x-full transition-transform duration-[1200ms] ease-out group-hover:translate-x-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
                    boxShadow: `0 0 12px ${GREEN_BRIGHT}`,
                  }}
                />

                {/* Category tag */}
                {cert.category && (
                  <span
                    className="absolute left-3 top-3 rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-md"
                    style={{
                      borderColor: `color-mix(in srgb, ${GREEN} 45%, var(--border))`,
                      background: `color-mix(in srgb, ${GREEN} 18%, transparent)`,
                      color: GREEN_BRIGHT,
                    }}
                  >
                    {cert.category}
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="relative p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: GREEN }}
                  >
                    {cert.date}
                  </span>
                  <Award size={14} style={{ color: GREEN_BRIGHT }} />
                </div>

                <h3 className="text-lg font-semibold leading-tight tracking-tight">
                  {cert.title}
                </h3>

                <p
                  className="mt-1 text-xs uppercase tracking-[0.2em]"
                  style={{ color: "var(--muted)" }}
                >
                  {cert.issuer}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* =====================================================
          CINEMATIC LIGHTBOX
      ===================================================== */}
      <AnimatePresence>
        {isOpen && current && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
            onClick={() => setOpenIndex(null)}
            style={{
              background: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            {/* Green ambient glow behind the viewer */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
              style={{ background: GREEN }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border text-white transition-all duration-300 hover:rotate-90"
              style={{
                borderColor: `color-mix(in srgb, ${GREEN} 50%, transparent)`,
                background: `color-mix(in srgb, ${GREEN} 20%, transparent)`,
              }}
            >
              <X size={20} />
            </button>

            {/* Prev / Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) =>
                  ((i ?? 0) - 1 + certificates.length) % certificates.length
                );
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border text-white transition-all duration-300 hover:-translate-x-1"
              style={{
                borderColor: `color-mix(in srgb, ${GREEN} 50%, transparent)`,
                background: `color-mix(in srgb, ${GREEN} 20%, transparent)`,
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) =>
                  ((i ?? 0) + 1) % certificates.length
                );
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border text-white transition-all duration-300 hover:translate-x-1"
              style={{
                borderColor: `color-mix(in srgb, ${GREEN} 50%, transparent)`,
                background: `color-mix(in srgb, ${GREEN} 20%, transparent)`,
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Image + meta */}
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border"
              style={{
                borderColor: `color-mix(in srgb, ${GREEN} 45%, transparent)`,
                background: "#0a0a0a",
                boxShadow: `0 40px 140px -40px ${GREEN}90`,
              }}
            >
              {/* Top green scanline */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-20 h-px w-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
                  boxShadow: `0 0 14px ${GREEN_BRIGHT}`,
                }}
              />

              <div className="flex max-h-[90vh] flex-col md:flex-row">
                {/* Image */}
                <div className="flex flex-1 items-center justify-center bg-black p-4 md:p-8">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="max-h-[60vh] w-auto max-w-full rounded-lg object-contain md:max-h-[75vh]"
                  />
                </div>

                {/* Side meta panel */}
                <aside
                  className="w-full shrink-0 border-t p-6 md:w-[320px] md:border-l md:border-t-0 md:p-8"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: "#0a0a0a",
                    color: "#f5f5f5",
                  }}
                >
                  <div
                    className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: GREEN }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: GREEN_BRIGHT,
                        boxShadow: `0 0 8px ${GREEN_BRIGHT}`,
                      }}
                    />
                    {current.category ?? "Certificate"}
                  </div>

                  <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                    {current.title}
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">
                    {current.issuer} · {current.date}
                  </p>

                  {current.description && (
                    <p className="mt-6 text-sm leading-6 text-white/70">
                      {current.description}
                    </p>
                  )}

                  {current.link && (
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all hover:bg-emerald-500/15"
                      style={{
                        borderColor: `color-mix(in srgb, ${GREEN} 50%, transparent)`,
                        color: GREEN_BRIGHT,
                      }}
                    >
                      Verify <ExternalLink size={12} />
                    </a>
                  )}

                  {/* Counter */}
                  <div className="mt-10 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/30">
                    <span className="font-mono">
                      {String((openIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                      {String(certificates.length).padStart(2, "0")}
                    </span>

                    {/* Progress dots */}
                    <div className="flex items-center gap-1.5">
                      {certificates.map((c, i) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setOpenIndex(i)}
                          aria-label={`Go to ${c.title}`}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: i === openIndex ? 20 : 6,
                            background:
                              i === openIndex
                                ? GREEN_BRIGHT
                                : "rgba(255,255,255,0.2)",
                            boxShadow:
                              i === openIndex
                                ? `0 0 8px ${GREEN_BRIGHT}`
                                : "none",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}