"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/schedule", label: "Timetable" },
  { href: "/membership", label: "Membership" },
  { href: "/coaches", label: "Coaches" },
  { href: "/shop", label: "Shop" },
  { href: "/coach-ai", label: "AI Coach" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "bg-background/90 backdrop-blur-md border-b border-line"
          : "bg-gradient-to-b from-black/60 to-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.2em] text-foreground"
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-accent px-5 py-2 text-xs uppercase tracking-[0.18em] text-black transition-transform hover:-translate-y-0.5 lg:inline-block"
        >
          Free Class
        </Link>

        <button
          aria-label="Toggle menu"
          className="text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-background/95 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg uppercase tracking-wide text-foreground/90 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent px-6 py-3 text-center text-sm uppercase tracking-[0.15em] text-black"
              >
                Claim your free class
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
