<template>
  <header class="bg-white/75 dark:bg-slate-800/75 backdrop-blur border-b border-gray-200 dark:border-gray-700 -mb-px sticky top-0 z-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-16">
      <div class="lg:flex-1 flex items-center gap-1.5">
        <NuxtLink to="/" class="block">
          <!-- <span class="text-2xl font-bold tracking-tight text-transparent inline-block bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 to-90%">
            Simple CRUD
          </span> -->
          <NuxtImg src="/dimensions.png" class="w-8 h-8" />
        </NuxtLink>
      </div>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <div class="relative inline-flex">
          <UTooltip text="Github" :ui="{ popper: { strategy: 'absolute' } }">
            <ULink
              to="https://github.com/yudaapratama/nuxt-simple-crud"
              class="relative px-3 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
              target="_blank"
            >
              <Icon aria-hidden="true" name="mynaui:brand-github" class="w-5 h-5 z-10" />
            </ULink>
          </UTooltip>
        </div>
        <div class="relative inline-flex">
          <AppToggle />
        </div>
      </div>
    </div>
  </header>
</template>
