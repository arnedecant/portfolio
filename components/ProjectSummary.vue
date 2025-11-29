<script setup lang="ts">

import type { ProjectsCollectionItem } from '@nuxt/content'
import { clamp, generateRandomString } from 'nyx-kit/utils'

const props = defineProps<{
  project: ProjectsCollectionItem
}>()

const $deco = useTemplateRef<HTMLDivElement>('deco')
const pointer = ref({ x: 0, y: 0 })
const decoString = ref(generateRandomString(2000))

function onMouseMove (event: MouseEvent) {
  if (!$deco.value) return
  const rect = $deco.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  pointer.value = { 
    x: Math.round(clamp(x, 0, rect.width)), 
    y: Math.round(clamp(y, 0, rect.height)) 
  }
  decoString.value = generateRandomString(2000)
}

function onClick () {
  navigateTo(props.project.link ?? props.project.github, { external: true, open: { target: '_blank' } })
}

function render () {
  if (!$deco.value) return
  $deco.value.style.setProperty('--x', `${pointer.value.x}px`)
  $deco.value.style.setProperty('--y', `${pointer.value.y}px`)
  $deco.value.innerHTML = decoString.value
  window.requestAnimationFrame(render)
}

watch($deco, render, { immediate: true })

</script>

<template>
  <article
    class="project-summary"
    @mousemove="onMouseMove"
    @click="onClick"
  >
    <figure :style="{ '--x': `${pointer.x}px`, '--y': `${pointer.y}px` }">
      <img
        v-if="props.project.thumbnail?.src"
        class="thumbnail"
        :src="props.project.thumbnail?.src"
        :alt="props.project.thumbnail?.alt"
      />
      <div class="deco" ref="deco" />
      <figcaption>{{ props.project.logo?.alt }}</figcaption>
    </figure>
    <h1>{{ props.project.title }}</h1>
    <p>
      {{ props.project.summary }}
    </p>
    <ul class="links">
      <li v-if="props.project.github">
        <NuxtLink :to="props.project.github" target="_blank">
          <Icon name="line-md:github-loop" />
        </NuxtLink>
      </li>
      <li v-if="props.project.link">
        <NuxtLink :to="props.project.link" target="_blank">
          <Icon name="line-md:link" />
        </NuxtLink>
      </li>
    </ul>
    <ul v-if="props.project.tech?.length" class="tech">
      <li v-for="tech in props.project.tech" :key="tech">{{ tech }}</li>
    </ul>
  </article>
</template>

<style scoped lang="scss">

.project-summary {
  display: flex;
  flex-direction: column;
  border-radius: var(--nyx-radius-lg);
  padding: 1rem;
  background: var(--c-background);
  border: 1px solid var(--nyx-c-text-4);
  cursor: pointer;
  transition: 0.3s ease;
  transition-property: scale, box-shadow;

  &:hover {
    scale: 1.025;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  }
}

h1 {
  font-size: 1.25em;
  margin-top: 1.5rem;
  font-weight: 300;
}

p {
  font-weight: 300;
  margin: 1rem 0;
  line-height: 1.5;
}

figure {
  --x: 0px; 
  --y: 0px;

  aspect-ratio: 1;
  width: 100%;
  object-fit: cover;
  border: 0;

  border-radius: var(--nyx-radius-xl);
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-aurora-radial);
    mix-blend-mode: darken;
  }

  figcaption {
    z-index: 1;
    font-size: 2em;
  }
}

.tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 300;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--nyx-c-text-4);
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
}

.links {
  display: flex;
  gap: 0.5rem;
  margin: auto 0 1rem;

  a {
    color: var(--nyx-c-default);

    &:hover {
      color: var(--nyx-c-default-light);
    }
  }

  span {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.deco {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
	height: 100%;
	width: 100%;
	font-family: var(--nyx-font-family-mono);
	font-size: 0.85rem;
	word-wrap: break-word;
	line-height: 1.15;
	color: #fff;
	opacity: 0;
  transition: opacity 0.5s ease;
	mask-image: radial-gradient(300px circle at var(--x) var(--y), black 20%, rgba(0,0,0,0.25), transparent);
}

figure:hover .deco {
  opacity: 1;
}

</style>