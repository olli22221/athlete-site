export default function CinematicBackdrop({
  variant = "hero",
}: {
  variant?: "hero" | "section";
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* animated glow blobs */}
      <div
        className="animate-drift absolute -left-1/4 top-[-10%] h-[60%] w-[60%] rounded-full bg-accent/20 blur-[120px]"
        style={{ opacity: variant === "hero" ? 0.5 : 0.25 }}
      />
      <div
        className="animate-drift-slow absolute right-[-15%] bottom-[-15%] h-[55%] w-[55%] rounded-full bg-accent-dim/25 blur-[130px]"
        style={{ opacity: variant === "hero" ? 0.4 : 0.2 }}
      />

      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(8,9,10,0.9) 100%)",
        }}
      />
    </div>
  );
}
