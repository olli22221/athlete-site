import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl tracking-[0.2em]">
              {siteConfig.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.heroSubtitle}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <BrandIcon name="instagram" size={18} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="rounded-full border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <BrandIcon name="youtube" size={18} />
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="rounded-full border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <BrandIcon name="tiktok" size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.social.email}`}
                aria-label="Email"
                className="rounded-full border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              The Gym
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/schedule" className="hover:text-accent">
                  Timetable
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-accent">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="hover:text-accent">
                  Coaches
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-accent">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/coach-ai" className="hover:text-accent">
                  AI Coach
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Find us
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5 text-muted">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-accent" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-accent" />
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="hover:text-accent"
                >
                  {siteConfig.social.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights
            reserved.
          </p>
          <p>Coached classes, seven days a week.</p>
        </div>
      </div>
    </footer>
  );
}
