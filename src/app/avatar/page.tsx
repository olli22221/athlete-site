import type { Metadata } from "next";
import AvatarStudio from "@/components/AvatarStudio";
import { AVATAR_SESSION, formatEuro } from "@/lib/avatar-tiers";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Video avatar",
  description: `Seven minutes with a conversational video version of me, for ${formatEuro(AVATAR_SESSION.amountCents)}. Ask about training, pacing and racing.`,
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
          <p className="label">Ask me anything · {formatEuro(AVATAR_SESSION.amountCents)}</p>
          <h1 className="board mt-3 text-[clamp(2.25rem,5vw,4.25rem)]">Video avatar</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            A conversational video version of me, trained on how I actually
            train and race. Drop the price in the tin and you get seven minutes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 py-12">
        <AvatarStudio purchase={purchase} />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-16">
        <p className="max-w-2xl text-xs text-muted">
          Buying a session is a purchase, not a donation — you get something for
          it, so the usual consumer rules apply and the price above is the full
          price. Sessions are not recorded. Conversations are processed by Tavus
          as the technical provider; see the privacy policy for what that means.
          It is a conversation, not a training prescription or medical advice.
          Questions: {siteConfig.contactEmail}.
        </p>
      </div>
    </>
  );
}
