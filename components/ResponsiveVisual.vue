<script setup lang="ts">
withDefaults(defineProps<{
  alt?: string
  aspect?: string
}>(), {
  alt: '',
  aspect: '16 / 9',
})
</script>

<template>
  <figure class="responsive-visual" :style="{ aspectRatio: aspect }">
    <slot />
    <figcaption v-if="$slots.caption">
      <slot name="caption" />
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.responsive-visual {
  position: relative;
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--c-border);
  background: var(--nyx-surface-lowest);
}

.responsive-visual :deep(img),
.responsive-visual :deep(video),
.responsive-visual :deep(svg) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.responsive-visual figcaption {
  position: absolute;
  right: var(--space-3);
  bottom: var(--space-3);
  left: var(--space-3);
  color: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
}
</style>
