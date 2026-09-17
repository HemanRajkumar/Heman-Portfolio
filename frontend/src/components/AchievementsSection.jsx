import { ExternalLink } from "lucide-react";
import { ACHIEVEMENTS } from "../data/cvData.js";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 py-24">
      <p className="mb-3 font-mono text-xs text-signal">06 / Achievements</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Achievements &amp; Co-Curricular
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {ACHIEVEMENTS.map((item) => (
          <div
            key={item.title}
            className="flex flex-col rounded-2xl border border-ink-line/15 bg-paper-surface p-6 dark:border-ink-line dark:bg-ink-surface"
          >
            <p className="font-mono text-xs text-muted-light dark:text-muted-dark">{item.date}</p>
            <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-light dark:text-muted-dark">
              {item.description}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-signal hover:underline"
            >
              View certificate <ExternalLink size={13} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
