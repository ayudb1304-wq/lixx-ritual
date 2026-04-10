/**
 * Phase 1 placeholder for beats 04–09. Keeps the scroll length
 * representative and lets us validate Lenis + ScrollTrigger against a
 * realistic document height while future phases drop real beats into
 * these slots.
 */
type PlaceholderBeatProps = {
  id: string;
  title: string;
  hint?: string;
};

export function PlaceholderBeat({ id, title, hint }: PlaceholderBeatProps) {
  return (
    <section
      id={`beat-${id}`}
      aria-label={`Beat ${id} — ${title}`}
      className="flex min-h-[100svh] items-center justify-center border-t border-char bg-ink px-md"
    >
      <div className="max-w-3xl text-center">
        <p className="font-mono text-[0.72rem] uppercase tracking-eyebrow text-mute">
          BEAT {id}
        </p>
        <h2 className="mt-sm font-display text-h3 tracking-tightest text-bone">
          {title}
        </h2>
        {hint ? (
          <p className="mt-sm font-mono text-[0.8rem] text-mute">{hint}</p>
        ) : null}
      </div>
    </section>
  );
}
