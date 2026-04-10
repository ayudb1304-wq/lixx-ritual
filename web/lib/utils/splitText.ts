/**
 * Pure DOM word splitter. Wraps each word of the element's text in a
 * <span class="split-word">, groups them inside a <span class="split-line">
 * with overflow:hidden so GSAP can translate yPercent from 110 → 0 to
 * produce the classic editorial word-mask reveal.
 *
 * No paid GSAP plugins required.
 *
 * Contract:
 * - Idempotent: if the element already contains .split-word spans,
 *   returns the existing ones without re-splitting.
 * - Preserves whitespace between words (as text nodes).
 * - Only splits direct text; nested elements are left untouched.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (!el) return [];

  // Idempotency guard — avoids re-splitting on hot reload or re-renders.
  const existing = el.querySelectorAll<HTMLElement>(".split-word");
  if (existing.length > 0) return Array.from(existing);

  const text = el.textContent ?? "";
  if (!text.trim()) return [];

  const line = document.createElement("span");
  line.className = "split-line";

  // Split on whitespace runs, keeping the whitespace tokens.
  const tokens = text.split(/(\s+)/);
  for (const token of tokens) {
    if (token === "") continue;
    if (/^\s+$/.test(token)) {
      line.appendChild(document.createTextNode(token));
    } else {
      const span = document.createElement("span");
      span.className = "split-word";
      span.textContent = token;
      line.appendChild(span);
    }
  }

  el.textContent = "";
  el.appendChild(line);

  return Array.from(el.querySelectorAll<HTMLElement>(".split-word"));
}
