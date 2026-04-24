# NashOS prototypes — design-rebuild handoff (2026-04-23 evening)

> Fresh-session continuation of the prototype review loop with Bill. Round 1
> (19 feature/bug items) is done, pushed, and live. Round 2 is a design-system
> alignment pass — several customer-facing prototypes are still on the old
> look & feel and need to be rebuilt in **Editorial Industrialism** to match
> the dashboards that were approved on 2026-04-21.

---

## PASTE-ME PROMPT (copy this whole block into a fresh Claude Code session on Forge)

```
I'm picking up the NashOS prototype review loop with Bill. Round 1 (19
feature/bug fixes across deck, fence, cabinet, exterior wizards + customer
portal + color submission + customer-portal-detail) is done, pushed, and
live. Round 2 is a DESIGN-SYSTEM rebuild — Editorial Industrialism
(Navy #0B1F3A, Tennessee Orange #FF8200, Sora + Inter, hairlines only,
no bordered cards, 4px radii).

Round-2 progress so far (all live on GitHub Pages):
✅ proposal.html — fully rebuilt (commit 0bdd1da)
✅ customer-portal-detail.html — shell rebuilt, proto banner killed, header
   matches approved Overview pattern (commit c4701e8). Inner proposal tab
   iframes the rebuilt proposal.html.
✅ customer-portal.html Overview tab — rebuilt (commit 19e2d76). Other 8
   tabs inherit token changes but may need per-tab polish.

Still pending in round 2:
• customer-portal.html — visual pass on Estimates / Projects / Invoices /
  Maintenance / Referrals / Colors / Documents / Settings tabs
• color-submission.html — full EI rebuild
• All the wizards (lower priority — user-facing but different aesthetic)
• hiring.html, crew-management.html, etc. (secondary internal pages)

CRITICAL RULES learned the hard way on 2026-04-23:
1. ALWAYS READ THE SOURCE PAGE BEFORE REDESIGNING. Open the existing .html
   and catalog every section/sub-head/copy-block BEFORE prompting Stitch
   or writing code. Do NOT invent content to fill gaps. Splicing copy
   from one accordion into another in the same file is still hallucination.
2. SCREENSHOT BEFORE REPORTING DONE. Use `gstack`/`webapp-testing` or
   headless Chrome (/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
   --headless --screenshot=X file://...). Don't trust "diffs look right."
3. DON'T CONFUSE customer-portal.html (the MAIN homeowner portal with
   Overview/Estimates/etc. tabs) WITH customer-portal-detail.html (the
   per-project drill-down with Proposal/Status/Payments tabs). Bill will
   say "Overview page" meaning customer-portal.html.
4. The proto-banner "NASHOS PROTOTYPE — CUSTOMER PORTAL" strip should be
   HIDDEN via CSS display:none on customer-facing pages. Bill called it
   "ugly". State-switcher JS stays intact for dev use.
5. Tennessee Orange is a SIGNAL color, not a reading color. Only on: top
   spine, active tab underline, CTAs, section-header dots, primary row
   accent bars, status "REVIEW" pills. Never for body text.

Before doing anything else:

1. Read ~/work/nashos-prototypes/HANDOFF-DESIGN-REBUILD.md — it has the
   full context including what Bill flagged, which pages still need the
   rebuild, the design spec, and the open A/B/C/D question he has not
   yet answered.

2. Read ~/work/nashos-prototypes/design.md — this is the approved Stitch
   design spec ("Editorial Industrialism"): Navy #0B1F3A, Tennessee
   Orange #FF8200, Sora headlines + Inter body, hairline dividers instead
   of card borders, 4px orange top spine, editorial-underline inputs, etc.

3. Look at the dashboards Bill liked and use them as the visual reference:
   - dashboard.html, cfr-dashboard.html, cmo-dashboard.html,
     executive-dashboard.html — all share styles/dashboard.css (shared
     Editorial Industrialism stylesheet)
   - admin-config.html, accounting-hub.html, job-hub.html, service-job.html,
     reporting-hub.html, feedback-dashboard.html, sales-dashboard.html,
     careers.html, translation-review.html — also rebuilt, can crib patterns

4. Raw Dragon output for reference: ~/work/nashos-prototypes-redesign/.stitch/dashboard/
   (reference.html + screenshot.png)

5. BEFORE telling Bill anything is done, screenshot it and look at it.
   He caught me last time because I pushed visual changes I hadn't
   actually looked at. Use the `gstack` skill or webapp-testing to grab
   a screenshot of the live GitHub Pages URL after each push.

The first thing to do in-session is greet Bill briefly via the Telegram
channel and ask him to confirm his A/B/C/D preference from the tail of
yesterday's thread (that question is captured below in the handoff file
under "Open question").

All Telegram replies must go through mcp__plugin_telegram_telegram__reply
— chat_id is 6378358929 in recent context. Transcript output is NOT visible
to Bill; the reply tool is the only thing that reaches his phone.

Identity: you're Forge. Not Claude. See ~/work/telegram-channel/CLAUDE.md
for the full unattended-session rules.
```

---

## What Bill flagged at end of 2026-04-23 session

