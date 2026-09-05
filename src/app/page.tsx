import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HomeScroll from "@/components/HomeScroll";
import { siteConfig } from "@/lib/site-config";

// The homepage is an opener, not a dashboard: one continuous scroll over the
// footage, then the way to everything else. Every number lives on /races.
export default function Home() {
  return (
    <>
      <HomeScroll />

      <section className="mx-auto max-w-[1400px] px-4 py-20">
        <p className="max-w-xl text-lg text-ink-soft">{siteConfig.intro}</p>
        <ul className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.nav.map((item) => (
            <li key={item.href} className="bg-panel">
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-4 px-5 py-5 hover:bg-panel-2"
              >
                <span className="board-sm text-base">{item.label}</span>
                <ArrowRight size={16} className="text-muted group-hover:text-signal" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
