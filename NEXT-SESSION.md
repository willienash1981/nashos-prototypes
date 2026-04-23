# NashOS prototypes — next session handoff (Apr 23, 2026)

> **Purpose of this file.** Context from the 2026-04-23 design session has built up. This doc is a clean handoff so a fresh Claude Code session can execute Phase 2 (prototypes) without needing the full back-and-forth. Paste the block below into a new session on Forge.

---

## PASTE-ME PROMPT (block to copy into fresh session)

```
I'm picking up Phase 2 of the NashOS subcontractor-payment-approvals
work. Phase 1 (PRD architecture) was completed on Apr 23 — eight
coordinated PRD sections are committed and the prototypes are not yet
built.

Read ~/work/nashos-prototypes/NEXT-SESSION.md first. It has the full
handoff: which PRD sections apply, the build order, the scope of each
prototype, the shared action-component spec, and the design-system
rules.

Source of truth is the PRD at ~/work/nash-painting-prd/V2-ESTIMATE-ROCKET-REPLACEMENT.md.
The relevant sections (all added or updated Apr 23) are:
  §5.5   - Project definition (signed contract = Project)
  §3.11  - Change Orders (reductive + mixed line items)
  §15    - 50% progressive release
  §24.51 - Contract Baseline + Change-Log Architecture
  §24.52 - Subcontractor Payment Approvals (five-flag state model)
  §24.53 - Job Hub
  §24.54 - Declined Scope Pipeline
  §24.55 - Accounting Hub

Design system is Editorial Industrialism (see design.md in this repo
and §24.50 of the PRD). Build everything against styles/dashboard.css
ed-* primitives. Gold standard for EI is work-order-crew.html.

Phase 2 build order (4 prototypes):
  1. job-hub.html
  2. accounting-hub.html
  3. service-job.html
  4. Add Mark-Finished FAB to existing work-order-crew.html

Ask me which to start first before you begin, unless I've already named
one.
```

---

## Where everything lives

**PRD repo:** `~/work/nash-painting-prd/` — private, single file:
`V2-ESTIMATE-ROCKET-REPLACEMENT.md` (~26,500 lines as of Apr 23).

**Phase 1 commits:**
- `efef207` — Baseline architecture (§5.5 rewrite + §3.11 extension + §24.51 new + §15 update). 418 lines net.
- `40c7c71` — §24.52 + §24.53 + §24.54 + §24.55. 877 lines net.

**Prototypes repo:** `~/work/nashos-prototypes/` — public, GitHub Pages.
- Design system documented in `design.md` (root of repo).
- Shared EI stylesheet: `styles/dashboard.css` (contains `ed-*` primitives).
- Shim stylesheet: `styles/theme.css` (for older prototypes still on shim).
- Gold standard full-EI reference: `work-order-crew.html`.
- Related EI dashboards already built: `dashboard.html`, `executive-dashboard.html`, `cmo-dashboard.html`, `cfr-dashboard.html`, `reporting-hub.html`, `feedback-dashboard.html`, `sales-dashboard.html`, `admin-config.html`.

**Local preview:**
```
cd ~/work/nashos-prototypes && python3 -m http.server 8088
# open http://localhost:8088/job-hub.html etc.
```

**Visual verification:** `~/.claude/skills/gstack/browse/dist/browse` (headless screenshots at 430 × 900 for mobile, 1280 × 900 for desktop). This is how every EI rebuild this week was verified.

---

## Design system reminders (non-negotiable)

- Tennessee Orange `#FF8200` is the ONLY accent. Everything else is navy `#0B1F3A`, ink `#0E0E10`, white paper `#FFFFFF`, surface `#F5F6F8`, hairline `#E2E5EA`, meta text `#64748B`.
- Sora 700 for headlines and big numbers. Inter 400-700 for body and UI.
- 4px radii everywhere except status chips (pill 999px radius) and FAB (4px but with letterpress shadow `0 4px 0 rgba(11,31,58,0.2)`).
- **No bordered cards.** Sections are defined by hairline dividers and tonal shifts (paper → surface), not by outlined boxes.
- Editorial underline inputs — no outlined input boxes. 2px hairline bottom border; focus shifts to orange.
- 10.5px caps metadata labels with 0.12em tracking for the "caps signature" look.
- Orange left-accent bar (4px) for active list items, or orange bottom-underline (2px) for active tabs/nav. Never a focus ring on a button.
- Outline stroke icons (1.5-2px weight) in navy. No filled icons, no emoji as status indicators in new markup (existing emoji from pre-EI prototypes are OK for continuity only).

Source of truth: `design.md` in this repo and PRD §24.50.

---

## Phase 2 prototype specs

### Prototype 1 — `job-hub.html` (BUILD FIRST)

**Purpose:** Internal office homebase for one Project. See PRD §24.53 for the full spec.

