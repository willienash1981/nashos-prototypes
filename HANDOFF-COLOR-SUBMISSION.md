# HANDOFF — color-submission.html EI rebuild

**Created:** 2026-04-25 14:25 CT, end of Telegram session with Bill
**Branch state:** clean (no commits made this session — see "What's pending" below)
**Status:** EI CSS swap is DONE and rendered locally; awaiting Bill's screenshot approval, then commit + push.

---

## Drop-in continuation prompt (paste into a fresh Claude Code session)

```
You're picking up the EI rebuild of ~/work/nashos-prototypes/color-submission.html
mid-flight. Read ~/work/nashos-prototypes/HANDOFF-COLOR-SUBMISSION.md first — it
has the full state, the rules I burned to learn, and what's pending.

The CSS swap is already done. The file is on disk, NOT committed. If Bill
approves the screenshot I sent him at the end of yesterday's session (3 slices
of the rebuilt page), the next step is just `git add color-submission.html &&
git commit && git push`. If he wants tweaks, iterate on the inline <style>
block (lines 8–1092 of color-submission.html) — leave the <script> and class
names alone.

If this is a Telegram-channel session: re-read
~/.claude/projects/-Users-mac3-work-telegram-channel/memory/feedback_be_autonomous.md
and feedback_reply_tool_only.md before responding to anything.
```

---

## What's pending (in priority order)

1. **Wait for Bill's screenshot approval.** I sent 3 slices via Telegram (msg
   ids 540–543) showing the rebuilt page. Last words from him before this
   handoff: he asked me to write this doc + run `/end-session`. He has NOT
   said "commit it" yet. Don't push without confirmation.

2. **If approved → commit + push.** Just one file changed:
   `git add color-submission.html`
   Suggested commit message:
   > Color submission: rebuild in Editorial Industrialism
   >
   > CSS-only swap — replaced the inline <style> block with EI-native
   > tokens (Navy #0B1F3A, Tennessee Orange #FF8200, Sora + Inter,
   > 4px radii, hairlines, no drop shadows, navy-deep deck recommendation
   > block). Added Google Fonts link in <head>. <script> block and all
   > class names completely untouched, so existing render() logic and
   > state model still work. 4th and last customer-facing page in the
   > round-2 EI rebuild — proposal / customer-portal-detail /
   > customer-portal Overview already shipped.

3. **Update HANDOFF-DESIGN-REBUILD.md.** Mark color-submission.html line 167
   (`4. color-submission.html  ← post-acceptance color flow — NOT STARTED`)
   as ✅ DONE with the commit hash.

4. **Wizards + remaining customer-portal tabs are still in the round-2
   backlog** per HANDOFF-DESIGN-REBUILD.md. Don't start those — Bill will
   pick the next one.

---

## What was done this session

- Read the actual color-submission.html source (`ESTIMATE` seed at line 1236,
  `STAIN_COLORS` at line 1199, `renderMainCards()` at line 1452,
  `renderRoomCards()` at line 1609, `renderDeckSection()` at line 1788) so
  the Stitch prompt was grounded in real rendered copy, not invented.
