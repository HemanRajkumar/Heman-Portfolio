import projects from "../data/projects.json";
import ProjectCard from "./ProjectCard.jsx";

export default function ProjectsGrid() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 max-w-xl">
        <p className="mb-3 font-mono text-xs text-signal">03 / Selected work</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects, in the order I actually built them
        </h2>
        <p className="mt-4 text-muted-light dark:text-muted-dark">
          Course work, side projects, and things built to solve a specific,
          slightly odd problem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
