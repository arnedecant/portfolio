<script setup lang="ts">

const { data: home } = await useAsyncData(() => queryCollection('pages').path('/pages/home').first())

</script>

<template>
  <main class="page">
    <AppHero
      id="hero"
      :title="home?.title ?? 'Home'"
      :eyebrow="home?.eyebrow ?? 'Portfolio'"
    />
    <ContentRenderer
      v-if="home?.body"
      :value="home.body"
    />
    <ProjectSummaryGrid id="projects" />
  </main>
</template>

<style scoped lang="scss">
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

