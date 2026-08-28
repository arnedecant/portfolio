<script setup lang="ts">
const config = useAppConfig()

defineProps<{
  compact?: boolean
}>()
</script>

<template>
  <ul class="social-links" :class="{ 'social-links--compact': compact }">
    <li v-for="social in config.socials" :key="social.to">
      <NuxtLink
        :to="social.to"
        :target="social.target"
        :rel="social.target === '_blank' ? 'noreferrer' : undefined"
        :aria-label="social.ariaLabel"
      >
        <Icon v-if="social.icon" :name="social.icon" aria-hidden="true" />
        <span class="social-links__label">{{ social.label }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-6);
  padding: 0;
  list-style: none;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  text-decoration: none;
}

.social-links a:hover {
  color: var(--c-primary);
}

.social-links .iconify {
  font-size: 1.125rem;
}

.social-links--compact .social-links__label {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
