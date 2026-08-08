"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";
import { useDropdown } from "./useDropdown";

const visionLinks = [
  { href: "/mission", label: "Mission" },
  { href: "/charter", label: "Charter" },
  { href: "/board", label: "Board" },
];

const projectsLinks = [
  { href: "/projects/uganda", label: "Uganda" },
  { href: "/projects/dangermond", label: "Dangermond" },
  { href: "/nlip", label: "NLIP" },
  { href: "/projects#research-workstreams", label: "Other" },
];

const links = [
  { href: "/workstreams", label: "Workstreams" },
  { href: "/partners", label: "Partners" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
];

/**
 * Exact match, except for sections that have detail pages beneath them —
 * /blog/<slug> should still light up "Blog".
 */
const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/**
 * Scrolls to an in-page anchor when already on its target route (Next's
 * client-side router doesn't reliably re-scroll on a same-route hash
 * change), and otherwise lets a normal Link navigation handle it.
 */
function useHashLinkClick(pathname: string, onNavigate: () => void) {
  return (href: string) => (e: React.MouseEvent) => {
    onNavigate();
    if (!href.includes("#")) return;
    const [path, hash] = href.split("#");
    if (pathname === path) {
      e.preventDefault();
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
}

function NavDropdown({
  label,
  href,
  items,
  active,
}: {
  label: string;
  href?: string;
  items: { href: string; label: string }[];
  active: boolean;
}) {
  const pathname = usePathname();
  const { ref, open, onMouseEnter, onMouseLeave, togglePin, close } =
    useDropdown();
  const handleItemClick = useHashLinkClick(pathname, close);

  const triggerClass = `text-base transition-colors ${
    active ? "font-semibold text-ink" : "text-ink/70 hover:text-ink"
  }`;

  return (
    <div
      ref={ref}
      className="relative flex items-center gap-1"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {href ? (
        <>
          <Link href={href} onClick={close} className={triggerClass}>
            {label}
          </Link>
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            aria-label={`${label} menu`}
            onClick={togglePin}
            className="flex items-center p-1 text-ink/70 transition-colors hover:text-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 12 8"
              className={`h-2.5 w-2.5 fill-current transition-transform ${
                open ? "rotate-180" : ""
              }`}
            >
              <path d="M6 8 0 0h12z" />
            </svg>
          </button>
        </>
      ) : (
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={togglePin}
          className={`flex items-center gap-1 ${triggerClass}`}
        >
          {label}
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className={`h-2.5 w-2.5 fill-current transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="M6 8 0 0h12z" />
          </svg>
        </button>
      )}

      {/*
        The panel stays mounted so it can transition in *and* out — mounting on
        `open` can only ever animate the enter, and popping straight to full
        opacity is what made these feel abrupt. `inert` keeps the closed panel
        out of the tab order and the accessibility tree, and
        `pointer-events-none` keeps it from catching the mouse.

        The gap between trigger and panel is the wrapper's `pt-3` padding, not
        a margin — a margin leaves a dead zone the pointer falls through on its
        way to the panel, which closes the menu.
      */}
      <div
        inert={!open}
        className={`absolute left-1/2 top-full z-10 w-48 -translate-x-1/2 pt-3 ${
          open ? "" : "pointer-events-none"
        }`}
      >
        {/*
          Animated on the inner panel, not the wrapper: the wrapper's
          `-translate-x-1/2` centering is a transform, and animating there
          would fight it. The open/closed states themselves live in
          `.nav-panel` in globals.css — see the comment there for why they
          can't be Tailwind utilities.
        */}
        <div
          data-open={open}
          className="nav-panel card-surface card-textured origin-top rounded-xl py-2"
        >
          {href && (
            <>
              <Link
                href={href}
                onClick={close}
                className="block px-4 py-2 text-sm font-medium text-ink"
              >
                {label}
              </Link>
              <div className="my-2 border-t border-nav-line" />
            </>
          )}
          {items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleItemClick(link.href)}
              className="block px-4 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMobile = () => setOpen(false);
  const handleMobileHashClick = useHashLinkClick(pathname, closeMobile);

  const visionActive =
    pathname === "/vision" || visionLinks.some((link) => link.href === pathname);
  const projectsActive =
    pathname === "/projects" ||
    pathname.startsWith("/projects/") ||
    pathname === "/nlip";

  return (
    <header className="sticky top-0 z-50 border-b border-nav-line/60 bg-nav/70 shadow-[0_8px_30px_-12px_rgba(22,23,26,0.1)] backdrop-blur-sm">
      <Container className="relative flex h-24 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-with-name.png"
            alt="Enterprise Neurosystem"
            width={400}
            height={84}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavDropdown
            label="Vision"
            href="/vision"
            items={visionLinks}
            active={visionActive}
          />
          <NavDropdown
            label="Projects"
            href="/projects"
            items={projectsLinks}
            active={projectsActive}
          />

          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base transition-colors ${
                  active
                    ? "font-semibold text-ink"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2.5 text-base font-medium text-bg transition-opacity hover:opacity-85"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </Container>

      {open && (
        <nav className="border-t border-nav-line bg-nav md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <Link
              href="/vision"
              onClick={closeMobile}
              className={`border-b border-nav-line px-2 pb-2 pt-2 text-xs font-medium uppercase tracking-widest ${
                visionActive ? "text-ink" : "text-ink-muted"
              }`}
            >
              Vision
            </Link>
            {visionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={`rounded-md px-2 py-2.5 text-base ${
                  pathname === link.href
                    ? "font-semibold text-ink"
                    : "text-ink/70"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/projects"
              onClick={closeMobile}
              className={`mt-2 border-y border-nav-line px-2 pb-2 pt-4 text-xs font-medium uppercase tracking-widest ${
                projectsActive ? "text-ink" : "text-ink-muted"
              }`}
            >
              Projects
            </Link>
            {projectsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleMobileHashClick(link.href)}
                className={`rounded-md px-2 py-2.5 text-base ${
                  pathname === link.href.split("#")[0]
                    ? "font-semibold text-ink"
                    : "text-ink/70"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-nav-line" />

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-2 py-2.5 text-base ${
                  isActive(pathname, link.href)
                    ? "font-semibold text-ink"
                    : "text-ink/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-4 py-2.5 text-center text-base font-medium text-bg"
            >
              Contact
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