Two problems on `customer-portal-detail.html`:

1. **Large white space below the embedded proposal** (he sent a screenshot
   confirming the iframe approach leaves ~several hundred px of empty
   white below the "Client activity tracked" strip). Root cause: the
   iframe has `height: body.scrollHeight`, and `proposal.html` has
   `padding-bottom: 110px` on body to reserve space for its `position:fixed`
   `.bot` bar. Fix I suggested (shrink iframe by 110px) is a bandaid.
2. **The proposal tab should be a LIST of proposals first, then tapping
   one opens the detail view.** I shipped a quick-fix commit for this
   (3dbb270). Works but visually stale — same bandaid problem.
3. **"Design is not updated"** — the real point. The portal shell is
   still using the pre-Stitch design. The Phase-2 Dragon work on 2026-04-21
   rebuilt the dashboards (dashboard.html + cfr/cmo/executive) + several
   others in Editorial Industrialism, but `customer-portal*`, `proposal`,
   and `color-submission` were never touched. Continuing to patch features
   on the old shell is wasted work.

Bill's suggestion verbatim: *"Maybe we should use the details that stitch
gave us and have stitch reimagine each page."*

## Bill's direction (msg 361, 2026-04-23 23:56)

He wants **C with A-as-the-ordering**: keep using Stitch (the tool that
produced the approved dashboard look), and let each page go through
Stitch so intricate graphics can be generated — while staying visually
consistent with the existing Editorial Industrialism dashboards. Quote:

> *Raw Dragon output is saved at ~/work/nashos-prototypes-redesign/.stitch/dashboard/
> in case you want to iterate on the design. This was what we used to
> redesign the other prototypes. I don't know if we need to run the
> specifics from this design on stitch for each page so that we get any
> kind of intricate graphics and stuff like that made but I think it's
> important to keep it consistent but also keep stitch.*

Translation for next session:
- Use `/stitch` (or the `/dragon` full-pipeline skill) to generate each
  page's visual from design.md + the dashboard reference as the anchor.
- Priority order is the customer-facing chain: customer-portal →
  customer-portal-detail → proposal → color-submission.
- Consistency matters — don't let Stitch drift off-spec. The Dragon
  reference file at
  ~/work/nashos-prototypes-redesign/.stitch/dashboard/reference.html
  is the approved visual anchor. Feed it into Stitch as the starting
  point for each new page so the look carries over.

If Stitch isn't available or is rate-limited, fall back to hand-building
from design.md + the existing rebuilt pages (admin-config.html +
dashboard.html are the cleanest references).

## What IS already rebuilt (Editorial Industrialism)

These can be cribbed from for patterns:
- dashboard.html, cfr-dashboard.html, cmo-dashboard.html, executive-dashboard.html
  — share `styles/dashboard.css`
- admin-config.html — uses the full design.md tokens inline (navy #0B1F3A,
  orange #FF8200, Sora/Inter, 4px orange spine, sidebar layout)
- accounting-hub.html, job-hub.html, service-job.html
- reporting-hub.html, feedback-dashboard.html, sales-dashboard.html,
  careers.html, translation-review.html

## What is NOT rebuilt (the design-round-2 backlog)

In rough priority order for the customer-facing path:
1. customer-portal.html           ← ✅ Overview tab REBUILT 2026-04-24 02:50 CT (commit 19e2d76, approved screenshot). Other 8 tabs (Estimates/Projects/Invoices/Maintenance/Referrals/Colors/Documents/Settings) inherit tokens but need tab-specific polish.
2. ~~customer-portal-detail.html~~ ← ✅ Shell REBUILT (commit c4701e8). Proto banner removed, header matches Overview (left NASH PAINTING + right MF avatar). Iframes proposal.html so Proposal tab renders in new design.
3. ~~proposal.html~~              ← ✅ REBUILT 2026-04-23 (commit 0bdd1da, approved by Bill live at /proposal.html)
4. color-submission.html          ← post-acceptance color flow — NOT STARTED

Internal / secondary:
5. crew-management.html
6. hiring.html
7. pre-project-checklist.html
8. touch-point-logger.html
9. work-order-crew.html
10. invoice-payments.html
11. po-system.html
12. direct-mail.html
13. campaign-builder.html

Estimator wizards (different track — the "tools" aesthetic; Bill has been
iterating on them functionally, design refresh is lower priority):
- index.html (interior), exterior-wizard.html, deck-wizard-v1-approved.html,
  fence-wizard.html, cabinet-wizard.html, carpentry-wizard.html,
  drywall-wizard.html, screen-wizard.html, wood-door-wizard.html,
  color-change-wizard.html

Estimating roll-ups:
- estimate-builder.html, proposal-v1-approved.html

Marketing (intentionally custom, don't touch):
- nashpainting-v9.html

## Round 1 summary (already done, pushed, live)

All committed and live on GitHub Pages as of msg 354. Full list:

**Deck wizard** (deck-wizard-v1-approved.html)
- #11 Thick paint example shortened to "(DeckOver/Restore)"
- #12 Collapsed previous-coating/material into one field with
  None/Clear/Toner/Semi Trans/Semi Solid/Solid/Thin Paint/Thick Paint
- #13 Fixed reversed-typing bug in dimension inputs (updateSectionPreviews
  updates SF/LF badges in place instead of innerHTML-rebuilding on every
  keystroke)
- #14 Staircase rails: auto-LF from step count; both/one/none now drives price
- #15 2nd coat is now a single global toggle, not per-section
- #16 Lattice moved to its own measure card with its own SF
- #17 Posts moved to its own measure card with qty × H auto-fill + manual SF override

**Fence wizard**
- #18 Same coating options as deck, consolidated from two dropdowns

**Cabinet wizard**
- #19 Admin toggle: "Specialty hinge work available" (off by default).
  When off, New Pattern + Hidden Hinges are hidden from the estimator.
  Long-term lives in admin-config.

**Exterior wizard**
- #7 Delete button always visible on every siding/eaves row (red chip style)
- #8 Totals recalc live on SF input (entry price + pressure wash + caulking
  + primer + sticky bar all update without needing to bump the story toggle)
