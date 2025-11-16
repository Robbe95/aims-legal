export default defineNitroPlugin((nitroApp) => {
  // TODO replace with actual site config values
  const runtimeSiteConfig = {
    title: 'Example Site',
    _priority: 1,
    description: '',
    url: 'https://example.com',
  }

  nitroApp.hooks.hook('site-config:init', ({
    siteConfig,
  }) => {
    siteConfig.push(runtimeSiteConfig)
  })
})
