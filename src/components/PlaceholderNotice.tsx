import { siteConfig } from "@/lib/site-config";

// While the config still holds example data, say so on every page. Example
// race times that look like real results are worse than no results at all —
// for the reader, and for anyone quoting the site.
export default function PlaceholderNotice() {
  if (!siteConfig.isPlaceholder) return null;

  return (
    <div className="border-b border-line bg-panel-2 px-4 py-2 text-center">
      <p className="label !text-ink-soft">
        Example data — names, times and races are placeholders. Edit{" "}
        <code className="text-signal">src/lib/site-config.ts</code> and{" "}
        <code className="text-signal">src/lib/races.ts</code>, then set{" "}
        <code className="text-signal">isPlaceholder: false</code>.
      </p>
    </div>
  );
}
