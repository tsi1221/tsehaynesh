import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import SearchOverlay from "./SearchOverlay";

const GREEN = "#16a34a";
const GREEN_BRIGHT = "#22c55e";

const navigation = [
  { label: "About", href: "#about" },
  // { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* Cmd/Ctrl + K opens search */
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  /* Lock scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed left-0 top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300"
        style={{
          background:
            "color-mix(in srgb, var(--background) 85%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <a
            href="#home"
            aria-label="Tsehaynesh Biruh - Home"
            className="group flex items-center"
          >
            <img
              src="/images/tsehaynesh.png"
              alt="Tsehaynesh Biruh"
              className="block h-9 w-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 md:h-10"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-2 text-sm transition-colors duration-300 hover:text-emerald-500"
                style={{ color: "var(--muted)" }}
              >
                {item.label}

                {/* Green underline */}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{
                    background: `linear-gradient(to right, ${GREEN}, ${GREEN_BRIGHT})`,
                  }}
                />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              title="Search"
              className="group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-500"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              <Search
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </button>

            {/* Theme */}
            <div className="rounded-full transition-all duration-300 hover:ring-1 hover:ring-emerald-600/50">
              <ThemeToggle />
            </div>

            {/* Let's Talk */}
            <a
              href="#contact"
              className="group relative hidden overflow-hidden border px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-emerald-600 hover:text-white md:block"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              <span className="relative z-10">Let&apos;s Talk</span>

              <span
                className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
                style={{
                  background: `linear-gradient(to right, ${GREEN}, ${GREEN_BRIGHT})`,
                }}
              />
            </a>

            {/* Mobile menu */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-emerald-500/10 hover:text-emerald-500 md:hidden"
              style={{ color: "var(--foreground)" }}
            >
              {open ? (
                <X size={21} strokeWidth={1.8} />
              ) : (
                <Menu size={21} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div
            className="border-t px-6 pt-2 pb-4 md:hidden"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <nav className="flex flex-col">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b py-4 text-xl font-medium transition-colors duration-300 hover:text-emerald-500"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                >
                  {item.label}

                  <span
                    className="text-sm opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    style={{ color: GREEN }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex w-full items-center justify-center border py-3 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              Let&apos;s Talk
            </a>
          </div>
        )}
      </header>

      {/* Search */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}