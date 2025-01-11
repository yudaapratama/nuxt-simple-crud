<template>
  <main>
    <AppHeader :title="title" :description="description" class="mb-8" />
    <div class="space-y-4">
      <div class="flex justify-between">
        <UInput v-model="user.page.searchQuery" icon="i-mynaui-search" placeholder="Search..." />
        <UButton
          label="Add Data"
          @click="() => {
            isOpen.type = true
            isOpen.addOrUpdate = true
            state.id = 0
            state.name = undefined
            state.username = undefined
            state.email = undefined
            state.phone = undefined
            state.website = undefined
          }"
        />
      </div>
      <UTable
        :columns="columns"
        :rows="user.list || []"
        :loading="user.loading.content"
        class="border rounded-md dark:border-gray-700 dark:bg-slate-900"
      >
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UTooltip text="Actions">
              <UButton color="gray" variant="ghost" icon="i-mynaui-dots" />
            </UTooltip>
          </UDropdown>
        </template>
      </UTable>
      <div class="flex justify-center border-gray-200 dark:border-gray-700">
        <UPagination
          v-model="user.page.current"
          :page-count="user.page.limit"
          :total="user.page.total || 0"
          size="sm"
          :max="5"
        />
      </div>
    </div>

    <UModal v-model="isOpen.addOrUpdate" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Update Data
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              :disabled="user.loading.button"
              @click="isOpen.addOrUpdate = false"
            />
          </div>
        </template>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>

          <UFormGroup label="Username" name="username">
            <UInput v-model="state.username" />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Phone" name="phone">
            <UInput v-model="state.phone" />
          </UFormGroup>

          <UFormGroup label="Website" name="website">
            <UInput v-model="state.website" />
          </UFormGroup>

          <UButton type="submit" :loading="user.loading.button" :disabled="user.loading.button">
            Submit
          </UButton>
        </UForm>
      </UCard>
    </UModal>

    <UModal v-model="isOpen.delete" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Delete Data
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              :disabled="user.loading.button"
              @click="isOpen.delete = false"
            />
          </div>
        </template>
        <div class="flex flex-col items-center space-y-8">
          <span>Are you sure want to delete this data ?</span>
          <div class="flex flex-row gap-4">
            <UButton color="red" label="Yes, Delete" :loading="user.loading.button" :disabled="user.loading.button" @click="onDelete" />
            <UButton variant="ghost" color="gray" label="Cancel" :disabled="user.loading.button" @click="isOpen.delete = false" />
          </div>
        </div>
      </UCard>
    </UModal>
  </main>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const title = 'Simple CRUD'
const description = 'Simple Create, Read, Update, and Delete using Nuxt 3'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const user = useUsersStore()

const isOpen = reactive({
  addOrUpdate: false,
  delete: false,
  type: false
})

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'NAME' },
  { key: 'username', label: 'USERNAME' },
  { key: 'email', label: 'EMAIL' },
  { key: 'phone', label: 'PHONE' },
  { key: 'website', label: 'WEBSITE' },
  { key: 'actions' }
]

const schema = z.object({
  id: z.number().optional(),
  name: z.string(),
  username: z.string(),
  email: z.string().email('Email must be valid'),
  phone: z.string(),
  website: z.string()
})

type Schema = z.output<typeof schema>

const state = reactive({
  id: 0,
  name: undefined,
  username: undefined,
  email: undefined,
  phone: undefined,
  website: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>): Promise<void> {
  if (isOpen.type as boolean) {
    await user.add(event.data)
  } else {
    await user.update(event.data)
  }
  isOpen.addOrUpdate = false
}

async function onDelete (): Promise<void> {
  await user.destroy(state.id)
  isOpen.delete = false
}

const items = (row: { id: any }): any => [
  [{
    label: 'Update',
    icon: 'i-mynaui-edit-one',
    click: () => {
      isOpen.type = false
      isOpen.addOrUpdate = true
      const data = user.getById(row.id)
      state.id = row.id
      state.name = data?.name as undefined
      state.username = data?.username as undefined
      state.email = data?.email as undefined
      state.phone = data?.phone as undefined
      state.website = data?.website as undefined
    }
  }, {
    label: 'Delete',
    icon: 'i-mynaui-trash',
    click: () => {
      state.id = row.id
      isOpen.delete = true
    }
  }]
]

onMounted(() => {
  user.get()
})

</script>
