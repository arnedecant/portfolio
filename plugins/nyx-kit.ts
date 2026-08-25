import { NyxKit } from 'nyx-kit'
import { NyxSize, NyxTheme, NyxVariant } from 'nyx-kit/types'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(NyxKit, {
    colourMode: { mode: 'dark' },
    defaults: {
      all: {
        theme: NyxTheme.Primary,
        size: NyxSize.Medium,
        variant: NyxVariant.Soft,
      },
      button: {
        theme: NyxTheme.Primary,
        size: NyxSize.Medium,
        variant: NyxVariant.Soft,
      },
    },
  })
})
