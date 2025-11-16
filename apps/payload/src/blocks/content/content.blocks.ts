import { contentArticlesCarouselBlock } from '@payload/blocks/content/articles/contentArticlesCarousel.block'
import { contentArticlesIndexBlock } from '@payload/blocks/content/articles/contentArticlesIndex.block'
import { contentBannerBlock } from '@payload/blocks/content/banner/contentBanner.block'
import { contentCarouselBlock } from '@payload/blocks/content/carousel/contentCarousel.block'
import { contentCarouselImageOnlyBlock } from '@payload/blocks/content/carousel/contentCarouselImageOnly.block'
import { contentColumnBlock } from '@payload/blocks/content/column/contentColumn.block'
import { contentDoubleImageBlock } from '@payload/blocks/content/double-image/contentDoubleImage.block'
import { contentHubspotFormBlock } from '@payload/blocks/content/form/contentFormHubspot.block'
import { contentHeroBlock } from '@payload/blocks/content/hero/contentHero.block'
import { contentImageTextBlock } from '@payload/blocks/content/image-text/contentImageText.block'
import { contentCardListBlock } from '@payload/blocks/content/list/contentCardList.block'
import { contentRichTextBlock } from '@payload/blocks/content/rich-text/contentRichText.block'
import { contentTextBlock } from '@payload/blocks/content/text/contentText.block'
import { contentUspsBlock } from '@payload/blocks/content/usps/contentUsps.block'

export const contentBlocks = [
  // Content
  contentHeroBlock,
  contentTextBlock,
  contentColumnBlock,
  contentImageTextBlock,
  contentCarouselBlock,
  contentCarouselImageOnlyBlock,
  contentBannerBlock,
  contentDoubleImageBlock,
  contentUspsBlock,
  contentRichTextBlock,
  contentCardListBlock,

  // Entities
  contentArticlesIndexBlock,
  contentArticlesCarouselBlock,

  // Form
  contentHubspotFormBlock,
]
