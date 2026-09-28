import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Search,
  X,
} from "lucide-react";
import { projects } from "../data/projects";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const searchableItems = [
  {
    title: "About",
    category: "Section",
    href: "#about",
    description: "About Tsehaynesh and her engineering approach.",
  },
  {
    title: "Selected Work",
    category: "Section",
    href: "#work",
    description: "Projects and digital products.",
  },
  {
    title: "Experience",
    category: "Section",
    href: "#experience",
    description: "Professional experience and background.",
  },
  {
    title: "Contact",
    category: "Section",
    href: "#contact",
    description: "Start a conversation or work together.",
  },
  ...projects.map((project) => ({
    title: project.title,
    category: project.category,
    href: "#work",
    description: project.description,
  })),
];

export default function SearchOverlay({
  open,
  onClose,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  const filteredItems = searchableItems.filter((item) => {
    const search = query.toLowerCase();

    return (
      item.title.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
    );
  });

  const handleNavigate = (href: string) => {
    onClose();

    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24 md:px-10 md:pt-32"
      style={{
        background:
          "color-mix(in srgb, var(--background) 92%, transparent)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-40 top-20 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              "color-mix(in srgb, var(--foreground) 5%, transparent)",
          }}
        />

        <div
          className="absolute -right-40 bottom-20 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "color-mix(in srgb, var(--foreground) 4%, transparent)",
          }}
        />
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p
              className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "var(--muted)" }}
            >
              Search / 01
            </p>

            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Find something.
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:rotate-90"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search input */}
        <div
          className="flex items-center gap-4 border-b pb-4"
          style={{
            borderColor: "var(--foreground)",
          }}
        >
          <Search
            size={22}
            style={{ color: "var(--muted)" }}
          />

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, sections..."
            className="w-full bg-transparent text-xl outline-none placeholder:opacity-30 md:text-3xl"
            style={{
              color: "var(--foreground)",
            }}
          />

          <span
            className="hidden border px-2 py-1 font-mono text-[10px] uppercase md:block"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="mt-8 max-h-[55vh] overflow-y-auto">
          {filteredItems.length > 0 ? (
            <div className="space-y-1">
              {filteredItems.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className="group flex w-full items-center gap-5 border-b py-5 text-left transition-all"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <span
                    className="w-8 font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="text-lg font-medium">
                        {item.title}
                      </h3>

                      <span
                        className="text-[10px] uppercase tracking-[0.15em]"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <p
                      className="max-w-xl text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--muted)" }}
              >
                No results found
              </p>
            </div>
          )}
        </div>

        {/* Bottom hint */}
        <div
          className="mt-8 flex justify-between border-t pt-4 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted)",
          }}
        >
          <span>Navigate through the work</span>
          <span>{filteredItems.length} results</span>
        </div>
      </div>
    </div>
  );
}