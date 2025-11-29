# Portfolio Site

A modern, content-driven portfolio website built with Nuxt and deployed on Netlify. Features a headless CMS workflow with Nuxt Studio for seamless content editing directly from the browser.

## 🚀 Tech Stack

### Core Framework
- **[Nuxt 4](https://nuxt.com/)** - The Vue.js meta-framework for building modern web applications
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **TypeScript** - Type-safe development

### Content Management
- **[Nuxt Content](https://content.nuxt.com/)** - File-based CMS for managing markdown content
- **[Nuxt Studio](https://studio.nuxt.com/)** - Visual content editor with GitHub integration
- **Zod** - Schema validation for content collections

### Styling
- **SCSS** - CSS preprocessor with custom variables and mixins
- **Custom design system** - Modular component-based styling

### Development & Deployment
- **[Netlify](https://www.netlify.com/)** - Hosting and serverless functions
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code quality and consistency

### Additional Modules
- **@nuxt/fonts** - Optimized font loading
- **@nuxt/icon** - Icon component library
- **@nuxt/image** - Optimized image handling
- **nyx-kit** - Custom utility library

## 📁 Project Structure

```
├── assets/
│   └── styles/          # SCSS stylesheets (variables, reset, base, main)
├── components/          # Vue components
├── content/
│   ├── pages/           # Markdown pages (home, about, projects)
│   └── projects/        # Project markdown files
├── pages/               # Nuxt page components
├── public/              # Static assets
├── shared/              # Shared utilities and types
├── content.config.ts    # Content collection schemas
├── nuxt.config.ts       # Nuxt configuration
└── netlify.toml         # Netlify deployment config
```

## 🛠️ Development Workflow

### Content Management with Nuxt Studio

This portfolio uses **Nuxt Studio** for visual content editing:

1. **GitHub Integration**: Content is stored in markdown files in the repository
2. **Visual Editor**: Edit content directly in the browser at `/studio` (when enabled)
3. **Schema Validation**: Content is validated using Zod schemas defined in `content.config.ts`
4. **Live Preview**: See changes in real-time before committing

The content structure includes:
- **Pages**: Home, About, Projects pages with SEO metadata
- **Projects**: Project showcase with tech stack, links, thumbnails, and featured flags

### Local Development

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```
   The site will be available at `http://localhost:3000`

3. **Edit content**:
   - Edit markdown files in `content/` directory
   - Or use Nuxt Studio at `/studio` (if enabled)
   - Changes are hot-reloaded automatically

4. **Build for production**:
   ```bash
   pnpm build
   ```

5. **Preview production build**:
   ```bash
   pnpm preview
   ```

## 🚢 Deployment

### Netlify Configuration

The site is configured for deployment on Netlify:

- **Build Command**: `pnpm run build`
- **Publish Directory**: `dist`
- **Serverless Functions**: Automatically detected in `dist`
- **SSR**: Enabled for server-side rendering
- **Prerendering**: Homepage and linked pages are prerendered for optimal performance

### Deployment Workflow

1. **Automatic Deployments**: 
   - Pushes to `main` branch trigger automatic builds
   - Pull requests get preview deployments

2. **Content Updates**:
   - Edit content via Nuxt Studio or directly in GitHub
   - Changes are automatically deployed after commit

3. **Environment Variables**:
   - Nuxt Studio GitHub OAuth credentials are configured in Netlify
   - Secrets are accessed at runtime (not inlined during build)

## 📝 Content Collections

Content is organized into two collections:

### Pages Collection
- Type: `page`
- Location: `content/pages/*.md`
- Schema: `title`, `slug`, `eyebrow`, `seoDescription`

### Projects Collection
- Type: `data`
- Location: `content/projects/*.md`
- Schema: `title`, `slug`, `summary`, `tech[]`, `featured`, `github`, `link`, `order`, `thumbnail`, `logo`

## 🎨 Features

- **Server-Side Rendering (SSR)**: Fast initial page loads
- **Content-Driven**: Easy content updates without code changes
- **Visual Editing**: Nuxt Studio for non-technical content editing
- **Type Safety**: TypeScript and Zod schemas throughout
- **Optimized Assets**: Image optimization and font loading
- **SEO Friendly**: Prerendered pages with metadata support
- **Smooth Scrolling**: Enhanced navigation experience

## 📦 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm generate` - Generate static site
- `pnpm clean` - Remove build artifacts and dependencies

## 🔧 Configuration

### Nuxt Studio

Nuxt Studio is configured with GitHub integration:
- Repository: `arnedecant/arnedecant.github.io`
- Branch: `main`
- OAuth credentials stored in Netlify environment variables

### Content Storage

- Uses in-memory storage (default) for Netlify compatibility
- SQLite connectors are not used in serverless environments

## 📚 Learn More

- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt Content Documentation](https://content.nuxt.com/)
- [Nuxt Studio Documentation](https://studio.nuxt.com/)
- [Netlify Documentation](https://docs.netlify.com/)

---

Built with ❤️ using Nuxt and deployed on Netlify
