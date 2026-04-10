"use client";

import { useLenis } from "@/lib/hooks/useLenis";
import { Nav } from "@/components/Nav";
import { Beat01ColdOpen } from "@/components/beats/Beat01ColdOpen";
import { Beat02Diagnosis } from "@/components/beats/Beat02Diagnosis";
import { Beat03Reveal } from "@/components/beats/Beat03Reveal";
import { Beat04ThirdWave } from "@/components/beats/Beat04ThirdWave";
import { Beat06Science } from "@/components/beats/Beat06Science";
import { PlaceholderBeat } from "@/components/PlaceholderBeat";

export default function Page() {
  const lenisRef = useLenis();

  return (
    <main>
      <Nav />
      <Beat01ColdOpen />
      <Beat02Diagnosis />
      <Beat03Reveal lenisRef={lenisRef} />

      <Beat04ThirdWave />
      <PlaceholderBeat
        id="05"
        title="The Day Arc"
        hint="15:00 → 19:00 → 23:00. Pinned spine, the most complex beat. Phase 3."
      />
      <Beat06Science />
      <PlaceholderBeat
        id="07"
        title="Ten Minutes"
        hint="From craving to mouth in ten minutes. Magnetic CTAs. Phase 3."
      />
      <PlaceholderBeat
        id="08"
        title="The Box"
        hint="15 days. Three states. One box. ₹499. Phase 4."
      />
      <PlaceholderBeat
        id="09"
        title="Sign-Off"
        hint="Sleep is a feature. Not a luxury. Phase 4."
      />

      <footer className="border-t border-char bg-ink px-md py-lg">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-sm font-mono text-[0.7rem] uppercase tracking-eyebrow text-mute md:flex-row">
          <span>lixx · made in bangalore</span>
          <span>FSSAI Lic. No. [pending] · Nutraceutical</span>
        </div>
      </footer>
    </main>
  );
}
