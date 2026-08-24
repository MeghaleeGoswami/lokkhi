# Lokhi Design System — Comprehensive Specification

**Last Updated:** Asset extraction complete  
**Target Implementation:** Static HTML/CSS for existing 3 screens + new Big Decisions screen

---

## 1. BRAND SUMMARY

### Core Identity
- **Product Name:** Lokhi (ロキ, from Bengali name for Lakshmi, goddess of wealth)
- **Tagline/Purpose:** Psychology-based, wholistic finance assistant for people living in Japan. Aggregates bank accounts, credit cards, PayPay, tax prep, NISA/investment holdings — deliberately *not* a ledger.
- **One Job:** Make checking in on your money feel like opening something you *want* to open, at whatever level of detail you can handle that day — without ever lying about the numbers underneath.
- **Core Bet:** A fixed core shape everyone shares, wrapped in a shell that adapts to who is looking at it.
- **Language:** English UI for English-speaking residents of Japan; Japan-specific financial nouns keep their real names (NISA, PayPay, furusato nozei, nenkin-net, eMAXIS, MUFG, Rakuten Card, etc.)

### Tone of Voice
- **Register:** Plain, level, unhurried. British-neutral spelling. Short sentences, no jargon, no exclamation marks.
- **Person:** Second person, sparingly ("your owl", "your target"). Lokhi almost never says "I", and "we" appears only where the product genuinely acts on behalf ("We keep an eye on the arithmetic").
- **No brand voice-of-company.** The app describes what is happening, not what it thinks of you.
- **Copy as observations, not verdicts:**
  - ✅ "Growing steadily" · "Still dormant" · "A little room left in this year's NISA"
  - ❌ "Great job!" · "Warning: off track" · "You're below average"
- **Never comparative.** No streaks, no scores, no ranks, no percentile against other users.
- **Behind-target copy uses dormancy and potential** — "Still dormant", "Worth a look" — never "failure", "danger", "alert", "behind schedule".
- **Approximation is a tilde, never a word:** Rounded figures written `~¥4.2M` — never "about ¥4.18M", "roughly", "approx.", "circa". Tilde sits before the sign and symbol (`~+¥62K`).
- **Casing:** Sentence case everywhere (`Net worth`, not `Net Worth` or `NET WORTH`). Only uppercase: 11px eyebrow label with 0.08em tracking. Product nouns keep own casing: NISA, PayPay, eMAXIS Slim.
- **Emoji: never.** Not in UI, not in copy, not in notification text.
- **Labels are nouns, actions are verbs:** Screens = Net worth / Playground / Grow. Buttons = Connect an account, Revisit your contribution, Go with this shape, Later.
- **Provenance is stated:** Any number estimated rather than read gets a source line: "From your nenkin-net estimate".

### The Owl (Lokhi's Bulla System)

The owl is **Lakshmi's *vahana* — the animal she rides — not a generic mascot.** It is a sealed status token revealing situation without exposing a number.

| Stage | Trigger | Palette | Visual Size | Meaning |
|---|---|---|---|---|
| **Egg** | Behind personal target | Dim Ember `#A8613F` | 62% of frame | Dormant potential, not failure |
| **Youngling** | On track (default good state) | Moss Growth `#4C7A5E` | 82% of frame | Growing steadily |
| **Crowned** | Exceeding personal target | Gold Thread `#C99A3D` | 82% of frame | Rare, celebratory, nod to Lakshmi |

**It is relative, never absolute.** Stage reflects progress against personal retirement target computed at onboarding:
- Input: pension income estimate (nenkin-net) → desired replacement ratio → required corpus via safe withdrawal rate → minus current assets
- Output: required savings rate drives stage (egg/youngling/crowned)
- **Never a percentile, never a comparison with other users** — there is nothing shared to compare, which stops this being a thief of joy.

**Disclosure varies by persona:**
- **Avoidant** and **Secure:** See only the owl and its stage, never the formula
- **Anxious:** Get full editable assumptions surface (`AssumptionRow`) — an opaque number driving status is worse than no number at all

### The Fairy Godmother (The Assistant)

The second character in the system, and the only other one. She is the AI assistant: a floating companion available on any screen where a user might have a question.

**Unique properties:**
- **Colour is Wisteria Wand `#8A5AC0`** — the 8th named value and the only one added to the brief's seven. Reserved exclusively for her, deliberately outside every screen identity (unmistakably not Ink Indigo, Coral Pulse, Moss Growth, or a status colour).
- **Screen-independent.** Same colour, same corner, same size on all three screens. This constancy is intentional.
- **She always rides her own light disc.** Never drawn straight onto a screen surface (Wisteria on indigo/coral/moss goes muddy). Sits in Wisteria Wand on a Sand Paper / white circle with 2px Wisteria edge, which separates identically on dark headers and flat sand. **Always the full flying figure — never cropped, masked, or reduced to head.**
- **She respects the persona shell.** `persona` changes her suggested questions and answer precision — she never volunteers precision the shell is hiding.
  - **Avoidant:** "You're okay. Nothing this month needs you to do anything."
  - **Secure:** "Spending is ~5% above your usual month — food, mostly. Your target is still comfortable."
  - **Anxious:** "Net worth moved +¥182,300. ¥141,000 of that is NISA gains; the rest is the salary deposit on the 25th minus rent, which rose ¥4,000 in April."

**Never use Wisteria Wand for anything that is not the assistant, and never recolour the fairy to match a screen.**

### Persona Shell (Adaptive Architecture)

**Fixed for every user:** Three screens, their names and colour identity, navigation, golden path, owl as primary status object.

**Adaptive per persona — the shell decides both *how precise* the figures are and *what information exists on screen at all*:**

| Persona | Default View | Golden Path | Numbers | Structure Shown |
|---|---|---|---|---|
| **Avoidant** | Owl only | Default, barely escapable | Never unprompted (`••••`) | A single generic figure at most. No categories, no line items, no rates. |
| **Secure** | Owl + rough rounded figures | Visible baseline, easy to ignore | Rounded `~¥4.2M` | One level down: category totals (Rent, Food, Bills…) + one overall personal inflation rate |
| **Anxious** | Full numeric detail as default | Rendered as baseline underneath, referenced even when deviating | Full precision, always available | Everything: every transaction, per-category year-on-year price change, editable assumptions |

**Precision and structure move together.** Spending is the clearest case: Avoidant sees "~¥320K this month, roughly" with nothing else; Secure sees five category rows with share bars plus "your own prices are up ~2.4%"; Anxious sees exact category totals, each category's own inflation figure, and every payment expandable inline.

**Numeric detail is additive on top of the owl, not a separate mode.** The manual reveal uses owl imagery (`OwlDetailToggle`), never a settings-style "show detailed view" label.

**The bulla system is on for everyone.** The owl and its stage are part of the fixed core — no persona, no setting turns it off. What varies is only what sits on top.

### Japan-Specific Cultural Notes
- Product ships in English for English-speaking residents of Japan, so Japanese bank and fund names render correctly inline in Noto Sans JP
- Japan-specific financial terms stay in real form: NISA (tax-free savings), PayPay (mobile wallet), furusato nozei (hometown tax donation), nenkin-net (pension calculator), MUFG, Rakuten, eMAXIS Slim (fund name)
- The owl as *vahana* (mount/companion of Lakshmi) references Hindu/Sanskrit tradition, appropriate for a deity-named finance app targeting residents of Japan
- No photography, no grain, no "warm beige fintech" aesthetic — deliberately moving away from Money Forward ME / Moneytree feeling

---

## 2. DESIGN TOKENS

### Colour Tokens (7 Named Core + 1 Reserved)

```css
/* --- Brand core: 7 named values, no more --- */
--ink-indigo: #1C2B4A;          /* Primary, screen identity (Net Worth), inverse surfaces, headings */
--coral-pulse: #F2545B;         /* Action/CTA only, Playground screen identity */
--sand-paper: #F7F1E8;          /* Base background, warm off-white */
--moss-growth: #4C7A5E;         /* On-track status colour, Grow screen identity */
--charcoal-ink: #33302A;        /* Body text, warm black, never #000 */
--gold-thread: #C99A3D;         /* Exceeding target stage, celebratory, rare */
--dim-ember: #A8613F;           /* Behind-target stage, muted (needs attention, not siren) */

/* --- The 8th value, reserved exclusively for the fairy godmother --- */
--wisteria-wand: #8A5AC0;       /* Fairy assistant only, deliberately outside every screen identity */
```

### Derived Tints & Shades (Mixes Only)

```css
/* All derived values are mixes of the 7 core + sand or ink — nothing else */
--ink-indigo-90: #2A3A5C;                   /* Darker ink for inverse-raised */
--ink-indigo-70: #5A6784;                   /* 70% indigo for secondary text */
--ink-indigo-12: #E2E1E4;                   /* 12% indigo tint for accents */
--coral-pulse-press: #D8474E;               /* Pressed state variant */
--coral-pulse-12: #FCE6E4;                  /* Coral tint background */
--moss-growth-press: #3E6650;               /* Pressed state variant */
--moss-growth-12: #E6EBE5;                  /* Moss tint background */
--gold-thread-12: #F5EBDA;                  /* Gold tint background */
--dim-ember-12: #F1E4DA;                    /* Ember tint background */
--wisteria-wand-press: #7648A9;             /* Pressed state variant */
--wisteria-wand-12: #EFE6F8;                /* Wisteria tint background */
--wisteria-wand-on-inverse: #B58BE0;        /* Wisteria on indigo surfaces */
--sand-paper-raised: #FFFDF8;               /* Card surface, slightly warmer than base */
--sand-paper-sunk: #EFE7DA;                 /* Depressed surface variant */
--charcoal-ink-60: #8A857C;                 /* 60% opacity text (muted) */
--charcoal-ink-30: #C7C2B8;                 /* 30% opacity, borders, dividers */
--hairline: #E3DBCC;                        /* Card borders, list separators (1px) */
```

### Semantic Surface Tokens

```css
--surface-base: var(--sand-paper);          /* Screen background */
--surface-card: var(--sand-paper-raised);   /* Card interior, raised warm sand */
--surface-sunk: var(--sand-paper-sunk);     /* Depressed/inactive surface */
--surface-inverse: var(--ink-indigo);       /* Dark inverse for headers */
--surface-inverse-raised: var(--ink-indigo-90);  /* Inverse hover/elevation state */
--border-hairline: var(--hairline);         /* 1px borders */
--border-strong: var(--charcoal-ink-30);    /* Stronger dividers */
```

