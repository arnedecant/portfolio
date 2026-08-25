<script setup lang="ts">

const props = defineProps<{
  to: string
  variant?: 'primary' | 'critical'
}>()

</script>

<template>
  <NuxtLink :to="props.to" class="cta-button" :class="`cta-button--${props.variant ?? 'primary'}`">
    <slot />
  </NuxtLink>
</template>

<style scoped lang="scss">

.cta-button {
  display: inline-flex;
  min-height: 3rem;
  padding: var(--space-3) var(--space-6);
  align-items: center;
  justify-content: center;
  border: 1px solid var(--c-primary-signal);
  border-radius: var(--radius-lg);
  color: var(--c-text);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 180ms ease, box-shadow 180ms ease, color 180ms ease;
}

.cta-button--primary {
  background: transparent;
  color: var(--c-primary);
}

@media (hover: hover) {
  .cta-button--primary:hover {
    background: color-mix(in srgb, var(--c-primary-signal) 8%, transparent);
    box-shadow: var(--signal-glow);
  }

  .cta-button--critical:hover {
    background: var(--nyx-tertiary);
  }
}

.cta-button--critical {
  border-color: var(--c-critical);
  background: var(--c-critical);
  color: var(--nyx-surface-lowest);
}
</style>
