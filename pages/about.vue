<script setup lang="ts">
const { data: about } = await useAsyncData(() => queryCollection('pages').path('/pages/about').first())

useSeoMeta({
  title: () => about.value?.title ? `${about.value.title} | Arne Decant` : 'About | Arne Decant',
  description: () => about.value?.description ?? 'The story, practice, and experiments of Arne Decant.',
})
</script>

<template>
  <main class="about-page">
    <article class="about-page__article">
      <header class="about-page__masthead">
        <div class="about-page__intro">
          <p class="about-page__eyebrow">{{ about?.eyebrow ?? 'ABOUT / THE PERSON BEHIND THE SYSTEMS' }}</p>
          <h1>{{ about?.title ?? 'About Me' }}</h1>
          <p class="about-page__dek">A senior software engineer drawn to the space where complex products, thoughtful interfaces, and durable systems meet.</p>
        </div>

        <figure v-if="about?.portrait?.src" class="about-page__portrait">
          <NuxtImg :src="about.portrait.src" :alt="about.portrait.alt ?? ''" sizes="sm:100vw md:40vw lg:30vw" />
          <figcaption v-if="about.portrait.caption">{{ about.portrait.caption }}</figcaption>
        </figure>
      </header>

      <div class="about-page__content">
        <ContentRenderer :value="about?.body ?? {}" />
      </div>
    </article>
  </main>
</template>

<style scoped lang="scss">
.about-page {
  min-height: 100dvh;
  padding: clamp(5rem, 11vw, 10rem) 0 clamp(7rem, 14vw, 13rem);
  background:
    radial-gradient(circle at 84% 8%, color-mix(in srgb, var(--nyx-c-teal) 8%, transparent), transparent 34rem),
    var(--c-background);
}

.about-page__article {
  width: min(100% - (var(--page-gutter) * 2), var(--content-width));
  margin: 0 auto;
}

.about-page__masthead {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-8);
  align-items: end;
  padding-bottom: clamp(5rem, 10vw, 9rem);
  border-bottom: 1px solid var(--c-border-subtle);
}

.about-page__intro {
  grid-column: 1 / span 7;
}

.about-page__eyebrow,
.about-page__portrait figcaption {
  color: var(--c-primary);
  font-family: var(--font-technical);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1.4;
  text-transform: uppercase;
}

.about-page h1 {
  max-width: 8ch;
  margin: var(--space-6) 0 var(--space-8);
  font-size: clamp(4rem, 10vw, 8rem);
  line-height: 0.96;
}

.about-page__dek {
  max-width: 34rem;
  color: var(--c-text-muted);
  font-size: clamp(1.125rem, 2vw, 1.4rem);
  line-height: 1.5;
}

.about-page__portrait {
  grid-column: 9 / -1;
  margin: 0;
}

.about-page__portrait :deep(img) {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  border: 1px solid var(--c-border);
  object-fit: cover;
}

.about-page__portrait figcaption {
  margin-top: var(--space-3);
  color: var(--c-text-muted);
  font-size: 0.625rem;
}

.about-page__content {
  width: min(100%, 72rem);
  padding-top: clamp(5rem, 10vw, 9rem);
}

.about-page__content :deep(p),
.about-page__content :deep(ul) {
  max-width: var(--reading-width);
}

.about-page__content :deep(p) {
  margin: 0 0 var(--space-6);
  color: var(--c-text-muted);
}

.about-page__content :deep(p:first-child) {
  max-width: 48rem;
  margin-bottom: var(--space-4);
  color: var(--c-text);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1.25;
}

.about-page__content :deep(h2) {
  margin: clamp(6rem, 12vw, 11rem) 0 var(--space-8);
  padding-top: var(--space-4);
  border-top: 1px solid var(--c-border-subtle);
  font-size: clamp(2.25rem, 5vw, 4rem);
  line-height: 1.05;
}

.about-page__content :deep(h3) {
  max-width: 48rem;
  margin: clamp(3rem, 7vw, 6rem) 0 var(--space-4);
  color: var(--c-text);
  font-family: var(--font-technical);
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.5;
  text-transform: uppercase;
}

.about-page__content :deep(ul) {
  list-style: none;
  margin-top: var(--space-4);
  margin-bottom: var(--space-8);
  padding-left: 0;
  color: var(--c-text-muted);
}

.about-page__content :deep(li) {
  position: relative;
  padding-left: 2rem;
  margin-bottom: var(--space-2);
}

.about-page__content :deep(li::before) {
  position: absolute;
  top: 0.7em;
  left: 0;
  width: 0.75rem;
  height: 1px;
  background: var(--c-primary);
  box-shadow: 0.375rem 0 0 var(--nyx-c-teal);
  content: '';
}

.about-page__content :deep(blockquote) {
  position: relative;
  max-width: 48rem;
  margin: clamp(4rem, 8vw, 7rem) 0;
  padding: var(--space-6) 0 var(--space-6) clamp(2rem, 6vw, 5rem);
  border-top: 1px solid var(--c-border-subtle);
  border-bottom: 1px solid var(--c-border-subtle);
  color: var(--c-text);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1.25;
}

.about-page__content :deep(blockquote::before) {
  position: absolute;
  top: var(--space-6);
  left: 0;
  color: var(--c-primary);
  content: '“';
  font-size: 3.5rem;
  line-height: 0.8;
}

.about-page__content :deep(blockquote p) {
  margin: 0;
  color: inherit;
  font: inherit;
}

.about-page__content :deep(a) {
  color: var(--c-primary);
  text-decoration-color: color-mix(in srgb, var(--c-primary) 45%, transparent);
  text-decoration-thickness: 1px;
}

.about-page__content :deep(a:hover) {
  color: var(--c-text);
  text-decoration-color: var(--c-text);
}

.about-page__content :deep(#beyond-code ~ * strong) {
  color: var(--nyx-c-teal);
  font-weight: 650;
  text-shadow: 0 0 1rem color-mix(in srgb, var(--nyx-c-teal) 18%, transparent);
}

@media (max-width: 48em) {
  .about-page {
    padding-top: 4rem;
  }

  .about-page__masthead {
    display: block;
  }

  .about-page__intro {
    margin-bottom: var(--space-12);
  }

  .about-page h1 {
    font-size: clamp(3.5rem, 17vw, 5.5rem);
  }

  .about-page__portrait {
    width: min(100%, 20rem);
    margin-left: auto;
  }

  .about-page__content :deep(h2) {
    display: block;
    font-size: clamp(2.25rem, 12vw, 3.5rem);
  }

  .about-page__content :deep(blockquote) {
    padding-left: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page__content :deep(a) {
    transition: none;
  }
}
</style>
