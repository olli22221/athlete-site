import type { Metadata } from "next";
import BrandIcon from "@/components/BrandIcon";
import { siteConfig } from "@/lib/site-config";
import { upcomingRaces, formatDate } from "@/lib/races";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Sponsorship, press and collaboration enquiries — and what to put in the first email so it gets a useful answer.",
};

export default function ContactPage() {
  const upcoming = upcomingRaces().slice(0, 4);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-12">
          <p className="label">Sponsorship · press · collaboration</p>
          <h1 className="board mt-3 text-[clamp(2.5rem,7vw,5rem)]">Contact</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            One address, read by me. The fastest way to a useful answer is to
            name a specific race and what you would want from it.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 lg:grid-cols-[1fr_1fr]">
        <section>
          <h2 className="board text-2xl">What to include</h2>
          <ol className="mt-5 flex flex-col gap-px bg-line">
            <Step n="01" title="Which race">
              Naming one from the calendar tells me you have looked, and it
              makes the whole thing concrete instead of hypothetical.
            </Step>
            <Step n="02" title="What you want from it">
              Race-day content, a product in the film, a discount code, an
              appearance. Anything specific beats &quot;a partnership&quot;.
            </Step>
            <Step n="03" title="What the exchange is">
              Product, fee, revenue share. Saying it up front saves us both
              three emails.
            </Step>
          </ol>

          <p className="mt-8 label">Media kit</p>
          <p className="mt-2 max-w-md text-sm text-ink-soft">
            Reach per platform, audience demographics, past results and formats
            with prices — sent on request, usually the same day.
          </p>

          <a
            href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
              "Sponsorship enquiry"
            )}`}
            className="board-sm mt-6 inline-block bg-signal px-5 py-3 text-sm text-signal-ink"
          >
            {siteConfig.contactEmail}
          </a>
        </section>

        <aside className="flex flex-col gap-8">
          <div>
            <p className="label">Racing next</p>
            <ul className="mt-3 flex flex-col gap-px bg-line">
              {upcoming.map((race) => (
                <li
                  key={race.slug}
                  className="flex items-baseline justify-between gap-4 bg-panel px-4 py-3"
                >
                  <span className="board-sm text-sm">{race.city}</span>
                  <span className="tnum text-xs text-muted">
                    {formatDate(race.date)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">Elsewhere</p>
            <ul className="mt-3 flex flex-col gap-px bg-line">
              {siteConfig.socials.map((social) => (
                <li key={social.name} className="bg-panel">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-ink-soft hover:text-signal"
                  >
                    <span className="flex items-center gap-2">
                      <BrandIcon name={social.icon} size={15} />
                      {social.name}
                    </span>
                    <span className="tnum text-xs text-muted">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="bg-panel px-5 py-4">
      <span className="tnum text-xs text-signal">{n}</span>
      <p className="board-sm mt-1 text-base">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{children}</p>
    </li>
  );
}
