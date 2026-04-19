# Design System — NashOS
Generated from Google Stitch v2 (Industrial Architect), approved 2026-04-18.

## 1. Visual Theme & Atmosphere
**"Editorial Industrialism."** The UI should feel like a premium printed work order that happens to be digital — *Monocle* magazine meets Apple HIG for the contractor world. Whitespace-led, typographically confident, high-contrast. Flat colors only — no gradients, no glassmorphism, no heavy drop shadows. Tennessee Orange is a precision signal, not a flood. The aesthetic rejects "SaaS dashboard" conventions (feature cards, rounded pills everywhere, teal-purple gradients) in favor of left-aligned typography, hairline dividers, and tonal layering.

## 2. Color Palette & Roles
| Role | Hex | Usage |
|---|---|---|
| Navy | `#0B1F3A` | Primary text, active-state labels, secondary buttons, FAB pressed-state shadow |
| Navy-deep | `#061228` | Only for deepest inversions (dark FAB done-state, overlay backdrop) |
| Ink Black | `#0E0E10` | Primary body text on white surfaces |
| Orange (Tennessee) | `#FF8200` | PRIMARY action color — CTAs, FAB, active tab/role underlines, 4px top spine, left accent on expanded scope section, orange pin icon, pending status |
| Orange Deep | `#CC6600` | Orange hover/pressed, dark-on-light emphasis (e.g. scope warning text) |
| White | `#FFFFFF` | Page & card background — dominates ~80% of the screen |
| Surface | `#F5F6F8` | Inset tabular strips (scope rows collapsed, material pickup block), subtle panel backgrounds |
| Surface-dim | `#EDEFF3` | Hover state of surface strips |
| Hairline | `#E2E5EA` | 1px dividers only — never bounding a card |
| Meta | `#64748B` | Secondary text, addresses, metadata, labels |
| Meta-soft | `#9AA4B2` | Tertiary text, inactive tab labels, superscript annotations |
| Green | `#15803D` on `#DCFCE7` bg | "Approved" status chip, success messaging |
| Yellow | `#CA8A04` on `#FEF3C7` bg | "DO FIRST" flag, warning notes (sparingly) |
| Red | `#B91C1C` on `#FEE2E2` bg | Error or destructive state only |

