import Link from "next/link";
import { Container } from "./Container";

const columns = [
  {
    heading: "About",
    links: [
      { href: "/mission", label: "Mission" },
      { href: "/charter", label: "Charter" },
      { href: "/board", label: "Board" },
    ],
  },
  {
    heading: "Community",
    links: [
      { href: "/press", label: "Press Releases" },
      { href: "/get-involved", label: "Get Involved" },
      { href: "/projects", label: "Projects" },
      { href: "/workstreams", label: "Workstreams" },
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
    <footer className="border-t border-line bg-bg-subtle">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="font-display text-sm font-semibold tracking-tight text-ink">
            Enterprise Neurosystem
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            An open source AI research community treating the planet&apos;s
            species and ecosystems as a single system.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              {col.heading}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Enterprise Neurosystem.</p>
          <p>Documentation and marketing content licensed CC BY.</p>
        </Container>
      </div>
    </footer>
  );
}
