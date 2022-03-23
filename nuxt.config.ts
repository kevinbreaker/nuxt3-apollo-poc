import { build, defineNuxtConfig } from 'nuxt3'

import graphql from '@rollup/plugin-graphql';


export default defineNuxtConfig({
  vite: {
    plugins: [graphql()]
  },

  buildModules: [
    '@pinia/nuxt',
    'nuxt-windicss'
  ],


  build: {
    transpile: [
      '@apollo/client',
      'ts-invariant/process',
    ]
  }
})