**No-Line Rule.** Forbidden: 1px solid borders around cards or sections. Define structure through background shifts and whitespace. The only acceptable 1px lines are `--hairline` (#E2E5EA) dividers within a section and underlines on active navigation elements.

## 3. Typography Rules
| Element | Font Family | Weight | Size | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 (Job name) | Sora | 700 | 36px | 1.05 | -0.035em |
| H2 (Section headers) | Sora | 700 | 20px | 1.15 | -0.025em |
| H3 (Panel titles) | Sora | 700 | 18px | 1.2 | -0.02em |
| Big number (crew score) | Sora | 700 | 72px | 0.9 | -0.04em |
| Money value | Sora | 700 | 17px | 1.1 | -0.01em |
| Body | Inter | 400 | 15px | 1.65 | 0 |
| Body (compact) | Inter | 500 | 14px | 1.5 | 0 |
| Body-sm | Inter | 500 | 13px | 1.4 | 0 |
| Label / caps metadata | Inter | 700 | 10.5–11px | 1.2 | 0.12em (UPPERCASE) |
| Monospace (WO #, amounts in tables) | Inter tabular-nums | 600 | 12–13px | 1.2 | 0.02em |

**Never** use Space Grotesk (Claude's fallback), Roboto, Arial, or system-default sans-serif. Headlines are always Sora; everything else is Inter.

## 4. Component Patterns

### Buttons
- **Primary CTA** — `background: #FF8200; color: #FFFFFF; border-radius: 4px; font: Sora 700 13px; letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 16px;` — used for Take Photo, Submit Update, main panel actions. Hover → `#CC6600`. Active state: `transform: translateY(1px)`.
- **Secondary** — Navy background (`#0B1F3A`), white text, same typography and radius as primary. Used for secondary global actions.
- **Ghost / text link** — No background, navy text, `text-decoration: underline`, Inter 600 13px. Used for "Upload from gallery," "New Change Order," panel side-actions.
- **FAB** — 56×56 orange square, 4px radius (sharp, not circular). Shadow `0 4px 0 rgba(11,31,58,0.2)` — offset letterpress, not a diffused drop shadow. Pressed: translateY(4px), shadow collapses.

### Cards (or rather, the absence of cards)
No bordered cards. Sections are delimited by 1px `--hairline` horizontal rules with 24px top/bottom padding. "Active" scope rows get a 4px left orange accent bar and switch from `#F5F6F8` strip to white paper.

### Inputs
- **Editorial underline** style. Flat background (`transparent` or `#F5F6F8`), no box, no side borders — only a 2px hairline bottom border. On focus, bottom border shifts to `#FF8200`. Labels sit above in caps metadata style (10.5px, uppercase, `letter-spacing: 0.12em`, color `--meta`).
- **Checkboxes** — accent-color is Tennessee Orange.

### Navigation
- Role switcher (CREW · FIELD SUP) is a caps text strip, not a button group. Active item is navy bold with an orange dot before it (`::before`) and an orange 2px underline.
- EN/ES toggle: same treatment, minimal — underlines only, no pill containers.
- Photo tabs: same treatment — caps text, orange underline on active.

### Status chips
- Pill radius (`999px`) is reserved for status chips ONLY — never for actions. Height roughly 18–20px, tiny 10px uppercase bold typography with `0.14em` tracking. Pending: orange on `#FEF3C7`. Approved: green on `#DCFCE7`. DO FIRST: orange-deep text on `#FEF3C7`.

## 5. Layout & Spacing
Base unit: **4px**.

| Token | Value | Usage |
|---|---|---|
| xs | 4px | Tight label-to-input gap |
| sm | 8px | Between chips, between metadata items |
| md | 14px | Between list items, scope item padding |
| lg | 20px | Section vertical padding, panel body padding |
| xl | 24px | Between major sections |
| 2xl | 40px | Footer, top of first section below header |

- **Page width**: 100% on mobile, max-width 640px centered on larger viewports.
- **Container padding**: 20px left/right throughout body content.
- **Grid**: Photo grid is `grid-template-columns: repeat(3, 1fr); gap: 6px`. No other grid layouts — content is single-column.
- **Whitespace philosophy**: measured, not lavish. Let typography carry hierarchy; use space to group, not to impress.

## 6. Depth & Elevation
| Level | Shadow | Usage |
|---|---|---|
| Flat | none | All cards, strips, list items (default) |
| FAB | `0 4px 0 rgba(11,31,58,0.2)` | Only the Daily Update FAB. Hard offset, no blur — "letterpress" feel. |
| Modal | `0 20px 40px rgba(11,31,58,0.06)` | Only on bottom-sheet panels (very subtle ambient) |
| Overlay | `rgba(11,31,58,0.4)` fill with `backdrop-filter: blur(4px)` | The modal scrim only |

Depth is communicated through tonal shifts (`#FFFFFF` → `#F5F6F8`), not shadows.

## 7. Do's and Don'ts

### Do
- Left-align everything to a strong vertical axis.
- Use 10.5–11px caps metadata with `0.12em` tracking for labels — it's the signature label style.
- Let typography carry hierarchy. Big Sora numbers and headlines do the heavy lifting; colors only accent.
- Use sharp 4px radii everywhere except status chips (pill) and the FAB's letterpress shadow offset.
- Use outline stroke icons (1.5–2px weight) in navy. Material Symbols outlined works; inline SVG also fine.

### Don't
- Don't add 1px borders around cards or sections.
- Don't use filled/rounded SaaS-y icons.
- Don't use gradients, glassmorphism, blur backdrops (except the modal scrim).
- Don't use orange for body text — orange is a signal, not a reading color.
- Don't center-align body content. Center-align is reserved for the toast and success states only.
- Don't use Space Grotesk, Roboto, Arial, or Tailwind default `gray-*` values.
- Don't use emojis as status icons in new additions — prefer typography or stroke glyphs. (Existing emoji icons from prior prototype are acceptable for continuity.)

## 8. Responsive Behavior
| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | <640px | Primary target. All layouts single-column. |
| Larger | ≥640px | Body caps at 640px, centered on white page bg. Same layout — this is a crew/field-sup tool, desktop view is "what the foreman sees in the truck." |

- Touch targets: minimum 44×44px (FAB is 56, action buttons are 48+ via padding).
- Tables (materials) are scannable at mobile width by default; no horizontal scroll.

## 9. Quick Reference for Coding Agents
1. **Sora** for headlines and numbers; **Inter** for body and UI. Both loaded from Google Fonts at the top of any HTML.
2. Tennessee Orange `#FF8200` is the ONLY accent color — use it for CTAs, active underlines, orange pin, FAB, and the 4px top spine. Nothing else gets orange.
3. No bordered cards. Use `#E2E5EA` hairlines and whitespace.
4. All caps metadata labels: 10.5px, `letter-spacing: 0.12em`, `color: #64748B`, `text-transform: uppercase`, `font-weight: 700`.
5. Radii: 4px everywhere. Status chips are the only exception (999px pill).
6. Active/focus: 2px orange underline or 4px orange left accent bar. Never a focus ring around a button.
