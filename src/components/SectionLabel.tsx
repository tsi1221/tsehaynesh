const GREEN = "#16a34a";

interface SectionLabelProps {
  number: string;
  label: string;
}

export default function SectionLabel({
  number,
  label,
}: SectionLabelProps) {
  return (
    <div className="mb-16 flex items-center gap-4">
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: GREEN }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{
            background: GREEN,
            boxShadow: `0 0 10px ${GREEN}`,
          }}
        />
      </span>

      <span
        className="font-mono text-xs"
        style={{ color: GREEN }}
      >
        {number}
      </span>

      <span
        className="h-px w-10"
        style={{
          background: `linear-gradient(to right, ${GREEN}, transparent)`,
        }}
      />

      <span
        className="text-xs uppercase tracking-[0.25em]"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
    </div>
  );
}