<script setup lang="ts">

const { data: projects } = await useAsyncData(() => queryCollection('projects')
  .where('featured', '=', true)
  .order('order', 'ASC')
  .all())

</script>

<template>
  <section class="projects">
    <h2>Featured projects</h2>
    <div class="grid">
      <ProjectSummary v-for="project in projects" :key="project.slug" :project="project" />
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>