<script setup lang="ts">

const { data: about } = await useAsyncData(() => queryCollection('pages').path('/pages/about').first())

</script>

<template>
  <main>
    <ContentRenderer :value="about?.body ?? {}" />
  </main>
</template>