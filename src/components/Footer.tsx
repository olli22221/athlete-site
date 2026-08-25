import Link from "next/link";
import { Mail } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl tracking-widest">
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
              Explore
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#training" className="hover:text-accent">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-accent">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/clone" className="hover:text-accent">
                  AI Clone
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="text-muted">{siteConfig.location}</li>
              <li>
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="hover:text-accent"
                >
                  {siteConfig.social.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact form →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Built for performance. Trained under pressure.</p>
        </div>
      </div>
    </footer>
  );
}
