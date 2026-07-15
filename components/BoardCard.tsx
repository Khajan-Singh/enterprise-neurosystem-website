import Image from "next/image";
import { BoardMember } from "@/data/board";

export function BoardCard({ member }: { member: BoardMember }) {
  return (
    <article className="card-surface card-surface-hover flex h-full flex-col gap-3 rounded-2xl bg-bg p-6">
      <div className="flex items-center gap-4">
        <Image
          src={member.image}
          alt={member.name}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-md object-cover"
        />
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent">
            {member.title}
          </p>
          {member.affiliation && (
            <p className="text-sm text-ink-muted">{member.affiliation}</p>
          )}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">{member.bio}</p>
    </article>
  );
}
