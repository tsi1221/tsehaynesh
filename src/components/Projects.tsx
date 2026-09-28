import SectionLabel from "./SectionLabel";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const GREEN = "#16a34a";

export default function Projects() {
  return (
    <section
      id="work"
      className="relative z-20 border-b px-6 pb-28 pt-0 transition-colors duration-300 md:px-10 md:pb-40"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}
    >
      {/* Thin numbered strip — same pattern as About */}
      <div
        className="mx-auto -mx-6 mb-20 flex items-center justify-between border-b px-6 py-5 text-[10px] uppercase tracking-[0.25em] md:-mx-10 md:px-10"
        style={{
          borderColor: "var(--border)",
          color: "var(--muted)",
        }}
      >
        <span>◆ (02)</span>
        <span>(Selected Work)</span>
        <span>2024 — 2026</span>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="02" label="Selected Work" />

        <div className="mb-20 max-w-4xl">
          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Things I've
            <br />
            <span style={{ color: "var(--muted)" }}>built.</span>
          </h2>

          {/* Green underline accent */}
          <div
            className="mt-8 h-px w-24"
            style={{
              background: `linear-gradient(to right, ${GREEN}, transparent)`,
            }}
          />
        </div>

        <div>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}