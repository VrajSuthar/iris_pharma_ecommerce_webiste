# Design system — read before touching colors or styling

This file is imported by `CLAUDE.md`, so it loads automatically for every
agent session in this repo. It exists because the UI color scheme was
previously inconsistent: the shadcn theme's `--primary` token was left at
its default grayscale value while ~40 components separately hardcoded
`emerald-*` Tailwind classes as the "real" brand color, so any plain
`<Button>` or unstyled link rendered black instead of on-brand. Follow the
rules below so that doesn't happen again.

## Brand palette

Colors are sampled directly from `public/logo.png` (the IRIS Pharma logo):

| Role                     | Hex (light mode) | Source                                  |
| ------------------------ | ----------------- | ---------------------------------------- |
| **Primary** (teal)       | `#00737c`          | Sampled logo teal `#58c8d0`, darkened for 5.6:1 contrast against white text |
| **Success** (leaf green) | `#2e6720`          | Sampled logo green `#a8d048`, darkened/hue-adjusted for 6.8:1 contrast against white |
| Neutral / text / borders | Tailwind `slate`  | Unchanged — pairs well with the cool teal, no need to replace |
| Destructive               | shadcn default red | Unchanged — standard error semantic |
| Warning                   | Tailwind `amber`  | Unchanged — standard warning semantic |

Both colors are defined as CSS variables in `src/app/globals.css`
(`--primary`, `--success`, plus `-foreground` pairs and light/dark
variants) and registered in the `@theme inline` block as
`--color-primary` / `--color-success`, which is what makes Tailwind
utilities like `bg-primary`, `text-primary`, `bg-success/10` etc. work.

**To re-theme the whole site, change these variables in one place —
`src/app/globals.css` — and every component below updates automatically.**
Do not hardcode a hex value or a Tailwind palette color (`emerald-600`,
`teal-500`, etc.) anywhere else for brand/interactive purposes.

## What each token means

- **`primary` / `text-primary` / `bg-primary`** — the brand teal. Use for
  anything interactive or "this is the brand": buttons, links, active
  nav/tab states, focus rings, the logo fallback monogram, selected-filter
  chips, decorative accents near the logo.
- **`success` / `text-success` / `bg-success`** — the brand green, reserved
  for *positive/status* meaning, not general decoration: in-stock text,
  "delivered" / "active" badges, a success confirmation icon. Don't use it
  for buttons or links — pick `primary` for anything clickable.
- **`destructive`** (shadcn default) — errors, delete actions, "out of
  stock", "cancelled".
- Tailwind's built-in `amber`, `sky`, `violet`, `red` etc. are fine to use
  directly as **categorical** colors where the point is to visually tell
  several unrelated things apart rather than express brand identity. Don't
  reach for these for anything that's actually a brand/interactive/status
  element — that's what `primary`/`success` are for.

## Rules for new UI

1. Never use `bg-primary`'s default via a raw shadcn `<Button variant="default">`
   and *also* hand-roll a competing brand color nearby — pick one. In
   practice: just use `<Button>` (default variant) for brand CTAs; it's
   already teal.
2. For a brand-colored link, chip, active state, or icon circle, use
   `text-primary` / `bg-primary` / `bg-primary/10` — not `emerald-*`,
   `teal-*`, or a hex value.
3. For "this is good/positive/in-stock/delivered", use `text-success` /
   `bg-success/10` — not `green-*` or `emerald-*`.
4. If you need a genuinely new categorical color (a new KPI accent, a new
   order status), it's fine to reach for a plain Tailwind color — just
   keep it out of the `primary`/`success` semantic space so those two stay
   meaningful.
5. Check contrast before changing the `--primary`/`--success` lightness in
   `globals.css` — both are tuned to ~5.5–7:1 against white specifically
   because the logo's raw colors (bright teal, lime green) fail WCAG AA
   contrast on their own. If you swap in the raw brand color you will
   break text-on-color and button legibility.

## Where things live

- `src/app/globals.css` — all color tokens (`:root` and `.dark`).
- `public/logo.png` — the source of truth for brand colors, used by
  `src/components/site-header.tsx`.
- `src/components/ui/button.tsx` — shadcn `Button`, already wired to
  `bg-primary`; don't override its color per-usage.
