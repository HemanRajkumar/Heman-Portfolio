export default function Footer() {
  return (
    <footer className="border-t border-ink-line/10 px-6 py-8 dark:border-ink-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold">Heman Rajkumar</p>
          <p className="mt-0.5 text-xs text-muted-light dark:text-muted-dark">
            B.Tech CSE · AI/ML Enthusiast
          </p>
        </div>

        <div className="flex gap-6 text-sm text-muted-light dark:text-muted-dark">
          <a
            href="https://github.com/HemanRajkumar"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-signal"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/hemanrajkumar"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-signal"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hemanrajkumar359660070@gmail.com"
            className="transition-colors hover:text-signal"
          >
            Email
          </a>
        </div>

        <p className="text-xs text-muted-light dark:text-muted-dark">
          © {new Date().getFullYear()} Heman Rajkumar
        </p>
      </div>
    </footer>
  );
}
