import Link from "next/link";
import {
  ArrowRight,
  Flame,
  LineChart,
  Salad,
  Sparkles,
  Target,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import ProductCard from "@/components/ProductCard";
import { siteConfig } from "@/lib/site-config";
import { getFeaturedProducts } from "@/lib/products";

const icons = { Target, LineChart, Flame, Salad };

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-background">
        <CinematicBackdrop variant="hero" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-10">
          <Reveal>
            <Kicker>{siteConfig.role}</Kicker>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display mt-6 text-balance text-[15vw] leading-[0.9] tracking-wide text-foreground sm:text-[10vw] lg:text-[7.5rem]">
              {siteConfig.name.split(" ")[0]}
              <br />
              <span className="text-accent">
                {siteConfig.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {siteConfig.heroSubtitle}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#training"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
              >
                Explore Training
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/clone"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Sparkles size={16} />
                Meet My AI Clone
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      <Marquee text="STRENGTH · DISCIPLINE · PERFORMANCE · RECOVERY · CONSISTENCY · " />

      {/* ---------------------------------------------------------------- */}
      {/* ABOUT                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section id="about" className="relative bg-background py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
          <Reveal>
            <div
              className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-line"
              style={{
                background:
                  "linear-gradient(155deg, #17181b 0%, #0d0e0f 60%, #1c2013 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_70%_20%,rgba(205,255,77,0.18),transparent_55%)]" />
              <span className="font-display relative text-[9rem] leading-none text-white/10">
                {siteConfig.shortName}
              </span>
              <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.25em] text-muted">
                Photo placeholder — drop /public/images/about.jpg
              </span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Kicker>About</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-5 text-balance text-4xl leading-tight sm:text-5xl">
                {siteConfig.bio.heading}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {siteConfig.bio.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.05}>
                  <p className="leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-8 border-t border-line pt-14 sm:grid-cols-4">
            {siteConfig.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <p className="font-display text-5xl text-accent sm:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TRAINING / SERVICES                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="training" className="relative overflow-hidden bg-surface py-28">
        <CinematicBackdrop variant="section" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Kicker>Coaching</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
              Programs built the way I train myself.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.services.map((service, i) => {
              const Icon = icons[service.icon as keyof typeof icons];
              return (
                <Reveal key={service.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-line bg-background p-7 transition-colors hover:border-accent/50">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-accent"
                    />
                    <h3 className="font-display mt-6 text-xl tracking-wide">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-14">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Start Coaching Inquiry
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FEATURED GEAR                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-background py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <Kicker>The Gear</Kicker>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-5 text-balance text-4xl leading-tight sm:text-5xl">
                  Train in what I train in.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-accent"
              >
                Shop the collection
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* AI CLONE TEASER                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="grain relative overflow-hidden bg-surface py-28">
        <CinematicBackdrop variant="section" />
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
          <Reveal>
            <Kicker>
              <span className="mx-auto flex items-center gap-2">
                <Sparkles size={14} /> Powered by Tavus AI
              </span>
            </Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mx-auto mt-6 max-w-3xl text-balance text-4xl leading-tight sm:text-6xl">
              Can&apos;t book a session? Talk to my AI clone instead.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
              A real-time video conversation with an AI-powered version of
              me — trained on my coaching philosophy, available 24/7 to
              answer training questions on the spot.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href="/clone"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TESTIMONIALS                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-background py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Kicker>Results</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
              What it&apos;s like training with me.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {siteConfig.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-7">
                  <blockquote className="leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                    <span className="font-medium text-foreground">
                      {t.name}
                    </span>
                    <span className="block text-xs uppercase tracking-[0.15em] text-muted">
                      {t.role}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FINAL CTA                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-surface py-28">
        <CinematicBackdrop variant="section" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-balance text-4xl leading-tight sm:text-6xl">
              Ready to train like you compete?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-lg text-muted">
              Spots are limited each cycle. Tell me about your goals and
              I&apos;ll get back to you within 48 hours.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
