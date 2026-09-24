"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";
import { NavBackdrop } from "./NavBackdrop";
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
  { href: "/projects#research-workstreams", label: "Others" },
];

const links = [
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
 * Active state for a link inside a dropdown group.
 *
 * A link to an anchor within a page ("Others" -> /projects#research-workstreams)
 * never counts as active. It used to be matched on its path alone, which meant
 * it lit up on every visit to /projects and stayed lit even when the reader had
 * arrived via "Projects" — pointing at a section they weren't in.
 *
 * Matching the hash instead wouldn't be reliable: `usePathname()` excludes it,
 * and `useHashLinkClick` scrolls without changing the URL when you're already
 * on the page, so `location.hash` would be set on some routes into the section
 * and empty on others. The page-level link ("Projects") carries the highlight
 * for the whole page, which is what the desktop dropdown does too.
 */
const isSubLinkActive = (pathname: string, href: string) =>
  !href.includes("#") && pathname === href;

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

/**
 * A collapsible group in the *mobile* menu — the small-screen counterpart to
 * NavDropdown.
 *
 * The group header is two separate targets, not one: the label is a plain link
 * straight to the section's own page (/vision, /projects), and the chevron
 * beside it is a button that only expands the group. Merging them would mean
 * either losing the link to the overview page or making every expand a
 * navigation.
 *
 * Collapsed by default, including for the section you're currently in: the
 * point of the menu at this width is to fit every destination on one screen
 * without scrolling.
 */
function MobileNavGroup({
  label,
  href,
  items,
  active,
  className = "",
  onNavigate,
  onItemClick,
  isItemActive,
}: {
  label: string;
  href: string;
  items: { href: string; label: string }[];
  active: boolean;
  className?: string;
  onNavigate: () => void;
  onItemClick?: (href: string) => (e: React.MouseEvent) => void;
  isItemActive: (href: string) => boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `mobile-nav-${label.toLowerCase()}`;

  return (
    /*
      The group owns the hairline that closes it, and owns it in exactly one
      place at a time: collapsed, the header's own `border-b` is the closing
      line; expanded, the header keeps that line (now separating header from
      sublinks) and the container adds a second one below the last sublink.
      The menu therefore has no standalone divider before Partners — one there
      sat only ~8px under a collapsed Projects header and read as a doubled
      line.
    */
    <div
      className={`${expanded ? "border-b border-nav-line pb-2" : ""} ${className}`}
    >
      <div className="flex items-center border-b border-nav-line">
        <Link
          href={href}
          onClick={onNavigate}
          className={`flex-1 px-2 pb-2 pt-2 text-xs font-medium uppercase tracking-widest ${
            active ? "text-ink" : "text-ink-muted"
          }`}
        >
          {label}
        </Link>
        {/*
          `-mr-2` pulls the button's padding back over the container's own
          gutter so the chevron sits on the same right edge as the text above
          it, while the tap target itself stays a full 40px square.
        */}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${label} links`}
          onClick={() => setExpanded((v) => !v)}
          className="-mr-2 flex h-10 w-10 items-center justify-center text-ink-muted transition-colors hover:text-ink"
        >
          {/*
            `transition-[rotate]`, not `transition-transform`: in Tailwind v4
            `rotate-180` sets the standalone `rotate` property rather than
            writing a `transform`, so a transform transition never sees it and
            the chevron snaps. (The desktop NavDropdown above still has that
            snap for the same reason.)
          */}
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className={`h-2.5 w-2.5 fill-current transition-[rotate] duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <path d="M6 8 0 0h12z" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div id={panelId} className="flex flex-col gap-1 pt-1">
          {items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onItemClick ? onItemClick(link.href) : onNavigate}
              className={`rounded-md py-2.5 pl-5 pr-2 text-base ${
                isItemActive(link.href)
                  ? "font-semibold text-ink"
                  : "text-ink/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
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
    // No border, shadow or blur. At the top of the page the bar is part of
    // the first section; it turns solid blue before that section's edge can
    // cut through it (see NavBackdrop). `bg-nav` is the no-JS fallback.
    <header className="sticky top-0 z-50 bg-nav">
      <NavBackdrop pathname={pathname} />
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

      {/*
        Always mounted and toggled via `data-open`, like the desktop panels,
        so it can animate out as well as in (`.mobile-panel` in globals.css).
        It overlays the page from under the bar rather than sitting in flow,
        so opening it no longer shoves the page down. Being positioned also
        keeps it painting above NavBackdrop.
      */}
      <nav
        className="mobile-panel absolute inset-x-0 top-full border-t border-nav-line bg-nav shadow-[0_16px_32px_-16px_rgba(22,23,26,0.18)] md:hidden"
        data-open={open}
        inert={!open}
      >
        <Container className="flex flex-col gap-1 py-4">
          <MobileNavGroup
            label="Vision"
            href="/vision"
            items={visionLinks}
            active={visionActive}
            onNavigate={closeMobile}
            isItemActive={(href) => pathname === href}
          />

          <MobileNavGroup
            label="Projects"
            href="/projects"
            items={projectsLinks}
            active={projectsActive}
            className="mt-1"
            onNavigate={closeMobile}
            onItemClick={handleMobileHashClick}
            isItemActive={(href) => isSubLinkActive(pathname, href)}
          />

          {/*
            No divider here — the Projects group above already closes itself
            with a hairline in both states (see MobileNavGroup). `mt-1` just
            keeps Partners off that line.
          */}
          <div className="mt-1" />

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
    </header>
  );
}
