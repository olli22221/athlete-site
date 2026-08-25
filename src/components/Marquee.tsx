export default function Marquee({ text }: { text: string }) {
  const items: string[] = new Array(2).fill(text);

  return (
    <div className="relative overflow-hidden border-y border-line bg-surface py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-10 text-2xl tracking-widest text-foreground/80 sm:text-3xl"
          >
            {item.split("·").map((part, idx) => (
              <span key={idx} className="flex items-center gap-10">
                {idx > 0 && <span className="text-accent">·</span>}
                {part.trim()}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
