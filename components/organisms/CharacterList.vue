<script setup lang="ts">
import { useQuery, useResult, } from '@vue/apollo-composable'
import { Character, getAllCharacters, GetAllCharacters, getCharacterDetails } from '~/services/character'
import CharacterCard from '../molecules/CharacterCard.vue';

const characters = ref<GetAllCharacters['results']>([])
const pagination = ref<GetAllCharacters['info']>({
  pages: 1,
  count: 1,
  next: 1,
  prev: 1,
})

const filter = reactive({
  search: '',
  currentPage: 1,
})


watch(
  () => filter.search,
  () => {
    filter.currentPage = 1
  },
)

const { onResult } = useQuery<{
  characters: GetAllCharacters
}>(
  getAllCharacters,
  () => ({
    page: filter.currentPage,
    name: filter.search,
  }),
  { fetchPolicy: 'cache-and-network' },
)

onResult(({ data, networkStatus }) => {
  if (networkStatus === 7) {
    characters.value = data.characters.results
    pagination.value = data.characters.info

  }
})

const details = reactive({
  character: null,
  id: null,
  enable: false
})


const { result, onResult: onResultDetail } = useQuery(getCharacterDetails, () => ({ id: details.id }), () => ({ enabled: details.enable, fetchPolicy: 'cache-and-network' }))

onResultDetail(({ data, networkStatus }) => {
  console.group('[APOLLO] CHARACTER DETAIL')
  if (networkStatus === 7) {
    details.character = data.character
    console.log(`[${data.character.name}]`, data.character)
  }
  console.groupEnd()
})

function characterDetail(id: Character['id']) {
  details.id = id
  details.enable = true
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex w-full items-center justify-center mb-8">
      <button
        :disabled="filter.currentPage === 1"
        class="px-4 w-200px h-42px"
        @click="filter.currentPage--"
      >Previous</button>
      <strong class="mx-4 font-bold font-mono">[{{ filter.currentPage }}]</strong>
      <button class="px-4 w-200px h-42px" @click="filter.currentPage++">Next</button>
    </div>

    <section class="character-container">
      <client-only>
        <CharacterCard
          v-for="(character, index) in characters"
          :key="index"
          :delay="index * 0.2"
          :character="character"
          @click="characterDetail(character.id)"
        />
      </client-only>
    </section>
  </div>
</template>

<style lang="scss">
.character-container {
  @apply flex justify-center flex-wrap;
  gap: 8px;
}
</style>