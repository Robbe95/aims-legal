import { LightTextNode } from '@payload/components/lexical/light/feature'
import {
  createNode,
  createServerFeature,
} from '@payloadcms/richtext-lexical'
import {
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
} from 'node_modules/@payloadcms/richtext-lexical/dist/packages/@lexical/markdown'

export const LightFeature = createServerFeature({
  dependenciesSoft: [
    'italic',
  ],
  feature: ({
    featureProviderMap,
  }) => {
    const markdownTransformers = [
      BOLD_STAR,
      BOLD_UNDERSCORE,
    ]

    if (featureProviderMap.get('italic')) {
      markdownTransformers.push(BOLD_ITALIC_UNDERSCORE, BOLD_ITALIC_STAR)
    }

    return {
      ClientFeature: '@payload/components/lexical/light/feature.tsx#LightFeatureClient',
      markdownTransformers,
      nodes: [
        createNode({
          node: LightTextNode,
        }),
      ],
    }
  },
  key: 'light',
})
