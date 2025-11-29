<script setup lang="ts">

const props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Featured projects',
})

const { data: projects } = await useAsyncData(() => queryCollection('projects')
  .where('featured', '=', true)
  .order('order', 'ASC')
  .all())

</script>

<template>
  <section class="projects container">
    <h2>{{ props.title }}</h2>
    <div class="grid">
      <ProjectSummary v-for="project in projects" :key="project.slug" :project="project" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  margin: 3rem 0;
}

@media screen and (min-width: 40em) {
	.grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media screen and (min-width: 60em) {
	.grid {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>