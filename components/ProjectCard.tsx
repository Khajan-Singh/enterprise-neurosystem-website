import { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-surface card-surface-hover flex h-full flex-col gap-3 rounded-2xl bg-bg p-6">
      <h3 className="font-display text-lg font-semibold text-ink">
        {project.name}
      </h3>
      <p className="text-sm leading-relaxed text-ink-muted">
        {project.description}
      </p>
    </article>
  );
}
