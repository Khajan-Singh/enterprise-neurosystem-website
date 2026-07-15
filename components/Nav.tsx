"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import { AmbientShadow } from "./AmbientShadow";

const aboutLinks = [
  { href: "/mission", label: "Mission" },
  { href: "/charter", label: "Charter" },
  { href: "/board", label: "Board" },
];

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/workstreams", label: "Workstreams" },
  { href: "/press", label: "Press" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutPinned, setAboutPinned] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const closeAbout = () => {
    setAboutOpen(false);
    setAboutPinned(false);
  };

  const aboutActive = aboutLinks.some((link) => link.href === pathname);

  useEffect(() => {
    if (!aboutOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        closeAbout();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAbout();
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [aboutOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-nav-line/60 bg-nav/70 shadow-[0_8px_30px_-12px_rgba(22,23,26,0.1)] backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AmbientShadow opacity={0.1} />
      </div>
      <Container className="relative flex h-24 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-icon.png"
            alt="Enterprise Neurosystem"
            width={200}
            height={164}
            className="h-12 w-auto rounded-md"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Enterprise Neurosystem
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => {
              if (!aboutPinned) setAboutOpen(false);
            }}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={aboutOpen}
              onClick={() =>
                setAboutPinned((pinned) => {
                  const next = !pinned;
                  setAboutOpen(next);
                  return next;
                })
              }
              className={`flex items-center gap-1 text-base transition-colors ${
                aboutActive ? "font-semibold text-ink" : "text-ink/70 hover:text-ink"
              }`}
            >
              About
              <svg
                aria-hidden="true"
                viewBox="0 0 12 8"
                className={`h-2.5 w-2.5 fill-current transition-transform ${
                  aboutOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M6 8 0 0h12z" />
              </svg>
            </button>

            {aboutOpen && (
              <div className="absolute left-1/2 top-full z-10 w-48 -translate-x-1/2 pt-3">
                <div className="rounded-xl border border-line bg-bg py-2 shadow-[0_20px_36px_-16px_rgba(22,23,26,0.22)]">
                  {aboutLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeAbout}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          active
                            ? "font-semibold text-ink"
                            : "text-ink-muted hover:text-ink"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {links.map((link) => {
            const active = pathname === link.href;
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
            <p className="px-2 pb-1 pt-2 text-xs font-medium uppercase tracking-widest text-ink-muted">
              About
            </p>
            {aboutLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-2 py-2.5 text-base ${
                  pathname === link.href
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
                  pathname === link.href
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
