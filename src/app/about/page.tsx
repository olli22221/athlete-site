import type { Metadata } from "next";
import BrandIcon from "@/components/BrandIcon";
import { finishedRaces, formatClock, personalBest } from "@/lib/races";
import { siteConfig } from "@/lib/site-config";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.athlete.name} — ${siteConfig.athlete.role} from ${siteConfig.athlete.nationality}, racing the ${siteConfig.season} season.`,
};

export default function AboutPage() {
  const best = personalBest();
  const done = finishedRaces();
  const origin = siteUrl();

  // Person markup with sameAs is how an answer engine works out that the
  // handles, the results lists and this site are all the same athlete.
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.athlete.name,
    jobTitle: siteConfig.athlete.role,
    nationality: siteConfig.athlete.nationality,
    url: origin,
    knowsAbout: ["HYROX", "Hybrid racing", "Compromised running", "Endurance training"],
    sameAs: siteConfig.socials.map((social) => social.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-12">
          <p className="label">
            {siteConfig.athlete.role} · {siteConfig.athlete.based}
          </p>
          <h1 className="board mt-3 text-[clamp(2.5rem,7vw,5rem)]">
            {siteConfig.athlete.name}
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="max-w-2xl">
          {siteConfig.bio.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-lg leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="flex flex-col gap-px self-start border border-line bg-line">
          <Row label="Age group" value={siteConfig.athlete.ageGroup} />
          <Row label="Based" value={siteConfig.athlete.based} />
          <Row label="Season" value={siteConfig.season} />
          <Row label="Target" value={siteConfig.target.label} />
          <Row
            label="Personal best"
            value={best ? `${formatClock(best.result!.totalSeconds)} · ${best.city}` : "—"}
          />
          <Row label="Races this season" value={String(done.length)} />

          <div className="bg-panel p-5">
            <p className="label">Elsewhere</p>
            <ul className="mt-3 flex flex-col gap-2">
              {siteConfig.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-ink-soft hover:text-signal"
                  >
                    <BrandIcon name={social.icon} size={15} />
                    {social.handle}
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 bg-panel px-5 py-3">
      <span className="label">{label}</span>
      <span className="tnum text-sm">{value}</span>
    </div>
  );
}
