<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>
        <p class="site-footer__name">{{ config.site.name }}</p>
        <p class="site-footer__role">{{ config.site.role }}</p>
      </div>
      <SocialLinks />
      <p class="site-footer__copyright">© {{ new Date().getFullYear() }} {{ config.site.name }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  padding: var(--space-12) 0 var(--space-8);
  border-top: 1px solid var(--c-border-subtle);
  background: var(--c-surface-lowest);
}

.site-footer__inner {
  display: grid;
  width: min(100% - (var(--page-gutter) * 2), var(--content-width));
  margin: 0 auto;
  gap: var(--space-6);
}

.site-footer__name {
  color: var(--c-text);
  font-family: var(--font-display);
  font-size: 1.5rem;
}

.site-footer__role,
.site-footer__copyright {
  color: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
}

@media (min-width: 48em) {
  .site-footer__inner {
    position: relative;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  .site-footer__inner :deep(.social-links) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .site-footer__copyright {
    margin-left: auto;
  }
}
</style>
