import { seoPlugin } from '@payloadcms/plugin-seo'

export function pluginSeo() {
  return seoPlugin({
    generateTitle: ({
      doc,
    }) => `Kreon — ${doc.title}`,
    tabbedUI: true,
    uploadsCollection: 'images',
  })
}
