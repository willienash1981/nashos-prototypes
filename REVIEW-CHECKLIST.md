# Prototype Review Checklist

Bill goes through each prototype, makes tweaks/notes, Forge updates the prototype + the matching PRD section, then we tick the box.

**Workflow per prototype:**
1. Bill opens the prototype on GitHub Pages, screenshots / messages tweaks
2. Forge updates the HTML (and PRD section if scope/behavior shifts)
3. Forge commits + pushes
4. Bill confirms → tick the box here

**PRD:** `~/work/nash-painting-prd/V2-ESTIMATE-ROCKET-REPLACEMENT.md`
**GitHub Pages root:** https://willienash1981.github.io/nashos-prototypes/

EI = Editorial Industrialism (locked design system, completed sweep 2026-04-28).

---

## Customer-Facing — Intake / Proposal / Portal

- [ ] **proposal.html** — main proposal viewer (EI ✅ shipped 2026-04-23, commit 0bdd1da). PRD §3.12.
- [ ] **customer-portal.html** — homeowner main portal Overview tab (EI ✅ commit 19e2d76, all 8 sub-tabs verified on-spec 2026-04-26).
- [ ] **customer-portal-detail.html** — per-project drill-down shell (EI ✅ commit c4701e8). Iframes proposal.html.
- [ ] **color-submission.html** — color picker (EI ✅ commit 26a2831). PRD §3.8.
- [ ] **pre-project-checklist.html** — customer intake form (EI ✅ commit 06454b2).

## Estimator Wizards (10 — full EI sweep finished 2026-04-28)

- [ ] **index.html** — Interior wizard (EI ✅ commit 477e231). PRD §3.4.
- [ ] **exterior-wizard.html** (EI ✅ commit 0301aa2). PRD §3.4.
- [ ] **deck-wizard-v1-approved.html** — deck staining (EI ✅ commit 438cedf). PRD §3.4.
- [ ] **fence-wizard.html** (EI ✅ commit b1f106c). PRD §3.4.
- [ ] **cabinet-wizard.html** (EI ✅ commit a7c84d4). PRD §3.4.
- [ ] **carpentry-wizard.html** — repairs (EI ✅ commit 17515ed). PRD §3.4.
- [ ] **drywall-wizard.html** — repairs (EI ✅ commit dbd9e1b). PRD §3.4.
- [ ] **screen-wizard.html** — screen replacement (EI ✅ commit 05cbaaf). PRD §3.4.
- [ ] **wood-door-wizard.html** — stain/seal (EI ✅ commit 595a42e). PRD §3.4.
- [ ] **color-change-wizard.html** — change orders (EI ✅ commit b7935ad). PRD §3.4 + §3.11.

## Estimating Roll-Ups

- [ ] **estimate-builder.html** — main estimating screen. PRD §3.5. **NOT YET EI** — still pre-rebuild palette.

## Internal Admin / Office Tools

- [ ] **work-order-crew.html** — crew work order (EI ✅ Mark-Finished FAB shipped earlier in commit 64acdea). PRD §6.
- [ ] **crew-management.html** (EI ✅ commit 83da68b).
- [ ] **hiring.html** — recruitment (EI ✅ commit ea19de6).
- [ ] **touch-point-logger.html** — field-sales mobile (EI ✅ commit 1bd9888).
- [ ] **invoice-payments.html** — billing/AR (EI ✅ commit c67fc74).
- [ ] **po-system.html** — AP/PO (EI ✅ commit 1023c8c).
- [ ] **direct-mail.html** — outreach (EI ✅ commit 6643998).
- [ ] **campaign-builder.html** — drip orchestration (EI ✅ commit 86b1214).
- [ ] **admin-config.html** — admin settings. **Status unknown — verify EI.**

## Phase 2 Architectural Prototypes (queued from 2026-04-23 PRD work)

These are referenced in PRD §24.51–§24.55 but the prototypes haven't been built/verified yet — see `~/work/nashos-prototypes/NEXT-SESSION.md` (commit d0c9ea2).

- [ ] **job-hub.html** — internal office homebase per Project. PRD §24.54.
- [ ] **accounting-hub.html** — cross-Project accounting. PRD §24.55.
- [ ] **service-job.html** — service-job container.

## Dashboards

- [ ] **dashboard.html** — main dashboard. PRD §6.
- [ ] **executive-dashboard.html** — exec view.
- [ ] **cmo-dashboard.html** — marketing.
- [ ] **cfr-dashboard.html** — customer-facing rep / field rep.
- [ ] **sales-dashboard.html** — sales.
- [ ] **feedback-dashboard.html** — customer feedback.
- [ ] **reporting-hub.html** — reports landing.

## Other

- [ ] **careers.html** — recruiting public-facing.
- [ ] **translation-review.html** — i18n review.

## Don't Touch (intentionally custom)

- **nashpainting-v9.html** — main marketing site, has its own bespoke look.
- **Any `*-v1-approved.html`** — frozen approved snapshots. Edit the live file, not the snapshot.
- **Any `*-pre-mar19-backup.html`** — pre-rebuild backups, frozen.
- **work-order-v1-archived.html** — superseded by work-order-crew.html.
- **index-pre-mar19-backup.html, exterior-wizard-pre-mar19-backup.html, cabinet-wizard-pre-mar19-backup.html, screen-wizard-v1-approved.html, dashboard-v1-approved.html, crew-management-v1-approved.html, careers-v1-approved.html, proposal-v1-approved.html** — archived.
