# Community Library Hub (MD-2026-0143)

Accessible prototype of an Adaptive Learning & Resource Portal for the Local Public Library. Built with React 18 and Vite.

**Run:** `npm install`, then `npm run dev`. **Test:** `npm test`. **Deploy:** `vercel.json` (static build to `dist`).
**Planning:** see `/wireframes` for the persona, 3 semantic HTML/CSS pages and the WCAG matrix.

## 1. Accessibility trade-offs

**Native controls over custom widgets.** The filter accordion is a real `<button aria-expanded>` and the category chips are `<button aria-pressed>`. A custom listbox or menu would look more distinctive, but native buttons give Enter and Space, focus and role semantics for free, and avoid the arrow-key and typeahead behaviour a custom widget would need to get right.

**No modal, so no focus trap.** Booking is a separate view rather than a dialog. A modal needs a trap and focus return, and every extra rule is a chance for a keyboard trap (WCAG 2.1.2). A view switch with focus moved to the new `<h1>` keeps the Tab order linear and still tells screen reader users that the context changed.

**Live region verbosity.** The result count is polite and updates as the user types, so it never interrupts speech. Form validation uses `role="alert"` (assertive) but only announces the single field that just failed on blur, or a one-line summary ("3 errors found. Full name: ...") on submit. Announcing every error at once would flood the user, so the full detail stays in the inline error text linked by `aria-describedby`.

## 2. Assistive technology state architecture

All accessibility attributes are derived from React state, so the accessibility tree cannot drift from the UI.

- `open` (boolean) drives both `aria-expanded` on the accordion button and `hidden` on the panel it controls via `aria-controls`.
- `active` (array of categories) drives `aria-pressed` on each chip and the filtered list. The result count is computed from the same list, so the polite live region is always correct.
- `errs` (object) drives `aria-invalid`, the `id` appended to `aria-describedby`, and the visible error paragraph, all from one source.
- `msg` (string) feeds the assertive live region. Live regions are rendered from first load, because regions inserted later are often not announced.
- Focus is imperative, so it uses `useRef` and `.focus()` in effects and handlers: the heading ref on view change, the first invalid input on failed submit, and the confirmation heading after success. Headings use `tabIndex={-1}` so they can take programmatic focus without joining the Tab order.

## 3. Verification and testing audit

**Automated:** `npm test` runs 6 Vitest and Testing Library tests, including a jest-axe check for zero violations and assertions on `aria-expanded`, `aria-pressed`, `aria-invalid` and focus.

| Tool | Result |
|---|---|
| jest-axe (unit) | _paste result_ |
| Lighthouse Accessibility | _paste score and date_ |
| axe DevTools (browser) | _paste result_ |

**Manual keyboard log** (Tab / Shift+Tab / Enter / Space, no mouse)

| Check | Pass? | Notes |
|---|---|---|
| Skip link is first stop and works | | |
| Tab order matches visual order | | |
| Filter accordion and chips work with Space/Enter | | |
| Form errors reachable, focus lands on first error | | |
| No keyboard traps | | |

**Screen reader log**

| Reader / browser | Task | Observed announcement | Issues |
|---|---|---|---|
| NVDA + Firefox | Search and filter | | |
| NVDA + Firefox | Submit invalid form | | |
| VoiceOver + Safari | Book a room | | |
