import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import BrandIcon from "@/components/BrandIcon";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: "Get in touch about coaching, camps, or partnerships.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-background pb-28 pt-40">
      <CinematicBackdrop variant="section" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <Kicker>Get In Touch</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
            Let&apos;s talk training.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-lg text-muted">
            Coaching inquiries, camp questions, or partnership ideas — send
            a message and I&apos;ll get back to you within 48 hours.
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

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">
                  What are you interested in?
                </label>
                <select
                  name="interest"
                  className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
                >
                  <option>1:1 Coaching</option>
                  <option>Online Programming</option>
                  <option>Performance Camps</option>
                  <option>Partnership / Media</option>
                  <option>Something else</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
                  placeholder="Tell me about your goals…"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
              <p className="text-xs text-muted">
                Opens your email client — swap this for a form provider
                (e.g. Formspree, Resend) when you&apos;re ready to collect
                submissions server-side.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-line bg-surface p-8">
              <h3 className="font-display text-2xl">Direct Contact</h3>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-accent" />
                  {siteConfig.location}
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-accent" />
                  <a
                    href={`mailto:${siteConfig.social.email}`}
                    className="hover:text-accent"
                  >
                    {siteConfig.social.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <BrandIcon name="instagram" size={18} className="text-accent" />
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    Instagram
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <BrandIcon name="youtube" size={18} className="text-accent" />
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    YouTube
                  </a>
                </li>
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-sm text-muted">
                  Prefer to skip the form? Talk it through with my{" "}
                  <a href="/clone" className="text-accent underline underline-offset-4">
                    AI clone
                  </a>{" "}
                  right now.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
