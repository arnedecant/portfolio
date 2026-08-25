<script setup lang="ts">
const isOpen = ref(false)
const config = useAppConfig()

const links = [
  { label: 'Work', to: '/#work' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Expertise', to: '/#expertise' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/#contact' },
]

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="site-nav" :class="{ 'site-nav--open': isOpen }">
    <div class="site-nav__inner">
      <NuxtLink to="/" class="site-nav__brand" aria-label="Arne Decant, home" @click="closeMenu">
        <span class="site-nav__mark">AD</span>
        <span>{{ config.site.name }}</span>
      </NuxtLink>

      <button
        class="site-nav__toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="site-navigation"
        aria-label="Toggle navigation"
        @click="isOpen = !isOpen"
      >
        <span />
        <span />
      </button>

      <nav id="site-navigation" class="site-nav__links" aria-label="Primary navigation">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" @click="closeMenu">
          {{ link.label }}
        </NuxtLink>
        <NuxtLink v-if="config.resume" class="site-nav__resume" :to="config.resume.to" target="_blank">
          {{ config.resume.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-nav {
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 1px solid var(--c-border-subtle);
  background: color-mix(in srgb, var(--c-background) 84%, transparent);
  backdrop-filter: blur(12px);
}

.site-nav__inner {
  display: flex;
  width: min(100% - (var(--page-gutter) * 2), var(--content-width));
  min-height: 4.5rem;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

.site-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--c-text);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav__mark {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid var(--c-primary-signal);
  color: var(--c-primary);
  font-size: 0.625rem;
}

.site-nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.site-nav__links a {
  color: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-label);
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav__links a:hover {
  color: var(--c-primary);
}

.site-nav__links .site-nav__resume {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--c-primary-signal);
  color: var(--c-primary);
}

.site-nav__toggle {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  padding: var(--space-3);
  background: transparent;
  color: var(--c-text);
}

.site-nav__toggle span {
  display: block;
  height: 1px;
  margin: 0.375rem 0;
  background: currentColor;
}

@media (max-width: 52em) {
  .site-nav__toggle {
    display: block;
  }

  .site-nav__links {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    display: none;
    padding: var(--space-6) var(--page-gutter) var(--space-8);
    border-bottom: 1px solid var(--c-border-subtle);
    background: var(--c-background);
  }

  .site-nav--open .site-nav__links {
    display: grid;
    gap: var(--space-6);
  }

  .site-nav__links a {
    font-size: var(--text-technical);
  }
}
</style>