### Semantic Text Tokens

```css
--text-body: var(--charcoal-ink);           /* Body copy, warm black */
--text-muted: var(--charcoal-ink-60);       /* Secondary text, 60% opacity */
--text-heading: var(--ink-indigo);          /* Headlines, display text */
--text-on-inverse: var(--sand-paper);       /* Text on indigo/dark surfaces */
--text-on-inverse-muted: #A9B2C4;           /* Muted text on inverse */
--text-on-accent: #FFFFFF;                  /* Text on buttons/highlights */
```

### Semantic Action Tokens

```css
--action-primary: var(--coral-pulse);       /* Primary button, CTA, at most one per view */
--action-primary-press: var(--coral-pulse-press);  /* Pressed button state */
--action-primary-tint: var(--coral-pulse-12);     /* Background tint for quiet variant */
--focus-ring: var(--ink-indigo);            /* Focus outline ring */
```

### Assistant Tokens (Fairy Godmother)

```css
--assistant: var(--wisteria-wand);          /* Fairy icon, button, accent */
--assistant-press: var(--wisteria-wand-press);
--assistant-tint: var(--wisteria-wand-12);  /* Background tint */
--assistant-on-inverse: var(--wisteria-wand-on-inverse);  /* On dark surfaces */
--assistant-glyph: #FFFFFF;                 /* Icon colour on button */
--assistant-ring: rgba(138, 90, 192, .22);  /* Focus/hover ring */
```

### Screen Identity Tokens (Fixed per Screen)

```css
--screen-networth: var(--ink-indigo);       /* Net Worth header = Ink Indigo */
--screen-playground: var(--coral-pulse);    /* Playground header = Coral Pulse */
--screen-grow: var(--moss-growth);          /* Grow header = Moss Growth */
```

### Owl Status Stage Tokens

```css
--stage-behind: var(--dim-ember);           /* Egg stage: dormant, muted */
--stage-behind-tint: var(--dim-ember-12);
--stage-ontrack: var(--moss-growth);        /* Youngling stage: growth, default good */
--stage-ontrack-tint: var(--moss-growth-12);
--stage-exceeding: var(--gold-thread);      /* Crowned stage: celebration, rare */
--stage-exceeding-tint: var(--gold-thread-12);
```

### Money Value Polarity Tokens

```css
--value-gain: var(--moss-growth);           /* Positive delta, never exclamation */
--value-loss: var(--dim-ember);             /* Negative delta, muted not siren */
--value-flat: var(--charcoal-ink-60);       /* Zero change */
```

### Colour Discipline Rules
- **Coral Pulse and Gold Thread should almost never share a screen** — if everything is highlighted, nothing is
- **Coral Pulse is *actions only*; selected states use Ink Indigo instead**
- **Dim Ember is behind-target only, deliberately muted** — "needs attention", never a warning siren; it never becomes a screen identity or CTA
- **Max two background colours per view:** Sand Paper + one identity colour
- **Stage-tinted cards (12% Moss/Dim Ember/Gold)** are for status only, never decoration
- **Inverse cards are flat Ink Indigo with no border**

---

### Typography Tokens

```css
/* Font Families — 3 roles */
--font-display-jp: "Zen Maru Gothic", "Hiragino Maru Gothic ProN", sans-serif;
--font-display-latin: "General Sans", "Zen Maru Gothic", system-ui, sans-serif;
--font-body: "Noto Sans JP", "Hiragino Kaku Gothic ProN", system-ui, sans-serif;
--font-data: "General Sans", "Noto Sans JP", system-ui, sans-serif;

/* Weights */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-black: 900;

/* Size Scale (px, 1.25-ish tuned so hero number breathes) */
--size-hero: 56px;          /* One-off display, net worth hero figure */
--size-display: 40px;       /* Large titles, prominent figures */
--size-title: 28px;         /* Screen titles, section headers */
--size-section: 20px;       /* Subsection headings, like "What's connected" */
--size-body-lg: 17px;       /* Large body text, inputs */
--size-body: 15px;          /* Standard body text, card content */
--size-caption: 13px;       /* Secondary text, help text, badges */
--size-micro: 11px;         /* Eyebrow labels with 0.08em tracking uppercase */

/* Line Heights */
--leading-tight: 1.08;      /* Display lines */
--leading-snug: 1.3;        /* Headings */
--leading-body: 1.62;       /* Body text, comfortable reading */

/* Tracking (Letter Spacing) */
--tracking-hero: -0.02em;   /* Hero numbers, compressed */
--tracking-title: -0.01em;  /* Display, titles */
--tracking-body: 0;         /* Body text, normal */
--tracking-micro: 0.08em;   /* Eyebrow labels uppercase */
```

### Utility Type Classes

```css
.lokhi-hero-number {
  font-family: var(--font-data);
  font-weight: var(--weight-bold);
  font-size: var(--size-hero);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-hero);
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;
  color: var(--text-heading);
}

.lokhi-money {
  font-family: var(--font-data);
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;
  letter-spacing: 0;
}

.lokhi-display {
  font-family: var(--font-display-latin);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-title);
  color: var(--text-heading);
}

.lokhi-body {
  font-family: var(--font-body);
  font-size: var(--size-body);
  line-height: var(--leading-body);
  color: var(--text-body);
}

.lokhi-eyebrow {
  font-family: var(--font-body);
  font-size: var(--size-micro);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-micro);
  text-transform: uppercase;
  color: var(--text-muted);
}
```

**Font Sources (Public CDNs):**
- **Zen Maru Gothic** — Google Fonts; JP display face
- **Noto Sans JP** — Google Fonts; body face for Japanese glyph rendering
- **General Sans** — Fontshare; Latin display face (chosen for wider numeral set vs Cabinet Grotesk)

**Money Numerals (Non-Negotiable for Axious Users):**
- `font-variant-numeric: tabular-nums lining-nums;`
- `font-feature-settings: "tnum" 1, "lnum" 1;`
- Misaligned numbers destroy trust; this is the first thing an Anxious user notices.

---

### Spacing Tokens

```css
/* 4px base scale */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;

/* Semantic spacing */
--gutter-screen: 20px;      /* Phone edge padding on all four sides */
--gutter-card: 20px;        /* Inside a card */
--stack-tight: 8px;         /* Close element spacing */
--stack: 16px;              /* Normal vertical/flex gap */
--stack-loose: 28px;        /* Section stacking, generous gap */
--section-gap: 40px;        /* Major section separation */
--tap-min: 44px;            /* Minimum tap target (never smaller) */
```

**Spacing Rules:**
- Screen gutter: 20px (both sides)
- Card padding: 20px
- Stack (vertical gap): 16px
- Loose stack: 28px
- Section gap: 40px
- All tap targets: minimum 44px

---

### Radius Tokens

```css
/* Rounded, never a blob: radii step up with surface size, capped below pill except for controls */
--radius-xs: 6px;           /* Smallest radius for tight elements */
--radius-sm: 10px;          /* Small elements, icon tiles */
--radius-md: 14px;          /* Fields, inputs */
--radius-lg: 20px;          /* Cards, standard surfaces */
--radius-xl: 28px;          /* Sheets, larger surfaces */
--radius-pill: 999px;       /* Fully rounded (buttons, chips, toggles) */

/* Semantic radii */
--radius-card: var(--radius-lg);        /* 20px for cards */
--radius-sheet: var(--radius-xl);       /* 28px for bottom sheets */
--radius-control: var(--radius-pill);   /* Pill for all interactive controls */
--radius-field: var(--radius-md);       /* 14px for input fields */
```

**Radius Discipline:**
- Cards: 20px
- Bottom sheets: 28px top corners only
- Controls (buttons, chips, toggles): pill (999px)
- Fields: 14px
- Nothing above 28px on a rectangular surface
- Rounded but never a blob

---

### Elevation & Shadow Tokens

```css
/* Warm shadows only — tinted with charcoal, never neutral black */
--shadow-none: none;

--shadow-1: 0 1px 2px rgba(51, 48, 42, .06);        /* Base elevation, cards */
--shadow-2: 0 2px 8px rgba(51, 48, 42, .07);        /* Hover, interactive cards */
--shadow-3: 0 8px 24px rgba(51, 48, 42, .09);       /* Floating, fairy button */

--shadow-sheet: 0 -8px 32px rgba(28, 43, 74, .14);  /* Bottom sheet (indigo-tinted) */
--inset-sunk: inset 0 1px 2px rgba(51, 48, 42, .07);  /* Tracks, progress rails, sunken surfaces */

--ring-focus: 0 0 0 3px rgba(28, 43, 74, .22);      /* Ink indigo focus ring (3px) */
--ring-accent: 0 0 0 3px rgba(242, 84, 91, .22);    /* Coral pulse ring (unused — never used) */
```

**Shadow Discipline:**
- Warm and low: RGBA(51, 48, 42, .06–.09)
- Never neutral black
- Three steps plus `--inset-sunk` for tracks/progress
- At most one elevation-3 surface per view
- Hover state on cards: lift 1px and step to `--shadow-3`

---

### Motion & Animation Tokens

```css
/* One standard ease for everything: sharp entrance, gentle exit */
--ease-standard: cubic-bezier(.2, .8, .25, 1);      /* Primary ease, all transitions */
--ease-settle: cubic-bezier(.34, 1.4, .5, 1);       /* One soft overshoot — owl lands only */
--ease-exit: cubic-bezier(.4, 0, 1, 1);             /* Exit/close animations */

/* Durations */
--dur-instant: 90ms;        /* Press feedback, scale */
--dur-fast: 160ms;          /* Interactions, colour changes */
--dur-base: 240ms;          /* Surfaces, cards, transitions */
--dur-slow: 420ms;          /* Sheet open/close, floating in */
--dur-owl: 640ms;           /* Owl stage landing, entrance, soft overshoot */

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-instant: 0ms;
    --dur-fast: 0ms;
    --dur-base: 0ms;
    --dur-slow: 0ms;
    --dur-owl: 0ms;
  }
}

/* Keyframe animations */
@keyframes lokhi-fairy-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes lokhi-fairy-float {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Motion Discipline:**
- One ease for everything: `cubic-bezier(.2, .8, .25, 1)` at 160ms (interactions) / 240ms (surfaces) / 420ms (sheets)
- One exception: `--ease-settle` `cubic-bezier(.34, 1.4, .5, 1)` at 640ms, reserved for owl landing only — single soft overshoot
- Nothing else in product bounces
- Owl stage changes: fade + rise 6px
- Numbers: fade in, never count up
- `prefers-reduced-motion` zeroes every duration

---

### Base Styles

```css
html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  background: var(--surface-base);           /* Sand Paper */
  color: var(--text-body);                   /* Charcoal Ink */
  font-family: var(--font-body);
  font-size: var(--size-body);
  line-height: var(--leading-body);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-display-latin);
  color: var(--text-heading);
  letter-spacing: var(--tracking-title);
  margin: 0;
}

