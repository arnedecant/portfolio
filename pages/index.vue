<script setup lang="ts">
const { data: home } = await useAsyncData(() =>
  queryCollection('pages').path('/pages/home').first(),
)
</script>

<template>
  <main class="home-page">
    <section class="home-hero" aria-labelledby="hero-title">
      <HeroParticleField />
      <div class="home-hero__inner">
        <TechnicalLabel>{{ home?.heroLabel }}</TechnicalLabel>
        <h1 id="hero-title">{{ home?.heroTitle }}</h1>
        <p class="home-hero__lede">{{ home?.heroLede }}</p>
        <div class="home-hero__actions">
          <CtaButton to="#work">{{ home?.heroPrimaryAction }}</CtaButton>
          <CtaButton to="/about">{{ home?.heroSecondaryAction }}</CtaButton>
        </div>
        <div class="home-hero__meta">
          <span>{{ home?.heroLocation }}</span>
          <span>{{ home?.heroAvailability }}</span>
        </div>
        <SocialLinks />
      </div>
    </section>

    <section id="work" class="work-section">
      <div class="container">
        <div class="section-heading">
          <TechnicalLabel>{{ home?.workLabel }}</TechnicalLabel>
          <h2>{{ home?.workTitle }}</h2>
        </div>
        <p class="section-lede">{{ home?.workLede }}</p>
        <ProjectSummaryGrid :title="home?.workProjectsTitle" />
        <NuxtLink class="text-link" to="/projects">{{ home?.workBrowseLabel }} <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>

    <SectionFrame id="experience" :eyebrow="home?.experienceLabel" :title="home?.experienceTitle">
      <p class="section-lede experience-intro">{{ home?.experienceIntro }}</p>
      <ol class="experience-list">
        <li v-for="item in home?.experience ?? []" :key="item.company" class="experience-item">
          <TechnicalLabel as="span">{{ item.period }}</TechnicalLabel>
          <div>
            <h3>{{ item.company }}</h3>
            <p class="experience-item__role">{{ item.role }}</p>
            <p>{{ item.summary }}</p>
          </div>
        </li>
      </ol>
    </SectionFrame>

    <SectionFrame id="expertise" :eyebrow="home?.practiceLabel" :title="home?.practiceTitle">
      <div class="expertise-grid">
        <article v-for="group in home?.expertise ?? []" :key="group.title" class="expertise-group">
          <h3>{{ group.title }}</h3>
          <p>{{ group.description }}</p>
          <ul>
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </SectionFrame>

    <SectionFrame id="about" :eyebrow="home?.aboutLabel" :title="home?.aboutTitle">
      <div class="about-preview">
        <p class="section-lede">{{ home?.aboutCopy }}</p>
        <NuxtLink class="text-link" to="/about">{{ home?.aboutLinkLabel }} <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </SectionFrame>

    <SectionFrame id="contact" class="contact-section" :eyebrow="home?.contactLabel" :title="home?.contactTitle">
      <div class="contact-section__content">
        <p>{{ home?.contactCopy }}</p>
        <div class="contact-section__actions">
          <CtaButton to="mailto:hello@arnedecant.be" variant="critical">{{ home?.contactEmailLabel }}</CtaButton>
          <NuxtLink to="https://www.linkedin.com/in/arne-decant-970b9282/" target="_blank">{{ home?.contactLinkedInLabel }}</NuxtLink>
          <NuxtLink to="https://github.com/arnedecant" target="_blank">{{ home?.contactGitHubLabel }}</NuxtLink>
        </div>
        <p class="contact-section__location">{{ home?.contactLocation }}</p>
      </div>
    </SectionFrame>
  </main>
</template>

<style scoped lang="scss">
.home-hero {
  position: relative;
  isolation: isolate;
  min-height: calc(100dvh - 4.5rem);
  display: grid;
  align-items: center;
  padding: var(--space-20) 0;
}

.home-hero__inner,
.container {
  width: min(100% - (var(--page-gutter) * 2), var(--content-width));
  margin: 0 auto;
}

.home-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  gap: var(--space-6);
}

.home-hero h1 {
  max-width: 18ch;
  margin: var(--space-8) 0 var(--space-4);
}

.home-hero__lede,
.section-lede {
  max-width: var(--reading-width);
  color: var(--c-text-muted);
  font-size: clamp(1rem, 1.5dvw, 1.25rem);
}

.home-hero__actions,
.contact-section__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
  margin-top: var(--space-6);
}

.home-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-6);
  margin-top: var(--space-8);
  color: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
}

.home-hero__meta span + span::before {
  margin-right: var(--space-3);
  content: '·';
  color: var(--c-primary);
}

.home-hero :deep(.social-links) {
  margin-top: var(--space-6);
}

.work-section,
.contact-section {
  padding: var(--space-20) 0;
}

.section-heading {
  display: grid;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.section-heading h2,
.contact-section h2 {
  max-width: 40ch;
  font-size: var(--text-headline);
}

.work-section :deep(.projects) {
  width: 100%;
  padding: 0;
  margin-top: var(--space-12);
}

.work-section :deep(.projects h2) {
  display: none;
}

.work-section :deep(.grid) {
  gap: var(--space-6);
}

.text-link {
  display: inline-flex;
  gap: var(--space-2);
  margin-top: var(--space-6);
  color: var(--c-primary);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  text-decoration: none;
  text-transform: uppercase;
}

.experience-list {
  display: grid;
  gap: var(--space-8);
  padding: 0;
  margin: 0;
  list-style: none;
}

.experience-intro {
  margin-bottom: var(--space-8);
}

.experience-item {
  display: grid;
  grid-template-columns: minmax(7rem, 1fr) 3fr;
  gap: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--c-border-subtle);
}

.experience-item h3,
.expertise-group h3 {
  margin-bottom: var(--space-2);
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 600;
}

.experience-item p {
  max-width: var(--reading-width);
  color: var(--c-text-muted);
}

.experience-item__role {
  margin-bottom: var(--space-3);
  color: var(--c-primary) !important;
  font-family: var(--font-technical);
  font-size: var(--text-technical);
}

.expertise-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: var(--c-border-subtle);
}

.expertise-group {
  padding: var(--space-6);
  background: var(--c-background);
}

.expertise-group p {
  min-height: 4.5em;
  margin-bottom: var(--space-4);
  color: var(--c-text-muted);
}

.expertise-group ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: 0;
  list-style: none;
}

.expertise-group li {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--c-border);
  color: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
}

.about-preview {
  display: grid;
  gap: var(--space-6);
}

.contact-section {
  background: var(--c-surface-lowest);
}

.contact-section__content {
  display: grid;
  gap: var(--space-4);
}

.contact-section__content > p:first-child {
  max-width: 55ch;
  color: var(--c-text-muted);
  font-size: 1.125rem;
}

.contact-section__actions a:not(.cta-button) {
  color: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  text-decoration: none;
  text-transform: uppercase;
}

.contact-section__location {
  color: var(--c-primary);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
}

@media (min-width: 48em) {
  .work-section {
    padding: var(--space-40) 0;
  }

  .home-hero {
    padding: var(--space-40) 0;
  }

}

@media (max-width: 47.99em) {
  .expertise-grid {
    grid-template-columns: 1fr;
  }

  .experience-item {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}
</style>
