import { defineNuxtPlugin } from "#app"

import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"

import _cloneDeep from 'lodash/cloneDeep'

export default defineNuxtPlugin((nuxtApp) => {

  const cache = new InMemoryCache();

  let apolloClient;

  if (nuxtApp.ssrContext) {
    apolloClient = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache(),
      uri: 'https://rickandmortyapi.com/graphql',
    })

    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload.data['apollo-default'] = apolloClient.extract()
    })
  } else {
    cache.restore(_cloneDeep(nuxtApp.payload.data['apollo-default']))

    apolloClient = new ApolloClient({
      cache,
      uri: 'https://rickandmortyapi.com/graphql',
      ssrForceFetchDelay: 100,
    })

  }

  nuxtApp.provide('apollo', apolloClient)
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})