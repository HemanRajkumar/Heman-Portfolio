import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectCard({ project }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 250,
    damping: 25,
  });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-line/15 bg-paper-surface dark:border-ink-line dark:bg-ink-surface"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-ink-soft">
        <img
          src={project.gif}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-paper backdrop-blur-sm">
          {project.date}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-light dark:text-muted-dark">
          {project.description}
        </p>

        {project.metrics && (
          <p className="font-mono text-xs text-signal">{project.metrics}</p>
        )}

        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink-line/20 px-2.5 py-1 text-[11px] text-muted-light dark:border-ink-line dark:text-muted-dark"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3 pt-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-line/25 px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-signal hover:text-signal dark:border-ink-line"
            >
              <Github size={13} /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-paper transition-transform hover:-translate-y-0.5 dark:bg-signal dark:text-ink"
            >
              <ExternalLink size={13} /> Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
