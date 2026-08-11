import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

const columns: {
  heading: string;
  links: { href: string; label: string; newTab?: boolean }[];
}[] = [
  {
    heading: "About",
    links: [
      { href: "/mission", label: "Mission" },
      { href: "/charter", label: "Charter" },
      { href: "/board", label: "Board" },
      {
        href: "/The-Enterprise-Neurosystem-Whitepaper.pdf",
        label: "Whitepaper",
        // Not a page — same-tab would drop the visitor into a PDF viewer.
        newTab: true,
      },
    ],
  },
  {
    heading: "Community",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/press", label: "Press Releases" },
      { href: "/projects", label: "Projects" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      {
        href: "https://github.com/Enterprise-Neurosystem",
        label: "GitHub",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-bg/10 bg-ink">
      {/*
        Four equal grid tracks looked uneven: the brand blurb fills its track
        while "Board" or "GitHub" use a third of theirs, so the visible gap ran
        ~40px, ~190px, ~150px. Flex with `justify-between` sizes each column to
        its content and splits the leftover space equally, so the gaps between
        what you can actually see come out the same. Still a grid below md,
        where the columns stack two-up.
      */}
      <Container className="grid gap-10 py-16 sm:grid-cols-2 md:flex md:justify-between md:gap-12">
        <div className="sm:col-span-2 md:max-w-xs">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-icon.png"
              alt=""
              width={100}
              height={82}
              className="h-6 w-auto rounded-sm"
            />
            <p className="font-display text-sm font-semibold tracking-tight text-bg">
              Enterprise Neurosystem
            </p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-bg/70">
            An open source AI research community treating the planet&apos;s
            species and ecosystems as a single system.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="text-xs font-medium uppercase tracking-wide text-bg/70 underline underline-offset-5">
              {col.heading}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.newTab ? "_blank" : undefined}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                    className="text-sm text-bg/70 transition-colors hover:text-bg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-bg/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-bg/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Enterprise Neurosystem.</p>
          <p>Documentation and marketing content licensed CC BY.</p>
        </Container>
      </div>
    </footer>
  );
}
