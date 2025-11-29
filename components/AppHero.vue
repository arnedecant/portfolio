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
    <CtaButton to="#projects" class="hero__cta">View my projects</CtaButton>
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
    margin-top: auto;
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

.hero__cta {
  margin-top: clamp(2rem, 5dvh, 5rem);
  margin-bottom: auto;
}

</style>