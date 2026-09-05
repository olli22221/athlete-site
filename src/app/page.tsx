import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import ScrollFeature from "@/components/ScrollFeature";
import { siteConfig } from "@/lib/site-config";

// The homepage is an opener, not a dashboard. The athlete, the footage, and
// the way to the next race and the avatar. Every number lives on /races.
export default function Home() {
  return (
    <>
      <Hero />
      <ScrollFeature />

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
