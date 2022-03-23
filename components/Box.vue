<script lang="ts" setup>
// import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { GetAllCharacters, getAllCharacters } from '../services/character'

import { useQuery } from '@vue/apollo-composable'


// const apolloClient = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: 'https://rickandmortyapi.com/graphql',
// })

// provide(DefaultApolloClient, apolloClient)

const { loading, onResult } = useQuery(getAllCharacters)


const characters = ref<GetAllCharacters['results']>([])
const pagination = ref<GetAllCharacters['info']>({
  pages: 1,
  count: 1,
  next: 1,
  prev: 1,
})


onResult(({ data, networkStatus }) => {
  if (networkStatus === 7) {
    characters.value = data.characters.results
    pagination.value = data.characters.info
  }
})
</script>

<template>
  <section>
    <h2>Subbbbb</h2>
    <h3>{{characters[0]}}</h3>
  </section>
</template>

<style lang="scss"></style>
