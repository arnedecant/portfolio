<script setup lang="ts">

const props = defineProps<{
  to: string
}>()

</script>

<template>
  <NuxtLink :to="props.to" class="cta-button">
    <slot />
  </NuxtLink>
</template>

<style scoped lang="scss">

.cta-button {
  --radius-lg: 1rem; // TODO
  --border-width: 0.1rem;
  --width: 20rem;
  --height: 4rem;
  width: var(--width);
  height: var(--height);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text);
  font-weight: 300;
  letter-spacing: 0.3em;
  border-radius: var(--radius-lg);
  background-color: var(--c-background);
  // border: 1px solid var(--c-text);
}

.cta-button:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--width);
  height: var(--height);
  background: var(--gradient-aurora-linear);
  width: calc(var(--width) + (var(--border-width) * 2));
  height: calc(var(--height) + (var(--border-width) * 2));
  left: calc(var(--border-width) * -1);
  top: calc(var(--border-width) * -1);
  background-size: 600% 300%;
  border-radius: var(--radius-lg);
  animation: animateBorder 10s linear infinite;
  z-index: -2;
  transition: filter 0.3s ease-in;
  transform-origin: center center;
}

.cta-button:hover {
  text-decoration: none;
}

.cta-button:hover::after {
  filter: blur(1rem);
  transition: filter .4s ease-in;
  transform: rotate(0);
}

@keyframes animateBorder {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}
</style>