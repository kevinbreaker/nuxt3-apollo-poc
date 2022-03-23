<script setup lang="ts">
import CharacterContainer from '~~/components/templates/CharacterContainer.vue';


definePageMeta({
  layout: 'clean'
})
</script>

<template>
  <main class="graph-page">

    <section class="flex my-8 items-center">
      <CharacterContainer />
    </section>
  </main>
</template>

<style lang="scss">
.graph-page {
  @apply flex flex-col items-center
  min-h-screen w-screen pt-6 pb-10
  overflow-x-hidden;
}
</style>