**Layout (top to bottom):**

1. **EI topbar** (use `.ed-topbar` from dashboard.css). Brand: N logo + "NASH PAINTING". Nav: Ops / CEO / CMO / CFO / Reports / Feedback. No nav item is active — this is a deeper page.

2. **Subbar header** with Project identity:
   - Customer name + primary address (Sora 28px, letter-spacing -0.03em)
   - Meta line: "Project #P-2026-0142 · Signed Jan 2, 2026 · Status: IN_PROGRESS" (13px meta)
   - **Prominent running value** on the right: `$21,777.50` (Sora 44px, tabular-nums) with smaller "Baseline $20,900.00 + 2 approved COs" beneath in meta.

3. **Row 1 — Contract Math block.** Hairline-bordered section with:
   - "CONTRACT BASELINE" caps label, orange
   - Signed line: "Jan 2, 2026 · via portal signature · Sarah Johnson" — meta
   - Baseline breakdown: Subtotal / Promo (−5%) / Global adj (+0%) / Extra color / Signed Total
   - "APPROVED CHANGE ORDERS" caps label
   - Each CO as a two-line block: "CO-...-01 (Feb 15) — Remove exterior shutters — Approved by Sarah via text — −$522.50"
   - Running total: "CURRENT PROJECT VALUE $21,777.50" — Sora 32px with hairline above
   - "PENDING CHANGE ORDERS" if any, dimmer styling
   - All read-only. `[+ Create Change Order]` action only.

4. **Row 2 — Service Jobs.** Stack of Service Job blocks. Each block:
   - Service Job name (Sora 18px) + crew name + scheduled dates
   - Flags row — compact chips: `crew_finished ✓ Mar 29` `qc_confirmed ✓ Anthony/Phone/Mar 29 6:15pm` `partial_pay ✓ Barry` etc.
   - Payment status chip (pill, green if PAID_FULL, yellow if PAID_PARTIAL, navy if NOT_RELEASED)
   - Inline action buttons per current state — **use the Shared Action Component spec below**
   - `[View detail]` link navigates to `service-job.html`

5. **Row 3 — Line Item Assignment table.** Dense table showing every line across all Service Jobs.
   - Columns: Source (Baseline / CO-XX) · Description · Service Job · Crew · Price · Notes
   - Rows for removed lines are struck-through with a "REMOVED by CO-XX" note
   - Additive CO lines show `+$XX` in orange
   - Filter chip bar above: `[All] [Baseline] [Approved COs] [Unassigned]`

6. **Row 4 — Change Order Details.** Collapsible panels. Each CO shows its full line-item breakdown (reductive vs additive), approval record, and assignment routing.

7. **Row 5 — Declined Scope.** Dimmed panel. Items from original proposal customer didn't accept. Per item: description, original price, reason chip, next check-in date, actions `[Ping]` `[Push +3mo]` `[Archive]` (or `[Revive]` for archived items).

8. **Row 6 — Invoice Summary.** Each invoice as a row: number · sent date · amount · status · `[View]` link. At bottom: "Remaining to invoice: $X" with `[Compose next invoice]` primary action.

9. **Row 7 — Activity / Audit Log.** Chronological feed: flag changes, CO submissions, payment runs, force-releases, schedule changes. Each event: timestamp, user, event type, detail.

**Read-only principle:** The Job Hub NEVER edits Baseline or CO line items. All scope changes go through `[Create Change Order]`. This is enforced at the UI level — no inline edit affordances on those fields.

**Test data to use:** The Johnson Residence example from PRD §24.51.6 (Baseline $20,900 with 5% promo, CO-01 removes shutters at −$522.50, CO-02 upgrades shutters + adds deck stain at +$1,400). Keep the numbers consistent across all 4 prototypes so the ecosystem reads as one system.

---

### Prototype 2 — `accounting-hub.html`

**Purpose:** Barry's cross-Project payment workspace. See PRD §24.55 for the full spec.

**Layout:**

1. EI topbar, same as Job Hub.

2. Subbar: "Accounting Hub" title + meta "Thursday cutoff in 1d 4h · $11,450.00 queued".

3. Filter bar: Week toggle · Crew filter · Project filter · Amount threshold · Search. Persists across all three buckets.

4. **Bucket 1 — Awaiting 50% Approval.** Rows of Service Jobs where `crew_finished_at` is set but `partial_pay_approved_at` is null. Each row shows Project name, Service Job, Crew, PO amount, 50% amount, when crew declared finished, and `[Approve 50%]` (orange primary) + `[Revert — not done]` (ghost) buttons.

