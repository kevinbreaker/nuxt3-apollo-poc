<script lang="ts" setup>
import CharacterList from '../organisms/CharacterList.vue';
import CharacterListCodegen from '../organisms/CharacterListCodegen.vue';
import Tabs from '../molecules/Tabs.vue';

const isCodeGenTab = ref(false)
</script>

<template>
  <section class="flex flex-col h-full w-full">
    <Tabs v-model:current="isCodeGenTab" />

    <CharacterListCodegen v-if="isCodeGenTab" />
    <CharacterList v-else />
  </section>
</template>

<style lang="scss"></style>
