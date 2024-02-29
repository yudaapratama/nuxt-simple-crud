<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <UTooltip text="Toggle theme" :ui="{ popper: { strategy: 'absolute' } }">
    <UToggle
      v-model="isDark"
      on-icon="i-mynaui-sun"
      off-icon="i-mynaui-moon"
    />
  </UTooltip>
</template>
