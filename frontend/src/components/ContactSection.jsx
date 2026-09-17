import { useState } from "react";
import { motion } from "framer-motion";
import ContactGlobe from "./ContactGlobe.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Fill in your name, email, and a message first.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || `Server responded ${res.status}`);
      }
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        `Couldn't send that (${err.message}). Make sure the FastAPI backend is running, ` +
          "or email me directly at hemanrajkumar359660070@gmail.com."
      );
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl overflow-x-clip px-6 py-24">
      <p className="mb-3 font-mono text-xs text-signal">07 / Contact</p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-tight">Contact.</h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-light dark:text-muted-dark">
            Open to internships, collaborations, and conversations about AI/ML or web projects.
            Reach me directly, or send a note through the form.
          </p>

          <dl className="mt-8 space-y-5">
            <div>
              <dt className="font-mono text-xs text-muted-light dark:text-muted-dark">Email</dt>
              <dd className="mt-1 text-sm font-medium">
                <a
                  href="mailto:hemanrajkumar359660070@gmail.com"
                  className="hover:text-signal hover:underline"
                >
                  hemanrajkumar359660070@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted-light dark:text-muted-dark">Mobile</dt>
              <dd className="mt-1 text-sm font-medium">+91-9526448569</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted-light dark:text-muted-dark">LinkedIn</dt>
              <dd className="mt-1 text-sm font-medium">
                <a
                  href="https://linkedin.com/in/hemanrajkumar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-signal hover:underline"
                >
                  linkedin.com/in/hemanrajkumar
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted-light dark:text-muted-dark">GitHub</dt>
              <dd className="mt-1 text-sm font-medium">
                <a
                  href="https://github.com/HemanRajkumar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-signal hover:underline"
                >
                  github.com/HemanRajkumar
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* The globe lives inside the card, clipped to its rounded corners —
            visible through the translucent panel and input fields. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-ink-line/15 bg-paper-surface/80 dark:border-ink-line dark:bg-ink-surface/75"
        >
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <ContactGlobe />
          </div>

          <div className="relative z-10 p-8 sm:p-10">
            <p className="mb-6 text-xs text-muted-light dark:text-muted-dark">
              Messages are sent and stored directly — no email app required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Your Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="What's your good name?"
                  className="w-full rounded-xl border border-ink-line/15 bg-paper-soft/40 px-4 py-3 text-sm outline-none backdrop-blur-sm placeholder:text-muted-light focus:ring-2 focus:ring-signal/40 dark:border-ink-line/60 dark:bg-ink-soft/40 dark:placeholder:text-muted-dark"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="What's your email address?"
                  className="w-full rounded-xl border border-ink-line/15 bg-paper-soft/40 px-4 py-3 text-sm outline-none backdrop-blur-sm placeholder:text-muted-light focus:ring-2 focus:ring-signal/40 dark:border-ink-line/60 dark:bg-ink-soft/40 dark:placeholder:text-muted-dark"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What you want to say?"
                  className="w-full resize-y rounded-xl border border-ink-line/15 bg-paper-soft/40 px-4 py-3 text-sm outline-none backdrop-blur-sm placeholder:text-muted-light focus:ring-2 focus:ring-signal/40 dark:border-ink-line/60 dark:bg-ink-soft/40 dark:placeholder:text-muted-dark"
                />
              </div>

              {status === "error" && <p className="text-xs text-amber">{errorMsg}</p>}
              {status === "sent" && (
                <p className="text-xs text-signal">
                  Sent — thanks for reaching out, I'll get back to you soon.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-50 dark:bg-signal dark:text-ink"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
