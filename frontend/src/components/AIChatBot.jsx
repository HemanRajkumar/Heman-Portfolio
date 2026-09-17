import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";
import MarkdownLite from "./MarkdownLite.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const SUGGESTIONS = [
  "What tech stack powers the Skill Gap Analyzer?",
  "Tell me about the Crop Advisory System.",
  "What has Heman built with the Gemini API?",
  "What are Heman's strongest technical skills?",
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-light dark:bg-muted-dark"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export default function AIChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text:
        "Hi — ask me anything about Heman's projects, skills, or background. " +
        "I only answer from his actual CV and project docs.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text) {
    const message = text.trim();
    if (!message || loading) return;

    const history = messages.map((m) => ({ role: m.role, text: m.text }));
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setInput("");
    setError(null);
    setLoading(true);

    // Add an empty assistant message we will stream tokens into.
    setMessages((prev) => [...prev, { role: "model", text: "" }]);

    try {
      const res = await fetch(`${API_BASE}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });

      if (!res.ok || !res.body) throw new Error(`Server responded ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") continue;

          let parsed;
          try {
            parsed = JSON.parse(payload);
          } catch {
            continue; // malformed keep-alive line, safe to skip
          }

          if (parsed.error) {
            // Surface backend/model errors instead of leaving a blank bubble.
            throw new Error(parsed.error);
          }
          if (parsed.delta) {
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = {
                role: "model",
                text: next[next.length - 1].text + parsed.delta,
              };
              return next;
            });
          }
        }
      }
    } catch (err) {
      const detail = err?.message ? ` (${err.message})` : "";
      setError(
        `Something went wrong talking to the assistant${detail}. Check that the FastAPI ` +
          "server is running and GEMINI_API_KEY is set correctly in backend/.env — " +
          "visit http://localhost:8000/api/health to confirm."
      );
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="assistant" className="relative mx-auto max-w-3xl px-6 py-24">
      <div className="mb-10 text-center">
        <p className="mb-3 font-mono text-xs text-signal">04 / Ask directly</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Ask the AI about Heman
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-light dark:text-muted-dark">
          Grounded in his real CV and project docs — powered by Gemini through
          a small FastAPI backend.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-line/15 bg-paper-surface dark:border-ink-line dark:bg-ink-surface">
        <div ref={scrollRef} className="max-h-[26rem] space-y-4 overflow-y-auto p-5">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    m.role === "user"
                      ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                      : "bg-signal/15 text-signal"
                  }`}
                >
                  {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                      : "bg-paper-soft dark:bg-ink-soft"
                  }`}
                >
                  {m.text ? (
                    <MarkdownLite text={m.text} />
                  ) : loading && i === messages.length - 1 ? (
                    <TypingDots />
                  ) : (
                    ""
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {error && (
          <p className="border-t border-ink-line/10 px-5 py-3 text-xs text-amber dark:border-ink-line">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2 border-t border-ink-line/10 px-5 py-3 dark:border-ink-line">
          {SUGGESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-line/20 px-3 py-1.5 text-xs text-muted-light transition-colors hover:border-signal hover:text-signal dark:border-ink-line dark:text-muted-dark"
            >
              <Sparkles size={11} /> {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2 border-t border-ink-line/10 p-3 dark:border-ink-line"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a project, skill, or experience…"
            className="flex-1 rounded-full bg-paper-soft px-4 py-2.5 text-sm outline-none placeholder:text-muted-light dark:bg-ink-soft dark:placeholder:text-muted-dark"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-opacity disabled:opacity-40 dark:bg-signal dark:text-ink"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </section>
  );
}
