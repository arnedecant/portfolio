export default defineAppConfig({
  site: {
    name: 'Arne Decant',
    role: 'Senior Software Engineer',
    location: 'Belgium',
    availability: 'Available for senior software engineering opportunities',
  },
  socials: [
    {
      icon: 'line-md:github-loop',
      to: 'https://github.com/arnedecant',
      target: '_blank',
      label: 'GitHub',
      ariaLabel: 'Arne Decant on GitHub',
    },
    {
      icon: 'line-md:linkedin',
      to: 'https://www.linkedin.com/in/arne-decant-970b9282/',
      target: '_blank',
      label: 'LinkedIn',
      ariaLabel: 'Arne Decant on LinkedIn',
    },
    {
      icon: 'line-md:email',
      to: 'mailto:hello@arnedecant.be',
      label: 'Email',
      ariaLabel: 'Email Arne Decant',
    },
    {
      icon: 'line-md:instagram',
      to: 'https://www.instagram.com/arnedecant',
      target: '_blank',
      label: 'Instagram',
      ariaLabel: 'Arne Decant on Instagram',
    },
  ],
  resume: {
    label: 'Resume',
    to: '/resume',
  },
})
