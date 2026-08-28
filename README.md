# Arne Decant

Senior software engineer and web architect based in Belgium. I build complex
products, interactive tools, and reusable systems that feel clear and coherent
for the people using them.

I work mostly across frontend architecture, design systems, real-time
interfaces, and product development. My background includes live video
production, browser-based 3D experiences, component libraries, and full-
lifecycle web work.

**[Visit my portfolio](https://arnedecant.github.io)** ·
**[GitHub](https://github.com/arnedecant)** ·
**[LinkedIn](https://www.linkedin.com/in/arne-decant-970b9282/)** ·
**[Email me](mailto:hello@arnedecant.be)**

## Selected Work

- **[Nyx Kit](https://github.com/NyxKit/nyx-kit)** - A reusable Vue component
  library focused on consistent interfaces, accessible defaults, and clear
  APIs. [Explore the documentation](https://nyxkit.github.io/nyx-kit).
- **[Video Projection Mapping](https://github.com/arnedecant/video-projection-mapping)**
  : An experiment in using web technologies to project visuals onto physical
  spaces and shapes. [View the live demo](https://arnedecant.github.io/video-projection-mapping/).
- **[WebGL Webcam Audio Visualiser](https://github.com/arnedecant/audio-visualiser)**
  : A real-time graphics experiment where camera pixels and audio drive a
  particle system. [View the live demo](https://dev.arnedecant.be/webgl/webcam-audio-visualizer/).

## About This Repository

This repository contains my personal portfolio site: a content-driven Nuxt
application where the pages and project entries live in Markdown. It is both a
place to explore my work and a small example of how I approach frontend
architecture, content modeling, and visual detail.

The site is built with:

- [Nuxt 4](https://nuxt.com/) and [Vue 3](https://vuejs.org/)
- TypeScript and Zod for typed, validated content
- [Nuxt Content](https://content.nuxt.com/) for the Markdown content layer
- SCSS and a custom component-based design system
- [Nuxt Studio](https://studio.nuxt.com/) for browser-based content editing

## Run Locally

Requirements: Node.js and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

The development server runs at `http://localhost:9001`.

Useful commands:

```bash
pnpm build    # Build for production
pnpm generate # Generate a static site
pnpm preview  # Preview the production build
```

Content can be edited directly in `content/` or through Nuxt Studio when it is
enabled.