h1 { font-size: var(--size-display); line-height: var(--leading-tight); }
h2 { font-size: var(--size-title); line-height: var(--leading-snug); }
h3 { font-size: var(--size-section); line-height: var(--leading-snug); }

p { margin: 0; }

a {
  color: var(--ink-indigo);
  text-decoration-color: var(--charcoal-ink-30);
  text-underline-offset: 3px;
  transition: color var(--dur-fast) var(--ease-standard);
}

a:hover {
  color: var(--coral-pulse);
  text-decoration-color: var(--coral-pulse);
}

:focus-visible {
  outline: none;
  box-shadow: var(--ring-focus);
  border-radius: var(--radius-xs);
}

button {
  font: inherit;
}
```

---

## 3. COMPONENT PATTERNS

All components are designed for pixel-perfect static HTML/CSS translation from React. Key inline styles and CSS values are preserved verbatim for rebuild.

### Button

**Variants:**
1. **Primary** (Coral Pulse CTA)
   - Background: `var(--coral-pulse)` → `#F2545B`
   - Text: `var(--text-on-accent)` → `#FFFFFF`
   - Pressed: Background `#D8474E`, scale 0.975
   - Shadow: `var(--shadow-2)` (unpressed) → `none` (pressed)
   - Border: none (1px transparent)

2. **Secondary** (Neutral action)
   - Background: `var(--surface-card)` → `#FFFDF8`
   - Text: `var(--text-heading)` → `#1C2B4A`
   - Border: `1px solid var(--border-hairline)` → `#E3DBCC`
   - Pressed: Background `#EFE7DA`, shadow removed
   - Shadow: `var(--shadow-1)`

3. **Ghost** (Minimal)
   - Background: Pressed `#EFE7DA`, unpressed transparent
   - Border: `1px solid transparent`
   - Text: `var(--text-heading)` → `#1C2B4A`

4. **Quiet** (Soft)
   - Background: `var(--action-primary-tint)` → `#FCE6E4`
   - Text: `var(--coral-pulse-press)` → `#D8474E`
   - Border: `1px solid transparent`

5. **Inverse** (On dark backgrounds)
   - Background: `rgba(247, 241, 232, .12)` unpressed / `#2A3A5C` pressed
   - Border: `1px solid rgba(247, 241, 232, .22)`
   - Text: `var(--text-on-inverse)` → `#F7F1E8`

**Structure:**
```html
<button
  style="
    display: flex; align-items: center; justify-content: center;
    height: [36|44|52]px; padding: 0 [14|20|26]px;
    border-radius: var(--radius-pill);
    gap: [6|8|10]px;
    font-size: var(--size-[caption|body|body-lg]);
    font-weight: var(--weight-medium);
    cursor: pointer;
    transform: scale(.975) [when pressed];
    transition: transform var(--dur-instant) var(--ease-standard), 
                background var(--dur-fast) var(--ease-standard),
                box-shadow var(--dur-fast) var(--ease-standard);
  "
>
  [Icon] [Label] [IconEnd]
</button>
```

**States:**
- Press: `scale(.975)` + darker background + shadow removed (90ms instant)
- Hover (desktop): Cards lift 1px and step to `--shadow-3`; secondary buttons darken
- Focus: 3px Ink Indigo ring

---

### Card

**Tones:**
1. **Base** (Default)
   - Background: `var(--surface-card)` → `#FFFDF8`
   - Border: `1px solid var(--border-hairline)` → `#E3DBCC`
   - Shadow: `var(--shadow-1)`

2. **Sunk**
   - Background: `var(--surface-sunk)` → `#EFE7DA`
   - Border: `1px solid transparent`

3. **Inverse**
   - Background: `var(--surface-inverse)` → `#1C2B4A`
   - Color: `var(--text-on-inverse)` → `#F7F1E8`
   - Border: `1px solid transparent`

4. **On-track / Behind / Exceeding** (Status tints)
   - On-track: Background `#E6EBE5` (12% moss)
   - Behind: Background `#F1E4DA` (12% ember)
   - Exceeding: Background `#F5EBDA` (12% gold)

**Structure:**
```html
<div
  style="
    padding: var(--gutter-card);
    border-radius: var(--radius-card);
    box-shadow: [var(--shadow-1) or var(--shadow-3) on hover];
    transform: [translateY(-1px) on interactive hover];
    transition: box-shadow var(--dur-base) var(--ease-standard),
                transform var(--dur-base) var(--ease-standard);
  "
>
  [content]
</div>
```

**Rules:**
- Elevation 1 by default (only sheets go higher)
- Max one elevation-3 per view
- Rounded 20px, never a blob
- Raised warm sand surface `#FFFDF8` on Sand Paper base
- 1px `#E3DBCC` hairline border
- Stage-tinted cards (12% opacity) for status only, never decoration

---

### Badge

**Tones:**
- **Neutral** (default): Background `#EFE7DA` / Text `#8A857C`
- **On-track**: Background `#E6EBE5` / Text `#4C7A5E`
- **Behind**: Background `#F1E4DA` / Text `#A8613F`
- **Exceeding**: Background `#F5EBDA` / Text `#C99A3D`
- **Accent**: Background `#FCE6E4` / Text `#D8474E`
- **Inverse**: Background `rgba(247, 241, 232, .14)` / Text `#F7F1E8`

**Structure:**
```html
<span
  style="
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    border-radius: var(--radius-pill);
    background: [tone-color];
    color: [tone-text];
    font-size: var(--size-micro);
    font-weight: var(--weight-medium);
    letter-spacing: 0.02em;
    white-space: nowrap;
  "
>
  [label]
</span>
```

**Rules:**
- Small status word, carries meaning, never decoration
- Solid variant: background becomes text colour, text becomes white
- Always pill-shaped

---

### Chip (Filter)

**Structure:**
```html
<button
  style="
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 34px;
    padding: [0 14px] or [0 14px 0 11px with icon];
    border-radius: var(--radius-pill);
    background: [selected ? var(--ink-indigo) : var(--surface-card)];
    color: [selected ? #F7F1E8 : var(--text-body)];
    border: 1px solid [selected ? var(--ink-indigo) : var(--border-hairline)];
    font-size: var(--size-caption);
    font-weight: var(--weight-medium);
    cursor: pointer;
    transition: background var(--dur-fast) var(--ease-standard),
                color var(--dur-fast) var(--ease-standard);
  "
>
  [Icon] [Label]
</button>
```

**Rules:**
- Selectable filter chip for accounts, months, categories
- Selected: Ink Indigo background, Sand Paper text
- Unselected: Card background, body text, hairline border

---

### Icon

**System:** Lucide (lucide-static@0.446.0) loaded from CDN as CSS mask via `maskImage` property, inherits `currentColor`

**Sizes:** 16 / 20 / 24px only, always inside ≥44px tap target

**Structure:**
```html
<span
  style="
    display: inline-block;
    width: [size]px;
    height: [size]px;
    flex: 0 0 auto;
    background: currentColor;
    -webkit-mask-image: url('https://unpkg.com/lucide-static@0.446.0/icons/[name].svg');
    mask-image: url('https://unpkg.com/lucide-static@0.446.0/icons/[name].svg');
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
  "
  role="presentation"
></span>
```

**Icon Tiles in Lists:** 36px container, 10px radius, sunk sand background (`#EFE7DA`), Ink Indigo glyph (`#1C2B4A`)

**Rules:**
- Line icons, rounded caps, 2px stroke
- Status is never an icon (no up/down arrows, warning triangles, check-circle)
- Polarity = colour + sign on tabular figure
- No emoji, no unicode glyphs as icons, no hand-drawn SVG

---

### ListRow

**Structure:**
```html
<div
  style="
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--tap-min);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--border-hairline);
  "
>
  <!-- Icon tile (optional) -->
  <span style="
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    border-radius: var(--radius-sm);
    background: var(--surface-sunk);
    color: var(--ink-indigo);
  ">
    [Icon]
  </span>

  <!-- Label + sublabel -->
  <span style="flex: 1; min-width: 0;">
    <span style="
      display: block;
      font-size: var(--size-body);
      font-weight: var(--weight-medium);
      color: var(--text-body);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    ">
      [label]
    </span>
    <span style="
      display: block;
      margin-top: 3px;
      font-size: var(--size-caption);
      color: var(--text-muted);
      line-height: 1.4;
    ">
      [sublabel]
    </span>
  </span>

  <!-- Money value + delta (optional) -->
  <span style="text-align: right;">
    [MoneyValue amount]
    [MoneyValue delta - block, small]
  </span>

  <!-- Chevron (optional) -->
  [Icon chevron-right]
</div>
```

**Rules:**
- One account/transaction line
- Money on right, tabular, always aligned
- Tap target ≥44px
- Border-bottom on all but last row
- Icon tile: 36×36px, 10px radius, sunk background

---

### ScreenHeader

