<script setup lang="ts">
withDefaults(defineProps<{
  id?: string
  eyebrow?: string
  title?: string
}>(), {
  id: undefined,
  eyebrow: undefined,
  title: undefined,
})
</script>

<template>
  <section :id="id" class="section-frame">
    <div class="section-frame__inner">
      <header v-if="eyebrow || title || $slots.header" class="section-frame__header">
        <slot name="header">
          <TechnicalLabel v-if="eyebrow">{{ eyebrow }}</TechnicalLabel>
          <h2 v-if="title">{{ title }}</h2>
        </slot>
      </header>
      <div class="section-frame__content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-frame {
  padding: var(--space-20) 0;
}

.section-frame__inner {
  width: min(100% - (var(--page-gutter) * 2), var(--content-width));
  margin: 0 auto;
}

.section-frame__header {
  display: grid;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.section-frame__header h2 {
  max-width: 40ch;
  font-size: var(--text-headline);
}

@media (min-width: 48em) {
  .section-frame {
    padding: var(--space-40) 0;
  }

  .section-frame__header {
    grid-template-columns: 1fr;
  }
}
</style>
