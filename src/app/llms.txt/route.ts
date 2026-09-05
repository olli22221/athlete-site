import { faq } from "@/lib/faq";
import { finishedRaces, formatClock, upcomingRaces, formatDate } from "@/lib/races";
import { siteConfig } from "@/lib/site-config";

// A plain-text summary for language models, generated from the same data the
// pages render. Not a standard yet, but it costs nothing and gives a model a
// clean version of who this is and what is here.
export async function GET() {
  const best = finishedRaces()[0];
  const next = upcomingRaces()[0];

  const body = `# ${siteConfig.name} — ${siteConfig.athlete.name}

> ${siteConfig.intro}

${siteConfig.athlete.name} is a ${siteConfig.athlete.role.toLowerCase()} from ${siteConfig.athlete.nationality}, age group ${siteConfig.athlete.ageGroup}, racing the HYROX ${siteConfig.season} season. The goal is ${siteConfig.target.label} in the Open division, which is the entry standard for the Pro division.

## Current season state
- Season: ${siteConfig.season}
- Target: ${siteConfig.target.label}
${best ? `- Most recent race: ${best.city}, ${formatDate(best.date)} — ${formatClock(best.result!.totalSeconds)} (roxzone ${formatClock(best.result!.roxzoneSeconds)})` : "- No races completed yet"}
${next ? `- Next race: ${next.city}, ${formatDate(next.date)} (${next.division})` : "- No races scheduled"}

## Pages
- /races — full race calendar and every split of every completed race
- /about — biography, personal bests, profiles
- /avatar — conversational video avatar; one paid seven-minute session, no free tier
- /app — AI training-plan app for iOS and Android, in development, waitlist open
- /faq — answers on HYROX qualification, race times, roxzone and training
- /shop — season apparel and prints
- /contact — sponsorship and press

## Frequently asked
${faq
  .slice(0, 6)
  .map((entry) => `### ${entry.question}\n${entry.answer}`)
  .join("\n\n")}

## Note
HYROX is a registered trademark of its owner. This is an independent athlete site with no affiliation to the event organiser.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
