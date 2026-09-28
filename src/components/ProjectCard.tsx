import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types";

const GREEN = "#16a34a";
const GREEN_BRIGHT = "#22c55e";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group relative grid border-t py-10 transition-colors duration-500 lg:grid-cols-2 lg:gap-16 lg:py-14"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Soft green glow behind card on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(22,163,74,0.06), transparent 70%)",
        }}
      />

      {/* Green left accent bar that grows on hover */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-0 w-[2px] transition-all duration-700 group-hover:h-full"
        style={{
          background: `linear-gradient(to bottom, ${GREEN_BRIGHT}, ${GREEN})`,
          boxShadow: `0 0 20px ${GREEN_BRIGHT}`,
        }}
      />

      {/* ==============================
          IMAGE
      ============================== */}
      <div
        className={`relative transition-all duration-500 group-hover:pl-4 ${
          project.reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-xl border"
          style={{
            background: "var(--border)",
            borderColor: "var(--border)",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dim veil that lifts on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
            style={{
              background:
                "color-mix(in srgb, var(--background) 10%, transparent)",
            }}
          />

          {/* Green scan line sweeping across on hover */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-px w-full -translate-x-full transition-transform duration-[1200ms] ease-out group-hover:translate-x-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
              boxShadow: `0 0 12px ${GREEN_BRIGHT}`,
            }}
          />
        </div>
      </div>

      {/* ==============================
          CONTENT
      ============================== */}
      <div
        className={`flex flex-col justify-between py-6 ${
          project.reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div>
          {/* Meta row */}
          <div className="mb-8 flex items-center justify-between">
            <span
              className="font-mono text-sm transition-colors duration-500 group-hover:text-emerald-500"
              style={{ color: "var(--muted)" }}
            >
              {project.number}
            </span>

            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-4xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-emerald-500 md:text-6xl"
            style={{ color: "var(--foreground)" }}
          >
            {project.title}
          </h3>

          {/* Green underline accent */}
          <div
            className="mt-6 h-px w-16 transition-all duration-700 group-hover:w-32"
            style={{
              background: `linear-gradient(to right, ${GREEN}, transparent)`,
            }}
          />

          <p
            className="mt-6 max-w-xl text-base leading-7"
            style={{ color: "var(--muted)" }}
          >
            {project.description}
          </p>
        </div>

        <div className="mt-12">
          {/* Technologies */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="border px-3 py-2 text-xs transition-colors duration-300 group-hover:border-emerald-500/40 group-hover:text-emerald-500"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                }}
              >
                {technology}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-sm uppercase tracking-[0.15em] transition-colors duration-300 hover:text-emerald-500"
                style={{ color: "var(--foreground)" }}
              >
                Live Project

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-emerald-500"
                style={{ color: "var(--muted)" }}
              >
                
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}