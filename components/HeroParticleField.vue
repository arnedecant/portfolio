<script setup lang="ts">
type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  tone: 'primary' | 'secondary' | 'amber'
  index: number
}

type PointerState = {
  x: number
  y: number
  targetX: number
  targetY: number
  active: boolean
}

type ParticleColors = {
  primary: string
  signal: string
  secondary: string
  amber: string
  background: string
}

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const field = useTemplateRef<HTMLDivElement>('field')

const prefersReducedMotion = ref(false)
const isVisible = ref(true)
const pointer = reactive<PointerState>({
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  active: false,
})

const particles: Particle[] = []
const grid = new Map<string, Particle[]>()
const cellSize = 96
const maxDpr = 2
const desktopDensity = 0.000055
const mobileDensity = 0.000028
const maxParticles = 150
const desktopConnectionRadius = 132
const mobileConnectionRadius = 88
const desktopConnectionOpacity = 0.2
const mobileConnectionOpacity = 0.12
const cursorRadius = 180
const particleColors: ParticleColors = {
  primary: 'var(--c-primary)',
  signal: 'var(--c-primary-signal)',
  secondary: 'var(--c-secondary)',
  amber: 'var(--nyx-c-amber-light)',
  background: 'var(--c-background)',
}

let context: CanvasRenderingContext2D | null = null
let animationFrame = 0
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let motionQuery: MediaQueryList | null = null
let lastWidth = 0
let lastHeight = 0
let randomSeed = 0x6d2b79f5

const seededRandom = () => {
  randomSeed = Math.imul(1664525, randomSeed) + 1013904223
  return (randomSeed >>> 0) / 4294967296
}

const getTokenColor = (name: keyof ParticleColors) => {
  if (!field.value || typeof window === 'undefined') return particleColors[name]

  const value = getComputedStyle(field.value).getPropertyValue(
    particleColors[name].replace('var(', '').replace(')', ''),
  ).trim()

  return value || particleColors[name]
}

const getColors = (): ParticleColors => ({
  primary: getTokenColor('primary'),
  signal: getTokenColor('signal'),
  secondary: getTokenColor('secondary'),
  amber: getTokenColor('amber'),
  background: getTokenColor('background'),
})

const cellKey = (x: number, y: number) => `${Math.floor(x / cellSize)}:${Math.floor(y / cellSize)}`

const initializeParticles = (width: number, height: number) => {
  particles.length = 0
  randomSeed = 0x6d2b79f5

  const isMobile = window.matchMedia('(max-width: 47.99em)').matches
  const density = isMobile ? mobileDensity : desktopDensity
  const motionScale = prefersReducedMotion.value ? 0.45 : 1
  const count = Math.min(maxParticles, Math.max(8, Math.round(width * height * density * motionScale)))

  for (let index = 0; index < count; index += 1) {
    const toneRoll = seededRandom()
    particles.push({
      x: seededRandom() * width,
      y: seededRandom() * height,
      vx: (seededRandom() - 0.5) * 0.09,
      vy: (seededRandom() - 0.5) * 0.09,
      radius: 0.7 + seededRandom() * 1.2,
      tone: toneRoll > 0.88 ? 'amber' : toneRoll > 0.55 ? 'secondary' : 'primary',
      index,
    })
  }
}

const resizeCanvas = () => {
  if (!canvas.value || !field.value || !context) return

  const width = Math.round(field.value.clientWidth)
  const height = Math.round(field.value.clientHeight)
  if (!width || !height) return

  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  context.setTransform(dpr, 0, 0, dpr, 0, 0)

  if (width !== lastWidth || height !== lastHeight) {
    lastWidth = width
    lastHeight = height
    initializeParticles(width, height)
  }
}

const rebuildGrid = () => {
  grid.clear()

  for (const particle of particles) {
    const key = cellKey(particle.x, particle.y)
    const cell = grid.get(key)
    if (cell) cell.push(particle)
    else grid.set(key, [particle])
  }
}

