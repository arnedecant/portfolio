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
</style>

