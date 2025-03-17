<script setup lang="ts">
import { updateCurrentUserFormSchema } from '@repo/models'
import { VcTextField } from '@wisemen/vue-core'
import { useForm } from 'formango'

import { useAuthStore } from '~base/stores/auth.store'
import { toFormField } from '~base/utils/form/toFormField.util'
import { useUpdateCurrentUserMutation } from '~settings/api/update-current-user/mutations/useUpdateCurrentUser.mutation'
import SettingsTitleSubtitle from '~settings/components/SettingsTitleSubtitle.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const updateCurrentUserMutation = useUpdateCurrentUserMutation()
const form = useForm({
  initialState: {
    darkMode: authStore.currentUser?.preferences.darkMode ?? null,
    firstName: authStore.currentUser?.firstName ?? null,
    lastName: authStore.currentUser?.lastName ?? null,
  },
  schema: updateCurrentUserFormSchema,
  onSubmit(data) {
    updateCurrentUserMutation.mutate(data)
  },
})

const firstName = form.register('firstName')
const lastName = form.register('lastName')
</script>

<template>
  <div>
    <SettingsTitleSubtitle
      :title="t('settings.account.personal_info.title')"
      :subtitle="t('settings.account.personal_info.subtitle')"
    />
    <div>
      <div class="flex flex-col gap-4">
        <VcTextField
          v-bind="toFormField(firstName)"
          :label="t('base.shared.first_name')"
          :placeholder="t('base.shared.first_name_placeholder')"
        />
      </div>
    </div>
  </div>
</template>
