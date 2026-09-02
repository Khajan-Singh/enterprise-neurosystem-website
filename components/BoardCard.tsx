import Image from "next/image";
import { BoardMember, boardMembers } from "@/data/board";

/** "Dr. Ryan Coffee" -> "RC": honorifics dropped, first + last initial. */
function initials(name: string) {
  const parts = name.split(/\s+/).filter((w) => !/\.$/.test(w));
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "");
}

/**
 * The name/title/affiliation block. `sizer` renders an invisible copy used only
 * to reserve height — see the note in BoardCard. Sizers drop the `h3` so the
 * duplicates don't pollute the document outline.
 */
function Heading({ member, sizer }: { member: BoardMember; sizer?: boolean }) {
  const Name = sizer ? "div" : "h3";
  return (
    <div className={`col-start-1 row-start-1 ${sizer ? "invisible" : ""}`}>
      <Name className="font-display text-lg font-semibold text-ink">
        {member.name}
      </Name>
      <p className="mt-1 text-sm font-medium text-accent">{member.title}</p>
      {member.affiliation && (
        <p className="text-sm text-ink-muted">{member.affiliation}</p>
      )}
    </div>
  );
}

export function BoardCard({ member }: { member: BoardMember }) {
  return (
    <article className="card-surface card-surface-hover card-textured flex h-full flex-col rounded-2xl p-6">
      <div className="flex items-start gap-4 border-b border-ink/10 pb-4">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={64}
            height={64}
            sizes="64px"
            className="h-16 w-16 shrink-0 rounded-md object-cover"
          />
        ) : (
          // Photo pending: a monogram in the same 64px box, so the card's
          // layout is identical to its neighbours. Decorative — the name is
          // right beside it.
          <div
            aria-hidden="true"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-ink font-display text-lg font-semibold text-bg"
          >
            {initials(member.name)}
          </div>
        )}
        {/* Every member's heading is stacked into this one grid cell, so the
            cell sizes to the tallest of them and the divider lands on the same
            axis in every card. Only the card's own heading is visible; the rest
            are `invisible` sizers, which still take up space but are out of the
            accessibility tree. This is measured by the browser at the real
            rendered width, so it stays correct at every breakpoint and as
            data/board.ts changes — don't replace it with a fixed min-height,
            which has to be sized for a worst case that never matches the
            longest affiliation exactly and so leaves slack above the divider. */}
        <div className="grid min-w-0 flex-1">
          {boardMembers
            .filter((other) => other.name !== member.name)
            .map((other) => (
              <Heading key={other.name} member={other} sizer />
            ))}
          <Heading member={member} />
        </div>
      </div>
      <p className="pt-4 text-sm leading-relaxed text-ink-muted">{member.bio}</p>
    </article>
  );
}