- Generated 3 Stitch screens in project
  `projects/14756926444558261808` ("NashOS Work Order v2 — Navy/Orange Field
  Sup", aka the Industrial Architect / Editorial Industrialism project):
  - v1 (`0492a29b1623474cb5ad0462d75b3a86`): right design language but
    several content hallucinations (combined exterior groups, dropped Accents,
    invented deck assessment text, $0 included on accent walls)
  - v2 (`22ac2c95dd54417496d9e527fedd4c11`): cleaner, real-copy-grounded but
    Bill said "It needs to be based 100% on the actual code that is written
    only" — there were still some hallucinations
  - v3 (`a25b78ee9f4240c1910add240e582ef1`): visual language matches Bill's
    preferred pre-crash design — orange section markers, caps section
    headers, light-cream Deck Assessment card, Navy-Deep recommendation
    block, photorealistic 3×3 wood-stain grid. **Bill approved the visual
    direction.**
- Swapped only the CSS into the real file. Pattern matched
  proposal.html / customer-portal*.html: added Google Fonts Sora + Inter
  link in <head>, replaced inline <style> contents (lines 8–742 in original
  → now lines 8–1092), kept `<link rel="stylesheet" href="styles/theme.css">`
  as the EI shim backstop, kept everything inside <body> + <script>
  completely untouched.
- Headless-Chrome rendered the modified real page at 430×4500 with
  --force-device-scale-factor=2, sliced into 3 sections with ffmpeg, sent to
  Bill via Telegram (messages 540–543). Awaiting approval.

## Rules I burned to learn (read these before next session)

1. **For redesigns of pages with dynamic JS-rendered content: read the
   actual rendered output first, not just the static HTML.** I worked from
   my section catalog initially and Stitch v1 hallucinated a dozen pieces
   of copy. Headless-Chrome rendering the existing page at the start would
   have caught all of it in one shot.

2. **Stitch v3.1 Pro will rewrite "exact" copy even when prompted with
   "DO NOT paraphrase".** It substitutes phrases, drops sub-rows, collapses
   groups, and invents marketing copy. This is documented in the federation
   memory ("Plan on hand-patching from a known-good baseline instead of
   iterating with edit_screens for any page > ~5 sections"). Don't fight it
   — generate for the visual reference only and trust the JS to populate
   the real copy after the CSS swap.

3. **The CSS-swap pattern works extremely well.** The new inline <style>
   block targets the existing class names (`.topbar`, `.section-header`,
   `.main-color-card`, `.mcc-label`, `.sheen-pill`, `.room-card`,
   `.deck-assessment-card`, `.deck-recommendation`, `.stain-filter-pill`,
   `.stain-card`, `.submit-bar`, etc.). The render() functions emit the
   same class names they always did, so every state interaction
   (color-pick, sheen-change, accent-add, opacity-toggle, stain-filter,
   submit-bar progress) keeps working. No JS changes were needed.

4. **Telegram screenshot rendering: 430px wide gets clipped because Stitch
   lays out at 780px native.** Render at 780 wide for Stitch HTML
   previews. For the REAL file (which has phone-frame max-width 430), 430
   is correct but use --force-device-scale-factor=2 + ffmpeg-slice into
   3 vertical chunks so Bill's phone displays them readably.

5. **Bill's autonomy directive (saved to feedback memory):** for design
   choices Bill can judge from a screenshot, just execute and ship —
   don't send proposed plans for approval. Memory file:
   `~/.claude/projects/-Users-mac3-work-telegram-channel/memory/feedback_be_autonomous.md`

## Files / paths to know

| Thing | Path |
| --- | --- |
| Real prototype file (modified, uncommitted) | `~/work/nashos-prototypes/color-submission.html` |
| EI shim CSS (loaded after inline) | `~/work/nashos-prototypes/styles/theme.css` |
| Round-2 design rebuild handoff | `~/work/nashos-prototypes/HANDOFF-DESIGN-REBUILD.md` |
| Approved EI reference: proposal.html | `~/work/nashos-prototypes/proposal.html` |
| Approved EI reference: customer-portal-detail.html | `~/work/nashos-prototypes/customer-portal-detail.html` |
| Approved EI reference: customer-portal.html | `~/work/nashos-prototypes/customer-portal.html` |
| New CSS source-of-truth (so you can re-splice if needed) | `/tmp/stitch-color-submission/new-style.css` |
| Last-good rendered screenshot (top/mid/bot slices) | `/tmp/stitch-color-submission/REAL-after-{top,mid,bot}.png` |
| Stitch v3 reference HTML | `/tmp/stitch-color-submission/v3.html` |
| Stitch project ID for any further generations | `14756926444558261808` |

## How to re-render and re-slice (one-liner)

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless \
  --disable-gpu --hide-scrollbars --window-size=430,4500 \
  --force-device-scale-factor=2 \
  --screenshot=/tmp/REAL.png \
  "file:///Users/mac3/work/nashos-prototypes/color-submission.html"

cd /tmp && \
  ffmpeg -y -loglevel error -i REAL.png -vf "crop=860:3000:0:0"    REAL-top.png && \
  ffmpeg -y -loglevel error -i REAL.png -vf "crop=860:3000:0:3000" REAL-mid.png && \
  ffmpeg -y -loglevel error -i REAL.png -vf "crop=860:3000:0:6000" REAL-bot.png
```
