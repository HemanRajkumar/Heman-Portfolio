export default function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24">
      <p className="mb-3 font-mono text-xs text-signal">01 / About</p>
      <h2 className="mb-10 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        About
      </h2>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-[15px] leading-relaxed text-muted-light dark:text-muted-dark">
          <p>
            I'm a Computer Science and Engineering undergraduate at Lovely Professional
            University, building toward a career at the intersection of software development
            and applied machine learning. My coursework covers the usual CSE ground —
            programming, data structures, networking — but most of my learning happens in the
            projects I build alongside it.
          </p>
          <p>
            That's meant writing FastAPI backends, training Scikit-learn and TensorFlow models,
            wiring up Streamlit dashboards, and shipping plain HTML/CSS/JavaScript front ends when
            a project calls for it. I like the discipline of taking a rough problem — "what skills
            am I missing for this career path", "what should a farmer plant this season" — and
            turning it into something a person can actually use.
          </p>
          <p>
            Outside of solo projects, I've competed in hackathons and ambassador programs, which
            has meant working under time pressure with people I'd just met. I'd describe myself as
            a steady problem-solver: comfortable adapting to a new stack or a new teammate when a
            project needs it.
          </p>
        </div>

        <dl className="space-y-6 border-l border-ink-line/15 pl-6 dark:border-ink-line">
          <div>
            <dt className="font-mono text-xs text-muted-light dark:text-muted-dark">Focus</dt>
            <dd className="mt-1 text-sm font-medium">Software Development · AI/ML · Web Development</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted-light dark:text-muted-dark">Studying</dt>
            <dd className="mt-1 text-sm font-medium">B.Tech CSE, Lovely Professional University</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted-light dark:text-muted-dark">Based in</dt>
            <dd className="mt-1 text-sm font-medium">Phagwara, Punjab</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted-light dark:text-muted-dark">Approach</dt>
            <dd className="mt-1 text-sm font-medium">Problem-solving, teamwork, adaptability</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
