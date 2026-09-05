import type { Metadata } from "next";
import { faq, faqGroups, type FaqEntry } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Straight answers about HYROX qualification, race times, the roxzone, training and working together.",
};

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };

  const groups = Object.keys(faqGroups) as FaqEntry["group"][];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-12">
          <p className="label">Questions</p>
          <h1 className="board mt-3 text-[clamp(2.5rem,7vw,5rem)]">FAQ</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Short, complete answers — the kind you can quote without needing the
            rest of the page. Where a number appears, it comes from races on
            this site.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 py-12">
        {groups.map((group) => {
          const entries = faq.filter((entry) => entry.group === group);
          if (entries.length === 0) return null;

          return (
            <section key={group} className="mb-14">
              <h2 className="board border-b border-line pb-3 text-2xl">
                {faqGroups[group]}
              </h2>
              <dl className="mt-6 grid gap-x-12 gap-y-8 lg:grid-cols-2">
                {entries.map((entry) => (
                  <div key={entry.question}>
                    <dt className="board-sm text-base text-signal">{entry.question}</dt>
                    <dd className="mt-2 max-w-prose leading-relaxed text-ink-soft">
                      {entry.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>
    </>
  );
}
