import { defineNuxtModule } from '@nuxt/kit'
import consola from 'consola'
import { generate, loadContext } from '@graphql-codegen/cli'

export interface ModuleOptions {
}

const logger = consola.withScope('nuxt-graphql-codegen')

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-graphql-codegen',
    configKey: 'graphqlCodegen'
  },
  defaults: {
  },
  setup (options, nuxt) {
    async function codegenGenerateTypings () {
      const start = Date.now()
      process.chdir(nuxt.options.rootDir)
      const context = await loadContext()
      await generate(context, true)
      const time = Date.now() - start
      logger.success(`GraphQL typings generated in ${time}ms`)
    }
    nuxt.hook('build:before', codegenGenerateTypings)
  }
})