5. **Bucket 2 — Awaiting QC Confirmation.** Service Jobs where 50% is released (or not) and QC isn't logged. If QC is unlogged, only `[Log QC Confirmation]` shows. Clicking opens the QC modal (see Shared Action Component). Once QC is logged, the row transforms inline: QC chip replaces the modal trigger, and `[Approve remaining 50%]` + `[Send invoice]` appear as independent buttons.

6. **Bucket 3 — Ready for Thursday Payout.** Informational only. Grouped by subcontractor. Total dollar amount at top. Cutoff reminder at bottom ("Cutoff: Thu 11:59 AM CT").

7. **Force-Release Log.** Last 30 days of §24.52.5 auto-releases. Each row: timestamp, Service Job, amount, triggering invoice reference.

**Action consistency:** All action buttons here invoke the same API endpoints and modal flows as the Job Hub and Service Job pages. Use the Shared Action Component spec below.

---

### Prototype 3 — `service-job.html`

**Purpose:** Per-Service-Job drill-down. See PRD §24.53.7.

**Layout:**

1. EI topbar.

2. Header: "Exterior Painting · Johnson Residence" + breadcrumb back to Job Hub.

3. **Status strip** — the five-flag state displayed compactly with the shared action-component inline.

4. **Budget vs actual block** — estimated hours vs logged hours, estimated materials vs actual, sub PO amount with payment status.

5. **PO detail** — sub PO line items + materials PO line items, released / remaining amounts.

