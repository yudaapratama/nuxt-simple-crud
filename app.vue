<template>
  <div>
    <!-- <NuxtLoadingIndicator color="#14b8a6" /> -->
    <AppNavbar />
    <UContainer class="py-12">
      <NuxtPage />
    </UContainer>
  </div>
  <!-- <AppFooter /> -->
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.dark {
--color-primary-DEFAULT: var(--color-primary-400);
}

/* width */
::-webkit-scrollbar {
    width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
