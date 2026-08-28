<script setup lang="ts">
import { computed } from 'vue'

type SignalVariant = 'work' | 'experience'

interface SignalNode {
  label: string
  x: number
  y: number
}

const props = withDefaults(defineProps<{
  variant?: SignalVariant
}>(), {
  variant: 'work',
})

const routePath = computed(() => props.variant === 'experience'
  ? 'M0 56H74L122 128H238L286 56H382L430 128H536L584 92H640'
  : 'M0 136H92L136 54H254L300 136H424L474 88H640')

const nodes = computed<SignalNode[]>(() => props.variant === 'experience'
  ? [
      { label: 'RIS', x: 122, y: 128 },
      { label: 'NANOPIXEL', x: 286, y: 56 },
      { label: 'KISWE', x: 430, y: 128 },
    ]
  : [
      { label: 'SYSTEMS', x: 136, y: 54 },
      { label: 'PRODUCT', x: 300, y: 136 },
      { label: 'INTERFACE', x: 474, y: 88 },
    ])

</script>

<template>
  <div class="signal-diagram">
    <svg
      viewBox="0 0 640 180"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
    >
      <path
        class="signal-diagram__guide"
        d="M0 136H92L136 54H254L300 136H424L474 88H640"
      />
      <path
        class="signal-diagram__route"
        :d="routePath"
        pathLength="1"
      />
      <template v-for="node in nodes" :key="node.label">
        <circle
          class="signal-diagram__node"
          :cx="node.x"
          :cy="node.y"
          r="4"
        />
        <text
          class="signal-diagram__label"
          :x="node.x"
          :y="node.y + 24"
        >{{ node.label }}</text>
      </template>
      <circle class="signal-diagram__pulse" r="3" cy="0">
        <animateMotion
          dur="8s"
          repeatCount="indefinite"
          :path="routePath"
        />
      </circle>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.signal-diagram {
  width: 100%;
  height: clamp(8rem, 22dvw, 11.25rem);
  overflow: hidden;
  pointer-events: none;
}

.signal-diagram svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.signal-diagram__guide,
.signal-diagram__route {
  fill: none;
  stroke-linecap: square;
  stroke-linejoin: bevel;
}

.signal-diagram__guide {
  stroke: var(--c-border-subtle);
  stroke-width: 0.75;
  opacity: 0.7;
}

.signal-diagram__route {
  stroke: var(--c-primary-signal);
  stroke-width: 1;
  opacity: 0.62;
}

.signal-diagram__node {
  fill: var(--c-background);
  stroke: var(--nyx-c-secondary, var(--nyx-c-teal));
  stroke-width: 1;
  opacity: 0.78;
}

.signal-diagram__label {
  fill: var(--c-text-muted);
  font-family: var(--font-technical);
  font-size: var(--text-technical);
  letter-spacing: 0.12em;
  text-anchor: middle;
  opacity: 0.68;
}

.signal-diagram__pulse {
  fill: var(--nyx-c-amber-light);
  opacity: 0.72;
}

@media (max-width: 40em) {
  .signal-diagram {
    height: 7.5rem;
  }

  .signal-diagram__label {
    font-size: 0.625rem;
    letter-spacing: 0.08em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signal-diagram__pulse {
    display: none;
  }
}

</style>