6. **Daily crew logs** (placeholder if §20 portal data isn't available in prototype — use mock data).

7. **Photo grid** (mock data OK).

8. **Line items** — the subset of Baseline + CO lines that landed on this Service Job.

9. **Linked Change Orders** — COs that touched this Service Job (added lines, removed lines).

10. **Activity log** scoped to this Service Job.

---

### Prototype 4 — Mark-Finished FAB on existing `work-order-crew.html`

**Purpose:** The crew-side after-hours gap fix. See PRD §24.52.6.

**Scope of change:**

- Add a second FAB action next to the existing Daily Update FAB (currently orange bottom-right, 56 × 56, 4px radius with letterpress shadow).
- Design: same FAB dimensions, maybe slightly different icon (a checkmark or "done" glyph).
- On tap, show a confirmation bottom-sheet with the warning: *"You're telling the office you're done. The office will inspect the work and approve payment. Don't tap this unless the job is really finished — the standard is the job looks good to a Nash field supervisor or the customer."*
- On confirm, show a "Marked finished" toast with a note "Office has been notified."
- For the prototype, localStorage is fine for state persistence. No real notification fires.

The gold standard file is already full EI, so this is just an additive FAB + bottom sheet. Preserve everything else.

---

## Shared Action Component spec (render in 3 surfaces)

The payment-approval actions must render identically on the Job Hub, Accounting Hub, and Service Job detail page. Build it once as a set of reusable HTML+CSS+JS patterns.

**Action buttons and their permissions/guardrails:**

| Button | Appears When | Click Effect | Guardrail |
|--------|--------------|--------------|-----------|
| `[Approve 50%]` | `crew_finished_at` is set, `partial_pay_approved_at` is null | Sets `partial_pay_approved_at = NOW()` | None beyond the flag check |
| `[Revert — not done]` | `crew_finished_at` is set and not in PAID_PARTIAL/FULL | Clears `crew_finished_at` with required reason note | Blocks if already paid |
| `[Log QC Confirmation]` | `qc_confirmed` is null | Opens QC modal (see below) | None |
| `[Approve remaining 50%]` | `partial_pay_approved_at` is set AND `qc_confirmed` is logged AND `full_pay_approved_at` is null | Sets `full_pay_approved_at = NOW()` | Blocks if QC not logged (422 error) |
| `[Send invoice]` | `qc_confirmed` is logged AND `invoice_sent_at` is null | Opens Invoice Composer (§5.6) scoped to this Service Job's Project | Blocks if QC not logged |

**QC Confirmation modal fields (EI-styled):**

- **Approver** (dropdown): Field Sup names (pulled from active roster) · Customer (customer name from Project)
- **Channel** (enum with nice labels): Phone · Text · Basecamp · Email · In-person · Portal-signed
- **Timestamp** (DateTime picker): defaults to NOW, editable (critical for after-hours backfill)
- **Note** (freetext area): optional but encouraged
- **Save** (orange primary) + **Cancel** (ghost)

Once saved, the QC record renders as a compact chip on the Service Job row: `QC ✓ Anthony · Phone · Mar 29 6:15 PM · "Trim clean, customer happy"`.

---

## Rules to not violate (common mistakes a fresh session might make)

1. **Never edit Baseline line items.** There is no UI path for this on any prototype. Bill is strict about the contract-first rule per §24.51.

2. **Never edit approved Change Order line items.** Same rule. If a CO needs correction, it gets voided and a replacement is created.

3. **Payment release math is based on the PO amount**, not the Service Job budget, not the Project value, not the Baseline. `poAmount × 0.50` for each release.

4. **Thursday 11:59 AM CT is the cutoff.** This is the existing Nash business rule; not new in V2.

5. **The 5-flag state is independent.** No flag auto-fires another, EXCEPT: customer invoice 100% paid force-releases any held full_pay_approved_at. This is the only automatic rule — Force-Release Log entry is written.

6. **CO approval capture has two paths, same pattern as QC:**
   - Portal signature (customer signs directly)
   - Office-captured evidence (verbal / text / email / in-person) with note, timestamp editable

7. **Volume pricing is FROZEN at acceptance.** Change Order items never auto-inherit the original volume discount. New work is priced at full rate (§24.51.5).

8. **Reductive CO math:** `−(baselineLinePrice × (1 − promoDiscountPct) × (1 + globalAdjustmentPct))`. Line-level modifiers (prep, section adjustment, volume) are ALREADY in the frozen per-line price — do NOT re-unwind them.

9. **Additive CO math:** just the new price, no auto-modifiers, no auto-discounts.

10. **Mixed CO:** one CO document with multiple lines of either direction. Net delta = sum of line deltas.

11. **Declined Scope is NOT the same as reductive CO.** Declined = never accepted (from original proposal Scope Selector). Reductive = was in Baseline, later removed. Different data paths.

12. **Revival of declined scope spawns a NEW Project if accepted**, not a CO on the original Project (§24.54.5). Exception: if original Project is still open and the customer is saying "add this to the same mobilization," use a CO on the original Project instead.

---

## Consistent test data to use across all prototypes

Use these numbers everywhere so the prototypes read as one connected system:

**Project:** Johnson Residence · 1847 Woodmont Blvd, Nashville TN 37215 · P-2026-0142 · Signed Jan 2, 2026

**Baseline:**
- Subtotal: $22,000
- Promo discount: 5% Repeat Customer (−$1,100)
- Global adjustment: 0%
- Signed total: **$20,900.00**

**Service Jobs:**
- SJ-1 Interior Painting · Crew B (Miguel) · PO $3,024 (36% of $8,400 budget) · Scheduled Jan 10–24 · status PAID_FULL (everything done)
- SJ-2 Exterior Painting · Crew A (Carlos) · PO $3,780 · Scheduled Mar 15–30 · status PAID_PARTIAL (50% approved, awaiting QC)
- SJ-3 Deck Stain · Crew D (James) · PO $504 · Scheduled Mar 22 · status NOT_RELEASED (not yet finished)

**Change Orders:**
- CO-EST-2026-0142-01 · Feb 15 · Remove exterior shutters · reductive · net −$522.50 · approved Sarah Johnson via text
- CO-EST-2026-0142-02 · Mar 20 · Upgraded shutters + deck stain · mixed (additive $600 shutters + additive $800 deck) · net +$1,400.00 · approved via portal signature
- CO-EST-2026-0142-03 · Mar 22 · Accent wall color change · additive · net +$340.00 · PENDING customer approval

**Current Project Value:** $20,900.00 − $522.50 + $1,400.00 = **$21,777.50**

**Declined Scope (from original proposal):**
- Rear deck refinish — TWP · $1,600 · Budget · next check-in Apr 2
- Front porch columns · $450 · Not Now · next check-in Apr 2
- Shutters upgrade (front) · $800 · Later Phase · next check-in Jul 2
- Garage interior · $1,000 · Archived Feb 15

**Invoices:**
- INV-001 · Sent Jan 26 · $5,200 · PAID Feb 2
- INV-002 · Sent Mar 30 · $8,200 · SENT (not paid)
- Remaining to invoice: $8,377.50

---

## Session-start checklist

When the fresh session opens:

1. Read this file.
2. `cd ~/work/nashos-prototypes && python3 -m http.server 8088 &` (preview server).
3. Open `work-order-crew.html` in a browser to refresh on the EI gold standard.
4. Open the PRD at §24.51 → §24.55 for scope details as needed.
5. Ask Bill which prototype to start first (recommended: job-hub.html).
6. Build it. Use gstack browse for screenshots at 1280 × 900 and 430 × 900.
7. Commit per prototype with conventional message format ("Build job-hub.html in Editorial Industrialism").
8. Ping Bill via Telegram at each completion with the screenshot.

---

## What this handoff REPLACES

This file overwrites the earlier `NEXT-SESSION.md` whose options (rebuild reporting-hub, feedback-dashboard, sales-dashboard, etc.) are all completed as of Apr 22–23. All 12 full-EI prototypes plus 3 shim+override rebuilds are in main branch.

The remaining ~22 shim-only prototypes are not in Phase 2 scope — they stay on the cascade shim until individually touched in a future prototype-editing pass.
