<template>
  <main>
    <AppHeader :title="title" :description="description" class="mb-8" />
    <div class="space-y-4">
      <div class="flex justify-start gap-2">
        <UInput type="file" icon="i-mynaui-folder" :disabled="page.loading" @change="handleFileChanges($event)" />
        <UButton
          label="Process"
          :loading="page.loading"
          @click="onSubmit"
        />
        <UButton
          label="Reset"
          color="gray"
          @click="onReset"
        />
      </div>
      <UTable
        v-if="columns.length > 0"
        :columns="columns"
        :rows="cells"
        :loading="page.loading"
        class="border rounded-md dark:border-gray-700 dark:bg-slate-900"
      >
        <template #actions-data="{ row }">
          <UTooltip text="Actions">
            <UButton color="gray" variant="ghost" size="xs" icon="i-mynaui-edit-one" @click="onClick(row)" />
          </UTooltip>
        </template>
      </UTable>
    </div>

    <UModal v-model="isOpen" prevent-close>
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
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="flex flex-col gap-4">
          <template v-for="column in selecteditem.actualCellCount" :key="column">
            <UInput v-model="dynamicModel[column]" :disabled="typeof selecteditem.getCell(column).value === 'object'" />
          </template>
          <div class="flex justify-end">
            <UButton type="submit">
              Submit
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </main>
</template>

<script lang="ts" setup>
import ExcelJs from 'exceljs'
const title = 'Simple Excel'
const description = 'Process dynamic excel file'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const isOpen = ref<boolean>(false)

const Excel = new ExcelJs.Workbook()
const worksheet = ref<ExcelJs.Worksheet>()
const bufferFile = ref<ArrayBuffer>()

const fileRef = ref<File>()
const file = ref('')
const page = reactive({
  loading: false
})
const columns = ref<any>([])
const cells = ref<any>([])

const dataRaw = ref([] as ExcelJs.Row[])
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const selecteditem = ref({} as ExcelJs.Row)

const dynamicModel = ref({} as any)

function handleFileChanges (file: any): void {
  fileRef.value = file[0]
}

function onSubmit (): void {
  try {
    columns.value = []
    cells.value = []
    page.loading = true
    // const formData = new FormData()
    // formData.append('file', fileRef.value as any)

    // const data = await fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData
    // })
    // console.log('🚀 ~ onSubmit ~ data:', data)

    const reader = new FileReader()

    reader.readAsArrayBuffer(fileRef.value as Blob)
    reader.onloadend = async () => {
      bufferFile.value = reader.result as ArrayBuffer
      const workbook = await Excel.xlsx.load(bufferFile.value as ArrayBuffer)

      worksheet.value = workbook.getWorksheet()
      for (let i = 1; i <= worksheet.value!.actualColumnCount; i++) {
        columns.value.push({
          key: `${i}`
        })
      }

      columns.value.push({
        key: 'actions'
      })

      worksheet.value?.eachRow((row) => {
        dataRaw.value?.push(row)
        let items = {}
        row.eachCell((cell, colNumber) => {
          if (cell.value !== null) {
            items = Object.assign(items, { [`${colNumber}`]: typeof cell.value === 'object' ? cell.result : cell.value }, { row: row.number })
          }
        })
        cells.value.push(items)
      })

      page.loading = false
    }
  } catch (error) {
    console.error('🚀 ~ onSubmit ~ error:', error)
    page.loading = false
  }
}

function onClick (item: any): void {
  selecteditem.value = dataRaw.value?.find(e => e.number === item.row) as ExcelJs.Row
  selecteditem.value.eachCell((cell, colNumber) => {
    if (cell.value !== null) {
      dynamicModel.value[`${colNumber}`] = typeof cell.value === 'object' ? cell.result : cell.value
    }
  })
  isOpen.value = true
}

function onReset (): void {
  worksheet.value = undefined
  dataRaw.value = []
  dynamicModel.value = {}
  bufferFile.value = undefined
  fileRef.value = undefined
  file.value = ''
  cells.value = []
  columns.value = []
}

onMounted(() => {

})

</script>
