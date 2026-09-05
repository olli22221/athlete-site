"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

// Over the homepage hero the bar floats transparent on top of the footage;
// everywhere else it is a solid sticky strip. Same links, same order, so the
// eye finds them in the same place on every page.
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/";

  return (
    <header
      className={
        overHero
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-line bg-ground/92 backdrop-blur"
      }
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-3">
        <Link
          href="/"
          className="board text-xl leading-none sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </Link>

        <div className="hidden items-center md:flex">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`board-sm px-3 py-2 text-xs ${
                      active ? "text-signal" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ground md:hidden">
          <ul>
            {siteConfig.nav.map((item) => (
              <li key={item.href} className="border-b border-line-soft">
                <Link
                  href={item.href}
                  className="board-sm block px-4 py-3 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
