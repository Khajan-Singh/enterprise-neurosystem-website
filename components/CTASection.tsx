import Link from "next/link";
import { Container } from "./Container";

export function CTASection({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="border-t border-line bg-ink">
      <Container className="flex flex-col items-start gap-6 py-20 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-bg sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bg/70">
            {description}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href={primary.href}
            className="rounded-full bg-bg px-6 py-3 text-center text-sm font-medium text-ink transition-opacity hover:opacity-85"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="rounded-full border border-bg/30 px-6 py-3 text-center text-sm font-medium text-bg transition-colors hover:border-bg/60"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
