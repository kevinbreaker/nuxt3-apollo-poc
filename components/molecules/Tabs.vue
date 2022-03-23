<script lang="ts" setup>
type Tab = {
  text: string
  value: string | number | boolean
}

interface Props {
  tabs?: Tab[]
  current: Tab['value']
}

const emit = defineEmits<{
  (e: 'update:current', value: Props['current']): void
}>()

withDefaults(defineProps<Props>(), {
  tabs: () => [
    {
      text: 'Vue-apollo',
      value: false,
    },
    {
      text: 'Graphql-Codegen',
      value: true,
    },
  ],

  current: false,
})
</script>

<template>
  <ul class="tabs-list">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      class="itemlist"
      :data-active="current === tab.value"
    >
      <button class="button-tab" @click="emit('update:current', tab.value)">
        <slot :item="tab">
          {{ tab.text }}
        </slot>
      </button>
    </li>
  </ul>
</template>

<style lang="scss">
.tabs-list {
  @apply flex relative w-full justify-center;
  > .itemlist {
    @apply relative  list-none;
    width: fit-content;

    &::before {
      @apply absolute
        bottom-0 w-0 h-1
      bg-indigo-600;

      content: "";
      transition: width 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    &[data-active="true"]::before {
      width: 100%;
    }

    &[data-active="true"] > .button-tab {
      @apply font-bold bg-teal-200;
    }
  }

  > .itemlist > .button-tab {
    @apply py-3 px-4 
      text-sm 
      bg-teal-100 border-none cursor-pointer;

    transition: color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}
</style>