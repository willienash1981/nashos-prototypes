# Continuation Prompt — Nash Prototype Review Loop

**Paste this into a fresh Claude Code session on Forge (or send via Telegram).**

---

You're picking up Nash's prototype review loop. Bill is going through every prototype in `~/work/nashos-prototypes/` one by one, asking for tweaks. For each prototype, your job is:

1. Pull the latest tweak request from Bill (Telegram or terminal).
2. Update the prototype HTML to match.
3. Update the corresponding section in the PRD (`~/work/nash-painting-prd/V2-ESTIMATE-ROCKET-REPLACEMENT.md`) so spec stays in sync with prototype.
4. Render the change via headless Chrome and send Bill the screenshot.
5. Commit + push to `main` (GitHub Pages serves from there at https://willienash1981.github.io/nashos-prototypes/).
6. Tick the box in `~/work/nashos-prototypes/REVIEW-CHECKLIST.md`.

## State at handoff (2026-04-30)

- All 10 estimator wizards are now in Editorial Industrialism (commits 477e231 through b7935ad on `main`).
- All customer-facing prototypes (proposal, customer-portal × 2, color-submission, pre-project-checklist) are EI.
- All internal admin tools rebuilt earlier are EI (work-order-crew, crew-management, hiring, touch-point-logger, invoice-payments, po-system, direct-mail, campaign-builder).
- `REVIEW-CHECKLIST.md` (commit 7ad44f1) has the full prototype list organized by category with checkboxes.
- Repo is clean and pushed; no pending work.

## Known still pre-EI / status unknown

- **estimate-builder.html** — main estimating screen, PRD §3.5. Still pre-EI. Likely high priority because it's the biggest internal screen.
- **admin-config.html** — verify whether it got rebuilt or not.
- **dashboard.html, executive-dashboard.html, cmo-dashboard.html, cfr-dashboard.html, sales-dashboard.html, feedback-dashboard.html, reporting-hub.html** — verify EI status; do a quick render of each to see.
- **Phase-2 prototypes** — `job-hub.html`, `accounting-hub.html`, `service-job.html` may need to be created from scratch per PRD §24.51–§24.55. See `~/work/nashos-prototypes/NEXT-SESSION.md` (commit d0c9ea2) for the original architectural intent.
- **careers.html, translation-review.html** — verify status.

## How to render any prototype headlessly (for screenshot approval)

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --window-size=430,3500 \
  --force-device-scale-factor=2 --hide-scrollbars \
  --virtual-time-budget=3000 \
  --screenshot=/tmp/render.png \
  "file:///Users/mac3/work/nashos-prototypes/<file>.html"
# slice tall renders into Telegram-friendly chunks:
ffmpeg -y -i /tmp/render.png -vf "crop=860:3000:0:0" /tmp/render-top.png
```

Then `Read /tmp/render-top.png` to see it yourself, and attach via the Telegram reply tool's `files` arg for Bill.

## Editorial Industrialism design tokens (already locked, just reference)

```
--navy:#0B1F3A; --navy-deep:#061228; --ink:#0E0E10;
--orange:#FF8200; --orange-deep:#CC6600; --orange-bg:#FFF4E6;
--green:#15803D; --green-bg:#DCFCE7;
--red:#B91C1C; --red-bg:#FEE2E2;
--paper:#FFFFFF; --bg:#F5F6F8; --surface-dim:#EDEFF3;
--hairline:#E2E5EA;
--sora: Sora (headlines/numbers, Google Fonts)
--inter: Inter (body/UI)
--r: 4px (no pill shapes; status chips OK)
```

Patterns in use across the codebase (see any rebuilt wizard for reference):
- Topbar: white + 1px hairline bottom + orange spine on left edge
- Total bar / sticky bottom: `--navy-deep` background, big orange Sora `$total`, uppercase white meta
- Cards: white + 1px hairline border, no shadow
- Primary CTA: `--orange` solid, uppercase Inter 700, 4px radius
- Add buttons: dashed orange ghost
- Chips: square 4px, surface bg → navy-on-active
- Numbered step pills: navy-deep square with white Sora number
- Disclaimer / info / warn boxes: surface bg with 3px left rule (navy/orange/red)

## Rules to NOT violate (from prior session memory)

- Stitch is only for **new** component shapes that need visualization. For any wizard/page tweak using elements that already exist in the design system, just edit the CSS directly. Sending a Stitch v1 for routine swaps wastes ~5 min per round.
- For visual changes, **screenshot the rendered file before claiming done**. Bill will catch a regression you didn't notice.
- Final action on any Telegram turn must be `mcp__plugin_telegram_telegram__reply` — transcript output is invisible to Bill's phone.
- Convert UTC timestamps to Chicago Central time before commenting on time-of-day.
- Be autonomous: if Bill can judge it from a screenshot, ship it and screenshot it; don't ask for permission first.
- When syncing prototype changes to the PRD, search for the exact filename to find all PRD sections that reference it (`grep -n "filename.html" ~/work/nash-painting-prd/V2-ESTIMATE-ROCKET-REPLACEMENT.md`), then update each.

## Useful file pointers

- Repo: `~/work/nashos-prototypes/` (remote: `willienash1981/nashos-prototypes`, GitHub Pages from `main`)
- PRD: `~/work/nash-painting-prd/V2-ESTIMATE-ROCKET-REPLACEMENT.md`
- Checklist: `~/work/nashos-prototypes/REVIEW-CHECKLIST.md`
- Phase-2 architectural intent: `~/work/nashos-prototypes/NEXT-SESSION.md`
- Project memory: find the directory under `~/.claude/projects/` matching the current workspace and read `MEMORY.md`

## First action on resume

Check Bill's most recent Telegram message (or wait for one). If he names a prototype, render it first and send him a baseline screenshot before asking what to tweak — gives him a visual to point at.
