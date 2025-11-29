<script setup lang="ts">

import type { ProjectsCollectionItem } from '@nuxt/content'

const props = defineProps<{
  project: ProjectsCollectionItem
}>()

</script>

<template>
  <article class="project-summary">
    <h1>{{ props.project.title }}</h1>
    <p class="meta">
      <span v-if="props.project.summary">{{ props.project.summary }}</span>
    </p>
    <ul v-if="props.project.tech?.length" class="tech">
      <li v-for="tech in props.project.tech" :key="tech">{{ tech }}</li>
    </ul>
  </article>
</template>

<style scoped lang="scss">

</style>