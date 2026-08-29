<script setup lang="ts">
import { NyxButton } from 'nyx-kit/components'

const { data: resume } = await useAsyncData(() => queryCollection('pages').path('/pages/resume').first())

const config = useAppConfig()

useSeoMeta({
  title: () => resume.value?.title ?? `${config.site.name} | Resume`,
  description: () => resume.value?.description ?? `Resume of ${config.site.name}`,
})

function printResume() {
  if (import.meta.client) window.print()
}
</script>

<template>
  <main class="resume-page">
    <div class="resume-page__shell">
      <header class="resume-page__intro">
        <div>
          <p class="resume-page__eyebrow">Curriculum vitae</p>
          <h1>{{ config.site.name }}</h1>
          <p class="resume-page__title">{{ resume?.resumeTitle ?? config.site.role }}</p>
          <p class="resume-page__location">{{ resume?.resumeLocation ?? config.site.location }}</p>
        </div>
        <NyxButton
          class="resume-page__print"
          type="button"
          theme="primary"
          variant="outline"
          size="lg"
          @click="printResume"
        >
          Print resume
        </NyxButton>
      </header>

      <article class="resume-sheet">
        <section v-if="resume?.resumeSummary" class="resume-section resume-summary" aria-labelledby="resume-summary-title">
          <p class="resume-section__label">Profile</p>
          <h2 id="resume-summary-title">A frontend specialist for complex products.</h2>
          <p>{{ resume.resumeSummary }}</p>
        </section>

        <section v-if="resume?.resumeExperience?.length || resume?.resumeEducation?.length" class="resume-section" aria-labelledby="resume-experience-title">
          <div class="resume-section__heading">
            <p class="resume-section__label">Background</p>
            <h2 id="resume-experience-title">Work and education</h2>
          </div>
          <div class="resume-experience">
            <article v-for="item in resume?.resumeExperience" :key="`${item.company}-${item.period}`" class="resume-experience__item">
              <p class="resume-experience__period">{{ item.period }}</p>
              <div>
                <h3>{{ item.role }}</h3>
                <p class="resume-experience__company">{{ item.company }}</p>
                <p>{{ item.summary }}</p>
                <ul v-if="item.highlights.length">
                  <li v-for="highlight in item.highlights" :key="highlight">{{ highlight }}</li>
                </ul>
              </div>
            </article>
            <article v-for="item in resume?.resumeEducation" :key="item" class="resume-experience__item resume-experience__item--education">
              <p class="resume-experience__period">Education</p>
              <div>
                <h3>{{ item }}</h3>
                <p>Multimedia and creative technology foundation.</p>
              </div>
            </article>
          </div>
        </section>

        <section v-if="resume?.resumeSkills?.length" class="resume-section" aria-labelledby="resume-skills-title">
          <p class="resume-section__label">Capabilities</p>
          <h2 id="resume-skills-title">Skills</h2>
          <div class="resume-skills">
            <div v-for="group in resume.resumeSkills" :key="group.title" class="resume-skills__group">
              <h3>{{ group.title }}</h3>
              <p>{{ group.items.join(' / ') }}</p>
            </div>
          </div>
        </section>

        <section v-if="resume?.resumeProjects?.length" class="resume-section" aria-labelledby="resume-projects-title">
          <p class="resume-section__label">Selected work</p>
          <h2 id="resume-projects-title">Projects</h2>
          <ul class="resume-projects">
            <li v-for="item in resume.resumeProjects" :key="item.label">
              <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </section>

        <footer class="resume-sheet__contact">
          <div>
            <p class="resume-section__label">Contact</p>
            <h2>Let's talk about complex interfaces.</h2>
          </div>
          <div class="resume-contact-links">
            <a :href="`mailto:${resume?.resumeEmail ?? 'hello@arnedecant.be'}`">{{ resume?.resumeEmail ?? 'hello@arnedecant.be' }}</a>
            <a v-for="item in resume?.resumeLinks" :key="item.label" :href="item.to" target="_blank" rel="noreferrer">{{ item.label }}</a>
          </div>
        </footer>
      </article>
    </div>
  </main>
</template>
