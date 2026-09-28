import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Shield, ChevronDown} from "lucide-react";

const BOT_TOKEN = "8659342430:AAF_l_fPFWyweoeYPgSiZvAJ4nNJdYYhv5w";
const CHAT_ID = "5143972027";

const GREEN = "#16a34a";
const GREEN_BRIGHT = "#22c55e";

const CATEGORIES = [
  "Freelance Project",
  "Full-Time Role",
  "Collaboration",
  "Consultation",
  "Other",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  /* =========================================================
     STATE
  ========================================================= */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    message: "",
  });

  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  /* =========================================================
     CAPTCHA
  ========================================================= */

  const captcha = useMemo(() => ({ answer: 5, label: "3 + 2" }), []);

  const handleVerifyCaptcha = () => {
    if (parseInt(captchaAnswer.trim(), 10) === captcha.answer) {
      setCaptchaVerified(true);
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
      setCaptchaVerified(false);
    }
  };

  /* =========================================================
     SANITIZE + VALIDATE
  ========================================================= */

  const sanitizeInput = (input: string): string =>
    input
      .replace(/<[^>]*>/g, "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .trim();

  const isValidEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  /* =========================================================
     INPUT
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "message") {
      const sanitized = value.replace(/<[^>]*>/g, "").slice(0, 2000);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value.slice(0, 200) }));
    }
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaVerified) {
      setCaptchaError(true);
      return;
    }

    const clean = {
      firstName: sanitizeInput(formData.firstName).slice(0, 100),
      lastName: sanitizeInput(formData.lastName).slice(0, 100),
      email: sanitizeInput(formData.email).slice(0, 100),
      category: sanitizeInput(formData.category).slice(0, 100),
      message: sanitizeInput(formData.message).slice(0, 2000),
    };

    if (!clean.firstName || !clean.email || !clean.message) {
      setStatus("error");
      return;
    }

    if (!isValidEmail(clean.email)) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const text = `
✨ NEW PORTFOLIO INQUIRY ✨

👤 Name: ${clean.firstName} ${clean.lastName}
📧 Email: ${clean.email}
🏷️ Category: ${clean.category || "Not specified"}

💬 Message:
${clean.message}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text.slice(0, 4096),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        category: "",
        message: "",
      });
      setCaptchaVerified(false);
      setCaptchaAnswer("");

      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      id="contact"
      className="relative z-20 overflow-hidden border-b px-6 pb-28 pt-0 transition-colors duration-500 md:px-10 md:pb-40"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
        scrollMarginTop: "80px",
      }}
    >
      {/* CINEMATIC BACKGROUND */}

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6 }}
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{ background: `color-mix(in srgb, ${GREEN} 18%, transparent)` }}
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[460px] w-[460px] rounded-full blur-[140px]"
        style={{ background: `color-mix(in srgb, ${GREEN} 18%, transparent)` }}
      />

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

      {/* THIN NUMBERED STRIP */}
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
          ◆ (04)
        </span>
        <span>(Contact)</span>
        <span>Get in touch</span>
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          {/* LEFT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[36px] blur-3xl"
              style={{
                background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, ${GREEN} 18%, transparent), transparent 70%)`,
              }}
            />

            <div
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border transition-colors duration-500"
              style={{
                borderColor: `color-mix(in srgb, ${GREEN} 30%, var(--border))`,
                background: "var(--background)",
                boxShadow: `0 40px 120px -40px color-mix(in srgb, ${GREEN} 40%, transparent)`,
              }}
            >
              <img
                src="/images/tsehay.png"
                alt="Tsehaynesh Biruh"
                className="relative z-10 h-full w-full object-contain p-6 transition-transform duration-[1500ms] group-hover:scale-[1.03]"
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background: `radial-gradient(circle at 50% 100%, color-mix(in srgb, ${GREEN} 25%, transparent), transparent 60%)`,
                }}
              />

              {/* Scan line */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-30 h-px w-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
                  boxShadow: `0 0 14px ${GREEN_BRIGHT}`,
                }}
              />

              {/* Corner ticks */}
              <span
                aria-hidden
                className="absolute left-3 top-3 h-4 w-4 border-l border-t"
                style={{ borderColor: GREEN }}
              />
              <span
                aria-hidden
                className="absolute right-3 top-3 h-4 w-4 border-r border-t"
                style={{ borderColor: GREEN }}
              />
              <span
                aria-hidden
                className="absolute bottom-3 left-3 h-4 w-4 border-b border-l"
                style={{ borderColor: GREEN }}
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 h-4 w-4 border-b border-r"
                style={{ borderColor: GREEN }}
              />
            </div>

            
          </motion.div>

          {/* RIGHT — FORM */}
          <div>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="flex min-h-[600px] flex-col items-center justify-center rounded-3xl border p-10 text-center transition-colors duration-500"
                  style={{
                    borderColor: `color-mix(in srgb, ${GREEN} 50%, var(--border))`,
                    background: `color-mix(in srgb, ${GREEN} 6%, var(--background))`,
                    boxShadow: `0 30px 100px -40px color-mix(in srgb, ${GREEN} 60%, transparent)`,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full"
                    style={{
                      background: `color-mix(in srgb, ${GREEN} 15%, transparent)`,
                      boxShadow: `0 0 60px color-mix(in srgb, ${GREEN} 50%, transparent)`,
                    }}
                  >
                    <CheckCircle2 size={48} style={{ color: GREEN_BRIGHT }} />
                  </motion.div>

                  <h3 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                    Message sent
                  </h3>

                  <p
                    className="mb-8 max-w-sm text-base leading-7"
                    style={{ color: "var(--muted)" }}
                  >
                    Thanks for reaching out — I&apos;ll get back to you as soon
                    as possible.
                  </p>

                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm font-semibold uppercase tracking-widest underline-offset-4 hover:underline"
                    style={{ color: GREEN }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="space-y-10"
                >
                  {/* HEADING */}
                  <div>
                   

                    <h2 className="text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
                      Get{" "}
                      <span
                        style={{
                          background: `linear-gradient(120deg, ${GREEN}, ${GREEN_BRIGHT})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        In Touch
                      </span>
                    </h2>

                    <p
                      className="mt-6 max-w-lg text-sm leading-6 md:text-base"
                      style={{ color: "var(--muted)" }}
                    >
                      If you have a stage, a podcast, or a problem worth
                      solving, I want to hear about it.
                    </p>

                    <div
                      className="mt-8 h-px w-24"
                      style={{
                        background: `linear-gradient(to right, ${GREEN}, transparent)`,
                      }}
                    />
                  </div>

                  {/* FIRST + LAST */}
                  <div className="grid gap-8 md:grid-cols-2">
                    <UnderlineField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Anakinim"
                    />
                    <UnderlineField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Skywalker"
                    />
                  </div>

                  {/* CATEGORY + EMAIL */}
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <label
                        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: "var(--foreground)" }}
                      >
                        Category
                      </label>

                      <div className="relative">
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full appearance-none border-b bg-transparent py-2 pr-8 text-sm outline-none transition-colors"
                          style={{
                            borderColor: "var(--border)",
                            color: formData.category
                              ? "var(--foreground)"
                              : "var(--muted)",
                          }}
                        >
                          <option
                            value=""
                            style={{ background: "var(--background)" }}
                          >
                            Select
                          </option>
                          {CATEGORIES.map((c) => (
                            <option
                              key={c}
                              value={c}
                              style={{
                                background: "var(--background)",
                                color: "var(--foreground)",
                              }}
                            >
                              {c}
                            </option>
                          ))}
                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-1 top-3"
                          style={{ color: "var(--muted)" }}
                        />
                      </div>
                    </div>

                    <UnderlineField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="anakinim@gmail.com"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: "var(--foreground)" }}
                    >
                      Message
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      maxLength={2000}
                      placeholder="Tell me your story..."
                      className="w-full resize-none border-b bg-transparent py-2 text-sm outline-none transition-colors placeholder:opacity-60"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = GREEN;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                    />

                    <div
                      className="mt-1 text-right text-[10px]"
                      style={{ color: "var(--muted)" }}
                    >
                      {formData.message.length}/2000
                    </div>
                  </div>

                  {/* CAPTCHA */}
                  <div
                    className="relative overflow-hidden rounded-2xl border p-5 transition-colors duration-500"
                    style={{
                      borderColor: captchaVerified
                        ? `color-mix(in srgb, ${GREEN} 55%, var(--border))`
                        : "var(--border)",
                      background: captchaVerified
                        ? `color-mix(in srgb, ${GREEN} 6%, var(--background))`
                        : `color-mix(in srgb, var(--foreground) 3%, transparent)`,
                      boxShadow: captchaVerified
                        ? `0 0 40px -10px color-mix(in srgb, ${GREEN} 50%, transparent)`
                        : "none",
                    }}
                  >
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute left-0 top-0 h-px w-full"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
                        boxShadow: `0 0 12px ${GREEN_BRIGHT}`,
                      }}
                    />

                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: `color-mix(in srgb, ${GREEN} 12%, transparent)`,
                          color: GREEN,
                        }}
                      >
                        <Shield size={18} />
                      </span>

                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--foreground)" }}
                        >
                          Verify you&apos;re human: {captcha.label} = ?
                        </p>
                        <p
                          className="text-[10px] uppercase tracking-[0.15em]"
                          style={{ color: "var(--muted)" }}
                        >
                          No bots allowed.
                        </p>
                      </div>
                    </div>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={captchaAnswer}
                      onChange={(e) => {
                        setCaptchaAnswer(e.target.value);
                        setCaptchaError(false);
                      }}
                      placeholder="Enter the answer"
                      disabled={captchaVerified}
                      className="mb-3 w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors"
                      style={{
                        background: `color-mix(in srgb, var(--foreground) 3%, transparent)`,
                        borderColor: captchaError ? "#ef4444" : "var(--border)",
                        color: "var(--foreground)",
                      }}
                    />

                    <button
                      type="button"
                      onClick={handleVerifyCaptcha}
                      disabled={captchaVerified}
                      className="w-full rounded-md border py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all disabled:opacity-70"
                      style={{
                        borderColor: captchaVerified
                          ? `color-mix(in srgb, ${GREEN} 55%, var(--border))`
                          : "var(--border)",
                        background: captchaVerified
                          ? `color-mix(in srgb, ${GREEN} 12%, transparent)`
                          : "transparent",
                        color: captchaVerified ? GREEN : "var(--foreground)",
                      }}
                    >
                      {captchaVerified ? "✓ Verified" : "Verify"}
                    </button>

                    {captchaError && (
                      <p className="mt-2 text-[11px] text-red-500">
                        Incorrect answer — try again.
                      </p>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={status === "sending" || !captchaVerified}
                      className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      style={{
                        background: `linear-gradient(120deg, ${GREEN}, ${GREEN_BRIGHT})`,
                        boxShadow: `0 20px 60px -20px color-mix(in srgb, ${GREEN} 90%, transparent)`,
                      }}
                    >
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2"
                        animate={{ x: ["-100%", "300%"] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          ease: "easeInOut",
                        }}
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                        }}
                      />

                      {status === "sending" ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Submit
                        </>
                      )}
                    </motion.button>
                  </div>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg bg-red-500/10 px-4 py-3 text-center text-xs font-semibold text-red-500"
                    >
                      Please check your inputs and try again.
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   UNDERLINE INPUT FIELD
============================================================ */

interface UnderlineFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
}

function UnderlineField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: UnderlineFieldProps) {
  return (
    <div>
      <label
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: "var(--foreground)" }}
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={100}
          className="w-full border-b bg-transparent py-2 text-sm outline-none transition-colors placeholder:opacity-60"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = GREEN;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
          style={{
            background: `linear-gradient(to right, ${GREEN}, transparent)`,
            opacity: value ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}