# NashOS prototypes — next session handoff

Paste the block below into a fresh Claude Code session on Forge (run from
`~/work/nashos-prototypes` or anywhere — the prompt is self-contained).

---

I'm picking up the NashOS prototype redesign. Context you should know
before starting:

## Where things stand

The repo is `willienash1981/nashos-prototypes` (public, serves GitHub
Pages). Local path: `~/work/nashos-prototypes`. There are 34 active
prototypes. The design system is documented in `design.md` at the repo
root — "Editorial Industrialism" (Monocle-meets-Apple HIG: white paper,
Tennessee Orange `#FF8200` as the only accent, Sora headlines + Inter
body, 4px radii, hairline `#E2E5EA` dividers, no bordered cards, no
gradients, no glassmorphism, no emoji icons in new markup). The gold
standard for what "done right" looks like is `work-order-crew.html`.

Two layers of implementation exist right now:

1. **Full Editorial Industrialism rebuilds** — markup ground-up in the
   new design language. These use `styles/dashboard.css` (the shared
   stylesheet with shell primitives — spine, topbar, role switcher, KPI
   grid, monolith, two-col, ledger table, action list, AR-aging stacked
   bar, channel bars, sparkline, FAB). Files:
   - `work-order-crew.html` — Live Work Order (original editorial build)
   - `dashboard.html` — Operations dashboard (Admin/Office/Field Sup
     sub-tabs, 5 KPIs, Feb Revenue monolith, Cash Flow + Sales Team,
     Action Items + Upcoming Jobs)
   - `executive-dashboard.html` — CEO view
   - `cmo-dashboard.html` — CMO view
   - `cfr-dashboard.html` — CFO view
   - Top-bar nav is unified across the four dashboards: Ops · CEO · CMO · CFO.

2. **Shim-only prototypes** — original navy/gold markup repainted via
   `styles/theme.css` (loaded post-inline so it wins the cascade). Most
   of the 34 prototypes are in this bucket and they render acceptably
   but they're not true Editorial Industrialism — they still have the
   old bordered-card layouts underneath.

3. **Shim + per-page overrides** — shim wasn't enough for these so a
   second `<style>` block after the theme.css link forces specific
   classes to editorial values. These are visually clean but structurally
   still the old markup:
   - `translation-review.html`, `careers.html`, `feedback-dashboard.html`,
     `admin-config.html`, `sales-dashboard.html` (these five were the
     "broken" ones found in yesterday's audit)

## Dragon reference

The Stitch-generated dashboard mockup that drove the exec-dashboard
layout is saved at
`~/work/nashos-prototypes-redesign/.stitch/dashboard/` (screenshot.png
+ reference.html). Use as a visual anchor if you're rebuilding more
dashboards — same pattern, different data.

To generate a new Stitch design, use the project
`14756926444558261808` ("NashOS Work Order v2 — Navy/Orange Field Sup").
The design system is already set to Industrial Architect in that project.

## The user's workflow (important)

Bill "vibecodes" the PRD by tweaking the prototypes, then mirrors
changes into the PRD repo `willienash1981/nash-painting-prd` (private,
at `~/work/nash-painting-prd`). Main doc there is
`V2-ESTIMATE-ROCKET-REPLACEMENT.md`. Commits on the PRD repo are one
section at a time, numbered like `§24.48-24.49`. If Bill mentions a
screen name, pull both repos up and be ready for small surgical edits
in parallel.

## What's next — pick one of these

1. **Rebuild reporting-hub** — full Editorial Industrialism rebuild
   using `styles/dashboard.css`. It's a 13-report library with a left
   sidebar nav (8.1 Job Profitability, 8.2 Crew Efficiency, etc.) and
   a main content area per report. Use the editorial sidebar pattern
   (hairline borders, orange active-accent).

2. **Rebuild feedback-dashboard** — currently on shim-plus-overrides
   (AI Insights panel is fixed) but structurally still old. Full rebuild
   would restore the NPS/satisfaction/response-rate KPIs, AI insights
   with editorial alert cards, and the tabbed report views.

3. **Rebuild sales-dashboard** — currently on shim-plus-overrides.
   Full rebuild would use the operations-dashboard pattern (KPI grid,
   goal tracking monolith, pay details panel).

4. **Polish nashpainting-v9** — the marketing site. Currently has its
   own navy/gold theme. User wanted to confirm whether this one should
   match Editorial Industrialism or stay distinct. Default: leave it
   alone unless asked.

5. **Continue the PRD sync loop** — just respond to whatever Bill asks
   about the prototypes, mirror changes into the PRD if relevant.

## Read before deciding

- `~/work/nashos-prototypes/design.md` — design system specification
- `~/work/nashos-prototypes/styles/dashboard.css` — shared editorial stylesheet
- `~/work/nashos-prototypes/styles/theme.css` — the cascade shim
- `~/work/nashos-prototypes/work-order-crew.html` — gold standard for what
  a full Editorial Industrialism rebuild looks like
- `~/work/nashos-prototypes/NEXT-SESSION.md` — this file

Run a local preview when you need to see changes:
`cd ~/work/nashos-prototypes && python3 -m http.server 8088` then
`open http://localhost:8088/dashboard.html`. Gstack's browse is at
`~/.claude/skills/gstack/browse/dist/browse` if you want headless
screenshots at 430px mobile + 1280px desktop for visual diffs.

Ask me which option I want before you start, unless the request already
points to a specific screen.
