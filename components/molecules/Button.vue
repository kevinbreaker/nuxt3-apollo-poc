
<template>
  <button class="button-core" type="button">
    <slot />
  </button>
</template>

<style lang="scss">
.button-core {
  @apply flex items-center justify-center
    h-12 px-4 py-4
    font-bold text-sm
    hover:brightness-110 hover:filter;
  transition: filter 200ms cubic-bezier(0.86, 0, 0.07, 1);
  

  &.-block {
    @apply w-full;
  }
}
</style>