# Hero Particle Field Design

## Goal

Add a continuously drifting particle grid to the homepage hero. Nearby particles connect with lines, and connections become more visible around the mouse pointer. The effect should make the hero feel alive without competing with the portfolio message or compromising static hosting, accessibility, or mobile performance.

## Architecture

Create a self-contained `HeroParticleField.vue` component rendered as an absolute, decorative background layer inside the hero. The hero content remains normal DOM above the canvas.

The component will:

- Render particles and connections with a 2D canvas.
- Track the hero bounds with `ResizeObserver`.
- Rebuild or scale the particle field when the canvas size changes.
- Use a lightweight spatial grid to limit nearby-particle connection checks.
- Run its animation loop with `requestAnimationFrame`.
- Pause when outside the viewport through `IntersectionObserver`.
- Cap device pixel ratio to keep high-density displays affordable.
- Leave the existing CSS atmosphere visible if canvas setup or rendering is unavailable.

The component should expose only hero-level configuration, keeping particle mechanics internal.

## Interaction

- Particles drift continuously at a low, consistent speed.
- Particles wrap at the edges of the field.
- Nearby particles receive short, low-alpha connections.
- The cursor creates a local influence zone that increases connection opacity without pushing or pulling particles.
- Cursor coordinates are interpolated to avoid abrupt jumps.
- Touch devices receive reduced-density motion without pointer interaction.

## Accessibility And Motion

- The canvas is decorative and uses `aria-hidden="true"`.
- The effect never owns focus or changes the reading order.
- With `prefers-reduced-motion: reduce`, particle movement and cursor response stop while a sparse static dot field remains.
- Text, links, selection, and keyboard navigation remain usable above the canvas.

## Visual Treatment

- Use existing Nyx palette tokens.
- Use dim cyan particles and connection lines, brighter near the cursor.
- Add rare violet or amber particles for restrained rhythm.
- Keep the field concentrated in the open hero area.
- Fade the canvas at the hero edges with a CSS mask.
- Use higher density and connection distance on desktop.
- Use lower density, shorter connections, and reduced opacity on mobile.
- Keep the existing grain and gradient atmosphere behind the canvas.

## Verification

- Run `pnpm build`.
- Run `pnpm generate`.
- Inspect desktop and mobile hero behavior.
- Confirm cursor proximity strengthens nearby connections.
- Confirm reduced-motion mode shows a static field.
- Confirm touch/no-pointer behavior remains calm.
- Confirm text readability and keyboard navigation.
- Confirm the effect remains 2D canvas only and does not require WebGL.

## Scope

This change is limited to the homepage hero particle field and its supporting component/styles. It does not add a third-party particle dependency, change project content, or redesign other homepage sections.
