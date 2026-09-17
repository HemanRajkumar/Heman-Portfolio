import { ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "../data/cvData.js";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative mx-auto max-w-6xl px-6 py-24">
      <p className="mb-3 font-mono text-xs text-signal">05 / Certifications</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Certifications
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.title}
            className="flex flex-col rounded-2xl border border-ink-line/15 bg-paper-surface p-5 dark:border-ink-line dark:bg-ink-surface"
          >
            <p className="font-mono text-xs text-muted-light dark:text-muted-dark">{cert.date}</p>
            <h3 className="mt-2 font-display text-base font-semibold leading-snug">
              {cert.title}
            </h3>
            {cert.issuer && (
              <p className="mt-1 text-sm text-muted-light dark:text-muted-dark">{cert.issuer}</p>
            )}
            <a
              href={cert.url}
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
