<script setup lang="ts">
defineProps<{
  as?: 'p' | 'span'
}>()
</script>

<template>
  <component :is="as ?? 'p'" class="technical-label">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.technical-label {
  color: var(--c-primary);
  font-family: var(--font-technical);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: 0.15em;
  line-height: 1;
  text-transform: uppercase;
}
</style>