**Structure:**
```html
<header
  style="
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-5) var(--gutter-screen) var(--space-4);
    background: [inverse ? identity-colour : transparent];
    color: [inverse ? #F7F1E8 : var(--text-heading)];
  "
>
  <!-- Owl thumbnail (optional, only on Grow screen) -->
  [img owlSrc(stage, inverse ? 'sand' : 'ink') - 30px wide]

  <!-- Title + subtitle -->
  <div style="flex: 1; min-width: 0;">
    <h2 style="
      font-family: var(--font-display-latin);
      font-size: var(--size-title);
      font-weight: var(--weight-bold);
      letter-spacing: var(--tracking-title);
      line-height: 1.2;
      color: inherit;
      margin: 0;
    ">
      [title]
    </h2>
    <p style="
      margin: 4px 0 0;
      font-size: var(--size-caption);
      color: [inverse ? #A9B2C4 : var(--text-muted)];
    ">
      [subtitle]
    </p>
  </div>

  <!-- Action button (optional) -->
  <button style="
    display: grid;
    place-items: center;
    width: var(--tap-min);
    height: var(--tap-min);
    border-radius: var(--radius-pill);
    background: [inverse ? rgba(247, 241, 232, .12) : var(--surface-card)];
    border: 1px solid [inverse ? rgba(247, 241, 232, .2) : var(--border-hairline)];
    color: inherit;
    cursor: pointer;
  ">
    [Icon]
  </button>
</header>
```

**Screens:** Net Worth (Ink Indigo inverse) / Playground (Coral Pulse, not inverse) / Grow (Moss Growth, not inverse)

---

### ScreenTabBar (Navigation)

**Structure:**
```html
<nav
  style="
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3) var(--space-4);
    background: var(--surface-card);
    border-top: 1px solid var(--border-hairline);
  "
>
  <!-- Each screen tab -->
  <button
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-height: var(--tap-min);
      padding: 6px 0 4px;
      border: none;
      background: transparent;
      cursor: pointer;
      color: [active ? screen-colour : var(--text-muted)];
      font-size: var(--size-micro);
      font-weight: [active ? var(--weight-medium) : var(--weight-regular)];
      transition: color var(--dur-fast) var(--ease-standard);
    "
  >
    <!-- Icon background pill -->
    <span style="
      display: grid;
      place-items: center;
      width: 44px;
      height: 26px;
      border-radius: var(--radius-pill);
      background: [active ? color-mix(in srgb, screen-colour 12%, transparent) : transparent];
      transition: background var(--dur-fast) var(--ease-standard);
    ">
      [Icon]
    </span>
    [Label]
  </button>
</nav>
```

**Three Fixed Screens:**
| ID | Label | Icon | Color |
|---|---|---|---|
| networth | Net worth | moon-star | `var(--screen-networth)` → `#1C2B4A` |
| playground | Playground | shapes | `var(--screen-playground)` → `#F2545B` |
| grow | Grow | sprout | `var(--screen-grow)` → `#4C7A5E` |

**Rules:**
- Three buttons only, never more
- Fixed bottom navigation (always visible)
- Active state: screen colour icon + 12% tint background + medium weight
- Inactive: muted text, no background

---

### MoneyValue

**Implementation:** The one and only place yen figures go through. Persona decides precision; numerals are always tabular.

**Rounding Rules (One Meaningful Digit):**
```
4,182,300 → "~¥4.2M"
842,300 → "~¥840K"
62,400 → "~¥62K"
```

**Personas:**
- **Avoidant:** `••••` (never shown unless revealed)
- **Secure:** `~¥4.2M` (rounded, tilde prefix)
- **Anxious:** `¥4,182,300` (full precision, comma separators)

**Structure:**
```html
<span
  style="
    font-family: var(--font-data);
    font-size: [size-var];
    font-weight: [size-weight];
    letter-spacing: [size-tracking];
    line-height: 1.2;
    font-variant-numeric: tabular-nums lining-nums;
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    color: [polarity-colour];
    white-space: nowrap;
  "
>
  [sign][approxLabel]¥[figure]
</span>
```

**Polarity:**
- Gain (positive): `var(--value-gain)` → `#4C7A5E` (moss growth)
- Loss (negative): `var(--value-loss)` → `#A8613F` (dim ember)
- Flat (zero): `var(--value-flat)` → `#8A857C` (muted)

**Sizes:**
- **Hero:** 56px, bold, tight leading, `-0.02em` tracking
- **Display:** 40px, bold, `-0.02em` tracking
- **Title:** 28px, semibold, `-0.01em` tracking
- **Body:** 15px, medium
- **Caption:** 13px, medium

---

### OwlStatus

**Stage-Tint Matrix (3 stages × 5 tints = 15 PNGs):**

| Stage | Dim Ember | Moss Growth | Gold Thread | Ink Indigo | Sand Paper |
|---|---|---|---|---|---|
| **Egg** | egg-egg | - | - | egg-ink | egg-sand |
| **Youngling** | young-egg | young-young | - | young-ink | young-sand |
| **Crowned** | crown-egg | crown-young | crown-crown | crown-ink | crown-sand |

**Stage Metadata:**
```javascript
{
  egg: {
    file: 'owl-egg',
    tint: 'egg',
    color: 'var(--stage-behind)', // #A8613F
    halo: 'var(--stage-behind-tint)', // #F1E4DA at 12%
    label: 'Egg',
    caption: 'Dormant potential'
  },
  youngling: {
    file: 'owl-young',
    tint: 'young',
    color: 'var(--stage-ontrack)', // #4C7A5E
    halo: 'var(--stage-ontrack-tint)', // #E6EBE5 at 12%
    label: 'Youngling',
    caption: 'Growing steadily'
  },
  crowned: {
    file: 'owl-crown',
    tint: 'crown',
    color: 'var(--stage-exceeding)', // #C99A3D
    halo: 'var(--stage-exceeding-tint)', // #F5EBDA at 12%
    label: 'Crowned',
    caption: 'Ahead of your target'
  }
}
```

**Structure:**
```html
<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
">
  <!-- Halo + Owl -->
  <div style="
    position: relative;
    width: [size]px;
    height: [size]px;
    display: grid;
    place-items: center;
  ">
    <!-- Radial gradient halo (optional) -->
    <span style="
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(
        circle at 50% 52%,
        [halo-colour] 0%,
        [halo-colour] 58%,
        transparent 72%
      );
      transform: scale([in ? 1 : .9]);
      opacity: [in ? 1 : 0];
      transition: transform var(--dur-owl) var(--ease-settle),
                  opacity var(--dur-owl) var(--ease-standard);
    "></span>

    <!-- Owl image -->
    <img
      src="assets/owl/[stage]-[tint].png"
      style="
        position: relative;
        width: [stage === 'egg' ? size * .62 : size * .82]px;
        height: auto;
        transform: translateY([in ? 0 : 6]px) scale([in ? 1 : .94]);
        opacity: [in ? 1 : 0];
        transition: transform var(--dur-owl) var(--ease-settle),
                    opacity var(--dur-slow) var(--ease-standard);
      "
      alt="[label]"
    />
  </div>

  <!-- Caption (optional) -->
  <span style="
    font-family: var(--font-display-latin);
    font-size: var(--size-body);
    font-weight: var(--weight-medium);
    color: [stage-colour];
    text-align: center;
  ">
    [caption]
  </span>
</div>
```

**Sizes:**
- **Header (Net Worth):** 172px
- **Playground scenario card:** 92px
- **Grow header:** 96px
- **Owl detail toggle:** 24px (in 32px circle)

**Animation:**
- Entrance: rise 6px + scale 0.94, fade in over `--dur-owl` (640ms) with `--ease-settle` (soft overshoot)
- Halo: fade in and scale from 0.9 to 1 simultaneously

---

### OwlDetailToggle

**Purpose:** Reveals numeric detail using owl imagery rather than settings-style label. Tap small owl to open its eyes on numbers.

**Structure:**
```html
<button
  aria-pressed="[revealed]"
  style="
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--tap-min);
    padding: 0 16px 0 8px;
    border-radius: var(--radius-pill);
    background: [revealed ? var(--surface-sunk) : var(--surface-card)];
    border: 1px solid var(--border-hairline);
    cursor: pointer;
    font-size: var(--size-caption);
    font-weight: var(--weight-medium);
    color: var(--text-heading);
    transition: background var(--dur-fast) var(--ease-standard);
  "
>
  <!-- Owl thumbnail in circle -->
  <span style="
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--sand-paper-sunk);
    overflow: hidden;
  ">
    <img
      src="assets/owl/[stage]-ink.png"
      style="
        width: 24px;
        opacity: [revealed ? 1 : .45];
        filter: [revealed ? none : blur(1.2px)];
        transition: opacity var(--dur-base) var(--ease-standard),
                    filter var(--dur-base) var(--ease-standard);
      "
      alt=""
    />
  </span>

  <!-- Label -->
  [revealed ? "Hide the numbers" : "Show the numbers"]
</button>
```

**Rules:**
- Always shows owl state visually (blur = hidden, clear = revealed)
- No settings-style label, pure visual metaphor
- Never shows full precision by default for Avoidant user

---

### TargetProgress

**Purpose:** Progress against user's personal target as soft rounded bar. Values >1 overflow into Gold Thread segment.

**Structure:**
```html
<div>
  <!-- Label row (optional) -->
  <div style="
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--space-2);
  ">
    <span style="
      font-size: var(--size-caption);
      color: var(--text-muted);
    ">
      [label]
    </span>
    <span style="
      font-family: var(--font-data);
      font-size: var(--size-caption);
      font-weight: var(--weight-semibold);
      font-variant-numeric: tabular-nums lining-nums;
      color: [stage-colour];
    ">
      [showPercent ? Math.round(value * 100) + '%' : null]
    </span>
  </div>

  <!-- Progress bar -->
  <div style="
    position: relative;
    height: [height]px;
    border-radius: var(--radius-pill);
    background: var(--surface-sunk);
    overflow: hidden;
    box-shadow: var(--inset-sunk);
  ">
    <!-- Main progress (0 to 1) -->
    <div style="
      position: absolute;
      inset: 0 auto 0 0;
      width: [Math.max(0, Math.min(1, value)) * 100]%;
      background: [stage-colour];
      border-radius: var(--radius-pill);
      transition: width var(--dur-slow) var(--ease-standard);
    "></div>

    <!-- Overflow to gold (if value > 1) -->
    <div style="
      position: absolute;
      inset: 0 0 0 auto;
      width: [Math.max(0, Math.min(0.35, value - 1)) * 100]%;
      background: var(--gold-thread);
      border-radius: var(--radius-pill);
    "></div>
  </div>
</div>
```

**Rules:**
- Values capped at 0 (never negative) and 1 (main fill)
- Overflow segment max 35% of bar width
- Heights: typically 8px, 10px, or 14px
- Transitions on width, never animated fill

