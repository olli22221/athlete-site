import type { Metadata } from "next";
import AvatarStudio from "@/components/AvatarStudio";
import { AVATAR_TIERS } from "@/lib/avatar-tiers";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Video avatar",
  description:
    "Talk to a conversational video version of me about training, pacing and racing. One minute free, five minutes for an email, longer sessions on credit.",
};

export default async function AvatarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const purchase = typeof params.purchase === "string" ? params.purchase : undefined;

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-12">
          <p className="label">Ask me anything</p>
          <h1 className="board mt-3 text-[clamp(2.5rem,7vw,5rem)]">Video avatar</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            A conversational video version of me, trained on how I actually
            train and race. Ask about pacing, the roxzone, a station you keep
            losing time on, or a race you are about to run.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Why it is not simply free: every minute of conversation is billed to
            me by the minute. The taster and the five-minute session are on me —
            beyond that, a credit covers the cost.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 py-12">
        <AvatarStudio purchase={purchase} />

        <section className="mt-16 max-w-2xl">
          <h2 className="board text-2xl">The rules, plainly</h2>
          <dl className="mt-5 flex flex-col gap-px bg-line">
            <Rule term={`${AVATAR_TIERS.teaser.seconds} seconds, free`}>
              No sign-up, no email. Enough to see whether this is useful to you.
            </Rule>
            <Rule term={`${AVATAR_TIERS.lead.seconds / 60} minutes for an email`}>
              Once per device. Your address is used to send you what you asked
              for — the newsletter only if you tick the box and confirm it.
            </Rule>
            <Rule term={`${AVATAR_TIERS.paid.seconds / 60} minutes per credit`}>
              A credit is spent when a session starts, not when it ends. Ending
              early stops the cost but does not return the credit.
            </Rule>
            <Rule term="No subscription">
              Credits are a one-off purchase, they do not expire, and there is
              nothing to cancel. They are stored against this browser.
            </Rule>
            <Rule term="Not medical or coaching advice">
              It is a conversation, not a training prescription. Anything it
              suggests is general information — check with a professional before
              acting on it.
            </Rule>
          </dl>
        </section>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-16">
        <p className="max-w-2xl text-xs text-muted">
          Sessions are not recorded. Conversations are processed by Tavus as the
          technical provider — see the privacy policy for what that means and
          where the data goes. Questions: {siteConfig.contactEmail}.
        </p>
      </div>
    </>
  );
}

function Rule({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-panel px-5 py-4">
      <dt className="board-sm text-sm text-signal">{term}</dt>
      <dd className="mt-1 text-sm text-ink-soft">{children}</dd>
    </div>
  );
}
