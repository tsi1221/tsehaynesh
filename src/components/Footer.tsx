import { ArrowUpRight, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080808] px-6 py-20 text-white md:px-10 md:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Top line */}
        

        {/* Main CTA */}
        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">
              Have an idea?
            </p>

            <a
              href="mailto:tsehayneshbiruh2@gmail.com"
              className="group block w-fit"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-[16vw] font-semibold leading-[0.8] tracking-[-0.08em] text-white transition-colors duration-500 group-hover:text-emerald-400 md:text-[9vw]">
                  Let&apos;s
                </h2>

                <ArrowUpRight
                  size={42}
                  strokeWidth={1.2}
                  className="mt-3 text-emerald-400 transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 md:size-[64px]"
                />
              </div>

              <h2 className="mt-2 text-[16vw] font-semibold leading-[0.8] tracking-[-0.08em] text-white transition-colors duration-500 group-hover:text-emerald-400 md:text-[9vw]">
                talk<span className="text-emerald-400">.</span>
              </h2>
            </a>

            <p className="mt-10 max-w-md text-sm leading-7 text-white/40 md:text-base">
              Building thoughtful digital products across frontend,
              backend, mobile, and DevOps.
            </p>
          </div>

          {/* Links */}
          <div className="lg:pb-2">
            <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
              Connect
            </p>

            <div className="flex flex-col">
              <a
                href="https://github.com/tsi1221"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-t border-white/10 py-5 transition-colors hover:border-emerald-400/40"
              >
                <span className="font-sci-fi text-xs uppercase tracking-[0.12em] text-white/60 transition-colors group-hover:text-emerald-400">
                  GitHub
                </span>

                <span className="font-mono text-[10px] text-white/25 transition-colors group-hover:text-emerald-400">
                  / tsi1221 ↗
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/tsehaynesh-biruh-8681852a4/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-t border-white/10 py-5 transition-colors hover:border-cyan-400/40"
              >
                <span className="font-sci-fi text-xs uppercase tracking-[0.12em] text-white/60 transition-colors group-hover:text-cyan-400">
                  LinkedIn
                </span>

                <span className="font-mono text-[10px] text-white/25 transition-colors group-hover:text-cyan-400">
                  / tsehaynesh-biruh ↗
                </span>
              </a>

              <a
                href="mailto:tsehayneshbiruh2@gmail.com"
                className="group flex items-center justify-between border-y border-white/10 py-5 transition-colors hover:border-violet-400/40"
              >
                <span className="flex items-center gap-3 font-sci-fi text-xs uppercase tracking-[0.12em] text-white/60 transition-colors group-hover:text-violet-400">
                  <Mail size={14} strokeWidth={1.5} />
                  Email
                </span>

                <span className="font-mono text-[10px] text-white/25 transition-colors group-hover:text-violet-400">
                  Contact ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 border-t border-white/10 pt-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                © {new Date().getFullYear()} Tsehaynesh Biruh
              </span>
            </div>

            <div className="flex items-center gap-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                Addis Ababa · Ethiopia
              </span>

              <a
                href="#home"
                className="font-sci-fi text-[8px] uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-emerald-400"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}