---

### GoldenPath

**Purpose:** Recommended baseline trajectory (dashed gold line) with actual trajectory (solid coloured line) on top.

**Structure:**
```html
<div>
  <!-- Legend -->
  <div style="
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: var(--space-3);
  ">
    <span style="
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: var(--size-caption);
      color: var(--text-muted);
    ">
      <span style="
        width: 16px;
        height: 0;
        border-top: 2px dashed var(--gold-thread);
      "></span>
      Golden path
      <span style="
        width: 16px;
        height: 0;
        border-top: 2px solid [ahead ? #4C7A5E : #A8613F];
        margin-left: 8px;
      "></span>
      Actual
    </span>

    <!-- Optional value display -->
    <span style="[showValues ? 'display' : 'none']">
      [MoneyValue last value - caption size]
    </span>
  </div>

  <!-- SVG chart -->
  <svg viewBox="0 0 600 [height]" preserveAspectRatio="none" style="
    display: block;
    width: 100%;
    height: [height]px;
    overflow: visible;
  ">
    <!-- Baseline (gold dashed) -->
    <path
      d="[path(baseline)]"
      fill="none"
      stroke="var(--gold-thread)"
      stroke-width="2"
      stroke-dasharray="5 6"
      stroke-linecap="round"
      opacity="0.75"
    />

    <!-- Actual trajectory (solid, colour-coded) -->
    <path
      d="[path(actual)]"
      fill="none"
      stroke="[ahead ? #4C7A5E : #A8613F]"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- End-point circle (if data exists) -->
    <circle
      cx="[endX]"
      cy="[endY]"
      r="5"
      fill="[ahead ? #4C7A5E : #A8613F]"
      stroke="var(--surface-card)"
      stroke-width="2.5"
    />
  </svg>
</div>
```

**Rules:**
- Baseline always present (dashed gold)
- Actual: solid line, colour polarity (moss if ahead, ember if behind)
- Never counted/animated numbers (fade in only)
- Heights: 96px (Net Worth), 104px (Playground)

---

### Field (Text Input)

**Structure:**
```html
<label style="display: block;">
  <!-- Label (optional) -->
  <span style="
    display: block;
    margin-bottom: var(--space-2);
    font-size: var(--size-caption);
    font-weight: var(--weight-medium);
    color: var(--text-body);
  ">
    [label]
  </span>

  <!-- Input container -->
  <span style="
    display: flex;
    align-items: center;
    gap: 6px;
    height: var(--tap-min);
    padding: 0 14px;
    border-radius: var(--radius-field);
    background: [disabled ? var(--surface-sunk) : var(--surface-card)];
    border: 1px solid [focus ? var(--ink-indigo) : var(--border-hairline)];
    box-shadow: [focus ? var(--ring-focus) : none];
    transition: border-color var(--dur-fast) var(--ease-standard),
                box-shadow var(--dur-fast) var(--ease-standard);
  ">
    <!-- Prefix (optional) -->
    <span style="
      color: var(--text-muted);
      font-family: var(--font-data);
      font-size: var(--size-body);
    ">
      [prefix]
    </span>

    <!-- Input -->
    <input
      type="[text|number]"
      style="
        flex: 1;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        font-family: [money ? var(--font-data) : var(--font-body)];
        font-size: var(--size-body);
        color: var(--text-body);
        font-variant-numeric: [money ? tabular-nums lining-nums : normal];
        text-align: [money ? right : left];
      "
      placeholder="[placeholder]"
      disabled="[disabled]"
    />

    <!-- Suffix (optional) -->
    <span style="
      color: var(--text-muted);
      font-size: var(--size-caption);
    ">
      [suffix]
    </span>
  </span>

  <!-- Hint (optional) -->
  <span style="
    display: block;
    margin-top: 6px;
    font-size: var(--size-micro);
    color: var(--text-muted);
  ">
    [hint]
  </span>
</label>
```

**Rules:**
- Money inputs get tabular numerals automatically, right-aligned
- Focus ring via box-shadow
- Minimum 44px height
- Disabled state: sunk background

---

### Select

**Structure:**
```html
<label style="display: block;">
  <!-- Label (optional) -->
  <span style="
    display: block;
    margin-bottom: var(--space-2);
    font-size: var(--size-caption);
    font-weight: var(--weight-medium);
    color: var(--text-body);
  ">
    [label]
  </span>

  <!-- Select wrapper -->
  <span style="position: relative; display: block;">
    <select
      style="
        appearance: none;
        width: 100%;
        height: var(--tap-min);
        padding: 0 40px 0 14px;
        border-radius: var(--radius-field);
        background: var(--surface-card);
        border: 1px solid var(--border-hairline);
        color: var(--text-body);
        font-size: var(--size-body);
        cursor: pointer;
      "
    >
      [options]
    </select>

    <!-- Chevron icon overlay -->
    <span style="
      position: absolute;
      right: 14px;
      top: 50%;
      margin-top: -8px;
      color: var(--text-muted);
      pointer-events: none;
    ">
      [Icon chevron-down - 16px]
    </span>
  </span>

  <!-- Hint (optional) -->
  <span style="
    display: block;
    margin-top: 6px;
    font-size: var(--size-micro);
    color: var(--text-muted);
  ">
    [hint]
  </span>
</label>
```

**Rules:**
- Native `<select>` styled
- appearance: none to allow custom styling
- Chevron icon overlaid (non-interactive)

---

### SegmentedControl

**Structure:**
```html
<div style="
  display: [fullWidth ? grid : inline-grid];
  grid-template-columns: repeat([numOptions], 1fr);
  gap: 2px;
  padding: 3px;
  border-radius: var(--radius-pill);
  background: var(--surface-sunk);
  box-shadow: var(--inset-sunk);
">
  <!-- Each option button -->
  <button
    style="
      height: 34px;
      padding: 0 12px;
      border: none;
      border-radius: var(--radius-pill);
      background: [active ? var(--surface-card) : transparent];
      box-shadow: [active ? var(--shadow-1) : none];
      color: [active ? var(--text-heading) : var(--text-muted)];
      font-size: var(--size-caption);
      font-weight: [active ? var(--weight-medium) : var(--weight-regular)];
      cursor: pointer;
      white-space: nowrap;
      transition: background var(--dur-fast) var(--ease-standard),
                  color var(--dur-fast) var(--ease-standard);
    "
  >
    [label]
  </button>
</div>
```

**Rules:**
- Active: Card background, shadow, medium weight, heading colour
- Inactive: Transparent, muted text, regular weight
- Always pill-shaped
- 2px spacing between options

---

### Switch (Toggle)

**Structure:**
```html
<label style="
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--tap-min);
  cursor: [disabled ? default : pointer];
  opacity: [disabled ? .5 : 1];
">
  <!-- Text -->
  <span style="flex: 1;">
    <span style="
      display: block;
      font-size: var(--size-body);
      color: var(--text-body);
    ">
      [label]
    </span>
    <span style="
      display: block;
      font-size: var(--size-caption);
      color: var(--text-muted);
      line-height: 1.45;
    ">
      [description]
    </span>
  </span>

  <!-- Toggle track -->
  <span
    onClick="[handle toggle if not disabled]"
    style="
      position: relative;
      flex: 0 0 auto;
      width: 48px;
      height: 28px;
      border-radius: var(--radius-pill);
      background: [checked ? var(--moss-growth) : var(--charcoal-ink-30)];
      transition: background var(--dur-base) var(--ease-standard);
    "
  >
    <!-- Toggle thumb -->
    <span style="
      position: absolute;
      top: 3px;
      left: [checked ? 23 : 3]px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--sand-paper-raised);
      box-shadow: var(--shadow-1);
      transition: left var(--dur-base) var(--ease-settle);
    "></span>
  </span>
</label>
```

**Rules:**
- Track turns Moss Growth when on
- Thumb has shadow, always circular
- Uses `--ease-settle` for smooth thumb animation

---

### AssumptionRow

**Purpose:** One editable assumption (return, retirement age, inflation, pension estimate). Anxious persona only.

**Structure:**
```html
<div style="
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-hairline);
">
  <!-- Label + value -->
  <div style="
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
    margin-bottom: 6px;
  ">
    <span style="
      font-size: var(--size-body);
      color: var(--text-body);
    ">
      [label]
    </span>
    <span style="
      font-family: var(--font-data);
      font-size: var(--size-body-lg);
      font-weight: var(--weight-semibold);
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--text-heading);
    ">
      [value][unit]
    </span>
  </div>

  <!-- Range input with visual indicator -->
  <input
    type="range"
    min="[min]"
    max="[max]"
    step="[step]"
    value="[value]"
    style="
      appearance: none;
      width: 100%;
      height: 24px;
      margin: 6px 0 0;
      background: transparent;
      cursor: pointer;
      /* Background gradient shows fill to current value */
      background-image: linear-gradient(var(--ink-indigo), var(--ink-indigo));
      background-size: [pct]% 6px;
      background-repeat: no-repeat;
      background-position: left center;
    "
  />

  <!-- Source note (optional) -->
  <span style="
    display: block;
    font-size: var(--size-micro);
    color: var(--text-muted);
  ">
    [source]
  </span>
</div>
```

**Rules:**
- Shown only to Anxious persona
- Range slider with visual fill indicator
- No spinner, no input box — range slider only
- Source attribution always present if estimated

---

### Sheet (Bottom Sheet Modal)

**Purpose:** Lokhi's only modal surface — dialogs never float in middle.

