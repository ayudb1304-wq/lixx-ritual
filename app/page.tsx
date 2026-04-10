"use client";

import { useLenis } from "@/lib/hooks/useLenis";
import { Nav } from "@/components/Nav";
import { Beat01ColdOpen } from "@/components/beats/Beat01ColdOpen";
import { Beat02Diagnosis } from "@/components/beats/Beat02Diagnosis";
import { Beat03Reveal } from "@/components/beats/Beat03Reveal";
import { Beat04ThirdWave } from "@/components/beats/Beat04ThirdWave";
import { Beat05DayArc } from "@/components/beats/Beat05DayArc";
import { Beat06Science } from "@/components/beats/Beat06Science";
import { Beat07TenMinutes } from "@/components/beats/Beat07TenMinutes";
import { Beat08TheBox } from "@/components/beats/Beat08TheBox";
import { Beat09SignOff } from "@/components/beats/Beat09SignOff";

export default function Page() {
  const lenisRef = useLenis();

  return (
    <>
      {/* Skip-to-content link — visible only when focused */}
      <a
        href="#main-content"
        className="sr-only z-50 rounded-full bg-bone px-4 py-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Beat01ColdOpen />
        <Beat02Diagnosis />
        <Beat03Reveal lenisRef={lenisRef} />
        <Beat04ThirdWave />
        <Beat05DayArc />
        <Beat06Science />
        <Beat07TenMinutes />
        <Beat08TheBox />
        <Beat09SignOff />
      </main>
    </>
  );
}
