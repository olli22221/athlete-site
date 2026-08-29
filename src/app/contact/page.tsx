import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import BrandIcon from "@/components/BrandIcon";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.fullName}`,
  description:
    "Book your free class, ask about membership, or find the gym.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-background pb-28 pt-40">
      <CinematicBackdrop variant="section" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <Kicker>Get started</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
            Book your free class.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-lg text-muted">
            Tell us a little about where you&apos;re at and we&apos;ll get you
            into a session that suits. We reply within one working day.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal delay={0.25}>
            <form
              action={`mailto:${siteConfig.social.email}`}
              method="POST"
              encType="text/plain"
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">
                    What are you after?
                  </label>
                  <select
                    name="interest"
                    className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
                  >
                    <option>Free trial class</option>
                    <option>On-Ramp for beginners</option>
                    <option>CrossFit membership</option>
                    <option>Hyrox race team</option>
                    <option>Drop-in while visiting</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted">
                    Your experience
                  </label>
                  <select
                    name="experience"
                    className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
                  >
                    <option>Complete beginner</option>
                    <option>Some gym experience</option>
                    <option>CrossFit experience</option>
                    <option>Competing / race-focused</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">
                  Anything we should know?
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
                  placeholder="Injuries, goals, which days suit you…"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
              >
                Book my free class
              </button>
              <p className="text-xs text-muted">
                Opens your email client — swap this for a form provider (e.g.
                Formspree, Resend) or your gym CRM when you&apos;re ready to
                collect bookings properly.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-line bg-surface p-8">
              <h3 className="font-display text-2xl">Find the gym</h3>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                  <a
                    href={siteConfig.address.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-accent" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="hover:text-accent"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-accent" />
                  <a
                    href={`mailto:${siteConfig.social.email}`}
                    className="hover:text-accent"
                  >
                    {siteConfig.social.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <BrandIcon
                    name="instagram"
                    size={18}
                    className="shrink-0 text-accent"
                  />
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    Instagram
                  </a>
                </li>
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-sm text-muted">
                  Got a question first? Ask our{" "}
                  <a
                    href="/coach-ai"
                    className="text-accent underline underline-offset-4"
                  >
                    AI coach
                  </a>{" "}
                  — it&apos;ll tell you what a class actually involves.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