**Structure:**
```html
<div style="
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  pointer-events: [open ? auto : none];
  z-index: 40;
">
  <!-- Scrim (tap to close) -->
  <div
    onClick="[onClose]"
    style="
      position: absolute;
      inset: 0;
      background: rgba(28, 43, 74, .34);
      backdrop-filter: blur(2px);
      opacity: [open ? 1 : 0];
      transition: opacity var(--dur-base) var(--ease-standard);
    "
  ></div>

  <!-- Sheet content -->
  <div style="
    position: relative;
    width: 100%;
    max-height: 86%;
    overflow: auto;
    background: var(--surface-card);
    border-radius: 28px 28px 0 0;
    box-shadow: var(--shadow-sheet);
    padding: var(--space-5) var(--gutter-screen) var(--space-8);
    transform: translateY([open ? 0 : 101]%);
    transition: transform var(--dur-slow) var(--ease-standard);
  ">
    <!-- Drag handle -->
    <div style="
      width: 40px;
      height: 4px;
      border-radius: 2px;
      background: var(--charcoal-ink-30);
      margin: 0 auto var(--space-4);
    "></div>

    <!-- Title bar with close button -->
    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-4);
    ">
      <h3 style="
        font-family: var(--font-display-latin);
        font-size: var(--size-section);
        font-weight: var(--weight-bold);
        color: var(--text-heading);
        margin: 0;
      ">
        [title]
      </h3>
      <button
        onClick="[onClose]"
        aria-label="Close"
        style="
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-pill);
          border: none;
          background: var(--surface-sunk);
          color: var(--text-muted);
          cursor: pointer;
        "
      >
        [Icon x - 16px]
      </button>
    </div>

    <!-- Sheet content -->
    [children]
  </div>
</div>
```

**Rules:**
- Bottom sheet only, never floating dialogs
- Scrim: Ink Indigo at 34% with 2px blur
- Sheet: 28px top radius only (bottom edge is device edge)
- Max-height 86% to leave safe area at top
- Drag handle at top (visual affordance)
- Transform slide from `translateY(101%)` to `translateY(0)`

---

### FairyAssistant (Floating Companion)

**Purpose:** AI assistant on every screen, same position, colour, size. Answers at user's persona detail level.

**Structure:**
```html
<!-- Anchor container (absolute or relative based on inline prop) -->
<div style="
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-3);
  position: [inline ? relative : absolute];
  z-index: [inline ? auto : 40];
  bottom: [positioning];
  right: [positioning];
">
  <!-- Message bubble (when open) -->
  <div style="
    width: 272px;
    background: var(--surface-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--assistant-ring);
    box-shadow: var(--shadow-3);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    animation: lokhi-fairy-in var(--dur-base) var(--ease-settle);
    transform-origin: bottom right;
  ">
    <!-- Header -->
    <div style="
      display: flex;
      align-items: center;
      gap: var(--space-2);
    ">
      <!-- Fairy icon circle -->
      <span style="
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: var(--assistant-tint);
        display: grid;
        place-items: center;
        flex: 0 0 auto;
      ">
        [FairyMark - 20px]
      </span>
      <span style="
        font-weight: var(--weight-medium);
        font-size: var(--size-caption);
        color: var(--assistant);
        flex: 1;
      ">
        Fairy godmother
      </span>
      <!-- Close button -->
      <button
        onClick="[close]"
        aria-label="Close"
        style="
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 15px;
        "
      >
        ×
      </button>
    </div>

    <!-- Message text -->
    <p style="
      font-size: var(--size-caption);
      line-height: 1.55;
      color: [asked ? var(--text-body) : var(--text-muted)];
    ">
      [message or greeting]
    </p>

    <!-- Suggestion buttons -->
    <div style="
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    ">
      <!-- Each suggestion -->
      <button
        style="
          font-weight: var(--weight-medium);
          font-size: var(--size-caption);
          padding: 9px 13px;
          border-radius: var(--radius-pill);
          cursor: pointer;
          border: 1px solid [active ? transparent : var(--assistant-ring)];
          background: [active ? var(--assistant) : transparent];
          color: [active ? var(--assistant-glyph) : var(--assistant)];
          transition: background var(--dur-fast) var(--ease-standard),
                      color var(--dur-fast) var(--ease-standard);
        "
      >
        [suggestion]
      </button>
    </div>
  </div>

  <!-- Floating button -->
  <button
    onClick="[toggle open]"
    aria-label="Ask the fairy"
    aria-expanded="[open]"
    style="
      width: 62px;
      height: 62px;
      min-width: var(--tap-min);
      min-height: var(--tap-min);
      border-radius: 50%;
      cursor: pointer;
      background: [pressed ? var(--assistant-tint) : var(--surface-card)];
      border: 2px solid var(--assistant);
      box-shadow: [pressed ? var(--shadow-1) : 'var(--shadow-3), 0 0 0 6px var(--assistant-ring)'];
      display: grid;
      place-items: center;
      padding: 0;
      transform: scale([pressed ? .94 : 1]);
      transition: transform var(--dur-fast) var(--ease-standard),
                  box-shadow var(--dur-base) var(--ease-standard),
                  background var(--dur-fast) var(--ease-standard);
    "
  >
    [FairyMark - 40px with transform translate(-2px, 1px)]
  </button>
</div>
```

**Persona-Specific Suggestions:**
- **Avoidant:** "Am I okay?" · "Anything I should deal with?"
- **Secure:** "Am I okay?" · "How was this month?" · "Can I afford a trip?"
- **Anxious:** "Why did my net worth move?" · "What drove this month?" · "Is my target still right?"

**Fairy Responses (Persona-Aware):**
- **Avoidant:** "You're okay. Nothing this month needs you to do anything."
- **Secure:** "Spending is ~5% above your usual month — food, mostly. Your target is still comfortable."
- **Anxious:** "Net worth moved +¥182,300. ¥141,000 of that is NISA gains; the rest is the salary deposit on the 25th minus rent, which rose ¥4,000 in April."

**Rules:**
- Floats in bottom-right (default) of phone frame at 16px offset
- Always Wisteria Wand, never recoloured to screen
- Message bubble width 272px fixed
- Entrance animation: `lokhi-fairy-in` at 240ms with settle ease

---

### FairyMark (Fairy Illustration)

**Purpose:** The full flying figure artwork on its own — Lokhi's assistant character.

**Properties:**
- **Always the whole flying figure — never cropped, masked, or reduced to head**
- **Always Wisteria Wand** (`fairy-wisteria.png`)
- **Always on her own light disc** — never straight on screen surface (2px Wisteria edge)
- **Size:** 2377×1615px source, aspect ratio 1.47× wider than tall
- **Overhangs disc rather than shrunk to fit**

**Tints Available:**
```
assets/fairy/fairy-wisteria.png   (Primary, Wisteria Wand #8A5AC0)
assets/fairy/fairy-sand.png       (On dark surfaces, Sand Paper #F7F1E8)
assets/fairy/fairy-ink.png        (On light surfaces, Ink Indigo #1C2B4A)
```

**Structure:**
```html
<img
  src="assets/fairy/fairy-[tint].png"
  alt="Lokhi's fairy godmother"
  style="
    width: [size * 1.47]px;  /* Account for 1.47× width ratio */
    height: auto;
    display: block;
    animation: [float ? lokhi-fairy-float : none];
  "
/>
```

**Usage Contexts:**
- Floating assistant button: `fairy-wisteria` at 40px
- Assistant message bubble header: `fairy-wisteria` at 20px
- On inverse (indigo) surfaces: `fairy-sand` to separate from background

---

### SpendingDisclosure (Adaptive Component)

**Purpose:** The clearest expression of the adaptive shell — persona changes *structure*, not just precision.

**Avoidant View:**
- One generic figure only: "~¥320K this month, roughly"
- No categories, no transactions, no inflation
- Just the total with optional "lighter/heavier" sentiment

**Secure View:**
- Category totals with percentage of total
- Share bars (visual comparison of spending per category)
- Personal inflation rate: "Your own prices are up ~2.4%"
- One total figure, one rate

**Anxious View:**
- Every transaction visible
- Per-category inflation figures
- Expandable transaction lists per category
- Exact category totals, exact personal inflation

**Structure (all personas):**
```html
<div style="display: grid; gap: var(--space-3);">
  <!-- Header -->
  <div style="
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
  ">
    <h3 style="
      font: 600 20px/1.3 var(--font-display-latin);
      color: var(--text-heading);
      margin: 0;
    ">
      Where it went
    </h3>
    <span style="
      font: 400 13px/1 var(--font-body);
      color: var(--text-muted);
    ">
      [month]
    </span>
  </div>

  <!-- Total card -->
  <div style="
    background: var(--surface-card);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-card);
    padding: var(--gutter-card);
    box-shadow: var(--shadow-1);
  ">
    <div style="
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--space-3);
    ">
      <span>
        <span style="
          display: block;
          font: 400 11px/1 var(--font-body);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        ">
          [avoidant ? "This month, roughly" : "Spent this month"]
        </span>
        [MoneyValue total]
      </span>
      <!-- Sentiment comparison (optional) -->
      <span style="
        font: 400 13px/1.4 var(--font-body);
        color: [lighter ? #4C7A5E : var(--text-muted)];
        text-align: right;
        max-width: 128px;
      ">
        [direction === 'lighter' ? 'A little lighter than last month' : 'A little heavier than last month']
      </span>
    </div>

    <!-- Avoidant disclaimer -->
    <p style="
      margin: var(--space-4) 0 0;
      font: 400 13px/1.55 var(--font-body);
      color: var(--text-muted);
    ">
      [avoidant ? "One figure is enough. The detail is here whenever you want it." : null]
    </p>

    <!-- Secure inflation note -->
    <p style="
      margin: var(--space-4) 0 0;
      font: 400 13px/1.55 var(--font-body);
      color: var(--text-muted);
    ">
      [secure ? "Your own prices are up ~" + inflation + "% over a year — that is your basket, not the national figure." : null]
    </p>
  </div>

  <!-- Categories list (secure + anxious only) -->
  <div style="
    background: var(--surface-card);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-card);
    padding: var(--space-2) var(--gutter-card);
    box-shadow: var(--shadow-1);
    display: [avoidant ? none : block];
  ">
    <!-- Each category row -->
    <div style="
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--border-hairline);
      min-height: var(--tap-min);
      cursor: [anxious ? pointer : default];
    ">
      <!-- Icon tile -->
      <span style="
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        flex: 0 0 auto;
        border-radius: var(--radius-sm);
        background: var(--surface-sunk);
        color: var(--ink-indigo);
      ">
        [Icon]
      </span>

      <!-- Label + details -->
      <span style="flex: 1; min-width: 0;">
        <span style="
          display: block;
          font: 500 15px/1.35 var(--font-body);
          color: var(--text-body);
        ">
          [category label]
        </span>
        <span style="
          display: block;
          margin-top: 3px;
          font: 400 12px/1.4 var(--font-body);
          color: var(--text-muted);
        ">
          [secure ? percent of total : anxious ? transaction count and inflation]
        </span>
      </span>

      <!-- Share bar (secure only) -->
      <div style="
        height: 4px;
        border-radius: var(--radius-pill);
        background: var(--surface-sunk);
        margin: 0 0 var(--space-3);
        overflow: hidden;
        display: [secure ? block : none];
      ">
        <div style="
          width: [percent of max]%;
          height: 100%;
          border-radius: var(--radius-pill);
          background: var(--ink-indigo-70);
        "></div>
      </div>

      <!-- Amount -->
      <span style="display: flex; align-items: center; gap: var(--space-2);">
        [MoneyValue amount]
        <!-- Chevron (anxious only) -->
        <span style="
          color: var(--charcoal-ink-60);
          display: [anxious ? grid : none];
          transform: [expanded ? rotate(180deg) : none];
          transition: transform var(--dur-fast) var(--ease-standard);
        ">
          [Icon chevron-down - 16px]
        </span>
      </span>
    </div>

    <!-- Transaction list (anxious, expanded only) -->
    <div style="
      padding: 0 0 var(--space-3) 46px;
      display: grid;
      gap: 2px;
    ">
      <!-- Each transaction -->
      <div style="
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-3);
        padding: 5px 0;
      ">
        <span style="
          font: 400 13px/1.4 var(--font-body);
          color: var(--text-body);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        ">
          [merchant]
        </span>
        <span style="
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          flex: 0 0 auto;
        ">
          <span style="
            font: 400 12px/1.4 var(--font-data);
            color: var(--text-muted);
            font-variant-numeric: tabular-nums lining-nums;
          ">
            [date]
          </span>
          [MoneyValue amount - caption size, min-width 62px right-aligned]
        </span>
      </div>
    </div>
  </div>

  <!-- Anxious footer note -->
  <p style="
    margin: 0;
    font: 400 12px/1.55 var(--font-body);
    color: var(--text-muted);
    display: [anxious ? block : none];
  ">
    Personal inflation is your own basket over the last twelve months: ~[inflation]% against a national ~3.3%.
  </p>
</div>
```

