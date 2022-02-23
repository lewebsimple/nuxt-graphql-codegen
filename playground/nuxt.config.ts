import { defineNuxtConfig } from 'nuxt3'
import graphqlCodegen from '..'

export default defineNuxtConfig({
  buildModules: [
    graphqlCodegen
  ]
})
