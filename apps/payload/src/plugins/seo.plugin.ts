import { seoPlugin } from '@payloadcms/plugin-seo'

export function pluginSeo() {
  return seoPlugin({
    generateDescription: ({
      doc,
    }) => doc.excerpt,
    generateTitle: ({
      doc,
    }) => `Template — ${doc.title}`,
    tabbedUI: true,
    uploadsCollection: 'images',
  })
}
