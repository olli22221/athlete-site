import Link from "next/link";
import { Smartphone } from "lucide-react";

// The store badge pair, in the shape every visitor already knows: a dark
// rounded rectangle, a glyph on the left, a small line over a big line.
//
// Both link to /app until the app is live — there is no store page yet, and a
// badge that opens an empty store listing is worse than one that explains.
// The official Apple and Google badge artwork is trademarked and licensed only
// for apps that are actually listed, so these are drawn in the site's own
// system. When the app ships: download the official SVGs from Apple's and
// Google's marketing pages, drop them in public/media/, and replace the two
// <Badge> bodies below with <img> tags pointing at the real store URLs.
export default function AppBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex ${compact ? "flex-col gap-2" : "gap-2"}`}>
      <Badge small="Download on the" big="App Store" />
      <Badge small="Get it on" big="Google Play" />
    </div>
  );
}

function Badge({ small, big }: { small: string; big: string }) {
  return (
    <Link
      href="/app"
      aria-label={`${small} ${big} — coming soon`}
      className="flex items-center gap-2 rounded-md border border-ink/30 bg-ink px-3 py-1.5 text-ground transition-opacity hover:opacity-85"
    >
      <Smartphone size={18} strokeWidth={1.75} />
      <span className="flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-wide opacity-80">{small}</span>
        <span className="text-[15px] font-semibold tracking-tight">{big}</span>
      </span>
    </Link>
  );
}