**Rules:**
- **Avoidant:** One generic figure total. No categories. "One figure is enough. The detail is here whenever you want it."
- **Secure:** Five category rows, share bars, personal inflation rate
- **Anxious:** All transactions visible, per-category inflation, expandable per-category transaction lists
- Sentiment comparison optional (lighter/heavier vs last month)
- Category icons: 34×34px, 10px radius, sunk background

---

## 4. SCREEN-BY-SCREEN BREAKDOWN (3 Existing Screens)

### SCREEN 1: Net Worth (Ink Indigo Identity)

**Fixed Header (inverse = Ink Indigo background):**
- Status bar: Time 9:41, battery/signal icons (2px stroke, thin appearance)
- Title: "Net worth" (28px General Sans, Sand Paper text on Ink Indigo)
- Subtitle: "As of 28 July" (caption size, muted on inverse)
- Action button: Gear icon (settings), 44px circle, semi-transparent background + border

**Main Content:**
```
┌─ Ink Indigo identity block (background) ─────────────────────┐
│ ┌─ Centered content (gutter 20px) ─────────────────────────┐ │
│ │                                                           │ │
│ │ [Owl Status 172px, stage-tinted halo, animate in]        │ │
│ │                                                           │ │
│ │ "Growing steadily" (status caption)                      │ │
│ │                                                           │ │
│ │ ¥4,182,300 (MoneyValue, display size)                   │ │
│ │ +¥62,400 this month (MoneyValue, caption signed)        │ │
│ │                                                           │ │
│ │ [Show the numbers / Hide the numbers] (OwlDetailToggle) │ │
│ │                                                           │ │
│ └─────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘

[Card - Golden Path]
  Legend: "────── Golden path  ─── Actual"
  SVG Chart: Baseline (dashed gold), Actual (solid moss/ember), circle endpoint
  Height: 96px
  Text below: "The golden path is a baseline drawn from your own target..."

[Section: "What's connected"]
Badge: "5 accounts" (ontrack tone)

[Chips: Everything / Assets only]

[Card - List of accounts]
  MUFG Ordinary ****1234                    ¥842,300    +¥18,200
  Japan Post Ordinary ****8890              ¥356,100    -¥4,400
  Rakuten Card (liability)                  -¥98,110   -¥12,400
  PayPay balance                            ¥7,400      +¥900
  Tsumitate NISA (eMAXIS Slim)             ¥2,874,610  +¥60,100

[SpendingDisclosure component - "Where it went"]
  Month: July
  Total: ¥318,400
  Sentiment: "A little lighter than last month" (if down from ¥331,200)
  Secure persona: Category breakdown + share bars + personal inflation
    Rent: ¥128,000 (40% visual bar)
    Food: ¥71,240 (prices +4.1% over year)
    Bills: ¥42,610 (prices +6.8%)
    Transport: ¥28,900 (prices +1.2%)
    Everything else: ¥47,650 (prices +2.0%)
  Anxious persona: All transactions expandable per category

[Button: Secondary, icon plus, full-width]
  "Connect an account"
```

**Sheet (on gear button click, title "Assumptions"):**
- **Anxious persona:**
  - Text: "These are the figures deciding your owl's stage. All of them are editable."
  - AssumptionRow: Expected return 3.2% (range 0-8%, step 0.1)
  - AssumptionRow: Retirement age 65 (range 55-75, step 1, unit " yrs")
  - AssumptionRow: Pension estimate 1.44 M/yr (source: "From your nenkin-net estimate")
  - TargetProgress: "Progress under these assumptions" = 0.68 (68%), stage-tinted
- **Secure/Avoidant:**
  - Text: "Your owl grows against a target built from your income, spending, age and what you hold today. We keep an eye on the arithmetic so you don't have to."
  - Button: Quiet variant, "Leave it to Lokhi"

**Data Sample (from data.js):**
```javascript
netWorth: 4182300
monthDelta: 62400
asOf: 'As of 28 July'
baseline: [280, 300, 320, 344, 366, 388, 412, 418]  // Golden path points
actual: [280, 296, 318, 349, 370, 396, 414, 418]     // Actual trajectory
```

---

### SCREEN 2: Playground (Coral Pulse Identity)

**Header (NOT inverse — Coral Pulse = action, not identity block):**
- Title: "Playground" (28px General Sans)
- Subtitle: "Try a what-if without the dread" (caption)
- Action button: Rotate-CCW icon (reset scenarios)

**Main Content:**
```
[Card tone="sunk" - centered row layout]
  ┌─ Owl Status (92px) ─┐ │ [Scenario status text]
  │    [Owl]            │ │ "This mix reaches the crown" (if delta > 0.05)
  │  (crowned if lift)  │ │ or "This moves you a little further" (delta > 0)
  └────────────────────┘ │ "Nothing you try here changes your data"

[SegmentedControl - time horizons]
  Options: "1Y" / "5Y" / "10Y" / "To retirement"
  Default: "To retirement"

[Card - Golden Path with scenarios applied]
  Same format as Net Worth but:
  - Baseline: Always gold dashed
  - Actual: "This mix" line (solid, moss if ahead, ember if behind)
  - Height: 104px
  - Legend updated: "This mix" instead of "Actual"

[TargetProgress]
  Value: 0.68 + lift from selected scenarios
  Stage: crowned if >= 1.0, else youngling
  Label: "Progress to target"
  Show percent: Yes (if not avoidant)

[Section: "Things to try"]
Badge: "[N] selected" (accent tone)

[Each scenario as card]
  Example: "Add ¥10,000 to the monthly contribution"
  Effect: "Reaches your target 1 yr 4 mo sooner"
  Delta: +0.06 (affects chart and progress)
  Toggle: Circle checkbox, fills with moss when selected
  
  Scenarios from data.js:
  - id: 'save' → +0.06 delta
  - id: 'move' → -0.05 delta (rent +¥15,000)
  - id: 'bonus' → +0.09 delta (half bonus to NISA)

[Card tone="inverse" - shown only if numbers visible (not avoidant)]
  "Projected at retirement, this mix"
  [MoneyValue - very large figure, title size, on inverse]
  Formula: netWorth * (1 + lift) * 5.4 (simplified projection)

[Button: Primary, full-width, size lg]
  "Go with this shape"
```

**Behavior:**
- No data persists — "nothing you try here changes your data"
- Scenarios toggle on/off, affecting golden path and target progress in real-time
- Lift calculation: sum of selected scenario deltas
- Chart updates as scenarios change

---

### SCREEN 3: Grow (Moss Growth Identity)

**Header:**
- Title: "Grow" (28px General Sans)
- Subtitle: "Contributions and tax" (caption)
- Small owl thumbnail (30px) — Grow screen only has this!
- Action button: Plus icon (add new investment)

**Main Content:**
```
[Card tone="ontrack" - NISA status box]
  ┌─ Owl Status (96px, no caption) ─┐  │ "A little room left in this year's NISA"
  │          [Owl]                  │  │
  │      (youngling by default)     │  │ [TargetProgress]
  └────────────────────────────────┘  │   Value: 0.72 (72% of ¥3.6M)
                                       │   Height: 8px (compact)
                                       │   Label: [show if anxious] "of the ¥3.6M allowance"

[Chips: NISA / Tax return]
  Default: NISA

[NISA Tab Content]
  Header: "What you hold"
  Badge or MoneyValue: "3 holdings" (avoidant/secure) or ¥2,874,610 (anxious)

  [Card - Holdings list]
    eMAXIS Slim All Country       ¥1,980,400  +¥41,200  (¥33,000/month)
    eMAXIS Slim Japan Equity      ¥624,200    +¥12,600  (¥12,000/month)
    JGB, floating 10-year         ¥270,010    +¥6,300   (One-off)

[Tax Return Tab Content]
  [Card - Task item 1]
    Icon: receipt
    Label: "Furusato nozei deduction cap"
    Details: "On this income, you still have room"
    Badge: "Checked" (ontrack tone)

  [Card - Task item 2]
    Icon: file-text
    Label: "Medical receipts"
    Details: "3 still to add"
    Badge: "Not filed" (behind tone)

[Card tone="sunk" - Next step]
  "Next step"
  "Adding ¥10,000 a month brings your owl closer to the crown."
  [Button: Primary, full-width]
  "Revisit your contribution"
```

