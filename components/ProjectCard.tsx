import { Project } from "@/data/projects";

export function ProjectCard({
  project,
  textured = false,
}: {
  project: Project;
  textured?: boolean;
}) {
  return (
    <article
      className={`card-surface card-surface-hover flex h-full flex-col gap-3 rounded-2xl p-6 ${
        textured ? "card-textured" : "bg-bg"
      }`}
    >
      <h3 className="font-display text-lg font-semibold text-ink">
        {project.name}
      </h3>
      <p className="text-sm leading-relaxed text-ink-muted">
        {project.description}
      </p>
    </article>
  );
}
