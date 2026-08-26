import Image from "next/image";
import Link from "next/link";
import { Deployment } from "@/data/projects";

export function DeploymentCard({ deployment }: { deployment: Deployment }) {
  return (
    <Link
      href={deployment.href}
      className="card-surface card-surface-hover card-textured group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={deployment.image}
          alt={deployment.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-ink">
            {deployment.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent">
            {deployment.location}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-ink-muted">
          {deployment.summary}
        </p>
      </div>
    </Link>
  );
}
