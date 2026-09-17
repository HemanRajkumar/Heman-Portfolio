import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const LINKS = [
  { href: "#top", label: "Home", id: "top" },
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#work", label: "Projects", id: "work" },
  { href: "#assistant", label: "Assistant", id: "assistant" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#certifications", label: "Certifications", id: "certifications" },
  { href: "#achievements", label: "Achievements", id: "achievements" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/80 dark:bg-ink/80 backdrop-blur-md border-b border-ink-line/10 dark:border-ink-line"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#top"
          className="shrink-0 font-display text-sm font-semibold tracking-tight"
        >
          Heman<span className="text-signal">.</span>Rajkumar
        </a>
        <div className="flex min-w-0 items-center gap-4">
          <ul className="hide-scrollbar hidden gap-6 overflow-x-auto text-sm text-muted-light dark:text-muted-dark lg:flex">
            {LINKS.map((l) => (
              <li key={l.href} className="shrink-0">
                <a
                  href={l.href}
                  className={`relative pb-1 transition-colors hover:text-ink dark:hover:text-paper ${
                    active === l.id ? "text-ink dark:text-paper" : ""
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-amber" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