const drawConnections = (colors: ParticleColors) => {
  if (!context || prefersReducedMotion.value) return

  const isMobile = window.matchMedia('(max-width: 47.99em)').matches
  const connectionRadius = isMobile ? mobileConnectionRadius : desktopConnectionRadius
  const connectionOpacity = isMobile ? mobileConnectionOpacity : desktopConnectionOpacity
  const radiusSquared = connectionRadius * connectionRadius

  for (const particle of particles) {
    const cellX = Math.floor(particle.x / cellSize)
    const cellY = Math.floor(particle.y / cellSize)

    for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
      for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
        const neighbors = grid.get(`${cellX + offsetX}:${cellY + offsetY}`)
        if (!neighbors) continue

        for (const other of neighbors) {
          if (other.index <= particle.index) continue

          const deltaX = other.x - particle.x
          const deltaY = other.y - particle.y
          const distanceSquared = deltaX * deltaX + deltaY * deltaY
          if (distanceSquared > radiusSquared) continue

          const distance = Math.sqrt(distanceSquared)
          let alpha = (1 - distance / connectionRadius) * connectionOpacity
          const midpointX = (particle.x + other.x) / 2
          const midpointY = (particle.y + other.y) / 2

          if (pointer.active) {
            const cursorDeltaX = midpointX - pointer.x
            const cursorDeltaY = midpointY - pointer.y
            const cursorDistance = Math.sqrt(cursorDeltaX * cursorDeltaX + cursorDeltaY * cursorDeltaY)
            if (cursorDistance < cursorRadius) {
              alpha *= 1 + (1 - cursorDistance / cursorRadius) * 2.5
            }
          }

          context.globalAlpha = alpha
          context.strokeStyle = colors.signal
          context.lineWidth = 0.65
          context.beginPath()
          context.moveTo(particle.x, particle.y)
          context.lineTo(other.x, other.y)
          context.stroke()
        }
      }
    }
  }
}

const drawDots = (colors: ParticleColors) => {
  if (!context) return

  for (const particle of particles) {
    context.globalAlpha = prefersReducedMotion.value ? 0.36 : 0.58
    context.fillStyle = colors[particle.tone]
    context.beginPath()
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    context.fill()
  }
}

const advanceParticles = () => {
  if (!field.value || prefersReducedMotion.value) return

  const width = lastWidth
  const height = lastHeight

  for (const particle of particles) {
    particle.x += particle.vx
    particle.y += particle.vy

    if (particle.x < 0) particle.x = width
    if (particle.x > width) particle.x = 0
    if (particle.y < 0) particle.y = height
    if (particle.y > height) particle.y = 0
  }
}

const renderFrame = (_time: number) => {
  if (!context || !isVisible.value) {
    animationFrame = 0
    return
  }

  pointer.x += (pointer.targetX - pointer.x) * 0.08
  pointer.y += (pointer.targetY - pointer.y) * 0.08
  advanceParticles()

  const colors = getColors()
  context.clearRect(0, 0, lastWidth, lastHeight)
  context.globalAlpha = 1
  if (!prefersReducedMotion.value) {
    rebuildGrid()
    drawConnections(colors)
  }
  drawDots(colors)
  context.globalAlpha = 1
  animationFrame = prefersReducedMotion.value ? 0 : window.requestAnimationFrame(renderFrame)
}

const startRendering = () => {
  if (!animationFrame && isVisible.value) animationFrame = window.requestAnimationFrame(renderFrame)
}

const stopRendering = () => {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }
}

const onPointerMove = (event: PointerEvent) => {
  if (
    !field.value ||
    prefersReducedMotion.value ||
    event.pointerType === 'touch' ||
    !window.matchMedia('(pointer: fine)').matches
  ) {
    pointer.active = false
    return
  }

  const bounds = field.value.getBoundingClientRect()
  const x = event.clientX - bounds.left
  const y = event.clientY - bounds.top
  const inside = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height

  pointer.active = inside
  if (inside) {
    pointer.targetX = x
    pointer.targetY = y
  }
}

const onPointerLeave = () => {
  pointer.active = false
}

const onMotionChange = (event: MediaQueryListEvent) => {
  prefersReducedMotion.value = event.matches
  pointer.active = false
  if (lastWidth && lastHeight) initializeParticles(lastWidth, lastHeight)
  stopRendering()
  if (prefersReducedMotion.value) renderFrame(0)
  else startRendering()
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)
  motionQuery?.removeEventListener('change', onMotionChange)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  stopRendering()
  context = null
})

onMounted(() => {
  if (!canvas.value || !field.value) return

  context = canvas.value.getContext('2d')
  if (!context) return

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)
  resizeObserver = new ResizeObserver(resizeCanvas)
  resizeObserver.observe(field.value)
  intersectionObserver = new IntersectionObserver(([entry]) => {
    isVisible.value = entry.isIntersecting
    if (isVisible.value) startRendering()
    else stopRendering()
  })
  intersectionObserver.observe(field.value)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave)

  resizeCanvas()
  startRendering()
})
</script>

<template>
  <div ref="field" class="particle-field" aria-hidden="true">
    <canvas ref="canvas" />
  </div>
</template>

<style scoped lang="scss">
.particle-field {
  position: absolute;
  z-index: 0;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