**Data from data.js:**
```javascript
holdings: [
  { icon: 'globe', label: 'eMAXIS Slim All Country', sublabel: '¥33,000 / month', amount: 1980400, delta: 41200 },
  { icon: 'building-2', label: 'eMAXIS Slim Japan Equity', sublabel: '¥12,000 / month', amount: 624200, delta: 12600 },
  { icon: 'shield', label: 'JGB, floating 10-year', sublabel: 'One-off', amount: 270010, delta: 6300 },
]
```

---

## 5. NAVIGATION STRUCTURE

### Phone Frame Dimensions
- Width: 340px (design reference)
- Height: 700px (content area, excluding notch/pill)
- Frame: 44px corner radius, dark bezel
- Status bar: 32px height (dark or light based on header)

### Tab Bar (Fixed Bottom)
- Height: Fixed, always visible at bottom
- Background: `var(--surface-card)` → `#FFFDF8`
- Border-top: `1px solid var(--border-hairline)` → `#E3DBCC`
- Padding: `var(--space-2) var(--space-3) var(--space-4)` → `8px 12px 16px`
- Layout: 3-column grid, 4px gap between columns

### Header Pattern (Per Screen)
- **Net Worth:** Inverse (Ink Indigo background, Sand Paper text)
- **Playground:** Normal (transparent background, Ink Indigo text)
- **Grow:** Normal (transparent background, Ink Indigo text)
- **All:** 28×700 reference scroll area (middle scrolls, header + tab bar fixed)

### Scrollable Area
- Header (fixed) — ScreenHeader component
- Content (scrolls) — screen-specific content
- Tab bar (fixed) — ScreenTabBar component
- Fairy assistant (fixed) — FairyAssistant floats at bottom-right within frame

### Screen Routing
- Tabs at bottom navigate between networth / playground / grow
- Active tab: screen colour icon, 12% tint background, medium weight
- Inactive: muted grey text, no background

---

## 6. GAP ANALYSIS FOR 4TH SCREEN: "BIG DECISIONS"

### Search Results: Zero Explicit Mentions
**Searched entire design system for:**
- "big decision"
- "major purchase"
- "house"
- "car"
- "risk"
- "simulation"
- "what-if"

**Findings:**
- **Only match:** Playground screen subtitle — "Try a what-if without the dread" — refers to modifying savings/income assumptions, NOT major one-time purchases
- **Scenarios in Playground data:** Add savings, move/rent, bonus reallocation — all recurring/ongoing changes, not purchase decisions
- **No fourth screen mentioned** in readme, SKILL.md, or any component

### Conclusion
**Big Decisions screen is entirely net-new.** Not mentioned anywhere in existing design system. This is a greenfield design opportunity.

### Suggested Scope for "Big Decisions" Screen
(If you decide to proceed with this screen)

A 4th screen exploring *major financial decisions* that reshape the trajectory:
- **House purchase** (one-time capital outlay vs. rent savings long-term)
- **Car purchase** (depreciating asset with running costs)
- **Further education** (upfront cost vs. earning boost)
- Other major life events (marriage, child, relocation)

**Visual pattern to match:**
- Use same Owl Status + GoldenPath + what-if scenario mechanics as Playground
- But: Scenarios are one-off *choices* with lasting impact, not toggles
- Results show: New trajectory, impact on retirement target, cost/benefit
- Could use a 4th screen colour (currently unused) — suggest a neutral or secondary colour not yet assigned
- Fairy assistant answers questions like "How much will this delay my target?"

---

## 7. ASSET INVENTORY

All assets copied to `WORK/lokhi-assets/`:

### Tokens (Design Variables)
```
tokens/base.css           — Reset, default heading styles, focus rings, keyframes
tokens/colors.css         — 7 core named + 1 reserved + 30+ derived tokens
tokens/elevation.css      — Shadow scale, ring definitions
tokens/fonts.css          — @import rules from Google Fonts + Fontshare
tokens/motion.css         — Easing functions, durations, reduced-motion support
tokens/radius.css         — Corner radius scale
tokens/spacing.css        — 4px base scale + semantic spacing
tokens/typography.css     — Font families, weights, sizes, leading, tracking, utility classes
styles.css                — @import bundle of all tokens
```

### Illustrations (Owl — 15 PNGs)
```
assets/owl/owl-egg-egg.png      — Egg stage, Dim Ember (#A8613F) tint
assets/owl/owl-egg-ink.png      — Egg stage, Ink Indigo (#1C2B4A) tint
assets/owl/owl-egg-sand.png     — Egg stage, Sand Paper (#F7F1E8) tint
assets/owl/owl-egg-young.png    — Egg stage, Moss Growth (#4C7A5E) tint [unused]
assets/owl/owl-egg-crown.png    — Egg stage, Gold Thread (#C99A3D) tint [unused]

assets/owl/owl-young-egg.png    — Youngling stage, Dim Ember tint [unused]
assets/owl/owl-young-ink.png    — Youngling stage, Ink Indigo tint
assets/owl/owl-young-sand.png   — Youngling stage, Sand Paper tint
assets/owl/owl-young-young.png  — Youngling stage, Moss Growth (primary) tint
assets/owl/owl-young-crown.png  — Youngling stage, Gold Thread tint [unused]

assets/owl/owl-crown-egg.png    — Crown stage, Dim Ember tint [unused]
assets/owl/owl-crown-ink.png    — Crown stage, Ink Indigo tint
assets/owl/owl-crown-sand.png   — Crown stage, Sand Paper tint
assets/owl/owl-crown-young.png  — Crown stage, Moss Growth tint [unused]
assets/owl/owl-crown-crown.png  — Crown stage, Gold Thread (primary) tint
```

**Owl File Naming:** `owl-[stage]-[tint].png`
- Stages: egg, young, crown
- Tints: egg (dim-ember), young (moss-growth), crown (gold-thread), ink (ink-indigo), sand (sand-paper)
- **Active tints per stage:** egg={egg, ink, sand}, young={ink, sand, young}, crown={ink, sand, crown}

### Illustrations (Fairy — 3 PNGs)
```
assets/fairy/fairy-ink.png      — Full flying figure, Ink Indigo (#1C2B4A) version
assets/fairy/fairy-sand.png     — Full flying figure, Sand Paper (#F7F1E8) version
assets/fairy/fairy-wisteria.png — Full flying figure, Wisteria Wand (#8A5AC0) primary
```

**Fairy Properties:**
- Aspect ratio: 1.47× wider than tall (2377×1615px source)
- Always full figure, never cropped
- Always Wisteria Wand primary; sand/ink are context variants only

### Uploads (Original Source Artwork — 4 PNGs)
```
uploads/egg_owl.png             — Original egg stage upload (white background)
uploads/young_owl.png           — Original youngling upload (white background)
uploads/crown_owl.png           — Original crowned stage upload (white background)
uploads/fairy_godmother.png     — Original fairy upload (navy on white)
```

**These are the originals** from which `assets/owl/` and `assets/fairy/` were programmatically derived (cropped, alpha-keyed, recoloured).

---

## IMPLEMENTATION NOTES FOR STATIC HTML REBUILD

### Critical Patterns
1. **Tabular numerals on money:** Every `<span>` containing currency must have `font-variant-numeric: tabular-nums lining-nums;` + `font-feature-settings: "tnum" 1, "lnum" 1;`
2. **Phone frame dimensions:** Always 340px wide, 700px tall (reference)
3. **Gutter:** 20px on all four sides of screen content
4. **Motion:** If building interactive version, use CSS transitions with `cubic-bezier(.2, .8, .25, 1)` at 160ms/240ms/420ms
5. **Focus rings:** 3px Ink Indigo at 22% opacity, 3px solid border
6. **Owl entrance:** 6px rise + scale 0.94, fade in 640ms with `cubic-bezier(.34, 1.4, .5, 1)` (soft overshoot)
7. **Persona switching:** Change display via CSS `.persona-avoidant`, `.persona-secure`, `.persona-anxious` classes or data attributes

### Icon Replacement
All icons are **Lucide** loaded via CSS mask from CDN. If offline build required:
- Replace `maskImage: url('https://unpkg.com/lucide-static@0.446.0/icons/[name].svg')` with local SVG paths
- Or use a different icon system entirely — this is the single seam in the design (`components/core/Icon.jsx`)

### Font Loading
Public CDNs used — no vendor binaries required:
- Zen Maru Gothic (Google Fonts)
- Noto Sans JP (Google Fonts)
- General Sans (Fontshare)

If offline, download `@font-face` rules locally and update `tokens/fonts.css`.

---

## REFERENCE: Static HTML Template Pattern

See `templates/networth-screen/NetworthScreen.dc.html` for a working example of how JSX components translate to plain HTML:

**React pattern:**
```jsx
<OwlStatus stage="youngling" size={172} tint="stage" caption={null} />
<MoneyValue value={4182300} persona="secure" size="display" />
<GoldenPath baseline={[...]} actual={[...]} height={96} />
```

**Becomes static HTML:**
```html
<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
  <!-- Owl with radial gradient halo -->
  <div style="position: relative; width: 172px; height: 172px;">
    <span style="
      position: absolute; inset: 0; border-radius: 50%;
      background: radial-gradient(circle at 50% 52%, #E6EBE5 0%, #E6EBE5 58%, transparent 72%);
    "></span>
    <img src="assets/owl/owl-young-young.png" alt="Youngling" style="width: 141px; margin: auto; display: block;" />
  </div>

  <!-- Money value -->
  <span style="
    font-family: 'General Sans', system-ui;
    font-size: 40px;
    font-weight: bold;
    font-variant-numeric: tabular-nums lining-nums;
    color: #1C2B4A;
  ">
    ~¥4.2M
  </span>

  <!-- Golden path chart -->
  <svg viewBox="0 0 600 96" preserveAspectRatio="none">
    <path d="M 0 ... L 600 ..." stroke="#C99A3D" stroke-dasharray="5 6" />
    <path d="M 0 ... L 600 ..." stroke="#4C7A5E" />
  </svg>
</div>
```

---

**END OF DESIGN SPECIFICATION**

This document is the single source of truth for rebuilding Lokhi's three existing screens as static HTML/CSS and designing the fourth "Big Decisions" screen. All inline styles, colour values, and component structures are literal extracts from the design system.

