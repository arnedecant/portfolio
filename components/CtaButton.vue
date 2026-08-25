<script setup lang="ts">
import { NyxButton } from 'nyx-kit/components'

const props = defineProps<{
  to: string
  variant?: 'primary' | 'critical'
}>()
</script>

<template>
  <NuxtLink custom :to="props.to" v-slot="{ href, navigate }">
    <NyxButton
      :href="href"
      :theme="props.variant === 'critical' ? 'warning' : 'primary'"
      :variant="props.variant === 'critical' ? 'filled' : 'outline'"
      size="lg"
      class="cta-button"
      @click="navigate"
    >
      <slot />
    </NyxButton>
  </NuxtLink>
</template>

<style scoped lang="scss">
.cta-button {
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
