<script setup lang="ts">

const { data: home } = await useAsyncData(() => queryCollection('pages').path('/pages/home').first())

const { data: projects } = await useAsyncData(() => queryCollection('projects')
  .where('featured', '=', true)
  .order('order', 'ASC')
  .all())

</script>

<template>
  <main class="page">
    <section class="hero">
      <span class="eyebrow">Portfolio</span>
      <h1>{{ home?.title ?? 'Home' }}</h1>
    </section>

    <ContentRenderer v-if="home?.body" :value="home.body" />

    <section class="section projects">
      <h2>Featured projects</h2>
      <div class="grid">
        <article v-for="project in projects" :key="project.slug">
          <h3>{{ project.title }}</h3>
          <p class="meta">
            <span v-if="project.role">{{ project.role }}</span>
          </p>
          <p v-if="project.tech?.length" class="tech">
            {{ project.tech.join(' · ') }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.hero {
  margin-bottom: 4rem;

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    color: var(--muted);
    margin-bottom: 0.75rem;
  }

  h1 {
    font-size: clamp(2.8rem, 5vw, 3.6rem);
    letter-spacing: -0.04em;
    margin: 0 0 0.75rem;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}


.projects {
  

  .project-card {
    padding: 1.25rem 1.5rem;
    border-radius: 1rem;
    background: radial-gradient(circle at top left, pink, #060712);
    border: 1px solid var(--border-subtle);

    h3 {
      margin: 0 0 0.25rem;
      font-size: 1rem;
    }

    .meta {
      font-size: 0.8rem;
      color: var(--muted);
      margin-bottom: 0.5rem;
    }

    .tech {
      font-size: 0.8rem;
      color: var(--muted);
    }
  }
}
</style>

