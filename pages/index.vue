<script setup lang="ts">
const experience = [
  {
    period: '2014–2018',
    company: 'RIS',
    role: 'Software Developer',
    summary: 'Built websites, email templates, SEO workflows, deployments, and custom applications for varied customers.',
  },
  {
    period: '2018–2020',
    company: 'Nanopixel',
    role: 'Software Engineer · Lead Developer · Product Owner',
    summary: 'Built browser and kiosk-based 3D configurators, interactive maps, visualization tools, and Showreal, a multi-screen real-estate sales experience.',
  },
  {
    period: '2020–2026',
    company: 'Kiswe',
    role: 'Senior Software Engineer',
    summary: 'Worked on browser-based products for live video production, remote participation, and large-scale streaming operations.',
  },
]

const expertise = [
  {
    title: 'Frontend architecture',
    items: ['Vue 3', 'TypeScript', 'Nuxt', 'Complex state and workflows', 'Component API design', 'Performance and maintainability'],
  },
  {
    title: 'Design systems and developer experience',
    items: ['Reusable component libraries', 'Storybook', 'Theming and design tokens', 'Accessibility', 'Documentation', 'Package architecture'],
  },
  {
    title: 'Quality and delivery',
    items: ['Vitest', 'Playwright', 'Static analysis', 'Code review', 'CI/CD', 'Testing strategy'],
  },
  {
    title: 'Interactive and real-time systems',
    items: ['Three.js', 'WebGL and GLSL', 'Web Audio', 'WebSockets', 'Live video workflows', 'Multi-screen experiences'],
  },
]

const principles = [
  ['01', 'Own the whole problem', 'Understand the product, constraints, and consequences, not only the assigned code.'],
  ['02', 'Design for other developers', 'Build APIs, components, and systems that are predictable, documented, and maintainable.'],
  ['03', 'Make complexity feel simple', 'Hide operational complexity without hiding important information.'],
]
</script>

<template>
  <main class="home-page">
    <section class="home-hero" aria-labelledby="hero-title">
      <div class="home-hero__inner">
        <TechnicalLabel>SENIOR SOFTWARE ENGINEER · CREATIVE TECHNOLOGIST</TechnicalLabel>
        <h1 id="hero-title">I build complex interfaces into clear, dependable products.</h1>
        <p class="home-hero__lede">Senior software engineer with 10+ years of experience building production tools, real-time experiences, design systems, and interactive 3D applications.</p>
        <div class="home-hero__actions">
          <CtaButton to="#work">Explore my work</CtaButton>
          <CtaButton to="/about">Read about me</CtaButton>
        </div>
        <div class="home-hero__meta">
          <span>Based in Belgium</span>
          <span>Available for senior software engineering opportunities</span>
        </div>
        <SocialLinks />
      </div>
    </section>

    <SectionFrame id="positioning" eyebrow="01 / Positioning" title="Complex products. Reusable systems. Clear experiences.">
      <p class="section-lede">I'm a senior software engineer focused on frontend architecture, product ownership, and complex interactive systems. My work spans livestream production, real-time communication, browser-based 3D experiences, and reusable Vue component systems.</p>
      <div class="signal-ideas" aria-label="Three connected areas of focus">
        <span>Complex products</span>
        <span>Reusable systems</span>
        <span>Clear experiences</span>
      </div>
    </SectionFrame>

    <section id="work" class="work-section">
      <div class="container">
        <div class="section-heading">
          <TechnicalLabel>02 / Selected work</TechnicalLabel>
          <h2>Systems I build, shape, and keep understandable.</h2>
        </div>
        <p class="section-lede">A selection of personal projects and experiments. Each one is a way to work through a different kind of complexity, from component APIs to physical telemetry and real-time graphics.</p>
        <ProjectSummaryGrid title="Featured projects" />
        <NuxtLink class="text-link" to="/projects">Browse all projects <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>

    <SectionFrame id="experience" eyebrow="03 / Experience" title="A decade moving from full-lifecycle web work to high-stakes product systems.">
      <ol class="experience-list">
        <li v-for="item in experience" :key="item.company" class="experience-item">
          <TechnicalLabel as="span">{{ item.period }}</TechnicalLabel>
          <div>
            <h3>{{ item.company }}</h3>
            <p class="experience-item__role">{{ item.role }}</p>
            <p>{{ item.summary }}</p>
          </div>
        </li>
      </ol>
    </SectionFrame>

    <SectionFrame id="expertise" eyebrow="04 / Expertise" title="Deepest in frontend architecture and product ownership.">
      <div class="expertise-grid">
        <article v-for="group in expertise" :key="group.title" class="expertise-group">
          <h3>{{ group.title }}</h3>
          <ul>
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </SectionFrame>

    <SectionFrame id="philosophy" eyebrow="05 / Philosophy" title="The work is technical. The outcome should feel calm.">
      <ol class="principles-list">
        <li v-for="[number, title, description] in principles" :key="number">
          <TechnicalLabel as="span">{{ number }}</TechnicalLabel>
          <div>
            <h3>{{ title }}</h3>
            <p>{{ description }}</p>
          </div>
        </li>
      </ol>
    </SectionFrame>

    <SectionFrame id="about" eyebrow="06 / About" title="Engineering, interaction design, and product thinking in the same room.">
      <div class="about-preview">
        <p class="section-lede">I'm Arne, a software engineer based in Belgium. I enjoy working where engineering, interaction design, and product thinking overlap. Outside professional product work, I experiment with generative visuals, Three.js, home automation, and self-hosted systems.</p>
        <NuxtLink class="text-link" to="/about">More about my journey <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </SectionFrame>

    <SectionFrame id="contact" class="contact-section" eyebrow="07 / Contact" title="Have a complex product that needs clarity?">
      <div class="contact-section__content">
        <p>I'm interested in senior engineering roles where I can combine frontend architecture, technical ownership, and thoughtful product development.</p>
        <div class="contact-section__actions">
          <CtaButton to="mailto:hello@arnedecant.be" variant="critical">Email me</CtaButton>
          <NuxtLink to="https://www.linkedin.com/in/arne-decant-970b9282/" target="_blank">Connect on LinkedIn ↗</NuxtLink>
          <NuxtLink to="https://github.com/arnedecant" target="_blank">View GitHub ↗</NuxtLink>
        </div>
        <p class="contact-section__location">Belgium · Available for senior software engineering opportunities</p>
      </div>
    </SectionFrame>
  </main>
</template>

<style scoped lang="scss">
.home-hero {
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
  display: grid;
  gap: var(--space-6);
}

.home-hero h1 {
  max-width: 12ch;
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

.signal-ideas {
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-12);
  border-top: 1px solid var(--c-border-subtle);
}

.signal-ideas span {
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--c-border-subtle);
  color: var(--c-primary);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3dvw, 2.5rem);
}

.experience-list,
.principles-list {
  display: grid;
  gap: var(--space-8);
  padding: 0;
  margin: 0;
  list-style: none;
}

.experience-item,
.principles-list li {
  display: grid;
  grid-template-columns: minmax(7rem, 1fr) 3fr;
  gap: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--c-border-subtle);
}

.experience-item h3,
.principles-list h3,
.expertise-group h3 {
  margin-bottom: var(--space-2);
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 600;
}

.experience-item p,
.principles-list p {
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

  .signal-ideas {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }

  .signal-ideas span:nth-child(2) {
    transform: translateY(var(--space-8));
  }
}

@media (max-width: 47.99em) {
  .expertise-grid {
    grid-template-columns: 1fr;
  }

  .experience-item,
  .principles-list li {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}
</style>
