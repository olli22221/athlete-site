import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-panel">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="board text-3xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm text-muted">{siteConfig.intro}</p>
          <ul className="mt-5 flex gap-3">
            {siteConfig.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center border border-line text-ink-soft hover:border-signal hover:text-signal"
                >
                  <BrandIcon name={social.icon} size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Pages</p>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-soft hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/impressum" className="text-ink-soft hover:text-signal">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="text-ink-soft hover:text-signal">
                Datenschutz
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-ink-soft hover:text-signal"
              >
                {siteConfig.contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft px-4 py-5">
        <p className="mx-auto max-w-[1400px] text-xs text-muted">
          HYROX is a registered trademark of its owner. This is an independent
          athlete site and is not affiliated with, endorsed by, or a partner of
          the event organiser.
        </p>
      </div>
    </footer>
  );
}
