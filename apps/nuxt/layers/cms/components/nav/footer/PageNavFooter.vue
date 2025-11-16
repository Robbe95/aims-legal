<script setup lang="ts">
import { useI18n } from '#imports'
import HeaderLogo from '~/components/header/HeaderLogo.vue'
import Container from '~base/components/container/Container.vue'
import Seperator from '~base/components/seperator/Seperator.vue'
import { useSettingsFooterQuery } from '~cms/api/settings/query/useSettingsFooter.query'
import { useSettingsSocialsQuery } from '~cms/api/settings/query/useSettingsSocials.query'
import PageNavFooterLink from '~cms/components/nav/footer/PageNavFooterLink.vue'
import PageNavFooterSocials from '~cms/components/nav/footer/PageNavFooterSocials.vue'

const {
  t,
} = useI18n()

const footer = useSettingsFooterQuery()
const socials = useSettingsSocialsQuery()

await footer.suspense()
await socials.suspense()
</script>

<template>
  <footer
    ref="footer"
    class="bg-white"
  >
    <Container class="pt-12 pb-24">
      <div
        class="
          grid grid-cols-1 gap-y-6
          lg:grid-cols-[0.2fr_0.8fr]
        "
        is-reversed
      >
        <HeaderLogo
          class="
            mb-12
            lg:mb-0
          "
        />
        <div
          class="
            flex flex-col justify-end gap-12
            lg:flex-row lg:gap-24
          "
        />
        <div />
        <PageNavFooterSocials
          v-if="socials.data.value"
          :socials="socials.data.value"
        />
      </div>
    </Container>
    <Seperator class="bg-gray-500" />
    <div class="py-8">
      <Container
        class="
          grid gap-4 text-xs font-light text-black
          lg:grid-cols-3
        "
      >
        <p>
          {{ `${'©'} ${t('cms.footer.copyright', { year: new Date().getFullYear() })}` }}
        </p>
        <div
          class="
            flex flex-col gap-2
            lg:flex-row lg:items-center lg:justify-center lg:gap-8
          "
        >
          <template
            v-for="footerLink in footer.data.value"
            :key="footerLink.label"
          >
            <PageNavFooterLink
              v-if="footerLink.navType === 'link'"
              :nav-link="footerLink"
            >
              {{ footerLink }}
            </PageNavFooterLink>
          </template>
        </div>
      </Container>
    </div>
  </footer>
</template>
