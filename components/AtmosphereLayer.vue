<template>
  <div class="atmosphere" aria-hidden="true">
    <div class="atmosphere__orb atmosphere__orb--primary" />
    <div class="atmosphere__orb atmosphere__orb--secondary" />
    <div class="atmosphere__grid" />
  </div>
</template>

<style scoped lang="scss">
.atmosphere {
  position: fixed;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.75;
}

.atmosphere::after,
.atmosphere__grid {
  position: absolute;
  inset: 0;
  content: '';
}

.atmosphere::after {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
  content: '';
  opacity: 0.08;
}

.atmosphere__grid {
  background: linear-gradient(90deg, transparent 0, color-mix(in srgb, var(--c-primary) 3%, transparent) 1px, transparent 1px);
  background-size: 25% 100%;
  mask-image: linear-gradient(to bottom, black, transparent 72%);
}

.atmosphere__orb {
  position: absolute;
  width: 32rem;
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(2rem);
  opacity: 0.13;
  animation: atmosphere-float 24s ease-in-out infinite alternate;
}

.atmosphere__orb--primary { top: -18rem; right: -8rem; background: var(--c-primary); }
.atmosphere__orb--secondary { top: 30%; left: -26rem; background: var(--c-secondary); animation-delay: -8s; }

@keyframes atmosphere-float {
  to { transform: translate3d(2rem, 1rem, 0) scale(1.08); }
}

@media (prefers-reduced-motion: reduce) {
  .atmosphere__orb { animation: none; }
}

@media (max-width: 47.99em) {
  .atmosphere__orb { width: 20rem; }
  .atmosphere__orb--primary { top: -12rem; right: -12rem; }
  .atmosphere__orb--secondary { top: 20%; left: -16rem; }
  .atmosphere__grid { background-size: 50% 100%; }
}
</style>
