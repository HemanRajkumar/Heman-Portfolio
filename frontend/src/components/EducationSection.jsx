import { Download, GraduationCap } from "lucide-react";

const TIMELINE = [
  {
    org: "Bachelor of Technology, Computer Science & Engineering",
    place: "Lovely Professional University · Phagwara, Punjab",
    detail: "CGPA: 7.87",
    period: "August 2024 — Present",
    current: true,
  },
  {
    org: "Intermediate",
    place: "Army Public School Bengdubi · Siliguri, West Bengal",
    detail: "Percentage: 71.6%",
    period: "April 2022 — March 2024",
    current: false,
  },
  {
    org: "Matriculation",
    place: "Army Public School Bengdubi · Siliguri, West Bengal",
    detail: "Percentage: 84.2%",
    period: "April 2014 — March 2022",
    current: false,
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="relative mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-xs text-signal">05 / Education</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Education
          </h2>
        </div>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 dark:bg-signal dark:text-ink"
        >
          <Download size={15} /> Download CV (PDF)
        </a>
      </div>

      <div className="relative border-l border-ink-line/20 pl-8 dark:border-ink-line">
        {TIMELINE.map((item, i) => (
          <div key={i} className="relative mb-10 last:mb-0">
            <div
              className={`absolute -left-[2.28rem] top-1 grid h-6 w-6 place-items-center rounded-full border bg-paper dark:bg-ink ${
                item.current ? "border-amber/60" : "border-signal/40"
              }`}
            >
              <GraduationCap size={12} className={item.current ? "text-amber" : "text-signal"} />
            </div>
            <p className="font-mono text-xs text-muted-light dark:text-muted-dark">
              {item.period}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold">{item.org}</h3>
            <p className="text-sm text-muted-light dark:text-muted-dark">{item.place}</p>
            <p className="mt-1 text-sm font-medium text-signal">{item.detail}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-light dark:text-muted-dark">
        Place your CV file at <code className="font-mono">frontend/public/resume.pdf</code> so
        the download button points at the real file.
      </p>
    </section>
  );
}
