const config = {
  $schema: 'https://docs.renovatebot.com/renovate-schema.json',
  platform: 'github',
  onboarding: false,
  requireConfig: 'optional',
  dependencyDashboard: true,
  repositories: ['gbicou/directus-extension-pdf-image'],
  addLabels: ['dependencies'],
  extends: ['config:recommended'],
  hostRules: [],
  packageRules: [
    {
      groupName: 'Directus',
      matchPackageNames: [
        'directus',
        '@directus/**',
      ],
    },
  ],
  lockFileMaintenance: {
    enabled: true,
    automerge: true,
  },
}

export default config;
