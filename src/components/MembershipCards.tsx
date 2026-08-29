import Link from "next/link";
import { Check } from "lucide-react";
import { plans } from "@/lib/memberships";
import Reveal from "@/components/Reveal";

export default function MembershipCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {plans.map((plan, i) => (
        <Reveal key={plan.id} delay={i * 0.07}>
          <div
            className={`flex h-full flex-col rounded-2xl border p-7 transition-colors ${
              plan.featured
                ? "border-accent bg-surface-2"
                : "border-line bg-surface hover:border-accent/40"
            }`}
          >
            {plan.featured && (
              <span className="mb-4 self-start rounded-full bg-accent px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-black">
                Most popular
              </span>
            )}

            <h3 className="font-display text-2xl tracking-wide">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted">{plan.tagline}</p>

            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-5xl text-accent">
                £{plan.price}
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-muted">
                {plan.unit}
              </span>
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`mt-8 rounded-full px-6 py-3 text-center text-xs font-medium uppercase tracking-[0.15em] transition-transform hover:-translate-y-0.5 ${
                plan.featured
                  ? "bg-accent text-black"
                  : "border border-foreground/25 text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
