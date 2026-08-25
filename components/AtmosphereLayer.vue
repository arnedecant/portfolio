<template>
  <div class="atmosphere" aria-hidden="true" />
</template>

<style scoped lang="scss">
.atmosphere {
  position: fixed;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 80% 0%, color-mix(in srgb, var(--c-secondary) 7%, transparent), transparent 30rem),
    linear-gradient(90deg, transparent 0, color-mix(in srgb, var(--c-primary) 3%, transparent) 1px, transparent 1px);
  background-size: auto, 25% 100%;
  opacity: 0.75;
}

.atmosphere::after {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
  content: '';
  opacity: 0.08;
}
</style>
