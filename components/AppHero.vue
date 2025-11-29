<script setup lang="ts">

const props = withDefaults(defineProps<{
  title?: string
  eyebrow?: string
}>(), {
  title: 'Home',
  eyebrow: 'Portfolio',
})

const emit = defineEmits<{
  (e: 'onClickCta'): void
}>()

const { socials } = useAppConfig()

</script>

<template>
  <section class="hero">
    <span class="eyebrow">{{ props.eyebrow }}</span>
    <h1>{{ props.title }}</h1>
    <ul class="socials">
      <li v-for="social in socials" :key="social.icon">
        <NuxtLink :to="social.to" :target="social.target" :aria-label="social.ariaLabel">
          <Icon :name="social.icon" />
        </NuxtLink>
      </li>
    </ul>
    <NuxtLink to="#projects" class="cta">View my projects</NuxtLink>
  </section>
</template>

<style scoped lang="scss">



.hero {
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 0.2em;

  .eyebrow {
    font-size: clamp(0.75rem, 1dvw, 1.5rem);
    margin-bottom: 0.75rem;
    margin-top: clamp(-2.8rem, -5dvw, -3.6rem);
  }

  h1 {
    font-size: clamp(2.8rem, 5dvw, 3.6rem);
    margin: 0 0 5rem;
    letter-spacing: 0.3em;
    font-weight: inherit;
  }

  .socials {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 3rem;
  }
}

.cta {
  --radius-lg: 1rem; // TODO
  --border-width: 0.25rem;
  --width: 20rem;
  --height: 4rem;
  width: var(--width);
  height: var(--height);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text);
  font-weight: 400;
	border-radius: var(--radius-lg);
  overflow: hidden;
  // border: 1px solid var(--c-text);
}

.cta:before,
.cta:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--width);
  height: var(--height);
}

.cta:before {
  z-index: -1;
  background-color: black;
  border-radius: var(--radius-lg);
  width: calc(var(--width) - var(--border-width));
  height: calc(var(--height) - var(--border-width));
  transform: translate(calc(var(--border-width) / 2), calc(var(--border-width) / 2));
}

.cta:after {
  --width-gradient: calc(var(--width) + (var(--border-width) * 2));
  background: linear-gradient(45deg, #FF0099, #00EBEB, #DB00FF);
  // background-size: 600% 600%;
  border-radius: var(--radius-lg);
  height: var(--width-gradient);
  width: var(--width-gradient);
  animation: RotateBorder 10s linear infinite;
  z-index: -2;
  filter: blur(10px);
  transition: filter 1s ease-in;
  margin-top: calc(var(--width-gradient) * -0.5 + var(--border-width));
  margin-left: calc(var(--border-width) * -2);
  transform: rotate(0deg) translate(0, -10%);
  transform-origin: center center;
  border-radius: 50%;
}

.cta:hover {
  text-decoration: none;
}

.cta:hover::after {
  filter: blur(20px);
  backdrop-filter: blur(10px);
  transition: filter .4s ease-in;
  animation-play-state: paused;
  transform: rotate(720deg);
}

@keyframes AnimateBorder {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}

@keyframes RotateBorder {
  0% { transform: rotate(0deg) translate(0, 0) }
  50% { transform: rotate(360deg) translate(0, 0) }
  100% { transform: rotate(729deg) translate(0, 0) }
}

</style>