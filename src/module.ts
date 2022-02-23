import { defineNuxtModule } from '@nuxt/kit'
import { watch, FSWatcher } from 'chokidar'
import consola from 'consola'
import { dirname } from 'pathe'
import { generate, loadCodegenConfig } from '@graphql-codegen/cli'

export interface NuxtGraphQLCodegenOptions {
  /**
   * Relative path to the graphql-codegen configuration file.
   * Defaults to the current working directory (i.e. project root).
   */
  configFilePath?: string
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    graphqlCodegen?: NuxtGraphQLCodegenOptions;
  }
}

const logger = consola.withScope('nuxt-graphql-codegen')

export default defineNuxtModule<NuxtGraphQLCodegenOptions>({
  meta: {
    name: 'nuxt-graphql-codegen',
    configKey: 'graphqlCodegen'
  },
  defaults: {
    configFilePath: process.cwd()
  },
  async setup ({ configFilePath }, nuxt) {
    const { config, filepath } = await loadCodegenConfig({ configFilePath })
    const cwd = dirname(filepath)

    async function generateGraphQLCodegen () {
      const start = Date.now()
      await generate(Object.assign({ ...config, cwd }), true)
      const time = Date.now() - start
      logger.success(`GraphQL Codegen generated code in ${time}ms`)
    }

    if (nuxt.options.dev) {
      let watcher: FSWatcher
      nuxt.hook('build:before', async () => {
        // TODO: handle multiple schemas / documents
        const { schema, documents } = config
        const paths = [schema as string, documents as string].filter(path => !!path && typeof path === 'string')
        logger.info('GraphQL Codegen watching for changes...')
        watcher = watch(paths)
        watcher.on('change', generateGraphQLCodegen)
        await generateGraphQLCodegen()
      })
      nuxt.hook('close', () => watcher.close())
    } else {
      nuxt.hook('build:before', async () => {
        await generateGraphQLCodegen()
      })
    }
  }
})
