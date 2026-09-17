import { SKILLS } from "../data/cvData.js";

export default function SkillsSection() {
  const categories = Object.entries(SKILLS);

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24">
      <p className="mb-3 font-mono text-xs text-signal">02 / Skills</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Skills</h2>
      <p className="mt-3 max-w-lg text-muted-light dark:text-muted-dark">
        The languages, libraries, and tools I reach for most, grouped by how I use them.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2">
        {categories.map(([category, items]) => (
          <div key={category}>
            <h3 className="border-b border-ink-line/15 pb-3 font-display text-base font-semibold dark:border-ink-line">
              {category}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {items.map((item) => (
                <span
                  key={item}
                  className={`rounded-lg border px-3.5 py-2 font-mono text-[13px] ${
                    category === "Working Style"
                      ? "border-amber/30 bg-amber/10 text-amber"
                      : "border-ink-line/20 bg-paper-surface dark:border-ink-line dark:bg-ink-surface"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
