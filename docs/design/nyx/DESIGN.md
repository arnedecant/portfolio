---
name: Nyx
colors:
  surface: '#12131a'
  surface-dim: '#12131a'
  surface-bright: '#383940'
  surface-container-lowest: '#0c0e14'
  surface-container-low: '#1a1b22'
  surface-container: '#1e1f26'
  surface-container-high: '#282a31'
  surface-container-highest: '#33343c'
  on-surface: '#e2e1eb'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#e2e1eb'
  inverse-on-surface: '#2f3037'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#ffc174'
  on-tertiary: '#472a00'
  tertiary-container: '#f59e0b'
  on-tertiary-container: '#613b00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#12131a'
  on-background: '#e2e1eb'
  surface-variant: '#33343c'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.3'
  body-main:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  technical-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style
The design system embodies a "Nocturnal Technical" aesthetic, tailored for a senior creative technologist. It evokes the quiet intensity of deep space and the precision of high-end engineering. The visual narrative centers on "Technical Signal Flows"—where data meets art.

The style is **Atmospheric Minimalism**. It leverages deep, expansive voids (whitespace) contrasted with razor-sharp technical details. The emotional response is one of sophisticated mystery and absolute technical competence. 

**Key Visual Principles:**
- **Atmospheric Depth:** Use of subtle grain and noise textures to prevent the "flatness" of digital blacks.
- **Precision Detailing:** 0.5px to 1px strokes that act as structural "conductors" for the eye.
- **Controlled Luminescence:** Accents do not just occupy space; they "emit" light through soft, restrained glows, mimicking the behavior of high-end hardware indicators or astronomical phenomena.
- **Asymmetric Balance:** Compositions should feel intentional and structural, moving away from centered, generic layouts toward more editorial, grid-defying arrangements.

## Colors
The palette is built on a "Void and Pulse" logic. The foundation is a near-black that provides infinite perceived depth, while accents function as data pulses or critical system signals.

- **The Void (Background/Surface):** The background (#0a0a0c) is the canvas. Surfaces (#16161a) should be used sparingly for containerization, appearing as slightly lifted layers within the dark expanse.
- **The Signal (Primary/Secondary):** Muted Cyan (#38bdf8) represents active technical processes. Deep Violet (#8b5cf6) provides a secondary, more atmospheric tonal shift for decorative elements or secondary groupings.
- **The Alert (Contrast):** Warm Amber (#f59e0b) is used exclusively for high-priority calls to action or "system-critical" interactions. It must be used with extreme restraint to maintain its impact.
- **The Static (Typography):** Off-white ensures readability without the harshness of pure white, while muted gray handles metadata and technical descriptions.

## Typography
The typography strategy creates a tension between high-art editorial and low-level technical documentation.

- **The Editorial Hook:** Use **Playfair Display** for large headings and display moments. This introduces a "curated" feel that contrasts against the technical subject matter.
- **The Utility Layer:** **Inter** serves as the workhorse for long-form body copy, chosen for its neutral, systematic clarity.
- **The Accent Layer:** **JetBrains Mono** is utilized for metadata, tags, and technical specs. It should always appear in smaller sizes to suggest "code" or "data" without overwhelming the interface.
- **Hierarchy:** Maintain large gaps in scale between display text and body text to emphasize the premium, portfolio-centric nature of the site.

## Layout & Spacing
The layout follows a "Technical Blueprint" model. It uses a rigorous grid but purposefully leaves certain cells empty to create an asymmetric, airy feel.

- **Grid System:** A 12-column grid for desktop. Align content to the left or right edges, often leaving a 2-4 column void in the center to create an unconventional flow.
- **Negative Space:** Use "Section Gaps" (160px+) generously between major content blocks to allow the "Nyx" atmosphere to breathe.
- **Rhythm:** All spacing must be multiples of 4px. Use consistent padding within containers to maintain a sense of structural integrity.
- **Technical Margins:** Use thin (0.5px) vertical lines as margins to visually define the grid columns in subtle areas of the UI.

## Elevation & Depth
In this design system, depth is not conveyed through heavy shadows, but through **Tonal Luminance** and **Backdrop Blurs**.

- **Subtle Surface Lift:** Instead of shadows, use a 1px border of `#ffffff10` (10% white) to define the edge of an element. This creates a "glass edge" effect.
- **Translucent Layers:** Use `backdrop-filter: blur(12px)` with a slightly transparent surface color for overlays or navigation bars. This allows the background "atmosphere" to bleed through.
- **Soft Glows:** Critical elements (like the Primary Accent) can emit a soft `box-shadow: 0 0 20px #38bdf820`. The glow should be barely perceptible, feeling like a phosphor screen.
- **Grain Overlay:** Apply a persistent, low-opacity (2-3%) noise texture to the entire viewport to give the dark colors a tactile, analog feel.

## Shapes
The shape language is primarily **Rectilinear**. Roundedness is used only to soften interaction points, never as a primary aesthetic driver.

- **Base Radius:** 0.25rem (4px) for most UI elements like inputs and smaller cards.
- **Sharp Edges:** Outer containers and section separators should remain at 0px to maintain a rigid, technical structure.
- **Interactive Elements:** Use the `rounded-lg` (8px) sparingly for buttons to make them feel "touchable" against the sharp surrounding grid.

## Components
Consistent application of the technical-nocturnal style across interactive elements.

- **Buttons:** 
  - *Primary:* Solid Cyan (#38bdf8) text on a transparent background with a 1px Cyan border. On hover, a very subtle cyan outer glow.
  - *Critical CTA:* Amber (#f59e0b) background, black text, 0px radius for a "warning" or "action" aesthetic.
- **Technical Chips/Tags:** JetBrains Mono font, 11px, all-caps. Surrounded by a 0.5px muted gray border. No background fill.
- **Inputs:** Darker than the surface (#08080a), with a bottom-only 1px border. The border glows cyan when the field is focused.
- **Cards (Project/Work):** No background fill by default. Defined by a 0.5px border on all sides. On hover, the background shifts slightly to the Surface color (#16161a) and the border brightness increases.
- **Separators:** 1px horizontal or vertical lines using `#ffffff05` (5% white). They should span the full width of their container, acting as "wiring" for the layout.
- **Navigation:** Fixed to the top with a heavy backdrop blur. Use "Label-caps" typography for nav links with a simple 1px underline that expands on hover.