- #9 Eaves + fascia LF now actually drive pricing
- #10 Replaced scary "← Back" with "✓ Done" + green auto-save banner + green
  "✓ Save Section" sticky button

**Customer portal** (customer-portal.html)
- #1 Needs Attention cards: clear title + bold **Project #xxxxx** + date +
  address. Dropped the ambiguous gray "EST-xxxx" subtitle.

**Color submission** (color-submission.html — he gave proposal.html URL but
meant this page)
- #3 Per-wall accent colors: "+ Add another accent wall" button on any room
  with an accent surface. Each extra has its own color picker, swatch,
  remove button. Submit count + scroll-to-missing include them.
- #4 Exterior grouped Body / Trim / Accents with per-group subtitles. Added
  Garage Door to Accents.
- #5 Submit Colors when grayed now scrolls to + flashes the first unfilled
  surface (auto-expanding the room if collapsed) and toasts "Still needed: X".
- #6 "Your Main Colors" intro rewritten to explain defaults-then-customize.

**Customer portal detail** (customer-portal-detail.html — the flagged one)
- #2 Ripped out the static Proposal tab, embedded proposal.html via iframe
  sized to its content. Added list-view → detail-view navigation
  (commit 3dbb270).
- **This is the page Bill said is visually broken.** The iframe approach is
  a compromise that won't survive the Editorial Industrialism rebuild —
  when proposal.html itself gets the treatment, embed it cleanly (or drop
  the iframe and render the proposal HTML in-place).

## Rules going into the rebuild

From Bill's feedback + global CLAUDE.md:
- **ALWAYS READ THE SOURCE PAGE BEFORE REDESIGNING.** Open the existing
  `.html` file and catalog every section, sub-head, copy block, and data
  point BEFORE prompting Stitch or writing code. Do not invent plausible-
  sounding content to fill gaps — content must match the working page
  exactly. Bill flagged this rule on 2026-04-23 after I inserted
  "Cancellation" and "Late" sub-heads into the Payment Terms accordion
  that actually live in the Acceptance Overlay's Contract Terms copy.
  Lesson: splicing similar-looking content from one section of the same
  file into another is still hallucination. If unsure whether something
  belongs, quote the exact line number from the source file in the
  Stitch prompt.
- **Screenshot before reporting done.** Use `gstack` skill or
  `webapp-testing` to pull the live URL, eyeball it, catch the mismatch.
  Bill's time is not free and he's already frustrated from one pass of
  unchecked work.
- **design.md is the source of truth.** Don't invent colors or fonts.
  Sora/Inter only. Navy #0B1F3A, Orange #FF8200, no gradients, no bordered
  cards, 4px radii, editorial-underline inputs, hairline dividers, 4px
  orange top spine on every page.
- **Telegram = reply tool only.** `mcp__plugin_telegram_telegram__reply`
  with chat_id 6378358929. Transcript output is invisible to Bill.
- **Identity: Forge, not Claude.** See ~/work/telegram-channel/CLAUDE.md.
- **Don't touch access.json or /telegram:access.** Only the interactive
  session can approve pairings.
- **Commits: one per logical unit, in the "§<area>" convention** Bill
  uses (e.g. "Prototype review decisions — §customer-portal-detail.").
- **Don't push without asking** if there are unpushed commits from other
  sessions on main. This happened once and Bill wants the confirmation.

## Useful file pointers

- ~/work/nashos-prototypes/ — the working repo (this file is in it)
- ~/work/nashos-prototypes/design.md — Editorial Industrialism spec
- ~/work/nashos-prototypes/styles/dashboard.css — shared EI stylesheet
- ~/work/nashos-prototypes-redesign/.stitch/dashboard/reference.html — Dragon output
- ~/work/nashos-prototypes-redesign/.stitch/dashboard/screenshot.png — Dragon screenshot
- ~/.claude/projects/-Users-mac3-work-telegram-channel/memory/MEMORY.md — Forge memory index
- ~/work/nash-painting-prd/V2-ESTIMATE-ROCKET-REPLACEMENT.md — authoritative PRD
